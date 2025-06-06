import GroupLine from '@iconify-icons/ri/group-line'
import Question from '@iconify-icons/ri/question-answer-line'
import CheckLine from '@iconify-icons/ri/chat-check-line'
import Smile from '@iconify-icons/ri/star-smile-line'

/** 需求人数、提问数量、解决数量、用户满意度 */
const charData = [
  {
    icon: GroupLine,
    bgColor: '#effaff',
    color: '#41b6ff',
    //动画持续时间
    duration: 2200,
    name: '需求人数',
    value: 36000,
    percent: '+88%',
    data: [2101, 5288, 4239, 4962, 6752, 5208, 7450] // 平滑折线图数据
  },
  {
    icon: Question,
    bgColor: '#fff5f4',
    color: '#e85f33',
    duration: 1600,
    name: '提问数量',
    value: 16580,
    percent: '+70%',
    data: [2216, 1148, 1255, 788, 4821, 1973, 4379]
  },
  {
    icon: CheckLine,
    bgColor: '#eff8f4',
    color: '#26ce83',
    duration: 1500,
    name: '解决数量',
    value: 16499,
    percent: '+99%',
    data: [861, 1002, 3195, 1715, 3666, 2415, 3645]
  },
  {
    icon: Smile,
    bgColor: '#f6f4fe',
    color: '#7846e5',
    duration: 100,
    name: '用户满意度',
    value: 100,
    percent: '+100%',
    data: [100]
  }
]

/** 解决概率 */
const progressData = [
  {
    week: '周一',
    percentage: 85,
    duration: 110,
    color: '#41b6ff'
  },
  {
    week: '周二',
    percentage: 86,
    duration: 105,
    color: '#41b6ff'
  },
  {
    week: '周三',
    percentage: 88,
    duration: 100,
    color: '#41b6ff'
  },
  {
    week: '周四',
    percentage: 89,
    duration: 95,
    color: '#41b6ff'
  },
  {
    week: '周五',
    percentage: 94,
    duration: 90,
    color: '#26ce83'
  },
  {
    week: '周六',
    percentage: 96,
    duration: 85,
    color: '#26ce83'
  },
  {
    week: '周日',
    percentage: 100,
    duration: 80,
    color: '#26ce83'
  }
].reverse()

/** 分析概览 */
const barChartData = [
  {
    requireData: [2101, 5288, 4239, 4962, 6752, 5208, 7450],
    questionData: [2216, 1148, 1255, 1788, 4821, 1973, 4379]
  },
  {
    requireData: [2101, 3280, 4400, 4962, 5752, 6889, 7600],
    questionData: [2116, 3148, 3255, 3788, 4821, 4970, 5390]
  }
]

export { charData, progressData, barChartData }
