const Mock = require("mockjs");
const searchList = require('../src/constant/search')
module.exports = [
    // 删除请求
    {
        url: "/search/foods",
        type: "get",

        response: (config) => {
            // console.log(config);
            return { success: true, message: "", data: searchList };
        },
    },
] 