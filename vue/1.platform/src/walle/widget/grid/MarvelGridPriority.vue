<template>
  <div class="marvelGridPriorityWrapper">
    <div class="priorityLeftPart">
      <div class="priorityTitle">
        <div class="priorityItemIndex" style="width: 240px;">{{col1Title}}</div>
        <div class="priorityItemName" :style="itemNameWidth">{{col2Title}}</div>
        <div v-for="title in customTitles" :style="{width:title.width + 'px'}" class="priorityItemCustom">{{title.name}}</div>
      </div>
      <div class="priorityItem"
           v-for="(item, index) in list"
           v-on:click="onClickItem(item, index)"
           v-bind:class="{isSelected:currentSelectItemIndex == index}">
        <div class="priorityItemIndex" style="width: 240px;">{{index + 1}}</div>
        <div class="priorityItemName" :style="itemNameWidth">{{item.name}}</div>
        <div class="priorityItemCustom" v-for="customItem in item.customItems"
             :style="{width:_getCustomWByKey(customItem.key),color:customItem.color}" :class="customItem.icon">{{customItem.value}}</div>
      </div>
    </div>
    <div class="priorityRightPart">
      <div class="changePriorityBtns">
        <div class="changePriorityBtn icon-marvelIcon-05" v-on:click="onClickToFirst"></div>
        <div class="changePriorityBtn icon-marvelIcon-22" v-on:click="onClickUp"></div>
        <div class="changePriorityBtn icon-marvelIcon-24" v-on:click="onClickDown"></div>
        <div class="changePriorityBtn icon-marvelIcon-07" v-on:click="onClickToLast"></div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelGridPriority widget description
   *  @vuedoc
   *  @exports MarvelGridPriority
   */
  export default {
    components: {},
    name: 'MarvelGridPriority',
    props: {
      col1Title: {
        type: String,
        default: "Left",
        required: false,
      },
      col2Title: {
        type: String,
        default: "Right",
        required: false,
      },
      list: {
        type: Array,
        default: undefined,
        required: true,
      },
      hasJudgeBeforeItemClick: {
        type: Boolean,
        default: false,
        required: false,
      },
      customTitles: {
        type: Array,
        default: function () {
          return []
        },
        required: false,
      },
    },
    data: function () {
      return {
        currentSelectItemIndex: 0
      }
    },
    computed:{
      itemNameWidth: function () {
        var iIndexW = 240;
        var iBorderW = 2;
        var iCustomTitleW = 0;
        for(var i = 0; i<this.customTitles.length; i++){
          iCustomTitleW = iCustomTitleW + parseInt(this.customTitles[i].width) + 1;
        }

        return {width: 'calc(100% - ' + (iIndexW + iBorderW + iCustomTitleW )+ 'px)'}
      },
    },
    methods: {
      //#region inner

      onClickItem: function (oItem, index) {
        if(this.hasJudgeBeforeItemClick){
          this.callback4OnClickItem(oItem, index);
        }else{
          this.currentSelectItemIndex = index;
          this.callback4OnClickItem(oItem, index);
        }
      },
      onClickToFirst: function () {
        for (; ;) {
          if (this.list[this.currentSelectItemIndex - 1]) {
            this.onClickUp();
          } else {
            break;
          }
        }
      },
      onClickUp: function () {
        if (this.list[this.currentSelectItemIndex - 1]) {
          var oTemporaryListItemName = this.list[this.currentSelectItemIndex - 1].name;
          this.list[this.currentSelectItemIndex - 1].name = this.list[this.currentSelectItemIndex].name;
          this.list[this.currentSelectItemIndex].name = oTemporaryListItemName;

          var oTemporaryListItemId = this.list[this.currentSelectItemIndex - 1].id;
          this.list[this.currentSelectItemIndex - 1].id = this.list[this.currentSelectItemIndex].id;
          this.list[this.currentSelectItemIndex].id = oTemporaryListItemId;

          this.currentSelectItemIndex = this.currentSelectItemIndex - 1;
          this.callback4AfterPriorityListChange();
        }
      },
      onClickDown: function () {
        if (this.list[this.currentSelectItemIndex + 1]) {
          var oTemporaryListItemName = this.list[this.currentSelectItemIndex + 1].name;
          this.list[this.currentSelectItemIndex + 1].name = this.list[this.currentSelectItemIndex].name;
          this.list[this.currentSelectItemIndex].name = oTemporaryListItemName;

          var oTemporaryListItemId = this.list[this.currentSelectItemIndex + 1].id;
          this.list[this.currentSelectItemIndex + 1].id = this.list[this.currentSelectItemIndex].id;
          this.list[this.currentSelectItemIndex].id = oTemporaryListItemId;

          this.currentSelectItemIndex = this.currentSelectItemIndex + 1;
          this.callback4AfterPriorityListChange();
        }
      },
      onClickToLast: function () {
        for (; ;) {
          if (this.list[this.currentSelectItemIndex + 1]) {
            this.onClickDown();
          } else {
            break;
          }
        }
      },

      _getCustomWByKey: function(strKey){
        for(var i = 0; i<this.customTitles.length; i++){
          if(this.customTitles[i].key == strKey){
            return this.customTitles[i].width + 'px';
          }
        }
      },

      //#endregion
      //#region callback

      callback4AfterPriorityListChange: function () {
        this.$emit("afterPriorityListChange", this.list);
      },
      callback4OnClickItem: function(oItem, index){
        this.$emit("onClickItem", oItem, index);
      },

      //#endregion
      //#region 3rd

      selectItem: function (strItemId) {
        var iIndex = this.list.findIndex(function (oItem) {
          return oItem.id == strItemId;
        });

        if (iIndex >= 0) {
          this.currentSelectItemIndex = iIndex;
        }
      }

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

  .marvelGridPriorityWrapper {
    width: 100%;
    height: 100%;
    border: 1px solid #d5d5d5;
    background-color: #f0f0f0;
    box-sizing: border-box;
  }

  .priorityLeftPart {
    width: calc(100% - 46px);
    height: 100%;
    float: left;
    border-right: 1px solid #d5d5d5;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .priorityTitle {
    height: 32px;
    border-bottom: 1px dashed #d5d5d5;
    background-color: #f0f0f0;
  }

  .priorityTitle .priorityItemIndex, .priorityTitle .priorityItemName {
    color: #4d4d4d;
  }

  .priorityItem {
    height: 32px;
    border-bottom: 1px dashed #d5d5d5;
  }

  .priorityItemIndex {
    height: 100%;
    float: left;
    border-right: 1px dashed #d5d5d5;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
  }

  .priorityItemName {
    height: 100%;
    float: left;
    padding: 0 10px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
    text-align: center;
  }

  .priorityItemCustom {
    height: 100%;
    float: left;
    padding: 0 10px;
    border-left: 1px dashed #d5d5d5;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
    text-align: center;
  }

  .isSelected {
    background-color: #3399ff;
  }

  .isSelected .priorityItemIndex {
    color: #ffffff;
  }

  .isSelected .priorityItemName {
    color: #ffffff;
  }

  .isSelected .priorityItemCustom{
    color: #ffffff !important;
  }

  .priorityRightPart {
    width: 46px;
    float: left;
    height: 100%;
  }

  .changePriorityBtns {
    height: 184px;
    position: relative;
    top: 50%;
    margin-top: -92px;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .changePriorityBtn {
    height: 26px;
    text-align: center;
    border-radius: 100%;
    background-color: #3399ff;
    font-size: 12px;
    line-height: 26px;
    color: #ffffff;
    margin: 16px 0;
    cursor: pointer;
  }

  /*region dark theme*/

  .dark .marvelGridPriorityWrapper {
    border: 1px solid #293053;
    background-color: #1e1f36;
  }

  .dark .priorityLeftPart {
    border-right: 1px solid #293053;
  }

  .dark .priorityTitle {
    border-bottom: 1px dashed #293053;
    background-color: #222945;
  }

  .dark .priorityTitle .priorityItemIndex, .dark .priorityTitle .priorityItemName {
    color: #ffffff;
  }

  .dark .priorityItem {
    border-bottom: 1px dashed #293053;
  }

  .dark .priorityItemIndex {
    border-right: 1px dashed #293053;
    color: #8b90b3;
  }

  .dark .priorityItemName {
    color: #8b90b3;
  }

  .dark .isSelected {
    background-color: #3dcca6;
  }

  .dark .isSelected .priorityItemIndex {
    color: #ffffff;
  }

  .dark .isSelected .priorityItemName {
    color: #ffffff;
  }

  .dark .changePriorityBtn {
    background-color: #3dcca6;
    color: #ffffff;
  }

  /*endregion*/
</style>
