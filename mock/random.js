const Mock = require("mockjs");

module.exports = [
    // 列表请求
    {
        url: "/questions/randoms",
        type: "get",
        response: (config) => {
            let { counts, keyword, page = 1, pagesize = 10 } = config.query;
            let randomId = /[a-z][0-9]{17}/
            let isaz = /[a-z]/
            let quetionsId = /[a-z][A-Z][0-9]{18}/
            const questionType = /[1-3]{1}/
            if (keyword && (!isaz.test(keyword) || keyword.length > 1)) {//模拟有搜索词但没有数据的情况
                return {
                    success: true,
                    message: "暂无数据",
                    data: {}
                }
            } else if (keyword && isaz.test(keyword)) {  //模拟有搜索词并且有数据
                const length = 17 - keyword.length
                randomId = new RegExp(`${keyword}[0-9]{${length}}$`)
            }
            if (counts / pagesize < page) {
                pagesize = counts % pagesize   //模拟最后一页
            }
            return {
                success: counts,
                message: "",
                counts: counts,
                page: page,
                pages: Math.ceil(counts / pagesize),

                data: Mock.mock({
                    ["items|" + pagesize]: [{
                        "randomId": randomId,
                        'questionType': questionType,
                        "list|2-5": [
                            {
                                'number': quetionsId,
                                'id|19-25': 25
                            }
                        ],
                        'addDate': '@datetime()',
                        'answerDate|30-90': 90,
                        'Accuracy|0-100': 100,
                        'username': '@cname',
                    }],
                }),
            };
        },
    },

    // 删除请求
    {
        url: "/questions/randoms",
        type: "delete",

        response: (config) => {
            console.log(config);
            if (!config.query.id) return { success: false, message: "请传入ID" };
            return { success: true, message: "", data: "" };
        },
    },
];