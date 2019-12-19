var COOKIEPATH = { path: '/'};
export default {
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (document.cookie == "") {
      return null;
    } else if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },

  setCookie: function (c_name, value) {
    document.cookie = c_name + "=" + escape(value);
  },

  delCookie: function (arrKeys) {
    var oDate = new Date();
    oDate.setTime(oDate.getTime() - 1);
    var strCookieValue = this.getCookie(name);
    if (strCookieValue != null)
      document.cookie = name + "=" + strCookieValue + ";expires=" + oDate.toGMTString();
  },
}
