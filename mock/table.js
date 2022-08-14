const Mock = require('mockjs');
const data = Mock.mock({
  'items|100': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
// console.log(data);

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]



module.exports = [
  {
    url: '/vue-admin-template/log/list',
    type: 'get',
    response: (config) => {
      // console.log(config);
      const { page = 1, pagesize = 5 } = config.query
      // console.log(page, pagesize);
      return {
        message: "",
        success: true,
        data: Mock.mock({
          page: page,
          pages: Math.ceil(100 / pagesize),
          total: 100,
          ["list|" + pagesize]: [
            {
              name: '@cname',
              desc: '@cparagraph',
              time: '@datetime',
              'number|1-100.1-10': 1,
              "array|1": [
                "US",
                "CH",
                "EN",
                "JP",
                'CO'
              ]
            }
          ]
        })
      }
    }
  },
  {
    url: "/vue-admin-template/index/hot",
    type: "get",
    response: (config) => {
      const { page = 1, pagesize = 8 } = config.query
      const res = Mock.mock({
        page: page,
        total: 400,
        ['data|' + pagesize]: [{
          ser: '@integer(1, 8)',
          title: '关键词搜索' + '-' + '@integer(1, 8)',
          num: '@integer(370, 710)',
          week: '@integer(50, 90)' + '%'
        }]
      })
      // console.log(res);
      return res
    }
  },
  {
    url: "/get/ranking/list",
    type: 'get',
    response: (config) => {
      const items = Mock.mock({
        'items|8': [{
          title: '工专路' + '@integer(1, 9)' + '号店',
          num: '@integer(100, 350)' + ',' + '@integer(100,350)'
        }]
      })
      // console.log(items);
      // console.log(1111);
      return items
    }
  },
  {
    url: "/goods/RadarChart",
    type: 'get',
    response: (config) => {
      let RadarChart = Mock.mock({
        "data|3": [
          {
            "value|6": ['@integer(10, 50)'], //生成10-50的数
            "name|1": '@ctitle(3, 5)',
          }
        ]
      })
      // console.log(11111);
      // console.log(data);
      return RadarChart
      // 雷达图
    }
  },
  {
    url: "/goods/goodAll",
    type: 'get',
    response: (config) => {
      let data = Mock.mock({
        "data|6": [ //生成6条数据 数组
          {
            "value|100-300": 30, //随机生成商品价格 在100-300之间
            "name|1": '@ctitle(3, 5)', //随机生成3-5个字符
            "label|+1": {
              color: "#35eaee",
              color: "#b6a2de",
              color: "#5ab1ef",
              color: "#ffb980",
              color: "#d87a80",

            }, //顺序生成color
          }
        ]
      })
      return data
    }
  },
  {
    url: "/goods/Histogram",
    type: 'get',
    response: (config) => {
      let Histogram = Mock.mock({
        "data|3": [
          {
            "value|7": ['@integer(10, 400)'],
          }
        ]
      })
      return Histogram
    }
  },
  {
    url: "/goods/Number",
    type: 'get',
    response: (config) => {
      let Number = Mock.mock({
        'two|1': '￥' + '@integer(10, 100)' + ',' + '@integer(100, 999)',
      })
      return Number
    }
  },
  {
    url: "/goods/shuju",
    type: 'get',
    response: (config) => {
      let data = Mock.mock({
        'color|2': ['@color'],
        'color1|2': ['@color'],
        data: {
          "value|14": ['@integer(10, 200)'],
          "value1|14": ['@integer(10, 200)'],
          "value2|14": ['@integer(10, 200)'],
          "value3|14": ['@integer(10, 200)'],
        }
      })
      // console.log(data);
      return data
    }
  }
]