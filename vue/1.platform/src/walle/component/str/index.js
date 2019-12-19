export default {
  split: function (strMsg, strSplitter) {
    var arrRes = new Array();
    arrRes = strMsg.split(strSplitter);
    return arrRes;
  },
  join: function (arrMsg, strJoinStr) {
    var strRes = "";

    for (var i = 0; i < arrMsg.length; i++) {
      strRes += arrMsg[i];
      if (i != arrMsg.length - 1) {
        strRes += strJoinStr;
      }
    }

    return strRes;
  },
  uuid: function () {
    var arrStr = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      arrStr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    arrStr[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    arrStr[19] = hexDigits.substr((arrStr[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    arrStr[8] = arrStr[13] = arrStr[18] = arrStr[23] = "-";

    var uuid = arrStr.join("");
    return uuid;
  },
  uuidEx: function (iLength, iRadix) {
    var strChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var arrUuid = [], i;
    iRadix = iRadix || strChars.length;

    if (iLength) {
      // Compact form
      for (i = 0; i < iLength; i++) arrUuid[i] = strChars[0 | Math.random() * iRadix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      arrUuid[8] = arrUuid[13] = arrUuid[18] = arrUuid[23] = '-';
      arrUuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!arrUuid[i]) {
          r = 0 | Math.random() * 16;
          arrUuid[i] = strChars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return arrUuid.join('');
  },
  contains: function (strSubStr, strWhole) {
    if (undefined == strWhole) {
      return false;
    }
    return strWhole.indexOf(strSubStr) >= 0;
  },
  format: function (strMsg) {
    if (arguments.length == 0) {return "";}

    var strToFormat = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
      strToFormat = strToFormat.replace(re, arguments[i]);
    }
    return strToFormat;
  },
  getLength: function (strMsg) {
    //获得字符串实际长度，中文2，英文1
    var iRealLength = 0;
    var iLen = strMsg.length;
    var cCode = -1;
    for (var i = 0; i < iLen; i++) {
      cCode = strMsg.charCodeAt(i);
      if (cCode >= 0 && cCode <= 128) iRealLength += 1;
      else iRealLength += 2;
    }
    return iRealLength;
  },
  htmlEscape: function (str) {
    return String(str).replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }
}
