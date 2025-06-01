import { Ref, ref, reactive, toRaw, h, computed } from 'vue'
import { type PaginationProps, FormItemProps, RoleFormItemProps } from './type'
import ReCropperPreview from '@/components/ReCropperPreview/index.vue'
import { getDeptList, getUserList, getAllRoleList, getRoleIds } from '@/http/api/system'
import { handleTree } from '@/utils/tree'
import { ElMessage } from 'element-plus'
import { addDialog } from '@/components/ReDialog'
import editForm from '../form/index.vue'
import roleForm from '../form/role.vue'
import userAvatar from '@/assets/user.jpg'
import resetPwd from '../form/resetPwd.vue'

export function useUser(tableRef: Ref, treeRef: Ref) {
  const form = reactive({
    // 左侧部门树的id
    deptId: '',
    username: '',
    phone: '',
    status: ''
  })
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  })

  //树结构的数据
  const treeData = ref([])
  const treeLoading = ref(true)
  //用户管理列表数据
  const dataList = ref([])
  //点击树结构节点搜索表格数据的加载
  const loading = ref(true)

  //点击树节点触发的事件
  async function onSearch() {
    loading.value = true
    const { data } = await getUserList(toRaw(form))
    dataList.value = data.list
    pagination.total = data.total
    pagination.pageSize = data.pageSize
    pagination.currentPage = data.currentPage

    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  function onTreeSelect({ id, selected }) {
    form.deptId = selected ? id : ''
    onSearch()
  }

  const higherDeptOptions = ref()
  const roleOptions = ref([])
  //获取树结构的数据
  async function getTreeData() {
    treeLoading.value = true
    onSearch()

    // 归属部门
    const { data } = await getDeptList()
    higherDeptOptions.value = handleTree(data)
    treeData.value = handleTree(data)
    treeLoading.value = false

    // 角色列表
    roleOptions.value = (await getAllRoleList()).data
  }

  const resetForm = formEl => {
    if (!formEl) return
    formEl.resetFields()
    form.deptId = ''
    treeRef.value.onTreeReset()
    onSearch()
  }

  const columns: TableColumnList = [
    {
      label: '勾选列', // 如果需要表格多选，此处label必须设置
      type: 'selection',
      reserveSelection: true, // 数据刷新后保留选项
      prop: '',
      hide: false,
      fixed: true
    },
    {
      label: '用户编号',
      prop: 'id',
      width: 90,
      hide: false
    },
    {
      label: '用户头像',
      prop: 'avatar',
      width: 90,
      hide: false
    },
    {
      label: '用户名称',
      prop: 'username',
      minWidth: 130,
      hide: false
    },
    {
      label: '用户昵称',
      prop: 'nickname',
      minWidth: 130,
      hide: false
    },
    {
      label: '性别',
      prop: 'sex',
      minWidth: 90,
      hide: false
    },
    {
      label: '部门',
      prop: 'dept.name',
      minWidth: 90,
      hide: false
    },
    {
      label: '手机号码',
      prop: 'phone',
      minWidth: 90,
      formatter: (_row, _column, cellValue) => cellValue.slice(0, 3) + '*'.repeat(4) + cellValue.slice(7),
      hide: false
    }
  ]
  //复选框所选中的行
  const selectedNum = ref(0)

  const formRef = ref()
  //新增弹框
  function openDialog(title = '新增', row?: FormItemProps) {
    addDialog({
      title: `${title}用户`,
      props: {
        formInline: {
          title,
          higherDeptOptions: higherDeptOptions.value,
          parentId: row?.dept.id ?? 0,
          nickname: row?.nickname ?? '',
          username: row?.username ?? '',
          password: row?.password ?? '',
          phone: row?.phone ?? '',
          email: row?.email ?? '',
          sex: row?.sex ?? '',
          status: row?.status ?? 1,
          remark: row?.remark ?? ''
        }
      },
      width: '46%',
      draggable: true,
      closeOnClickModal: false,
      contentRender: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef()
        const curData = options.props.formInline as FormItemProps
        function chores() {
          ElMessage.success(`您${title}了用户名称为${curData.username}的这条数据`)
          done() // 关闭弹框
          onSearch() // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log('curData', curData)
            // 表单规则校验通过
            if (title === '新增') {
              // 实际开发先调用新增接口，再进行下面操作
              chores()
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              chores()
            }
          }
        })
      }
    })
  }

  const buttonClass = computed(() => {
    return ['!h-[20px]', 'reset-margin', '!text-gray-500', 'dark:!text-white', 'dark:hover:!text-primary']
  })

  function handleDelete(row) {
    ElMessage.success(`您删除了用户编号为${row.id}的这条数据`)
    onSearch()
  }

  function handleUpdate(row) {
    console.log(row)
  }

  // 上传头像信息
  const avatarInfo = ref()
  const cropRef = ref()
  /** 上传头像 */
  function handleUpload(row) {
    addDialog({
      title: '裁剪、上传头像',
      width: '40%',
      closeOnClickModal: false,
      contentRender: () =>
        h(ReCropperPreview, {
          ref: cropRef,
          imgSrc: row.avatar || userAvatar,
          onCropper: info => (avatarInfo.value = info)
        }),
      beforeSure: done => {
        console.log('裁剪后的图片信息：', avatarInfo.value)
        // 根据实际业务使用avatarInfo.value和row里的某些字段去调用上传头像接口即可
        done() // 关闭弹框
        onSearch() // 刷新表格数据
      },
      closeCallBack: () => cropRef.value.hidePopover()
    })
  }

  /** 分配角色 */
  async function handleRole(row) {
    // 选中的角色列表
    const ids = (await getRoleIds({ userId: row.id })).data ?? []
    addDialog({
      title: `分配 ${row.username} 用户的角色`,
      props: {
        formInline: {
          username: row?.username ?? '',
          nickname: row?.nickname ?? '',
          roleOptions: roleOptions.value ?? [],
          ids
        }
      },
      width: '400px',
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRender: () => h(roleForm),
      beforeSure: (done, { options }) => {
        const curData = options.props.formInline as RoleFormItemProps
        console.log('curIds', curData.ids)
        // 根据实际业务使用curData.ids和row里的某些字段去调用修改角色接口即可
        done() // 关闭弹框
      }
    })
  }

  // 重置的新密码
  const pwdForm = reactive({
    newPwd: ''
  })
  const pwdProgress = [
    { color: '#e74242', text: '非常弱' },
    { color: '#EFBD47', text: '弱' },
    { color: '#ffa500', text: '一般' },
    { color: '#1bbf1b', text: '强' },
    { color: '#008000', text: '非常强' }
  ]
  const ruleFormRef = ref()
  // 当前密码强度（0-4）
  const curScore = ref()
  /**重置密码 */
  function handleReset(row) {
    addDialog({
      title: `重置 ${row.username} 用户的密码`,
      width: '30%',
      draggable: true,
      closeOnClickModal: false,
      contentRender: () => h(resetPwd, { pwdForm, curScore, pwdProgress }),
      closeCallBack: () => (pwdForm.newPwd = ''),
      beforeSure: done => {
        ruleFormRef.value.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            ElMessage.success(`已成功重置 ${row.username} 用户的密码`)
            console.log(pwdForm.newPwd)
            // 根据实际业务使用pwdForm.newPwd和row里的某些字段去调用重置用户密码接口即可
            done() // 关闭弹框
            onSearch() // 刷新表格数据
          }
        })
      }
    })
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length
  }

  return {
    treeData,
    treeLoading,
    form,
    onTreeSelect,
    getTreeData,
    onSearch,
    loading,
    resetForm,
    columns,
    dataList,
    pagination,
    selectedNum,
    openDialog,
    buttonClass,
    handleDelete,
    handleUpdate,
    handleUpload,
    handleRole,
    handleReset,
    handleSelectionChange
  }
}
