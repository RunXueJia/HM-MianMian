import Layout from "@/layout";

export default {
  path: "/articles",
  name: "articles",
  component: Layout,
  meta: { title: "面试技巧", icon: "mianshi" },
  redirect: "/articles/list",
  children: [
    {
      path: "/articles/list",
      name: "articles",
      component: () => import("@/views/articles"),
      meta: { title: "面试技巧", icon: "mianshi" },
    },
  ],
};
