const Mock = require("mockjs");

module.exports = [
  // 列表请求
  {
    url: "/HeiMaMianMian/cate",
    type: "get",
    response: (config) => {
      const { pageNum = 1, pageSize = 10 } = config.query;
      return {
        success: true,
        message: "",
        data: Mock.mock({
          total: 1000,
          ["list|" + pageSize]: [{ "id|+1": 1, title: "@cname" }],
        }),
      };
    },
  },
  // 查询单个请求
  {
    url: "/vue-admin-template/cate/:id",
    type: "get",
    response: (config) => {
      if (!config.params.id) return { success: false, message: "请传入ID" };
      return { "id|+1": 1, title: "@cname" };
    },
  },
  // 新增请求
  {
    url: "/vue-admin-template/cate",
    type: "post",
    response: (config) => {
      const { title } = config.body;
      if (!title) return { success: false, message: "请传入title" };
      return { success: true, message: "", data: "" };
    },
  },
  // 修改请求
  {
    url: "/vue-admin-template/cate/:id",
    type: "put",
    response: (config) => {
      const { title, id } = config.body;
      if (!config.params.id) return { success: false, message: "请传入ID" };
      if (!title) return { success: false, message: "请传入title" };
      if (!id) return { success: false, message: "请传入id" };
      return { success: true, message: "", data: "" };
    },
  },
  // 删除请求
  {
    url: "/vue-admin-template/cate/:id",
    type: "delete",
    response: (config) => {
      if (!config.params.id) return { success: false, message: "请传入ID" };
      return { success: true, message: "", data: "" };
    },
  },
];
