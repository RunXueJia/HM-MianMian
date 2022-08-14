const Mock = require("mockjs");

module.exports = [
  {
    url: "/vue-admin-template/journal",
    type: "get",
    response: (config) => {
      const { pagesize } = config.query;
      return {
        message: "",
        success: true,
        data: Mock.mock({
          total: 100,
          ["list|" + pagesize]: [
            {
              type: "@string('upper', 2, 2)",
              name: "@cname",
              result: "@cparagraph(1)",
              create_time: "@datetime()",
              describe: "@float(60, 100, 2,2)",
            },
          ],
        }),
      };
    },
  },
];
