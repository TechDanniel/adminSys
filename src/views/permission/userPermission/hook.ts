import { reactive, ref, toRaw, h } from 'vue'
import { getUserPermission } from '@/http/api/system'
import { addDialog } from '@/components/ReDialog'
import { ElMessage } from 'element-plus'
import editForm from './form/index.vue'

const form = reactive({
  username: '',
  phone: '',
  deptname: ''
})
const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true
})

const loading = ref(true)
const dataList = ref([])

async function onSearch() {
  loading.value = true
  const { data } = await getUserPermission(toRaw(form))
  dataList.value = data.list
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

const columns: TableColumnList = [
  {
    label: '用户名',
    prop: 'username'
  },
  {
    label: '手机号码',
    prop: 'phone'
  },
  {
    label: '所在部门',
    prop: 'deptname.name'
  },
  {
    label: '角色',
    prop: 'role'
  }
]

//新增弹框
const formRef = ref()
const higherDeptOptions = ref()
function openDialog(title = '新增', row?) {
  addDialog({
    title: `${title}用户`,
    props: {
      formInline: {
        higherDeptOptions: higherDeptOptions.value,
        parentId: row?.parentId ?? 0,
        title,
        username: row?.username ?? '',
        phone: row?.phone ?? '',
        deptname: row?.deptname ?? '',
        role: row?.role ?? ''
      }
    },
    width: '46%',
    draggable: true,
    closeOnClickModal: false,
    contentRender: () => h(editForm, { ref: formRef, formInline: null }),
    beforeSure: (done, { options }) => {
      const FormRef = formRef.value.getRef()
      const curData = options.props.formInline
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

function handleDelete(row) {
  ElMessage.success(`您删除了用户编号为${row.id}的这条数据`)
  onSearch()
}

export { form, loading, onSearch, dataList, resetForm, columns, openDialog, handleDelete, higherDeptOptions }
