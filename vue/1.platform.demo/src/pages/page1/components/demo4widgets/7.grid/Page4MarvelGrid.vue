<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelGrid</div>
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
            <div style="width:500px;height:300px;">
              <marvel-grid :titles="titles" :rows="rows" :inputMsgs="inputMsgs" gridId="demo"
                           v-on:onClickRow="onClickRow"
                           v-on:onIconClick="onIconClick"
                           v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                           v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                           v-on:updateRow="updateRow"
                           v-on:onRowRadionCheckOrUnCheck="onRowRadionCheckOrUnCheck"></marvel-grid>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width:500px;height:300px;">
              <marvel-grid :titles="titles" :rows="rows" :inputMsgs="inputMsgs" gridId="demo"
                           v-on:onClickRow="onClickRow"
                           v-on:onIconClick="onIconClick"
                           v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                           v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                           v-on:updateRow="updateRow"
                           v-on:onRowRadionCheckOrUnCheck="onRowRadionCheckOrUnCheck"></marvel-grid>
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
      <marvel-i-frame ref="page4MarvelGridIFrame" id="page4MarvelGridIFrame" src="static/jsdoc/module-MarvelGrid.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelGrid from "^/widget/grid/MarvelGrid";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelGrid',
    components: {
      MarvelGrid,
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
        titles: [{
          label: "列1",
          width: "25%",
          type: "checkBox"
        }, {
          label: "列2",
          width: "25%"
        }, {
          label: "列3",
          width: "25%"
        }, {
          label: "列4",
          width: "25%"
        }],
        skip: 0,
        limit: 10,
        rows: [],
        inputMsgs: [],
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
        this.$refs.page4MarvelGridIFrame.setIframe4DemoPage();

        this.rows = [];
        //1.
        for (var i = 0; i < 2; i++) {
          var oRow = [];
          for (var j = 0; j < 4; j++) {
            if (j == 0) {
              var oCell = {
                value: "value" + i,
                type: "checkBox",
                isCheck: false
              };
            }
            else if (j == 1) {
              var oCell = {
                value: "value" + i,
                type: "input"
              };
              this.inputMsgs.push(oCell.value);
            }
            else {
              var oCell = {
                value: "value" + i,
                type: "text"
              };
            }
            oRow.push(oCell);
          }
          this.rows.push(oRow);
        }
      },

      //#endregion

      onClickRow: function (oRow) {
        console.log(oRow);
      },
      onIconClick: function (oRow, oCell) {
        console.log(oRow);
        console.log(oCell);
      },
      onTitleCheckOrUncheck: function (oRow) {
        console.log("onTitleCheckOrUncheck" + oRow);
      },
      onRowCheckOrUnCheck: function (oRow) {
        console.log("onRowCheckOrUnCheck");
      },
      updateRow: function (oRow, oCallBack) {
        console.log("updateRow");
        oCallBack(true);
      },
      onRowRadionCheckOrUnCheck: function (oRow) {
        console.log(oRow);
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
