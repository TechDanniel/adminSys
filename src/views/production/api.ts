import { getList } from '@/http/api/production'
import { CardItem } from '@/components/waterflow/util'

export function randomId(length = 6) {
  // 调用 Math.random() 生成一个 0 到 1 之间的随机小数。
  //把这个随机小数转换为字符串，并且截取从第 3 个字符开始长度为 length 的子字符串。
  return Number(Math.random().toString().substring(3, length) + Date.now()).toString(36)
}

const COLORS = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']

function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomColor() {
  return COLORS[getRandomNum(0, 4)]
}

export const listData = async (): Promise<CardItem[]> => {
  return getList().then(({ data }) => {
    return data.items.map(i => ({
      id: i.id,
      width: i.note_card.cover.width,
      height: i.note_card.cover.height,
      title: i.note_card.display_title,
      author: i.note_card.user.nickname,
      bgColor: randomColor()
    }))
  })
}
