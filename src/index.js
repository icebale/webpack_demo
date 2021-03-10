import { cookieUtil } from "./cookie/index";

// 初始化moengage
const getBrowserModel = function () {
  import(
    /* webpackChunkName: "getBrowserModel" */ "./getBrowserModel/getBrowserModel"
  ).then((module) => {
    Ice_utils.getBrowserModel = module.default;
  });
};

export { getBrowserModel, cookieUtil };
