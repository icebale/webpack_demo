import { cookieUtil } from "../src/cookie/index";
import getBrowserModel from "../src/getBrowserModel/getBrowserModel";

let os = getBrowserModel();
console.log("os", os);
cookieUtil.setCookie("testCookie", 122344);
console.log(cookieUtil.get("testCookie"));
export { getBrowserModel, cookieUtil };
