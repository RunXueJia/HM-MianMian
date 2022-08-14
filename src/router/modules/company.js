import Layout from "@/layout";

export default {
  path: "/companys",
  name: "company",
  component: Layout,
  meta: { title: "企业管理", icon: "qiye" },
  redirect: "/companys/list",
  children: [
    {
      path: "/companys/list",
      name: "company",
      component: () => import("@/views/company"),
      meta: { title: "企业管理", icon: "qiye" },
    },
  ],
};
