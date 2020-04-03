<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelTablePanel</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="describe">
      MarvelTablePanel - 横向
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="showFirstOnly">showFirstOnly</button>
            <button v-on:click="showSecondOnly">showSecondOnly</button>
            <button v-on:click="showAll">showAll</button>
            <div style="height: 310px;border: 1px solid #d5d5d5;margin-top: 20px">
              <marvel-table-panel ref="tablePanel1">
                <div slot="firstDiv" style="height: 100%; background-color: #e99d99"></div>
                <div slot="secondDiv" style="height: 100%; background-color: #9dd6e9"></div>
              </marvel-table-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <br><br>

    <div class="describe">
      dashboard - 适应内容高度
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="showFirstOnly2">showFirstOnly</button>
            <button v-on:click="showSecondOnly2">showSecondOnly</button>
            <button v-on:click="showAll2">showAll</button>
            <div style="height: 310px;border: 1px solid #d5d5d5;margin-top: 20px">
              <marvel-table-panel  ref="tablePanel2" divDirection="horizontal">
                <div slot="firstDiv" style="height: 100%; background-color: #e99d99"></div>
                <div slot="secondDiv" style="height: 100%; background-color: #9dd6e9"></div>
              </marvel-table-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelDashboardIFrame" id="page4MarvelDashboardIFrame" src="static/jsdoc/module-MarvelDashboardC.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelTablePanel from "./MarvelTablePanel";

  export default {
    name: 'page4MarvelTablePanel',
    components: {
      MarvelTablePanel,
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
        tabItems2: [{
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
        this.$refs.page4MarvelDashboardIFrame.setIframe4DemoPage();
      },

      //#endregion

      showFirstOnly: function () {
        this.$refs.tablePanel1.showFirstOnly()
      },

      showSecondOnly: function () {
        this.$refs.tablePanel1.showSecondOnly()
      },

      showAll: function () {
        this.$refs.tablePanel1.showAll()
      },

      showFirstOnly2: function () {
        this.$refs.tablePanel2.showFirstOnly()
      },

      showSecondOnly2: function () {
        this.$refs.tablePanel2.showSecondOnly()
      },

      showAll2: function () {
        this.$refs.tablePanel2.showAll()
      },

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
