(function ($) {
    $.MarvelTopoLayer = function () {
        //region const

        this.BACKGROUND_SHAPE_ID = "oBackgroundShape";

        var NODE_THRESHOLD = 500;

        //endregion

        //region Fields

        var self = this;

        //endregion

        //region init

        this.init = function (oTopo) {
            //init layer
            oTopo.ins.layerBg = self.createLayer(oTopo, {
                hitGraphEnabled: true,
                draggable: false
            });
            var oStageRect = new Konva.Rect({
                id: oTopo.Stage.getIdentityValue(self.BACKGROUND_SHAPE_ID, oTopo),
                x: 0,
                y: 0,
                // stroke: "white",
                fill: oTopo.Resource.getTheme().stage["bgColor"] || "#FFFFFF",
                width: oTopo.ins.stage.width(),
                height: oTopo.ins.stage.height()
            });
            oTopo.ins.layerBg.add(oStageRect);
            self.reDraw(oTopo.ins.layerBg);
            oTopo.ins.layerLink = self.createLayer(oTopo, {
                hitGraphEnabled: true,
            });
            oTopo.ins.nodeLayers.push(self.createLayer(oTopo, {
                hitGraphEnabled: true,
            }));
            oTopo.ins.layerTooltip = self.createLayer(oTopo);
            oTopo.ins.layerTemp = self.createLayer(oTopo);
            //endregion

            //region event

            //endregion
        };

        //endregion

        //region event

        //endregion

        //region imsg

        this.createLayer = function (oTopo, oOptions) {
            var options = oOptions || {};
            options = Object.assign({
                hitGraphEnabled: false
            }, options);
            var oLayer = new Konva.Layer(options);
            oTopo.ins.stage.add(oLayer);
            return oLayer;
        };

        this.reDraw = function (oLayer) {
            oLayer.batchDraw();
        };

        this.reSetBackgroundLayer = function (oTopo) {
            //1.重置scale
            oTopo.ins.layerBg.scale({
                x: 1 / oTopo.ins.stage.scaleX(),
                y: 1 / oTopo.ins.stage.scaleY()
            });
            //2.重置offset
            oTopo.ins.layerBg.offsetX(oTopo.ins.stage.x());
            oTopo.ins.layerBg.offsetY(oTopo.ins.stage.y());
            //3.绘制
            oTopo.ins.layerBg.batchDraw();
        };

        this.setBackgroundSize = function (iWidth, iHeight, oTopo) {
            var oRect = oTopo.ins.layerBg.findOne("Rect");
            if (oRect) {
                oRect.width(iWidth);
                oRect.height(iHeight);
                self.reDraw(oTopo.ins.layerBg);
            }
        };

        this.moveToBottom = function (oLayer) {
            oLayer.moveToBottom();
        };

        this.getNodeLayer = function (oTopo) {
            var layers = oTopo.ins.nodeLayers;
            for (var i = 0, len = layers.length; i < len; i++) {
                var oLayer = layers[i];
                var iChildNum = oLayer.children.length;
                if (iChildNum < NODE_THRESHOLD) {
                    return oLayer;
                }
            }
            var oNewLayer = self.createLayer(oTopo, {
                hitGraphEnabled: true
            });
            oTopo.ins.nodeLayers.push(oNewLayer);
            return oNewLayer;
        }

        //endregion
    }
})(jQuery);