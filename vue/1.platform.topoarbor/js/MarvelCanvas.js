(function($){
    $.MarvelCanvas = function(oParent) {
        //#region Const

        //#endregion

        //region Fields

        var self = this;
        var parent = oParent;

        this.canvas;
        this.ctx;

        //endregion

        //#region lifeCycle

        //#endregion

        //#region inner

        //#region resizeByWindows

        this.resizeByWindows = function () {
            var w = $(window).width();
            var h = $(window).height();
            self.canvas.width = w;
            self.canvas.height = h; // resize the canvas element to fill the screen

            return {
                width: w,
                height: h
            };
        };

        //#endregion

        //#region clear

        this.clear = function () {
            self.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.ctx.strokeStyle = "#d3d3d3";
            self.ctx.lineWidth = 1;
        };

        this.clearRect = function(oPosX, oPosY, oWidth, oHeight){
            self.ctx.clearRect(oPosX, oPosY, oWidth, oHeight);
        };

        //#endregion

        //#region event

        this.onMouseDown = function (oCallback) {
            $(self.canvas).mousedown(function (e) {
                var pos = $(this).offset();//?
                var p = {
                    x: e.pageX - pos.left,
                    y: e.pageY - pos.top
                };

                oCallback(p);
                return false;
            });
        };

        this.onMouseMove = function (oCallback) {
            $(self.canvas).mousemove(function (e) {
                var pos = $(this).offset();//?
                var s = {
                    x: e.pageX - pos.left,
                    y: e.pageY - pos.top
                };

                oCallback(s);
                return false;
            });
        };

        this.onMouseUp = function (oCallback) {
            $(window).bind('mouseup', function (e) {
                oCallback();
                return false;
            });
        };

        //#endregion

        //#region draw

        this.startDraw = function(){
            self.ctx.beginPath();
        };

        this.save = function () {
            self.ctx.save();
        };

        this.restore =function () {
            self.ctx.restore();
        };

        this.drawLine =function (oPosStart, oPosEnd) {
            self.ctx.moveTo(oPosStart.x, oPosStart.y);
            self.ctx.lineTo(oPosEnd.x, oPosEnd.y);
        };

        this.setLineWight =function (oLineWight) {
            self.ctx.lineWidth = oLineWight;
        };

        this.setStrokeStyle =function (oStrokeStyle) {
            self.ctx.strokeStyle = oStrokeStyle;
        };

        this.setFillStyle =function (oFillStyle) {
            self.ctx.fillStyle = oFillStyle;
        };

        this.stroke =function () {
            self.ctx.stroke();
        };

        this.drawNodeLabel = function(node, pt ){
            var iWidth = self.ctx.measureText(node.data.label || "").width + 6;
            var strLabel = node.data.label;
            if (!(strLabel || "").match(/^[ \t]*$/)) {
                pt.x = Math.floor(pt.x);
                pt.y = Math.floor(pt.y);
            } else {
              strLabel = null
            }

            self.clearRect(pt.x - iWidth / 2, pt.y - 7, iWidth, 14);


            // draw the text
            if (strLabel) {
                self.ctx.font = "bold 11px Arial";
                self.ctx.textAlign = "center";

                self.ctx.fillStyle = "#888888";

                self.ctx.fillText(strLabel || "", pt.x, pt.y + 4);
            }
        };

        //#endregion

        //#endregion

        //#region callback
        //#endregion

        //#region 3rd

        //#region init

        this.init = function (strCanvasId) {
            self.canvas = $("#" + strCanvasId).get(0);
            self.ctx = self.canvas.getContext("2d");
        };

        //#endregion

        //#endregion
    }
})(jQuery);
