import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Features",
    icon: "star",
    link: "/features/",
  },
  {
    text: "Products",
    icon: "shopping-cart",
    link: "/products/",
  },
]);
