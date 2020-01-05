(function ($) {
    $.MarvelDevPanel_4 = function () {
        var self = this;

        //region Const

        var ITEMS = [{
            id: "module0",
            name: "整机"
        }, {
            id: "module1",
            name: "光学模块"
        }, {
            id: "module2",
            name: "光学模块"
        }, {
            id: "module3",
            name: "光学模块"
        }, {
            id: "module4",
            name: "光学模块"
        }, {
            id: "module5",
            name: "光学模块"
        }, {
            id: "module6",
            name: "光学模块"
        }, {
            id: "module7",
            name: "光学模块"
        }, {
            id: "module8",
            name: "光学模块"
        }, {
            id: "module9",
            name: "光学模块"
        }, {
            id: "module10",
            name: "光学模块"
        }, {
            id: "module11",
            name: "光学模块"
        }, {
            id: "module12",
            name: "光学模块"
        }, {
            id: "module33",
            name: "电学模块"
        }, {
            id: "module34",
            name: "电学模块"
        }, {
            id: "module35",
            name: "电学模块"
        }, {
            id: "module36",
            name: "电学模块"
        }, {
            id: "module37",
            name: "电学模块"
        }, {
            id: "module38",
            name: "电学模块"
        }, {
            id: "module39",
            name: "电学模块"
        }, {
            id: "module40",
            name: "电学模块"
        }, {
            id: "module41",
            name: "电学模块"
        }, {
            id: "module42",
            name: "电学模块"
        }, {
            id: "module43",
            name: "电学模块"
        }, {
            id: "module44",
            name: "电学模块"
        }, {
            id: "module25",
            name: "主控制板"
        }, {
            id: "module26",
            name: "合束模块"
        }, {
            id: "module27",
            name: "强电单元"
        }];

        //endregion

        //#region Fields

        //#endregion

        //region init

        this.init = function (oOptions) {
            //#region setUp

            $("#" + oOptions.id).bind("contextmenu", function () {
                return false;
            });

            //#endregion

            //#region items

            ITEMS.forEach(function (oItem) {
                _bindEvent(oItem.id, function () {
                    oOptions.events.click4BD(oItem, this);
                }, function (iX, iY) {
                    oOptions.events.contextMenu4BD(oItem, iX, iY);
                });
            });

            //#endregion
        };

        var _bindEvent = function (strId, oCallbackClick, oCallbackRClick) {
            var oBD0 = SVG("#" + strId);
            oBD0.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oCallbackClick(this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oCallbackRClick(evt.clientX, evt.clientY, this);
                }
            });
        };

        //endregion

        //region event

        //endregion

        //region imsg

        this.setLightColor = function (strId, strColor) {
            var oLightG = SVG("#" + strId);
            if (oLightG == undefined) {
                return;
            }
            if (oLightG.node == undefined) {
                return;
            }
            var oLight = SVG.adopt(oLightG.node.lastElementChild);
            if (oLight == undefined) {
                return;
            }

            oLight.fill({color: strColor});
        };

        //endregion
    }
})(jQuery);
