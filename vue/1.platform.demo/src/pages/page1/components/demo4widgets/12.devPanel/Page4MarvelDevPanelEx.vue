<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelDevPanelEx</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 100%;height: 500px;">
              <button @click="onClickRemoveNode">removeNode</button>
              <button @click="onClickSetActiveStyle">设置选中样式</button>
              <button @click="onClickRemoveAllActiveStyle">清除所有选中样式</button>
<!--              <button @click="onClickExportPng">导出png</button>-->
              <div style="width: 400px; height: 450px">
                <marvel-dev-panel-ex ref="ref4DevPanelEx" domId="rackPanel"
                                     @callbackOnClick="callbackOnClick"
                                     @callbackOnContextmenu="callbackOnContextmenu"></marvel-dev-panel-ex>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width: 100%;height: 500px;">
              <button @click="onClickRemoveNode">removeNode</button>
              <button @click="onClickSetActiveStyle">设置选中样式</button>
              <button @click="onClickRemoveAllActiveStyle">清除所有选中样式</button>
              <div style="width: 400px; height: 450px">
                <marvel-dev-panel-ex ref="ref4DevPanelEx" domId="rackPanel"
                                     @callbackOnClick="callbackOnClick"
                                     @callbackOnContextmenu="callbackOnContextmenu"></marvel-dev-panel-ex>
              </div>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelDevPanelExIFrame" id="page4MarvelDevPanelExIFrame" src="static/jsdoc/module-MarvelDevPanelEx.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelDevPanelEx from "^/widget/devPanelEx/MarvelDevPanelEx";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelDevPanelEx',
    components: {
      MarvelDevPanelEx,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data

        //#endregion
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.$refs.page4MarvelDevPanelExIFrame.setIframe4DemoPage();

        var options = {
          buObjId: "jigui_1",
          imgUrl: "static/image/devPanelEx/rack1.txt",
          subBuObjs: [{id: "bd0", dir: 0}, {id: "bd1", dir: 0}, {id: "bd2", dir: 0}, {id: "bd3", dir: 0}, {
            id: "bd4",
            dir: 0
          }]
        };
        this.$refs.ref4DevPanelEx.init(options);
      },

      //#endregion

      callbackOnClick: function (strBuObjId, strSubBuObjId, evt) {
        if (strSubBuObjId == "bd1") {
          this.$refs.ref4DevPanelEx.addNode(strSubBuObjId, {imgUrl: "static/image/devPanelEx/dev1.txt"}, function () {
            console.log("add successfully");
          }, {
            callbackOnClick: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnClick" + strSlotId);
            },
            callbackOndblClick: function (strSlotId, oBuObj, evt) {
              console.log("callbackOndblClick" + strSlotId);
            },
            callbackOnContextmenu: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnContextmenu" + strSlotId);
            }
          });
        }
        else if (strSubBuObjId == "bd3") {
          this.$refs.ref4DevPanelEx.addNode(strSubBuObjId, {imgUrl: "static/image/devPanelEx/dev1.txt"}, function () {
            console.log("add successfully");
          }, {
            callbackOnClick: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnClick" + strSlotId);
            },
            callbackOndblClick: function (strSlotId, oBuObj, evt) {
              console.log("callbackOndblClick" + strSlotId);
            },
            callbackOnContextmenu: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnContextmenu" + strSlotId);
            }
          });
        }
      },
      callbackOnContextmenu: function (strBuObjId, strSubBuObjId, evt) {
        console.log(strSubBuObjId);
      },
      callbackOndblClick: function (strBuObjId, strSubBuObjId, evt) {
        console.log("callbackOndblClick:" + strSubBuObjId);
      },
      onClickRemoveNode: function () {
        this.$refs.ref4DevPanelEx.removeNode("bd1");
      },
      onClickSetActiveStyle: function () {
        this.$refs.ref4DevPanelEx.setActiveStyle("bd1");
      },
      onClickRemoveAllActiveStyle: function () {
        this.$refs.ref4DevPanelEx.removeAllActiveStyle();
      },
      onClickExportPng: function () {
        this.$refs.ref4DevPanelEx.exportPng("nb.png");
      }

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>
  /*document fix style start*/
  .widgetShowSession {
    padding: 20px 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .title {
    color: #4d4d4d;
  }

  .level1 {
    font-size: 32px;
    line-height: 54px;
  }

  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }

  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .showAreaInner {
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    height: 400px;
  }

  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
