<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelRadioBox</div>
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
            <button v-on:click="onClick4Radio">getStatus</button>
            <br>
            <marvel-radio-box ref="ref0" id="id1" group="group1"
                              label="x1" :showLabel=false></marvel-radio-box>
            <marvel-radio-box ref="ref1" id="id2" group="group1"
                              label="x2" :showLabel=true v-on:onChange="onChange4Radio"></marvel-radio-box>
            <br>
            <marvel-radio-box ref="ref2" id="id3" group="group2"
                              label="x3" :showLabel="true"></marvel-radio-box>
            <marvel-radio-box ref="ref3" id="id4" group="group2"
                              label="x4" :showLabel="true"></marvel-radio-box>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="onClick4Radio">getStatus</button>
            <br>
            <marvel-radio-box ref="ref0" id="id1" group="group1"
                              label="x1" :showLabel=false></marvel-radio-box>
            <marvel-radio-box ref="ref1" id="id2" group="group1"
                              label="x2" :showLabel=true v-on:onChange="onChange4Radio"></marvel-radio-box>
            <br>
            <marvel-radio-box ref="ref2" id="id3" group="group2"
                              label="x3" :showLabel="true"></marvel-radio-box>
            <marvel-radio-box ref="ref3" id="id4" group="group2"
                              label="x4" :showLabel="true"></marvel-radio-box>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelRadioBoxIFrame" id="page4MarvelRadioBoxIFrame" src="static/jsdoc/module-MarvelRadioBox.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelRadioBox from "^/widget/select/MarvelRadioBox";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelRadioBox',
    components: {
      MarvelRadioBox,
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
        this.$refs.page4MarvelRadioBoxIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClick4Radio: function(){
        console.log("[Radio]getStatus..." +
          this.$refs.ref0.getCheckItem() + "," +
          this.$refs.ref1.getCheckItem());
      },
      onChange4Radio: function(strOldVal, strNewVal){
        console.log("[Radio]change..." + strNewVal);
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
