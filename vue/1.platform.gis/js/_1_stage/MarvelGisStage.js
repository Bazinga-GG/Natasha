(function ($) {
    $.MarvelGisStage = function () {
        var self = this;

        //region Const

        var URL_GIS_MAP = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}';
        var URL_GIS_MAP2 = "https://api.mapbox.com/styles/v1/jherculesqz/cj99csbwi2bzy2qp3mhtqcrkx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamhlcmN1bGVzcXoiLCJhIjoiY2o4anNybjZqMDZnczMybXZxaHNhMDRlMyJ9.fR2DM7aypSp8q4AxE6uL5w";
        var URL_MAP_LIGHT = "https://api.mapbox.com/styles/v1/carlliu/cjo8czrzh0pud2sqsxe3qunru/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FybGxpdSIsImEiOiJjam84YzgzdHUxNGk0M3NwYmVldWRvN2dmIn0.sw3qMKtgk7y_ODG6fKeWjw";
        var URL_MAP_ICE_CREAM = "https://api.mapbox.com/styles/v1/carlliu/cjo8ckv1z0bwk2so2dy30o5z4/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FybGxpdSIsImEiOiJjam84YzgzdHUxNGk0M3NwYmVldWRvN2dmIn0.sw3qMKtgk7y_ODG6fKeWjw";
        this.MODEL_EMPTY = "";
        this.MODEL_CREATE_MARK = "createMark";
        //endregion

        //region Fields

        this.mapObj;
        this.eventHandler = {
            //region Stage
            callbackOnZoom: function (e) {
            },
            callbackOnClick: function (e) {
            },
            callbackOnContextmenu: function (e) {
            },
            //endregion
            //region node
            callbackOnNodeDblClick: function (e) {
            },
            callbackOnNodeDrag: function (e) {
            },
            callbackOnNodeClick: function (e) {
            },
            callbackOnCircleDblclick: function (e) {
            },
            callbackOnNodeContextMenu: function (e) {
            },
            //endregion
            //region nodeGroup
            callbackOnNodeGroupClick: function (e) {
            },
            //endregion
            //region link
            callbackOnLinkClick: function (e) {
            },
            //endregion
        };
        this.config = {
            showLabel: true
        };
        var model = self.MODEL_EMPTY;
        //endregion

        //region init

        this.init = function (strId, iX, iY, iZoom4Init, oOptions, eventOptions, oGis) {
            if (oOptions.indoorMap) {
                //region 0.init mapObj
                self.mapObj = L.map(strId, {
                    attributionControl: false,
                    zoomControl: oOptions.hasZoomCtrl == undefined ? true : oOptions.hasZoomCtrl,
                    center: [iX, iY],
                    zoom: iZoom4Init,
                    worldCopyJump: true,
                    doubleClickZoom: false
                });
                self.mapObj.doubleClickZoom.disable();
                L.control.scale().addTo(this.mapObj);
                //endregion

                //region 1.init tileLayer
                window.map = self.mapObj;
                var oIndoorLayer = L.tileLayer.deepzoom(oOptions.indoorMapUrl, {
                    width: 4020,
                    height: 2680
                });
                oIndoorLayer.addTo(self.mapObj);
                self.mapObj.fitBounds(oIndoorLayer.options.bounds);
                //endregion

                //region 2.event
                $.extend(self.eventHandler, eventOptions);
                _onZoom();
                _onClick();
                _onContextMenu();
                //endregion
            }
            else {
                //region 0.init tileLayer
                var oTileLayer1 = L.tileLayer(oOptions.mapUrl, {
                    attribution: "",
                    id: 'mapbox.streets',
                    token: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                });
                var oTileLayer2 = L.tileLayer(URL_GIS_MAP, {
                    attribution: "",
                    id: 'mapbox.satellite',
                    token: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                });
                //endregion

                //region 1.init mapObj
                self.mapObj = L.map(strId, {
                    attributionControl: false,
                    zoomControl: oOptions.hasZoomCtrl == undefined ? true : oOptions.hasZoomCtrl,
                    center: [iX, iY],
                    zoom: iZoom4Init,
                  minZoom: 3,
                  wheelDebounceTime:100,
                  wheelPxPerZoomLevel:200,
                  zoomSnap: 0.1,
                    worldCopyJump: true,
                    doubleClickZoom: false,
                    preferCanvas: true,
                    layers: [oTileLayer1]
                });
                self.mapObj.doubleClickZoom.disable();
                self._ctrlScale();
                self._ctrlLayerView(oTileLayer1, oTileLayer2);
                self._ctrlPrint(oOptions, oTileLayer1);
                self._ctrlPM(oOptions);
                //endregion

                //region 2.event
                $.extend(self.eventHandler, eventOptions);
                _onZoom();
                _onClick();
                _onContextMenu();
                //region mouse
                _onMouseOver(oGis);
                _onMouseDown(oGis);
                _onMouseOut(oGis);
                _onMouseMove(oGis);
                //endregion
                //region 快捷键
                _initEventEscPress(oGis);
                //endregion

                //endregion
            }
        };

        //#region plugins

        this._ctrlScale = function () {
            L.control.scale().addTo(this.mapObj);
        };
        this._ctrlLayerView = function (oTileLayer1, oTileLayer2) {
            L.control.layers({
                "卫星": oTileLayer2,
                "道路": oTileLayer1,
            }).addTo(this.mapObj);
        };
        this._ctrlPrint = function (oOptions, oTileLayer) {
            if (oOptions.export) {
                L.easyPrint({
                    tileLayer: oTileLayer,
                    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
                    filename: 'export',
                    exportOnly: true,
                    hideControlContainer: true
                }).addTo(this.mapObj);
            }
        };
        this._ctrlPM = function (oOptions) {
            if (oOptions.pm) {
                this.mapObj.pm.addControls({
                    drawMarker: true,  // adds button to draw markers
                    drawPolyline: true,  // adds button to draw a polyline
                    drawRectangle: true,  // adds button to draw a rectangle
                    drawPolygon: true,  // adds button to draw a polygon
                    drawCircle: true,  // adds button to draw a cricle
                    cutPolygon: true,  // adds button to cut a hole in a polygon
                    editMode: true,  // adds button to toggle edit mode for all layers
                    removalMode: true   // adds a button to remove layers
                });
            }
        };

        //#endregion

        //endregion

        //region event

        var _onZoom = function () {
            self.mapObj.on("zoomend", function (e) {
                self.eventHandler.callbackOnZoom(e);
            });
        };
        var _onClick = function () {
            self.mapObj.on('click', function (e) {
                self.eventHandler.callbackOnClick(e);
            });
        };
        var _onContextMenu = function () {
            self.mapObj.on('contextmenu', function (e) {
                self.eventHandler.callbackOnContextmenu(e);
            });
        };

        //region mouse
        var _onMouseOver = function (oGis) {
            self.mapObj.on('mouseover', function (e) {
                if (model == self.MODEL_CREATE_MARK) {
                    oGis.Sprite.Node.stageEventMouseOver(e, oGis);
                }
                else if (model == self.MODEL_EMPTY) {

                }
            });
        };
        var _onMouseDown = function (oGis) {
            self.mapObj.on('mousedown', function (e) {
                if (model == self.MODEL_CREATE_MARK) {
                    oGis.Sprite.Node.stageEventMouseDown(e, oGis);
                }
                else if (model == self.MODEL_EMPTY) {

                }
            });
        };
        var _onMouseOut = function (oGis) {
            self.mapObj.on('mouseout', function (e) {
                if (model == self.MODEL_CREATE_MARK) {
                    oGis.Sprite.Node.stageEventMouseOut(e, oGis);
                }
                else if (model == self.MODEL_EMPTY) {

                }
            });
        };
        var _onMouseMove = function (oGis) {
            self.mapObj.on('mousemove', function (e) {
                if (model == self.MODEL_CREATE_MARK) {
                    oGis.Sprite.Node.stageEventMouseMove(e, oGis);
                }
                else if (model == self.MODEL_EMPTY) {

                }
            });
        };
        //endregion

        //region 快捷键

        var _initEventEscPress = function (oGis) {
          keyboardJS.on('esc', function (e) {
                //down
                if (model === self.MODEL_CREATE_MARK) {
                    oGis.Sprite.Node.eventEscPress(e, oGis);
                }
                else if (model == self.MODEL_EMPTY) {

                }
            }, function (e) {
                //up
            });
        };

        //endregion

        //endregion

        //region imsg


        this.setCenter = function (iX, iY, iZoom4Init) {
            self.mapObj.setView([iX, iY], iZoom4Init);
        };

        this.showOrHide = function (bIsShow) {
            // self.isShow = bIsShow ? "block":"none";
        };

        this.updateModel = function (strModel) {
            model = strModel;
        };

        this.setConfig = function (oConfig) {
            Object.assign(self.config, oConfig);
        };

        this.resize = function (){
          self.mapObj._onResize();
        };

        //endregion
    }
})(jQuery);
