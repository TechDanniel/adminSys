/**
 * @description 创建层级关系
 * @param tree 树
 * @param pathList 路径列表
 * @retruns 创建层级关系后的树
 */
// 过递归的方式将扁平化的数组转换为树形结构，并为每个节点添加了 id、parentId 和 pathList 属性，方便后续对树形结构的操作和处理。
export const buildHierachyTree = (tree: any[], pathList = []): any => {
  if (!Array.isArray(tree)) {
    console.warn('tree must be an array')
    return []
  }
  if (!tree || tree.length === 0) return []
  for (const [key, node] of tree.entries()) {
    // 为当前节点分配一个唯一的 id，值为节点在数组中的索引
    node.id = key
    // 根据 pathList 是否为空，设置当前节点的 parentId。如果 pathList 不为空，则取 pathList 的最后一个元素作为 parentId；否则，parentId 为 null。
    node.parentId = pathList ? pathList[pathList.length - 1] : null
    node.pathList = [...pathList]
    // 将当前节点id 添加到 pathList 中
    node.pathList.push(node.id)
    const hasChildren = node.children && node.children.length > 0
    if (hasChildren) {
      //当前节点有子节点，递归处理
      buildHierachyTree(node.children, node.pathList)
    }
  }
  return tree
}

/**
 * @description 构造树型结构数据
 * @param data 数据源
 * @param id 可选参数，字符串类型，代表数据项中唯一标识的属性名，默认值为 "id"。
 * @param parentId 可选参数，字符串类型，代表数据项中父节点标识的属性名，默认值为 "parentId"。
 * @param children 可选参数，字符串类型，代表转换后树形结构中存储子节点的属性名，默认值为 "children"。
 * @returns 追加字段后的树
 */
export const handleTree = (data: any[], id?: string, parentId?: string, children?: string): any => {
  if (!Array.isArray(data)) {
    console.warn('data must be an array')
    return []
  }
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }

  // 用于存储每个父节点 ID 对应的子节点数组。
  const childrenListMap: any = {}
  // 用于存储每个节点 ID 对应的节点数据。
  const nodeIds: any = {}
  const tree = []

  // 数据处理和映射构建
  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  // 查找根节点
  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o: Record<string, any>) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}
