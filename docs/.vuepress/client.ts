import { defineClientConfig } from "vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import ProductCard from "./components/ProductCard.vue";
import ProductGrid from "./components/ProductGrid.vue";
import FeaturedProducts from "./components/FeaturedProducts.vue";

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      new Date("2022-01-01"),
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      },
      true,
    );
    setupTransparentNavbar({ type: "homepage" });
  },
  enhance({ app }) {
    app.component("ProductCard", ProductCard);
    app.component("ProductGrid", ProductGrid);
    app.component("FeaturedProducts", FeaturedProducts);
  },
});
