import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "功能",
    icon: "star",
    link: "/zh/features/",
  },
  {
    text: "产品",
    icon: "shopping-cart",
    link: "/zh/products/",
  },
]);
