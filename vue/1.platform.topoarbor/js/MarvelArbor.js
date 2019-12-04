(function ($) {
    $.MarvelArbor = function (oParent) {
        //#region Const

        //#endregion

        //region Fields

        var self = this;
        var parent = oParent;

        this.sigmaObj;

        //#region abor保留
        // this.sys;
        // this.particleSystem;
        //#endregion

        //endregion

        //#region inner

        //#endregion

        //#region callback

        //#endregion

        //#region 3rd

        //#region init

        this.init = function (strDivId) {
            self.sigmaObj = new sigma({
                graph: {
                    nodes: [],
                    edges: []
                },
                container: strDivId
            });
        };

        //#endregion

        //#region setData

        this.setData = function (arrNodes, arrLinks) {
            self.sigmaObj.graph = {
                nodes: arrNodes,
                edges: arrLinks
            };
        }

        //#endregion

        //#endregion
    }
})(jQuery);
