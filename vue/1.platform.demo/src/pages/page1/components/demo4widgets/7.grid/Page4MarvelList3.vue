<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelList3</div>
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
            <div style="height: 350px">
              <marvel-list3 :listItems="listItems"
                            v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="height: 350px">
              <marvel-list3 :listItems="listItems"
                            v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
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
      <marvel-i-frame ref="page4MarvelList3IFrame" id="page4MarvelList3IFrame" src="static/jsdoc/module-MarvelList3.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelList3 from "^/widget/list/MarvelList3";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelList3',
    components: {
      MarvelList3,
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
        listItems: [{
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/image/others/node1.svg",
          btnName: "添加",
        }, {
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/image/others/node1.svg",
          btnName: "添加",
        }, {
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/image/others/node1.svg",
          btnName: "添加",
        }, {
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/image/others/node1.svg",
          btnName: "添加",
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
        this.$refs.page4MarvelList3IFrame.setIframe4DemoPage();
      },

      //#endregion

      onBtnClick4List: function (oListItem) {
        console.log(oListItem);
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
