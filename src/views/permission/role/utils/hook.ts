import { reactive, Ref, ref, toRaw, h, watch, onMounted } from 'vue'
import dayjs from 'dayjs'
import { getRoleList, getRoleMenuIds, getRoleMenu } from '@/http/api/system'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addDialog } from '@/components/ReDialog'
import { FormItemProps } from './types'
import editForm from '../form.vue'
import { handleTree } from '@/utils/tree'
import { usePublicHooks } from '@/views/system/hooks'

export function useRole(treeRef: Ref) {
  //表单属性
  const form = reactive({
    name: '',
    code: '',
    status: ''
  })

  const loading = ref(true)
  const dataList = ref([])
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  })
  //表格是否显示
  const isShow = ref(false)
  //新增弹框表单
  const formRef = ref()
  //当前选中行
  const curRow = ref()
  //权限管理搜索框的值
  const treeSearchValue = ref()
  //树控件选中节点id数组
  const treeIds = ref([])
  const isSelectAll = ref(false)
  const treeData = ref([])

  const treeProps = {
    label: 'title',
    children: 'children'
  }

  //表格列属性
  const columns: TableColumnList = [
    {
      label: '角色编号',
      prop: 'id'
    },
    {
      label: '角色名称',
      prop: 'name'
    },
    {
      label: '角色标识',
      prop: 'code'
    },
    {
      label: '状态',
      prop: 'status',
      minWidth: 90
    },
    {
      label: '备注',
      prop: 'remark',
      minWidth: 160
    },
    {
      label: '创建时间',
      prop: 'createTime',
      minWidth: 160,
      formatter: ({ createTime }) => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
    }
  ]

  async function onSearch() {
    loading.value = true
    const { data } = await getRoleList(toRaw(form))
    dataList.value = data.list.map(row => {
      // 确保status转换为数字类型
      row.status = Number(row.status)
      return row
    })
    pagination.total = data.total
    pagination.pageSize = data.pageSize
    pagination.currentPage = data.currentPage

    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  const resetForm = formEl => {
    if (!formEl) return
    formEl.resetFields()
    onSearch()
  }

  function openDialog(title = '新增', row?: FormItemProps) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          name: row?.name ?? '',
          code: row?.code ?? '',
          remark: row?.remark ?? ''
        }
      },
      width: '40%',
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRender: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef()
        const curData = options.props.formInline as FormItemProps
        function chores() {
          ElMessage.success(`您${title}了角色名称为${curData.name}的这条数据`)
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

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: 'pointer',
      background: id === curRow.value?.id ? 'var(--el-fill-color-light)' : ''
    }
  }

  function handleSelectionChange(val) {
    console.log('handleSelectionChange', val)
  }

  function handleDelete(row) {
    ElMessage.success(`您删除了角色名称为${row.name}的这条数据`)
    onSearch()
  }

  /** 菜单权限 */
  async function handleMenu(row?: any) {
    const { id } = row
    if (id) {
      curRow.value = row
      isShow.value = true
      const { data } = await getRoleMenuIds({ id })
      treeRef.value.setCheckedKeys(data)
    } else {
      curRow.value = null
      isShow.value = false
    }
  }

  /** 菜单权限-保存 */
  function handleSave() {
    const { id, name } = curRow.value
    // 根据用户 id 调用实际项目中菜单权限修改接口
    console.log(id, treeRef.value.getCheckedKeys())
    ElMessage.success(`角色名称为${name}的菜单权限修改成功`)
  }

  // 树搜索
  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query)
  }

  watch(isSelectAll, val => {
    val ? treeRef.value.setCheckedKeys(treeIds.value) : treeRef.value.setCheckedKeys([])
  })

  const filterMethod = (query: string, node) => {
    return node.label!.includes(query)
  }

  const { switchStyle } = usePublicHooks()
  let isInitialLoad = ref(true)
  const switchLoadMap = ref({})
  onMounted(async () => {
    onSearch()
    const { data } = await getRoleMenu()
    treeIds.value = data.map(item => item.id)
    treeData.value = handleTree(data)
    isInitialLoad.value = false
  })

  function onChange({ row, index }) {
    // 如果是首次加载，不执行确认框逻辑
    if (isInitialLoad.value) return
    ElMessageBox.confirm(
      `确认要<strong>${row.status === 0 ? '停用' : '启用'}</strong><strong style='color:var(--el-color-primary)'>${
        row.name
      }</strong>吗?`,
      '系统提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
          loading: true
        })
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
            loading: false
          })
          ElMessage.success(`已${row.status === 0 ? '停用' : '启用'}${row.name}`)
        }, 300)
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0)
      })
  }

  return {
    form,
    columns,
    loading,
    onSearch,
    resetForm,
    dataList,
    pagination,
    isShow,
    openDialog,
    formRef,
    rowStyle,
    handleSelectionChange,
    handleDelete,
    curRow,
    handleMenu,
    handleSave,
    treeRef,
    treeSearchValue,
    onQueryChanged,
    isSelectAll,
    treeIds,
    treeData,
    treeProps,
    filterMethod,
    switchStyle,
    switchLoadMap,
    onChange
  }
}
