import Layout from "@/layout";
export default {
      path: "/questions",
      name: "questions",
      component: Layout,

      meta: { title: "题库管理", icon: "tiku" },
      redirect: "/questions/list",
      children: [
            {
                  path: "/questions/list",

                  name: "questions-list",


                  component: () => import("@/views/questions/list"),
                  meta: { title: "基础题库", icon: "tree" },
            },
            {
                  path: "/questions/choice",

                  name: "questions-choice",


                  component: () => import("@/views/questions/choice"),
                  meta: { title: "精选题库", icon: "tree" },
            },
            {
                  path: "/questions/new",

                  name: "questions-new",


                  component: () => import("@/views/questions/new"),
                  meta: { title: "试题录入", icon: "tree" },
            },
            {
                  path: "/questions/randoms",

                  name: "questions-randoms",


                  component: () => import("@/views/questions/randoms"),
                  meta: { title: "组题列表", icon: "tree" },
            },
      ],
};

