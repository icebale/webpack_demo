import cookie from "js-cookie";

let domain = ".jd.id";
(function () {
  if (process.env.NODE_ENV === "development") {
    domain = "localhost";
  }
})();

export const cookieUtil = {
  get(key) {
    return cookie.get(key);
  },
  /**
   * 保存COOKIE
   * @param key
   * @param value
   * @param expires 天的维度
   */
  set(key, value, expires = 100) {
    cookie.set(key, value, { domain: domain || ".jd.id", expires: expires });
  },
  remove(key, path) {
    cookie.remove(key, { domain: domain || ".jd.id", path: path || "/" });
  },

  /**
   * 设置cookie
   * @method set
   * @param {String} name - COOKIE名称
   * @param {String} value - COOKIE值
   * @param {number} expireHours - 过期时间，该过期时间以小时计算，例如设置1，则表示1小时后过期
   * @param {String} path - COOKIE有效路径
   * @param {String} domain - COOKIE的有效域名
   * @param secure? {string}
   * @return {undefined}
   * @example
   *      panda.cookie.set("pin","jd_yanfa")
   */
  setCookie: function (name, value, expireHours, path, domain, secure) {
    var cstr = [];
    cstr.push(name + "=" + escape(value));
    if (expireHours) {
      var dd = new Date();
      var expires = dd.getTime() + expireHours * 3600000;
      dd.setTime(expires);
      cstr.push("expires=" + dd.toGMTString());
    }
    if (path) {
      cstr.push("path=" + path);
    }
    if (domain) {
      cstr.push("domain=" + domain);
    }
    if (secure) {
      cstr.push(secure);
    }
    document.cookie = cstr.join(";");
  },
};
