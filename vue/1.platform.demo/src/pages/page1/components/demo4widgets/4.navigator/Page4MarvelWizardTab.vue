<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelWizardTab</div>
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
            <div>
              <button v-on:click="setWarn">setWarn</button>
              <button v-on:click="setNotWarn">setNotWarn</button>
              <button v-on:click="setItemActive">setItemActive</button>
              <marvel-wizard-tab ref="ref4WizardTabs"
                                 :wizardTabs="wizardTabs" v-on:onClick="onClickWizardTab"></marvel-wizard-tab>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div>
              <button v-on:click="setWarn">setWarn</button>
              <button v-on:click="setNotWarn">setNotWarn</button>
              <button v-on:click="setItemActive">setItemActive</button>
              <marvel-wizard-tab ref="ref4WizardTabs"
                                 :wizardTabs="wizardTabs" v-on:onClick="onClickWizardTab"></marvel-wizard-tab>
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
      <marvel-i-frame ref="page4MarvelWizardTabIFrame" id="page4MarvelWizardTabIFrame" src="static/jsdoc/module-MarvelWizardTab.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelWizardTab from "^/widget/wizard/MarvelWizardTab";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelWizardTab',
    components: {
      MarvelWizardTab,
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
        wizardTabs: [{
          index: 1,
          label: "拓扑还原",
          isActive: true,
          isWarn: false
        }, {
          index: 2,
          label: "业务还原",
          isActive: false,
          isWarn: true
        },{
          index: 3,
          label: "业务还原",
          isActive: false,
          isWarn: false
        }]
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
        this.$refs.page4MarvelWizardTabIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClickWizardTab: function (oItem) {
        console.log(oItem.index);
      },
      setWarn: function () {
        this.$refs.ref4WizardTabs.setItemWarnOrNot([1], true);
      },
      setNotWarn: function () {
        this.$refs.ref4WizardTabs.setItemWarnOrNot([1], false);
      },
      setItemActive: function(){
        this.$refs.ref4WizardTabs.setItemActive([3]);
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
