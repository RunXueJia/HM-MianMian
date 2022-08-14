import Layout from "@/layout";
export default {
      path: "/subjects",
      name: "subjects",
      component: Layout,
      meta: { title: "学科管理", icon: "xueke" },
      redirect: "/subjects/list",
      children: [
            {
                  path: "/subjects/list",
                  name: "subjects-list",

                  component: () => import("@/views/subjects/list"),
                  meta: { title: "学科", icon: "tree" },
            },
            {
                  path: "/subjects/directorys",

                  name: "subjects-directorys",


                  component: () => import("@/views/subjects/directorys"),
                  meta: { title: "目录", icon: "tree" },
            },
            {
                  path: "/subjects/tags",

                  name: "subjects-tags",


                  component: () => import("@/views/subjects/tags"),
                  meta: { title: "标签", icon: "tree" },
            },
      ],
};

