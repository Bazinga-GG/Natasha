(function ($) {
  $.MarvelDevPanel = function () {
    var self = this;

    //region Const

    //endregion

    //#region Fields

    this.m_oDraw;

    this.m_oOptions = {
      "Raycus_6000": {
        plugin: new $.MarvelDevPanel_3()
      },
      "Raycus_6000_1": {
        plugin: new $.MarvelDevPanel_3_1()
      },
      "Raycus_12000": {
        plugin: new $.MarvelDevPanel_4()
      },
      "Raycus_2000": {
        plugin: new $.MarvelDevPanel_5()
      },
      "SXL": {
        plugin: new $.MarvelDevPanel_2()
      },
      "manhole": {
        plugin: new $.MarvelDevPanel_6()
      },
      "env": {
        plugin: new $.MarvelDevPanel_7()
      },
      "car": {
        plugin: new $.MarvelDevPanel_8()
      },
      "GK_1000": {
        plugin: new $.MarvelDevPanel_9()
      },
      "155C": {
        plugin: new $.MarvelDevPanel_2()
      },
      "UNKNOWN": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "XDM300_XDM300": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "XDM500_XDM500": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "XDM1000_XDM1000": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "AXD620_AXD620": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "AXD2500_AXD2500": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1664SM_1664SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1651SM_1651SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1660SM_1660SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1641SM_1641SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN50_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN50_metro002": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN500_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN550_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1500_type_a": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1500_type_b": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800I_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800II_153": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800II_153_PACKET": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800I_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X4_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800II_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X8_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800V_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800V_metro001_V100R008C00": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800V_metro001_V100R008C00_Z": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X8_158": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X16_154": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X16_154_V100R008C00": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN3500_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN3500II_osn3500ii": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN3500II_V100R010C00": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN7500_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN7500II_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN8800T16_wdmstd": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN8800T32_wdmstd": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN8800T64_wdmstd": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600U16_162": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600U32_117": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600U64_118": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600_M24": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9800_M24": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "mc_board": {
        plugin: new $.MarvelDevPanel_10()
      },
    };

    //#endregion

    //region init

    this.init = function (oOptions) {
      $.extend(true, this.m_oOptions, oOptions);
    };

    //endregion

    //region event


    //endregion

    //region imsg

    this.initPlugin = function (strDevType) {
      var self = this;

      var oOption = this.m_oOptions[strDevType];
      if (oOption != undefined) {
        $("#" + this.m_oOptions.id).load(oOption.url, function (oData) {
          $("#" + self.m_oOptions.id).empty();
          self.m_oDraw = SVG().addTo("#" + self.m_oOptions.id);
          if(self.isIE11()){
            self._drawSvg4IE11(oData);
          }else{
            self.m_oDraw.svg(oData);
          }

          var oSvg = SVG('svg svg');
          var oOriginViewBox = oSvg.node.attributes.viewBox.nodeValue;
          var oOriginX = oSvg.node.attributes.x.nodeValue;
          var oOriginY = oSvg.node.attributes.y.nodeValue;
          var oOriginW = oSvg.node.attributes.width.nodeValue;
          var oOriginH = oSvg.node.attributes.height.nodeValue;
          self.m_oDraw.x(oOriginX);
          self.m_oDraw.y(oOriginY);
          self.m_oDraw.width(oOriginW);
          self.m_oDraw.height(oOriginH);
          self.m_oDraw.viewbox(oOriginViewBox);
          oOption.plugin.init(self.m_oOptions);
          self.m_oOptions.events.afterInitPlugin();
        });

        return true;
      }
      else{
        return false;
      }
    };

    this.getPlugin = function (strDevType) {
      var oOption = this.m_oOptions[strDevType];
      if (oOption != undefined) {
        return oOption.plugin;
      }
      else {
        return undefined;
      }
    };

    this.isIE11 = function () {
      var strUserAgent = navigator.userAgent;
      var isIE11 = strUserAgent.indexOf('Trident') > -1 && strUserAgent.indexOf("rv:11.0") > -1;

      return isIE11;
    };

    this._drawSvg4IE11 = function (svgOrFn) {
      var well, len, fragment;

      well = document.createElement('svg');
      fragment = document.createDocumentFragment(); // Dump raw svg

      well.innerHTML = svgOrFn; // Transplant nodes into the fragment

      for (len = well.children.length; len--;) {
        fragment.appendChild(well.firstElementChild);
      }

      return this.m_oDraw.add(fragment);
    };

    //endregion
  }
})(jQuery);
