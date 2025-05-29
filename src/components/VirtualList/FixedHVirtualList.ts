//定义一个类用于初始化定高的虚拟列表
//传入列表的容器和列表选择器，以及列表的数据源，初始化虚拟列表渲染到页面
export default class FixedHVirtualList {
  state = {
    data: [] as object[],
    itemHeight: 25,
    ViewHeight: 0,
    MaxCount: 0
  }
  startIndex = 0
  latestStartIndex = 0
  scrollStyle = {
    height: '0px',
    transform: 'translate3d(0px,0px,0px)'
  }
  endIndex = 0
  renderList = [] as any[]
  oContainer: HTMLElement
  oList: HTMLElement
  constructor(container: HTMLElement, list: HTMLElement, dataSource: object[]) {
    this.oContainer = container
    this.oList = list
    this.state.data = dataSource
  }

  handleScroll() {
    const fn = () => {
      this.computedStartIndex() // 更新 startIndex
      if (this.startIndex !== this.latestStartIndex) {
        this.render()
        //保存上一次的startIndex
        this.latestStartIndex = this.startIndex
      }
    }
    this.oContainer.addEventListener('scroll', this.rafThrottle(fn).bind(this)) // 确保 this 指向正确
  }

  rafThrottle<F extends (...args: any[]) => any>(fn: F): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
    let lock = false
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      window.requestAnimationFrame(() => {
        if (lock) return
        lock = true
        fn.apply(this, args)
        lock = false
      })
    }
  }

  render() {
    this.computedStartIndex()
    this.computedEndIndex()
    this.computedRenderList()
    this.computedScrollStyle()

    console.log('开始索引', this.startIndex, '结束索引', this.endIndex)

    // 清空列表内容
    const tbody = this.oList.querySelector('tbody')!
    tbody.innerHTML = ''

    this.renderList.forEach(item => {
      const row = document.createElement('tr')
      row.innerHTML = `
                <td style="height:25px">${item.user_id}</td>
                <td style="height:25px"><img src="${item.user_avatar}" alt="avatar" width="30"></td>
                <td style="height:25px">${item.user_name}</td>
                <td style="height:25px">${item.user_nickname}</td>
                <td style="height:25px">${item.gender}</td>
                <td style="height:25px">${item.department}</td>
                <td style="height:25px">${item.phone_number}</td>
            `
      tbody.appendChild(row)
    })
    const { height, transform } = this.scrollStyle
    this.oList.style.height = height
    this.oList.style.transform = transform
  }

  computedStartIndex() {
    this.startIndex = Math.floor(this.oContainer.scrollTop / this.state.itemHeight)
  }

  computedEndIndex() {
    const end = this.startIndex + this.state.MaxCount
    this.endIndex = end < this.state.data.length ? end : this.state.data.length
  }

  computedRenderList() {
    this.renderList = this.state.data.slice(this.startIndex, this.endIndex)
  }

  computedScrollStyle() {
    this.scrollStyle = {
      height: `${this.state.data.length * this.state.itemHeight - this.startIndex * this.state.itemHeight}px`,
      transform: `translate3d(0, ${this.startIndex * this.state.itemHeight}px, 0)`
    }
  }

  init() {
    this.state.ViewHeight = this.oContainer.offsetHeight
    this.state.MaxCount = Math.ceil(this.state.ViewHeight / this.state.itemHeight) + 1
    console.log(this.state.MaxCount, '个数')
    this.render()
    this.handleScroll()
  }
}
