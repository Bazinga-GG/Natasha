<template>
  <div class="gridWrapper" :class="{gridWrapper4Grid:!isTree}" v-show="nodeItemInner.isShow">
    <table class="gridCont" cellspacing="0" cellpadding="0">
      <tbody>
      <tr @click.stop="callback4OnClickRow(nodeItemInner)" :class="{gridTreeActiveRow:hasActiveStatus&&(currentActiveRow!= undefined)&&(nodeItemInner.id == currentActiveRow.id)}">
        <td v-for="(title,index) in titles" v-bind:style="{width: title.width}" v-show="title.visible">
          <div v-if="_isTreeNodeCell(title)" v-bind:style="_calcTreeNodeCellStyle(nodeItemInner)">
            <div class="treeItemIcon" v-bind:class="_openEx(nodeItemInner)"
                 v-on:click="_toggle(nodeItemInner)"></div>
            <div class="treeItemCheck" v-if="nodeItemInner.hasCheckbox">
              <input class="treeitemCheckbox" type="checkbox" v-model="nodeItemInner.isCheck"
                     v-bind:id="'title_' + nodeItemInner.id"
                     v-on:change.stop="_onCheckboxClick">
            </div>
            <div class="treeItemCheck" v-if="nodeItemInner.hasRadiobox">
              <input class="treeitemCheckbox" type="radio" :checked='nodeItemInner.isCheck'
                     v-bind:id="'title_' + nodeItemInner.id"
                     v-on:click.stop="_onRadioboxClick">
            </div>
            <div class="treeItemName" :class="{treeItemName4Grid:!isTree}" :title="_getTdValue(title, nodeItemInner)">
              {{_getTdValue(title, nodeItemInner)}}
            </div>
          </div>
          <div v-else class="treeItemName" :class="{treeItemName4Grid:!isTree}">
            <!--列支持文本类型-->
            <div v-if="title.type=='text'">
              <div class="textCell" :title="_getTdValue(title, nodeItemInner)">
                <span class="textCellItem" :class="{textCellItem4Grid:!isTree}" v-html="_getTdValue(title, nodeItemInner)"></span>
              </div>
            </div>
            <!--列支持输入框类型-->
            <div v-if="title.type == 'input'">
              <div class="inputWrapper">
                <input type="text" class="inputDefault"
                       :value="_getTdValue(title, nodeItemInner)"
                       :title="_getTdValue(title, nodeItemInner)"
                       @click.stop
                       @keyup.enter="_editRowFinished(title.key, nodeItemInner, $event)"
                       @blur="_editRowFinished(title.key, nodeItemInner, $event)">
              </div>
            </div>
            <!--列支持图标类型-->
            <div v-if="title.type == 'icon'">
              <span class="iconOnly"
                    v-for="icon in _getTdValue(title,nodeItemInner)"
                    :class="[icon.value, {disableIcon:icon.isDisable}]"
                    :style="{color:icon.color}"
                    :title="icon.title"
                    @click.stop="_onIconClick(title.key, nodeItemInner, icon)">
              </span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td :colspan="titles.length">
          <template v-if="_showChildren(nodeItemInner)" v-for="oNodeChildItem in nodeItemInner.children">
            <marvel-grid-tree-node :key="oNodeChildItem.nodeLevel + oNodeChildItem.name" :nodeItem="oNodeChildItem"
                                   :titles="titles"
                                   :isTree="isTree"
                                   :currentActiveRow="currentActiveRow"
                                   @onCheckOrNotRecussionTreeNode="onCheckOrNotRecussionTreeNode"
                                   @onExpandOrNotTreeNode="onExpandOrNotTreeNode"
                                   @onClickRow="callback4OnClickRow"
                                   @onIconClick="onIconClick">
            </marvel-grid-tree-node>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  /**
   *  MarvelGridTreeNode widget description
   *  @vuedoc
   *  @exports MarvelGridTreeNode
   */
  export default {
    name: 'MarvelGridTreeNode',
    props: {
      nodeItem: {
        type: Object,
        default: undefined,
        required: true,
      },
      currentActiveRow: {
        type: Object,
        default: undefined,
        required: false,
      },
      titles: {
        type: Array,
        default: undefined,
        required: true,
      },
      editCellFinished: {
        type: Function,
        required: false,
      },
      isTree:{
        type: Boolean,
        default: true,
        required: false,
      },
      hasActiveStatus:{
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        nodeItemInner: {},
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    watch: {
      nodeItem: {
        handler: function () {
          this._handlerNodeItem();
        },
        deep: true,
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this._handlerNodeItem();
      },

      //#endregion

      _handlerNodeItem: function () {
        this.nodeItemInner = JSON.parse(JSON.stringify(this.nodeItem));
        if (this.nodeItem.isInitExpand == false) {
          this.$set(this.nodeItemInner, "isExpand", false);
        } else {
          this.$set(this.nodeItemInner, "isExpand", true);
        }
        if (this.nodeItem.isInitCheck == false) {
          this.$set(this.nodeItemInner, "isCheck", false);
        } else {
          this.$set(this.nodeItemInner, "isCheck", true);
        }
      },
      _getTdValue: function (title) {
        var strKey = title.key;
        var strValue = "";
        strValue = this.nodeItemInner[strKey];
        return strValue
      },
      _showChildren: function () {
        if (this.nodeItemInner.children
          && this.nodeItemInner.children.length > 0
          && this.nodeItemInner.isExpand) {
          return true;
        } else {
          return false;
        }
      },
      _openEx: function (nodeItemInner) {
        if (nodeItemInner.children && nodeItemInner.children.length) {
          return nodeItemInner.isExpand ? ['icon-marvelIcon-64'] : ['icon-marvelIcon-65'];
        } else {
          return [""];
        }
      },
      _toggle: function (nodeItemInner) {
        nodeItemInner.isExpand = !nodeItemInner.isExpand;
        this.callback4OnExpandOrNotTreeNode(nodeItemInner.isExpand, nodeItemInner);
      },
      onExpandOrNotTreeNode: function (isExpand, nodeItemInner) {
        this.callback4OnExpandOrNotTreeNode(isExpand, nodeItemInner);
      },
      _isTreeNodeCell: function (oTitle) {
        return oTitle.isTreeNodeCell;
      },
      _calcTreeNodeCellStyle: function () {
        return {
          "margin-left": (this.nodeItemInner.nodeLevel - 1) * 16 + "px"
        }
      },
      _onCheckboxClick: function (event) {
        var isCheck = event.target.checked;
        this.callback4OnCheckOrNotRecussionTreeNode(isCheck, this.nodeItemInner);
      },
      _onRadioboxClick: function (event) {
        var isCheck = !this.nodeItemInner.isCheck;
        this.callback4OnCheckOrNotRecussionTreeNode(isCheck, this.nodeItemInner)
      },
      onCheckOrNotRecussionTreeNode: function (isCheck, nodeItemInner) {
        this.callback4OnCheckOrNotRecussionTreeNode(isCheck, nodeItemInner)
      },
      _editRowFinished: function (strKeyVal, nodeItemInner, oEvent) {
        let oOldVal = nodeItemInner[strKeyVal];
        let oNewVal = oEvent.target.value;
        if (this.editCellFinished) {
          this.editCellFinished(nodeItemInner, oOldVal, oNewVal, () => {
            nodeItemInner[strKeyVal] = oNewVal;//外界对值进行校验，校验通过调用该回调
          }, () => {
            if (undefined == oOldVal) {
              oOldVal = '';
            }
            oEvent.target.value = oOldVal;//校验不通过调用该回调
          });
        }
      },
      _onIconClick: function (strKeyVal, nodeItemInner, oIcon) {
        this.callback4OnIconClick(nodeItemInner, oIcon);
      },
      onIconClick: function (nodeItemInner, oIcon) {
        this.callback4OnIconClick(nodeItemInner, oIcon);
      },

      //#endregion
      //#region callback

      callback4OnClickRow: function (nodeItemInner) {
        this.$emit("onClickRow", nodeItemInner);
      },
      callback4OnIconClick: function (nodeItemInner, oIcon) {
        this.$emit("onIconClick", nodeItemInner, oIcon);
      },
      callback4OnCheckOrNotRecussionTreeNode: function (isCheck, nodeItemInner) {
        this.$emit("onCheckOrNotRecussionTreeNode", isCheck, nodeItemInner);
      },
      callback4OnExpandOrNotTreeNode: function (isExpand, nodeItemInner) {
        this.$emit("onExpandOrNotTreeNode", isExpand, nodeItemInner);
      },

      //#endregion
      //#region 3rd
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

  .gridWrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
  }

  .gridWrapper table tbody tr, td {
    padding-top: 2px;
  }

  .gridWrapper table tbody tr {
    display: table;
    width: 100%;
  }

  .gridWrapper4Grid table tbody tr{
    table-layout: fixed;
  }

  .gridCont table tbody tr:first-child:hover {
    background-color: #eaf6f9;
  }

  .gridCont {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .gridTreeActiveRow{
    background-color: #60b0ff !important;
  }

  .expandBorder {
    border-bottom: 1px solid #cccccc;
  }

  .treeItemIcon {
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: #000000;
    line-height: 16px;
    cursor: pointer;
    float: left;
    margin-top: 7px;
  }

  .treeItemCheck {
    float: left;
    height: 12px;
    width: 12px;
    position: relative;
    margin-right: 4px;
    margin-top: 3px;
  }

  .treeitemCheckbox {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0;
    top: 6px;
    left: 0;
  }

  .treeItemName,.textCellItem{
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
  }

  .treeItemName4Grid,.textCellItem4Grid{
    overflow: hidden;
  }

  .iconOnly {
    padding-left: 5px;
    margin-right: 5px;
  }

  .iconOnly:hover {
    cursor: pointer;
  }

  .disableIcon{
    color: #666 !important;
    pointer-events: none;
  }

</style>
