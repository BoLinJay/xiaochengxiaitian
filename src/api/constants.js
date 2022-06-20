// 初始化分类名称
export const Initcategory = [
    {
        id: 1,
        name: '居家'
    },
    {
        id:2,
        name:'美食'
    },
    {
        id:3,
        name:'服饰'
    },
    {
        id:6,
        name:'母婴'
    },
    {
        id:8,
        name:'个护'
    },
    {
        id:9,
        name:'严选'
    },
    {
        id:7,
        name: '数码'
    },
    {
        id:8,
        name:'运动'
    },
    {
        id:9,
        name:'杂货'
    }
]

// 订单状态
export const orderStatus = [
    { name: 'all', label: '全部订单' },
    { name: 'unpay', label: '待付款' },
    { name: 'deliver', label: '待发货' },
    { name: 'receive', label: '待收货' },
    { name: 'comment', label: '待评价' },
    { name: 'complete', label: '已完成' },
    { name: 'cancel', label: '已取消' }
  ]

  export const cancelReason = [
    '配送信息有误',
    '商品买错了',
    '重复下单/误下单',
    '忘记使用优惠券、兔币等',
    '其他渠道价格更低',
    '不想买了'
  ]