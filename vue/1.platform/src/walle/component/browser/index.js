export default {
  getBrowserInfo: function () {//检测浏览器内核--返回的是两个key，name：浏览器内核的名称---version：浏览器的版本号
    var oBroswer = {};
    var strUserAgent = navigator.userAgent;
    var bIsOpera = strUserAgent.indexOf("Opera") > -1;
    if (bIsOpera) {
      //先检测Opera浏览器是否进行了伪装
      if (navigator.appName == 'Opera') {
        //如果浏览器没有进行伪装，那么直接获取版本号
        oBroswer.version = parseFloat(navigator.appVersion);
      } else {
        var regOperaVersion = new RegExp("Opera (\\d+.\\d+)");
        //正则匹配，并将版本号保存在RegExp.$1中
        regOperaVersion.test(strUserAgent);
        oBroswer.version = parseFloat(RegExp['$1']);
      }
      oBroswer.opera = true;
      oBroswer.name = 'opera';
    }
    var bIsChrome = strUserAgent.indexOf("Chrome") > -1;
    if (bIsChrome) {
      var regChorme = new RegExp("Chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?");
      regChorme.test(strUserAgent);
      oBroswer.version = parseFloat(RegExp['$1']);
      oBroswer.chrome = true;
      oBroswer.name = 'chrome';
    }
    //在Chrome的user-agent字符串中会出现Konqueror/Safari的关键字，排除Chrome信息
    var isKHTML = (strUserAgent.indexOf("KHTML") > -1
      || strUserAgent.indexOf("Konqueror") > -1 || strUserAgent
        .indexOf("AppleWebKit") > -1)
      && !bIsChrome;
    if (isKHTML) {
      //判断是否基于KHTML，如果时的话在继续判断属于何种KHTML浏览器
      var isSafari = strUserAgent.indexOf("AppleWebKit") > -1;
      var isKonq = strUserAgent.indexOf("Konqueror") > -1;
      if (isSafari) {
        var reAppleWebKit = new RegExp("Version/(\\d+(?:\\.\\d*)?)");
        reAppleWebKit.test(strUserAgent);
        var fAppleWebKitVersion = parseFloat(RegExp["$1"]);
        oBroswer.version = parseFloat(RegExp['$1']);
        oBroswer.safari = true;
        oBroswer.name = 'safari';
      } else if (isKonq) {
        var reKong = new RegExp(
          "Konqueror/(\\d+(?:\\.\\d+(?\\.\\d)?)?)");
        reKong.test(strUserAgent);
        oBroswer.version = parseFloat(RegExp['$1']);
        oBroswer.konqueror = true;
        oBroswer.name = 'konqueror';
      }
    }
    // !bIsOpera 避免是由Opera伪装成的IE
    var isIE = strUserAgent.indexOf("compatible") > -1
      && strUserAgent.indexOf("MSIE") > -1 && !bIsOpera;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(strUserAgent);
      oBroswer.version = parseFloat(RegExp['$1']);
      oBroswer.msie = true;
      oBroswer.name = 'msie';
    }
    var isIE11 = strUserAgent.indexOf('Trident') > -1 && strUserAgent.indexOf("rv:11.0") > -1;
    if (isIE11) {
      oBroswer.version = 11;
      oBroswer.msie = true;
      oBroswer.name = 'msie';
    }
    var isEdge = strUserAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    if(isEdge){
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(strUserAgent);
      oBroswer.version = parseFloat(RegExp['$1']);
      oBroswer.msie = true;
      oBroswer.name = 'edge';
    }


    // 排除Chrome 及 Konqueror/Safari 的伪装
    var isMoz = strUserAgent.indexOf("Gecko") > -1 && !bIsChrome && !isKHTML && !isIE && !isIE11 && !isEdge;
    if (isMoz) {
      var reMoz = new RegExp("rv:(\\d+\\.\\d+(?:\\.\\d+)?)");
      reMoz.test(strUserAgent);
      oBroswer.version = parseFloat(RegExp['$1']);
      oBroswer.mozilla = true;
      oBroswer.name = 'mozilla';
    }
    return oBroswer;
  },
}
