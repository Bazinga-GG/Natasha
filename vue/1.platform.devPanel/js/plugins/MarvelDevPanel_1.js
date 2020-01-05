(function ($) {
    $.MarvelDevPanel_1 = function () {
        var self = this;

        //region Const

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

            //#region 0
            var oBD0 = SVG("#" + 'module0');
            oBD0.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module0", name: "整机"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module0", name: "整机"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 1
            var oBD1 = SVG("#" + 'module1');
            oBD1.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module1", name: "光学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module1", name: "光学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 2
            var oBD2 = SVG("#" + 'module2');
            oBD2.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module2", name: "光学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module2", name: "光学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 3
            var oBD3 = SVG("#" + 'module3');
            oBD3.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module3", name: "光学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module3", name: "光学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 4
            var oBD4 = SVG("#" + 'module4');
            oBD4.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module4", name: "光学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module4", name: "光学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 5
            var oBD5 = SVG("#" + 'module5');
            oBD5.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module5", name: "光学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module5", name: "光学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 6
            var oBD6 = SVG("#" + 'module6');
            oBD6.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module6", name: "光学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module6", name: "光学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 7
            var oBD7 = SVG("#" + 'module7');
            oBD7.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module7", name: "电学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module7", name: "电学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 8
            var oBD8 = SVG("#" + 'module8');
            oBD8.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module8", name: "电学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module8", name: "电学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 9
            var oBD9 = SVG("#" + 'module9');
            oBD9.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module9", name: "电学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module9", name: "电学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 10
            var oBD10 = SVG("#" + 'module10');
            oBD10.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module10", name: "电学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module10", name: "电学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 11
            var oBD11 = SVG("#" + 'module11');
            oBD11.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module11", name: "电学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module11", name: "电学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 12
            var oBD12 = SVG("#" + 'module12');
            oBD12.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module12", name: "电学模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module12", name: "电学模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 13
            var oBD13 = SVG("#" + 'module13');
            oBD13.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module13", name: "主控制板"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module13", name: "主控制板"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 14
            var oBD14 = SVG("#" + 'module14');
            oBD14.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module14", name: "合束模块"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module14", name: "合束模块"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion

            //#region 15
            var oBD15 = SVG("#" + 'module15');
            oBD15.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oOptions.events.click4BD({id: "module15", name: "强电单元"}, this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oOptions.events.contextMenu4BD({id: "module15", name: "强电单元"},
                        evt.clientX, evt.clientY, this);
                }
            });
            //#endregion
        };

        //endregion

        //region event

        //endregion

        //region imsg

        this.setLightColor = function (strId, strColor) {
            var oLightG = SVG("#" + strId);
            if(oLightG == undefined) {
                return;
            }
            if(oLightG.node == undefined){
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
