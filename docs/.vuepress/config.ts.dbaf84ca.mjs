// docs/.vuepress/config.ts
import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

// docs/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// docs/.vuepress/navbar/en.ts
import { navbar } from "vuepress-theme-hope";
var enNavbar = navbar([
  "/",
  "/portfolio",
  "/demo/",
  {
    text: "Guide",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "#" }]
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "#" }]
      }
    ]
  },
  {
    text: "Products",
    icon: "shopping-cart",
    link: "/products/"
  },
  {
    text: "V2 Docs",
    icon: "book",
    link: "https://theme-hope.vuejs.press/"
  }
]);

// docs/.vuepress/navbar/zh.ts
import { navbar as navbar2 } from "vuepress-theme-hope";
var zhNavbar = navbar2([
  "/zh/",
  "/zh/portfolio",
  "/zh/demo/",
  {
    text: "\u6307\u5357",
    icon: "lightbulb",
    prefix: "/zh/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }]
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }]
      }
    ]
  },
  {
    text: "\u4EA7\u54C1",
    icon: "shopping-cart",
    link: "/zh/products/"
  },
  {
    text: "V2 \u6587\u6863",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/"
  }
]);

// docs/.vuepress/sidebar/en.ts
import { sidebar } from "vuepress-theme-hope";
var enSidebar = sidebar({
  "/": [
    "",
    "portfolio",
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "guide/",
      children: "structure"
    },
    {
      text: "Slides",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html"
    }
  ]
});

// docs/.vuepress/sidebar/zh.ts
import { sidebar as sidebar2 } from "vuepress-theme-hope";
var zhSidebar = sidebar2({
  "/zh/": [
    "",
    "portfolio",
    {
      text: "\u6848\u4F8B",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "\u6587\u6863",
      icon: "book",
      prefix: "guide/",
      children: "structure"
    },
    {
      text: "\u5E7B\u706F\u7247",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html"
    }
  ]
});

// docs/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://your.domain",
  author: {
    name: "Your name",
    url: "https://your.domain"
  },
  logo: "https://theme-hope-assets.vuejs.press/logo.svg",
  repo: "vuepress-theme-hope/online-demo",
  docsDir: "docs",
  locales: {
    "/": {
      // Navbar
      navbar: enNavbar,
      // Sidebar
      sidebar: enSidebar,
      footer: "Default footer",
      displayFooter: true,
      metaLocales: {
        editLink: "Edit this page on GitHub"
      }
    },
    /**
     * Chinese locale config
     */
    "/zh/": {
      // Navbar
      navbar: zhNavbar,
      // Sidebar
      sidebar: zhSidebar,
      footer: "\u9ED8\u8BA4\u9875\u811A",
      displayFooter: true,
      // Page meta
      metaLocales: {
        editLink: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
      }
    }
  },
  encrypt: {
    config: {
      "/demo/encrypt.html": {
        password: ["1234"],
        hint: "Password is 1234"
      },
      "/zh/demo/encrypt.html": {
        password: ["1234"],
        hint: "\u5BC6\u7801\u662F 1234"
      }
    }
  },
  markdown: {
    align: true,
    attrs: true,
    component: true,
    demo: true,
    include: true,
    mark: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended"
            };
        }
      }
    ],
    sub: true,
    sup: true,
    tasklist: true,
    vPre: true,
    figure: true,
    imgLazyload: true,
    imgSize: true,
    tabs: true,
    codeTabs: true
    // install katex or before enabling it
    // math: {
    //   type: "katex" // or "mathjax"
    // },
    // install chart.js before enabling it
    // chartjs: true,
    // install echarts before enabling it
    // echarts: true,
    // install flowchart.ts before enabling it
    // flowchart: true,
    // gfm requires mathjax-full to provide tex support
    // gfm: true,
    // install mermaid before enabling it
    // mermaid: true,
    // playground: {
    //   presets: ["ts", "vue"],
    // },
    // install @vue/repl before enabling it
    // vuePlayground: true,
    // install @vuepress/plugin-revealjs before enabling it
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
  plugins: {
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69"
    },
    components: {
      components: ["Badge", "VPCard"]
    },
    icon: {
      assets: "fontawesome-with-brands"
    }
    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
  }
});

// docs/.vuepress/config.ts
var config_default = defineUserConfig({
  base: "/",
  dest: "./dist",
  locales: {
    "/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs demo for vuepress-theme-hope"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "\u6587\u6863\u6F14\u793A",
      description: "vuepress-theme-hope \u7684\u6587\u6863\u6F14\u793A"
    }
  },
  bundler: viteBundler(),
  theme: theme_default
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL3RoZW1lLnRzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci9lbi50cyIsICJkb2NzLy52dWVwcmVzcy9uYXZiYXIvemgudHMiLCAiZG9jcy8udnVlcHJlc3Mvc2lkZWJhci9lbi50cyIsICJkb2NzLy52dWVwcmVzcy9zaWRlYmFyL3poLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlQnVuZGxlciB9IGZyb20gXCJAdnVlcHJlc3MvYnVuZGxlci12aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSBcInZ1ZXByZXNzXCI7XG5cbmltcG9ydCB0aGVtZSBmcm9tIFwiLi90aGVtZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVVc2VyQ29uZmlnKHtcbiAgYmFzZTogXCIvXCIsXG5cbiAgZGVzdDogXCIuL2Rpc3RcIixcblxuICBsb2NhbGVzOiB7XG4gICAgXCIvXCI6IHtcbiAgICAgIGxhbmc6IFwiZW4tVVNcIixcbiAgICAgIHRpdGxlOiBcIkRvY3MgRGVtb1wiLFxuICAgICAgZGVzY3JpcHRpb246IFwiQSBkb2NzIGRlbW8gZm9yIHZ1ZXByZXNzLXRoZW1lLWhvcGVcIixcbiAgICB9LFxuICAgIFwiL3poL1wiOiB7XG4gICAgICBsYW5nOiBcInpoLUNOXCIsXG4gICAgICB0aXRsZTogXCJcdTY1ODdcdTY4NjNcdTZGMTRcdTc5M0FcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcInZ1ZXByZXNzLXRoZW1lLWhvcGUgXHU3Njg0XHU2NTg3XHU2ODYzXHU2RjE0XHU3OTNBXCIsXG4gICAgfSxcbiAgfSxcblxuICBidW5kbGVyOiB2aXRlQnVuZGxlcigpLFxuXG4gIHRoZW1lLFxuXG4gIC8vIEVuYWJsZSBpdCB3aXRoIHB3YVxuICAvLyBzaG91bGRQcmVmZXRjaDogZmFsc2UsXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzcy90aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L2RvY3MvLnZ1ZXByZXNzL3RoZW1lLnRzXCI7aW1wb3J0IHsgaG9wZVRoZW1lIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuaW1wb3J0IHsgZW5OYXZiYXIsIHpoTmF2YmFyIH0gZnJvbSBcIi4vbmF2YmFyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBlblNpZGViYXIsIHpoU2lkZWJhciB9IGZyb20gXCIuL3NpZGViYXIvaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgaG9wZVRoZW1lKHtcbiAgaG9zdG5hbWU6IFwiaHR0cHM6Ly95b3VyLmRvbWFpblwiLFxuXG4gIGF1dGhvcjoge1xuICAgIG5hbWU6IFwiWW91ciBuYW1lXCIsXG4gICAgdXJsOiBcImh0dHBzOi8veW91ci5kb21haW5cIixcbiAgfSxcblxuICBsb2dvOiBcImh0dHBzOi8vdGhlbWUtaG9wZS1hc3NldHMudnVlanMucHJlc3MvbG9nby5zdmdcIixcblxuICByZXBvOiBcInZ1ZXByZXNzLXRoZW1lLWhvcGUvb25saW5lLWRlbW9cIixcblxuICBkb2NzRGlyOiBcImRvY3NcIixcblxuICBsb2NhbGVzOiB7XG4gICAgXCIvXCI6IHtcbiAgICAgIC8vIE5hdmJhclxuICAgICAgbmF2YmFyOiBlbk5hdmJhcixcblxuICAgICAgLy8gU2lkZWJhclxuICAgICAgc2lkZWJhcjogZW5TaWRlYmFyLFxuXG4gICAgICBmb290ZXI6IFwiRGVmYXVsdCBmb290ZXJcIixcblxuICAgICAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICAgICAgbWV0YUxvY2FsZXM6IHtcbiAgICAgICAgZWRpdExpbms6IFwiRWRpdCB0aGlzIHBhZ2Ugb24gR2l0SHViXCIsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGluZXNlIGxvY2FsZSBjb25maWdcbiAgICAgKi9cbiAgICBcIi96aC9cIjoge1xuICAgICAgLy8gTmF2YmFyXG4gICAgICBuYXZiYXI6IHpoTmF2YmFyLFxuXG4gICAgICAvLyBTaWRlYmFyXG4gICAgICBzaWRlYmFyOiB6aFNpZGViYXIsXG5cbiAgICAgIGZvb3RlcjogXCJcdTlFRDhcdThCQTRcdTk4NzVcdTgxMUFcIixcblxuICAgICAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICAgICAgLy8gUGFnZSBtZXRhXG4gICAgICBtZXRhTG9jYWxlczoge1xuICAgICAgICBlZGl0TGluazogXCJcdTU3MjggR2l0SHViIFx1NEUwQVx1N0YxNlx1OEY5MVx1NkI2NFx1OTg3NVwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIGVuY3J5cHQ6IHtcbiAgICBjb25maWc6IHtcbiAgICAgIFwiL2RlbW8vZW5jcnlwdC5odG1sXCI6IHtcbiAgICAgICAgcGFzc3dvcmQ6IFtcIjEyMzRcIl0sXG4gICAgICAgIGhpbnQ6IFwiUGFzc3dvcmQgaXMgMTIzNFwiLFxuICAgICAgfSxcbiAgICAgIFwiL3poL2RlbW8vZW5jcnlwdC5odG1sXCI6IHtcbiAgICAgICAgcGFzc3dvcmQ6IFtcIjEyMzRcIl0sXG4gICAgICAgIGhpbnQ6IFwiXHU1QkM2XHU3ODAxXHU2NjJGIDEyMzRcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBtYXJrZG93bjoge1xuICAgIGFsaWduOiB0cnVlLFxuICAgIGF0dHJzOiB0cnVlLFxuICAgIGNvbXBvbmVudDogdHJ1ZSxcbiAgICBkZW1vOiB0cnVlLFxuICAgIGluY2x1ZGU6IHRydWUsXG4gICAgbWFyazogdHJ1ZSxcbiAgICBzcG9pbGVyOiB0cnVlLFxuICAgIHN0eWxpemU6IFtcbiAgICAgIHtcbiAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1lbmRlZFwiLFxuICAgICAgICByZXBsYWNlcjogKHsgdGFnIH0pID0+IHtcbiAgICAgICAgICBpZiAodGFnID09PSBcImVtXCIpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0YWc6IFwiQmFkZ2VcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0aXBcIiB9LFxuICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICAgIHN1YjogdHJ1ZSxcbiAgICBzdXA6IHRydWUsXG4gICAgdGFza2xpc3Q6IHRydWUsXG4gICAgdlByZTogdHJ1ZSxcbiAgICBmaWd1cmU6IHRydWUsXG4gICAgaW1nTGF6eWxvYWQ6IHRydWUsXG4gICAgaW1nU2l6ZTogdHJ1ZSxcbiAgICB0YWJzOiB0cnVlLFxuICAgIGNvZGVUYWJzOiB0cnVlLFxuXG4gICAgLy8gaW5zdGFsbCBrYXRleCBvciBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAvLyBtYXRoOiB7XG4gICAgLy8gICB0eXBlOiBcImthdGV4XCIgLy8gb3IgXCJtYXRoamF4XCJcbiAgICAvLyB9LFxuXG4gICAgLy8gaW5zdGFsbCBjaGFydC5qcyBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAvLyBjaGFydGpzOiB0cnVlLFxuXG4gICAgLy8gaW5zdGFsbCBlY2hhcnRzIGJlZm9yZSBlbmFibGluZyBpdFxuICAgIC8vIGVjaGFydHM6IHRydWUsXG5cbiAgICAvLyBpbnN0YWxsIGZsb3djaGFydC50cyBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAvLyBmbG93Y2hhcnQ6IHRydWUsXG5cbiAgICAvLyBnZm0gcmVxdWlyZXMgbWF0aGpheC1mdWxsIHRvIHByb3ZpZGUgdGV4IHN1cHBvcnRcbiAgICAvLyBnZm06IHRydWUsXG5cbiAgICAvLyBpbnN0YWxsIG1lcm1haWQgYmVmb3JlIGVuYWJsaW5nIGl0XG4gICAgLy8gbWVybWFpZDogdHJ1ZSxcblxuICAgIC8vIHBsYXlncm91bmQ6IHtcbiAgICAvLyAgIHByZXNldHM6IFtcInRzXCIsIFwidnVlXCJdLFxuICAgIC8vIH0sXG5cbiAgICAvLyBpbnN0YWxsIEB2dWUvcmVwbCBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAvLyB2dWVQbGF5Z3JvdW5kOiB0cnVlLFxuXG4gICAgLy8gaW5zdGFsbCBAdnVlcHJlc3MvcGx1Z2luLXJldmVhbGpzIGJlZm9yZSBlbmFibGluZyBpdFxuICAgIC8vIHJldmVhbGpzOiB7XG4gICAgLy8gICBwbHVnaW5zOiBbXCJoaWdobGlnaHRcIiwgXCJtYXRoXCIsIFwic2VhcmNoXCIsIFwibm90ZXNcIiwgXCJ6b29tXCJdLFxuICAgIC8vIH0sXG4gIH0sXG5cbiAgcGx1Z2luczoge1xuICAgIC8vIFlvdSBzaG91bGQgZ2VuZXJhdGUgYW5kIHVzZSB5b3VyIG93biBjb21tZW50IHNlcnZpY2VcbiAgICBjb21tZW50OiB7XG4gICAgICBwcm92aWRlcjogXCJHaXNjdXNcIixcbiAgICAgIHJlcG86IFwidnVlcHJlc3MtdGhlbWUtaG9wZS9naXNjdXMtZGlzY3Vzc2lvbnNcIixcbiAgICAgIHJlcG9JZDogXCJSX2tnRE9HX1B0MkFcIixcbiAgICAgIGNhdGVnb3J5OiBcIkFubm91bmNlbWVudHNcIixcbiAgICAgIGNhdGVnb3J5SWQ6IFwiRElDX2t3RE9HX1B0Mk00Q09ENjlcIixcbiAgICB9LFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgY29tcG9uZW50czogW1wiQmFkZ2VcIiwgXCJWUENhcmRcIl0sXG4gICAgfSxcblxuICAgIGljb246IHtcbiAgICAgIGFzc2V0czogXCJmb250YXdlc29tZS13aXRoLWJyYW5kc1wiLFxuICAgIH0sXG5cbiAgICAvLyB1bmNvbW1lbnQgdGhlc2UgaWYgeW91IHdhbnQgYSBwd2FcbiAgICAvLyBwd2E6IHtcbiAgICAvLyAgIGZhdmljb246IFwiL2Zhdmljb24uaWNvXCIsXG4gICAgLy8gICBjYWNoZUhUTUw6IHRydWUsXG4gICAgLy8gICBjYWNoZUltYWdlOiB0cnVlLFxuICAgIC8vICAgYXBwZW5kQmFzZTogdHJ1ZSxcbiAgICAvLyAgIGFwcGxlOiB7XG4gICAgLy8gICAgIGljb246IFwiL2Fzc2V0cy9pY29uL2FwcGxlLWljb24tMTUyLnBuZ1wiLFxuICAgIC8vICAgICBzdGF0dXNCYXJDb2xvcjogXCJibGFja1wiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1zVGlsZToge1xuICAgIC8vICAgICBpbWFnZTogXCIvYXNzZXRzL2ljb24vbXMtaWNvbi0xNDQucG5nXCIsXG4gICAgLy8gICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBtYW5pZmVzdDoge1xuICAgIC8vICAgICBpY29uczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stMTkyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTUxMi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIHNob3J0Y3V0czogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiRGVtb1wiLFxuICAgIC8vICAgICAgICAgc2hvcnRfbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICB1cmw6IFwiL2RlbW8vXCIsXG4gICAgLy8gICAgICAgICBpY29uczogW1xuICAgIC8vICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9ndWlkZS1tYXNrYWJsZS5wbmdcIixcbiAgICAvLyAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICBdLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3QvZG9jcy8udnVlcHJlc3MvbmF2YmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L2RvY3MvLnZ1ZXByZXNzL25hdmJhci9lbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L2RvY3MvLnZ1ZXByZXNzL25hdmJhci9lbi50c1wiO2ltcG9ydCB7IG5hdmJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBjb25zdCBlbk5hdmJhciA9IG5hdmJhcihbXG4gIFwiL1wiLFxuICBcIi9wb3J0Zm9saW9cIixcbiAgXCIvZGVtby9cIixcbiAge1xuICAgIHRleHQ6IFwiR3VpZGVcIixcbiAgICBpY29uOiBcImxpZ2h0YnVsYlwiLFxuICAgIHByZWZpeDogXCIvZ3VpZGUvXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJCYXJcIixcbiAgICAgICAgaWNvbjogXCJsaWdodGJ1bGJcIixcbiAgICAgICAgcHJlZml4OiBcImJhci9cIixcbiAgICAgICAgY2hpbGRyZW46IFtcImJhelwiLCB7IHRleHQ6IFwiLi4uXCIsIGljb246IFwiZWxsaXBzaXNcIiwgbGluazogXCIjXCIgfV0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkZvb1wiLFxuICAgICAgICBpY29uOiBcImxpZ2h0YnVsYlwiLFxuICAgICAgICBwcmVmaXg6IFwiZm9vL1wiLFxuICAgICAgICBjaGlsZHJlbjogW1wicmF5XCIsIHsgdGV4dDogXCIuLi5cIiwgaWNvbjogXCJlbGxpcHNpc1wiLCBsaW5rOiBcIiNcIiB9XSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiUHJvZHVjdHNcIixcbiAgICBpY29uOiBcInNob3BwaW5nLWNhcnRcIixcbiAgICBsaW5rOiBcIi9wcm9kdWN0cy9cIixcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiVjIgRG9jc1wiLFxuICAgIGljb246IFwiYm9va1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly90aGVtZS1ob3BlLnZ1ZWpzLnByZXNzL1wiLFxuICB9LFxuXSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3QvZG9jcy8udnVlcHJlc3MvbmF2YmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L2RvY3MvLnZ1ZXByZXNzL25hdmJhci96aC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L2RvY3MvLnZ1ZXByZXNzL25hdmJhci96aC50c1wiO2ltcG9ydCB7IG5hdmJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBjb25zdCB6aE5hdmJhciA9IG5hdmJhcihbXG4gIFwiL3poL1wiLFxuICBcIi96aC9wb3J0Zm9saW9cIixcbiAgXCIvemgvZGVtby9cIixcbiAge1xuICAgIHRleHQ6IFwiXHU2MzA3XHU1MzU3XCIsXG4gICAgaWNvbjogXCJsaWdodGJ1bGJcIixcbiAgICBwcmVmaXg6IFwiL3poL2d1aWRlL1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQmFyXCIsXG4gICAgICAgIGljb246IFwibGlnaHRidWxiXCIsXG4gICAgICAgIHByZWZpeDogXCJiYXIvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXCJiYXpcIiwgeyB0ZXh0OiBcIi4uLlwiLCBpY29uOiBcImVsbGlwc2lzXCIsIGxpbms6IFwiXCIgfV0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkZvb1wiLFxuICAgICAgICBpY29uOiBcImxpZ2h0YnVsYlwiLFxuICAgICAgICBwcmVmaXg6IFwiZm9vL1wiLFxuICAgICAgICBjaGlsZHJlbjogW1wicmF5XCIsIHsgdGV4dDogXCIuLi5cIiwgaWNvbjogXCJlbGxpcHNpc1wiLCBsaW5rOiBcIlwiIH1dLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJcdTRFQTdcdTU0QzFcIixcbiAgICBpY29uOiBcInNob3BwaW5nLWNhcnRcIixcbiAgICBsaW5rOiBcIi96aC9wcm9kdWN0cy9cIixcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiVjIgXHU2NTg3XHU2ODYzXCIsXG4gICAgaWNvbjogXCJib29rXCIsXG4gICAgbGluazogXCJodHRwczovL3RoZW1lLWhvcGUudnVlanMucHJlc3MvemgvXCIsXG4gIH0sXG5dKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzcy9zaWRlYmFyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L2RvY3MvLnZ1ZXByZXNzL3NpZGViYXIvZW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzcy9zaWRlYmFyL2VuLnRzXCI7aW1wb3J0IHsgc2lkZWJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBjb25zdCBlblNpZGViYXIgPSBzaWRlYmFyKHtcbiAgXCIvXCI6IFtcbiAgICBcIlwiLFxuICAgIFwicG9ydGZvbGlvXCIsXG4gICAge1xuICAgICAgdGV4dDogXCJEZW1vXCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG4gICAgICBwcmVmaXg6IFwiZGVtby9cIixcbiAgICAgIGxpbms6IFwiZGVtby9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJEb2NzXCIsXG4gICAgICBpY29uOiBcImJvb2tcIixcbiAgICAgIHByZWZpeDogXCJndWlkZS9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJTbGlkZXNcIixcbiAgICAgIGljb246IFwicGVyc29uLWNoYWxrYm9hcmRcIixcbiAgICAgIGxpbms6IFwiaHR0cHM6Ly9lY29zeXN0ZW0udnVlanMucHJlc3MvcGx1Z2lucy9tYXJrZG93bi9yZXZlYWxqcy9kZW1vLmh0bWxcIixcbiAgICB9LFxuICBdLFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3QvZG9jcy8udnVlcHJlc3Mvc2lkZWJhclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC9kb2NzLy52dWVwcmVzcy9zaWRlYmFyL3poLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3QvZG9jcy8udnVlcHJlc3Mvc2lkZWJhci96aC50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgY29uc3QgemhTaWRlYmFyID0gc2lkZWJhcih7XG4gIFwiL3poL1wiOiBbXG4gICAgXCJcIixcbiAgICBcInBvcnRmb2xpb1wiLFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU2ODQ4XHU0RjhCXCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG4gICAgICBwcmVmaXg6IFwiZGVtby9cIixcbiAgICAgIGxpbms6IFwiZGVtby9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJcdTY1ODdcdTY4NjNcIixcbiAgICAgIGljb246IFwiYm9va1wiLFxuICAgICAgcHJlZml4OiBcImd1aWRlL1wiLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NUU3Qlx1NzA2Rlx1NzI0N1wiLFxuICAgICAgaWNvbjogXCJwZXJzb24tY2hhbGtib2FyZFwiLFxuICAgICAgbGluazogXCJodHRwczovL2Vjb3N5c3RlbS52dWVqcy5wcmVzcy96aC9wbHVnaW5zL21hcmtkb3duL3JldmVhbGpzL2RlbW8uaHRtbFwiLFxuICAgIH0sXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFAsU0FBUyxtQkFBbUI7QUFDeFIsU0FBUyx3QkFBd0I7OztBQ0R5TixTQUFTLGlCQUFpQjs7O0FDQVgsU0FBUyxjQUFjO0FBRXpSLElBQU0sV0FBVyxPQUFPO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxJQUFJLENBQUM7QUFBQSxNQUNoRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxPQUFPLE1BQU0sWUFBWSxNQUFNLElBQUksQ0FBQztBQUFBLE1BQ2hFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFN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
