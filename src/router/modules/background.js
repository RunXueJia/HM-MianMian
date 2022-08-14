import Layout from "@/layout";

export default {
      path: "/base",
      name: "base",
      component: Layout,
      meta: { title: "后台管理", icon: "houtai" },
      redirect: "/base/users",
      children: [
            {
                  path: "/base/users",

                  name: "base-users",

                  component: () => import("@/views/background/user"),
                  meta: { title: "用户", icon: "tree" },
            },
            {
                  path: "/base/menus",

                  name: "base-menus",

                  component: () => import("@/views/background/menu"),
                  meta: { title: "菜单", icon: "tree" },
            },
            {
                  path: "/base/permissions",

                  name: "base-permissions",

                  component: () => import("@/views/background/permission"),
                  meta: { title: "权限", icon: "tree" },
            },
            {
                  path: "/base/logs",

                  name: "base-logs",

                  component: () => import("@/views/background/journal"),
                  meta: { title: "日志", icon: "tree" },
            },
      ],
};
