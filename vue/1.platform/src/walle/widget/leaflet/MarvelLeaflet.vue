<template>
  <div class="gisMap" v-bind:id="id"
       v-bind:style="{ display: isShow }"></div>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import "natasha-gis/css/leaflet.custom.css";
  import "natasha-gis/css/MarvelGis.css";
  import "@skyraptor/leaflet.pm/dist/leaflet.pm.css";

  window.keyboardJS = require('keyboardjs/dist/keyboard.min.js');
  require('jquery/dist/jquery.min.js');

  require('leaflet/dist/leaflet.js');
  require('leaflet-polylinedecorator/dist/leaflet.polylineDecorator.js');
  require('leaflet-deepzoom/leaflet-deepzoom.js');
  require('leaflet-easyprint/dist/bundle.js');
  require('@skyraptor/leaflet.pm/dist/leaflet.pm.min.js');


  require('natasha-gis/js/_1_stage/MarvelGisStage.js');
  require('natasha-gis/js/_2_layer/MarvelGisLayer.js');
  require('natasha-gis/js/_3_sprite/MarvelGisSprite.js');
  require('natasha-gis/js/_3_sprite/_1_node/MarvelGisNode.js');
  require('natasha-gis/js/_3_sprite/_1_node/MarvelGisNodeGroup.js');
  require('natasha-gis/js/_3_sprite/_2_link/MarvelGisLinkGroup.js');
  require('natasha-gis/js/MarvelGisApi.js');
  require('natasha-gis/js/MarvelGis.js');

  /**
   *  MarvelLeaflet widget description
   *  @vuedoc
   *  @exports MarvelLeaflet
   */
  export default {
    name: 'MarvelLeaflet',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      }
    },
    data: function () {
      return {
        gisObj: undefined,
        isShow: "block"
      }
    },
    mounted: function () {
      this.gisObj = new $.MarvelGis();
    },
    methods: {
      //#region inner

      //#endregion

      //#region callback

      _onZoom: function (e) {
        this.$emit("onZoom", e);
      },
      _onClick: function (e) {
        this.$emit("onClick", e);
      },
      _onContextMenu: function (e) {
        this.$emit("onContextMenu", e);
      },
      _onNodeDblClick: function (e) {
        this.$emit("onNodeDblClick", e);
      },
      _onNodeDrag: function (e) {
        this.$emit("onNodeDrag", e);
      },
      _onNodeClick: function (e) {
        this.$emit("onNodeClick", e);
      },
      _onNodeContextMenu: function (e) {
        this.$emit("onNodeContextMenu", e);
      },
      _onNodeGroupClick: function (e) {
        this.$emit("onNodeGroupClick", e);
      },
      _onLinkClick: function (e) {
        this.$emit("onLinkClick", e);
      },
      _onCircleDblclick: function (e) {
        this.$emit("onCircleDblclick", e);
      },

      //#endregion

      //#region 3rd

      //#region Map
      init: function (iX, iY, iZoom4Init, oOptions) {
        var self = this;
        var eventOptions = {
          //region Stage
          callbackOnZoom: function (e) {
            self._onZoom(e);
          },
          callbackOnClick: function (e) {
            self._onClick(e);
          },
          callbackOnContextmenu: function (e) {
            self._onContextMenu(e);
          },
          //endregion
          //region node
          callbackOnNodeDblClick: function (e) {
            self._onNodeDblClick(e);
          },
          callbackOnNodeDrag: function (e) {
            self._onNodeDrag(e);
          },
          callbackOnNodeClick: function (e) {
            self._onNodeClick(e);
          },
          callbackOnNodeContextMenu: function (e) {
            self._onNodeContextMenu(e);
          },
          //endregion
          //region nodeGroup
          callbackOnNodeGroupClick: function (e) {
            self._onNodeGroupClick(e);
          },
          //endregion
          //region link
          callbackOnLinkClick: function (e) {
            self._onLinkClick(e);
          },
          //endregion
          //region basicShape
          callbackOnCircleDblclick: function (e) {
            self._onCircleDblclick(e);
          }
          //endregion
        };
        this.gisObj.Api.init(this.id, iX, iY, iZoom4Init, oOptions, eventOptions, this.gisObj);
      },
      setCenter: function (iX, iY, iZoom4Init) {
        this.gisObj.Api.setCenter(iX, iY, iZoom4Init, this.gisObj);
      },
      showOrHide: function (bIsShow) {
        this.isShow = bIsShow ? "block" : "none";
      },
      setConfig: function (oConfig) {
        this.gisObj.Api.setConfig(oConfig, this.gisObj);
      },
      resize: function () {
        this.gisObj.Api.resize(this.gisObj);
      },
      //#endregion

      //#region Layer
      findById: function (strId) {
        var oRes = this.gisObj.Api.findById(strId);
        return oRes;
      },
      getDiffLst: function (lstItemId, arrItemUiType) {
        var oRes = this.gisObj.Api.getDiffLst(lstItemId,
          arrItemUiType, this.gisObj);
        return oRes;
      },
      toGeoJSON: function () {
        var oRes = this.gisObj.Api.toGeoJSON(this.gisObj);
        return oRes;
      },
      changeLayerUrl: function (strUrl) {
        this.gisObj.Api.changeLayerUrl(strUrl, this.gisObj)
      },
      //#endregion

      //#region topo
      draw: function (oTopoData) {
        this.gisObj.Api.draw(oTopoData, this.gisObj);
      },
      getTopoData: function () {
        return this.gisObj.Api.getTopoData(this.gisObj);
      },
      clearPreviewTopo: function () {
        return this.gisObj.Api.clearPreviewTopo(this.gisObj);
      },
      //#endegion

      //#region Marker/Icon/DivIcon
      addMarker: function (strId, iX, iY, strImgClass, iImgWidth,
                           oBuObj) {
        this.gisObj.Api.addMarker(strId, iX, iY,
          strImgClass, iImgWidth, oBuObj, this.gisObj);
      },
      delMarker: function (strId) {
        this.gisObj.Api.delMarker(strId, this.gisObj);
      },
      setImgUrl: function (strId, strImgClass, iImgWidth) {
        this.gisObj.Api.setImgUrl(strId, strImgClass, iImgWidth, this.gisObj);
      },
      setImgSize: function (strId, strImgClass, iImgWidth) {
        this.gisObj.Api.setImgSize(strId, strImgClass, iImgWidth, this.gisObj);
      },
      setOpacity4Marker: function (strId, iOpacity) {
        this.gisObj.Api.setOpacity4Marker(strId, iOpacity,
          this.gisObj);
      },
      setPos4Marker: function (strId, iX, iY) {
        this.gisObj.Api.setPos4Marker(strId, iX, iY,
          this.gisObj);
      },
      setTips4Marker: function (strId, strTips) {
        this.gisObj.Api.setTips4Marker(strId, strTips,
          this.gisObj);
      },
      setBuObj4Marker: function (strId, oBuObj) {
        this.gisObj.Api.setBuObj4Marker(strId, oBuObj, this.gisObj);
      },
      setHide4Marker: function (strId, bIsHide) {
        this.gisObj.Api.setHide4Marker(strId, bIsHide, this.gisObj);
      },
      addAttachedIcon4Marker: function (strId, strImgUrl) {
        this.gisObj.Api.addAttachedIcon4Marker(strId, strImgUrl, this.gisObj);
      },
      delAttachedIcon4Marker: function (strId) {
        this.gisObj.Api.delAttachedIcon4Marker(strId, this.gisObj);
      },
      createMarker: function (oBuObj, oAfterCallback, bAutoCreate) {
        this.gisObj.Api.createMarker(oBuObj, oAfterCallback, bAutoCreate, this.gisObj);
      },
      showAllLabel: function () {
        this.gisObj.Api.showAllLabel(this.gisObj);
      },
      hideAllLabel: function () {
        this.gisObj.Api.hideAllLabel(this.gisObj);
      },
      showLabelByIds: function (arrIds) {
        this.gisObj.Api.showLabelByIds(arrIds, this.gisObj);
      },
      hideLabelByIds: function (arrIds) {
        this.gisObj.Api.hideLabelByIds(arrIds, this.gisObj);
      },
      //#endregion

      //#region Circle
      addCircle: function (strId, iX, iY, iR,
                           oBuObj) {
        this.gisObj.Api.addCircle(strId, iX, iY, iR, oBuObj, this.gisObj);
      },
      delCircle: function (strId) {
        this.gisObj.Api.delCircle(strId, this.gisObj);
      },
      //#endregion

      //#region Polygon
      addPolygon: function (strId, arrPoints, oBuObj) {
        this.gisObj.Api.addPolygon(strId, arrPoints, oBuObj,
          this.gisObj);
      },
      delPolygon: function (strId) {
        this.gisObj.Api.delPolygon(strId, this.gisObj);
      },
      //#endregion

      //#region Group
      expandAllGroup: function (strUiType) {
        this.gisObj.Api.expandAllGroup(strUiType, this.gisObj);
      },
      collapseAllGroup: function (strUiType) {
        this.gisObj.Api.collapseAllGroup(strUiType, this.gisObj);
      },
      delGroup: function (strId) {
        this.gisObj.Api.delGroup(strId, this.gisObj);
      },
      setOpacity4Group: function (strId, iOpacity) {
        this.gisObj.Api.setOpacity4Group(strId, iOpacity, this.gisObj);
      },
      //#endregion

      //#region link
      delPolyline: function (strId) {
        this.gisObj.Api.delPolyline(strId, this.gisObj);
      },
      setOpacity4Link: function (strId, iOpacity) {
        this.gisObj.Api.setOpacity4Link(strId, iOpacity, this.gisObj);
      },
      setColor4Link: function (strId, oColor, oGis) {
        this.gisObj.Api.setColor4Link(strId, oColor, this.gisObj);
      },
      //#endregion

      //#endregion

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .gisMap {
    width: 100%;
    height: 100%;
  }

  .dpn {
    display: none;
  }
</style>
