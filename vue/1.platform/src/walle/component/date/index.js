import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

Date.prototype.format = function (strTimeToFormat) {
  var o = {
    "M+": this.getMonth() + 1, /*month*/
    "d+": this.getDate(), /*day*/
    "h+": this.getHours(), /*hour*/
    "m+": this.getMinutes(), /*min*/
    "s+": this.getSeconds(), /*second*/
    "q+": Math.floor((this.getMonth() + 3) / 3), /*quarter*/
    "S": this.getMilliseconds() /*ms*/
  };
  if (/(y+)/.test(strTimeToFormat)) strTimeToFormat = strTimeToFormat.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(strTimeToFormat)) strTimeToFormat = strTimeToFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return strTimeToFormat;
};

export default {
  calendar: function (strDate) {
    var strRes = moment(strDate).calendar();
    return strRes;
  },
  now: function(){
    var oDate = new Date();
    var strRes = oDate.format("yyyyMMdd-hh:mm:ss");
    return strRes;
  },
  nowEx: function(){
    var oDate = new Date();
    var strRes = oDate.format("yyyy-MM-dd hh:mm:ss");
    return strRes;
  },
  getDaysInOneMonth: function(strYear, strMonth){
    var oMonth = parseInt(strMonth, 10);
    var oDay= new Date(strYear, oMonth, 0);
    return oDay.getDate();
  },
  nowByObj: function () {
    var oNow = new Date();


    var oRes = {
      year: oNow.getFullYear(),
      month: oNow.getMonth() + 1,
      day: oNow.getDate(),
    };

    return oRes;
  },
}
