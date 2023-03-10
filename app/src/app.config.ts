export default defineAppConfig({
  pages: ["pages/index/index", "pages/user/index", "pages/issue/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#aaaaaa",
    selectedColor: "#f43a47",
    borderStyle: "white",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: "pages/index/index",
        text: "้ฆ้กต",
      },
      {
        pagePath: "pages/user/index",
        text: "ๆ็"
      },
    ],
  },
});
