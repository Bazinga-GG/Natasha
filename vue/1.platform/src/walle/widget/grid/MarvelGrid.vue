<template>
  <div class="gridWrapper">
    <div class="grid" v-bind:class="{ empty: 0 == rows.length }">
      <table class="gridCont" cellspacing="0" cellpadding="0" border="0">
        <thead>
        <tr>
          <th v-for="(title,index) in titles" v-bind:style="{ width: title.width }" :title="title.label">
            <div v-if="title.type == 'checkBox'" class="checkBoxWrapper">
              <div class="checkBox">
                <input type="checkbox" v-bind:id="'title_'+[gridId]+[index]"
                       v-model="checkTitleItem"
                       v-on:click="onTitleCheck">
                <label v-bind:for="'title_'+[gridId]+[index]"></label>
              </div>
            </div>
            <div v-else>
              {{title.label}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row,index) in rowsInPage" v-on:click="callback4OnClickRow(row)">
          <td v-for="(cell,iCellIndex) in row"
              v-bind:style="{ width: _getWidth(row.indexOf(cell)) }">
            <div v-if="cell.type == 'text'" :title="cell.value">
              {{ cell.value }}
            </div>
            <div v-else-if="cell.type == 'icon'">
                <span class="iconOnly"
                      v-for="icon in cell.value"
                      v-bind:class="[icon.value]"
                      v-bind:style="{ color: icon.color }"
                      :title="icon.tip"
                      v-on:click="callback4OnIconClick(row, icon)"></span>
            </div>
            <div v-else-if="cell.type == 'textIcon'">
                <span class="icon"
                      v-bind:class="[cell.value]"
                      v-bind:style="{ color: cell.color }"></span>
              <span :title="cell.label">{{ cell.label }}</span>
            </div>
            <div v-else-if="cell.type == 'checkBox'" class="checkBoxWrapper">
              <div class="checkBox">
                <input type="checkbox" v-bind:id="'row_'+[gridId]+[index]"
                       v-model="cell.isCheck"
                       v-on:click="onRowCheck(row)"/>
                <label v-bind:for="'row_'+[gridId]+[index]"></label>
              </div>
            </div>
            <div v-else-if="cell.type == 'radioBox'" class="radioWrapper">
              <div class="radio">
                <input type="radio" v-bind:id="'row_'+[gridId]+[index]"
                       v-bind:value="[index]"
                       v-bind:name="radioGroup"
                       v-model="radioGroup"
                       v-on:click="callback4OnRowRadioCheck(row)"/>
                <label v-bind:for="'row_'+[gridId]+[index]"></label>
              </div>
            </div>
            <div v-else-if="cell.type == 'input'" class="inputWrapper" id="[index]">
              <div class="radio" :class="{disable:cell.bIsDisabled}">
                <input type="text" class="inputDefault"
                       v-model="inputMsgs[skip + index]"
                       :disabled="cell.bIsDisabled"
                       @input="updateRow(index,iCellIndex)"/>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="footArea">
      <div class="foot">
        <div class="pageSwitch">
          <div class="item icon-marvelIcon-04" v-on:click="onPreClick"></div>
          <div class="item" v-for="item in pagination"
               v-bind:class="{ current: curPageIndex == item }"
               v-on:click="onPageItemClick(item)">{{ item }}
          </div>
          <div class="item icon-marvelIcon-02" v-on:click="onNextClick"></div>
        </div>
        <!--<div class="text">跳转</div><input class="pageDrop"><div class="text">页</div>-->
        <div class="text">{{$t('total')}}{{ rows.length}}{{$t('unit')}}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "zh": {
  "total": "共",
  "unit": "条"
  },
  "en": {
  "total": "Total:",
  "unit": ""
  }
  }
</i18n>

<script>
  import MarvelCheckBox from "../select/MarvelCheckBox.vue";

  /**
   *  MarvelGrid widget description
   *  @vuedoc
   *  @exports MarvelGrid
   */
  export default {
    components: {MarvelCheckBox},
    name: 'MarvelGrid',
    props: {
      titles: {
        type: Array,
        default: undefined,
        required: true,
      },
      rows: {
        type: Array,
        default: undefined,
        required: true,
      },
      limit: {
        type: Number,
        default: undefined,
        required: false,
      },
      inputMsgs: {
        type: Array,
        default: function () {
          return [];
        },
        required: false,
      },
      gridId: {
        type: String,
        default: undefined,
        required: true,
      },
    },
    data: function () {
      return {
        totalPageCount: 1,
        curPageIndex: 1,
        limitEx: 5,
        skip: 0,
        rowsInPage: [],
        //#region checkbox
        checkTitleItem: false,
        //#endregion
        //#region radio
        radioGroup: []
        //#endregion
      }
    },
    computed: {
      pagination: function () {
        var arrRes = [];

        //0.get this.totalPageCount/curPageIndex
        this.limitEx = this.limit == undefined ? 5 : this.limit;
        this.totalPageCount = Math.ceil(this.rows.length / this.limitEx);
        this.curPageIndex = this.curPageIndex;
        for (var i = 1; i <= this.totalPageCount; i++) {
          arrRes.push(i);
        }

        //1.calc this.skip
        this.skip = (this.curPageIndex - 1) * this.limitEx;

        //2.calc this.rowsInPage
        var iTmpRowCount = this.curPageIndex * this.limitEx;
        if (iTmpRowCount <= this.rows.length) {
          this.rowsInPage = this.rows.slice(this.skip, parseInt(this.skip) + parseInt(this.limitEx));
        } else {
          this.rowsInPage = this.rows.slice(this.skip, this.rows.length);
        }

        return arrRes;
      }
    },
    methods: {
      //#region inner

      _getWidth: function (iColIndex) {
        for (var i = 0; i < this.titles.length; i++) {
          if (i == iColIndex) {
            return this.titles[iColIndex].width;
          }
        }
      },
      onPreClick: function () {
        if (this.curPageIndex > 1) {
          this.curPageIndex -= 1;
        }
      },
      onPageItemClick: function (iCurPage) {
        this.curPageIndex = iCurPage;
      },
      onNextClick: function () {
        if (this.curPageIndex < this.totalPageCount) {
          this.curPageIndex += 1;
        }
      },

      //#region check

      onTitleCheck: function () {
        for (var i = 0; i < this.rows.length; i++) {
          this.rows[i][0].isCheck = this.checkTitleItem;
        }
        this.callback4OnTitleCheckOrUncheck(this.checkTitleItem);

      },
      onRowCheck: function (oRow) {
        var j = 0;
        for (var i = 0; i < this.rows.length; i++) {
          if (this.rows[i][0].isCheck) {
            this.checkTitleItem = true;
            break;
          } else {
            j++;
          }
          if (j == this.rows.length) {
            this.checkTitleItem = false;
          }
          this.callback4OnRowCheckOrUncheck(oRow);
        }
      },

      //#endregion

      //#region input

      updateRow: function (iRowIndex, iCellIndex) {
        var self = this;
        var oOldRowValue = this.rows[iRowIndex][iCellIndex].value;
        this.rows[iRowIndex][iCellIndex].value = this.inputMsgs[iRowIndex];
        this._afteUpdateRow(iRowIndex, oOldRowValue);

      },

      //#endregion

      //#region radio

      _afteUpdateRow: function (iRowIndex, oOldRowValue) {
        var self = this;
        this.callback4UpdateRow(this.rows[iRowIndex], function (bIsSuccess) {
          if (bIsSuccess) {
            //do nothing
          } else {
            self.inputMsgs[iRowIndex] = oOldRowValue;
          }
        })
      },

      //#endregion

      //#endregion
      //#region callback

      callback4OnIconClick: function (oRow, oCell) {
        this.$emit("onIconClick", oRow, oCell);
      },
      callback4OnClickRow: function (oRow) {
        this.$emit("onClickRow", oRow);
      },
      callback4OnTitleCheckOrUncheck: function (bIscheckTitleItem) {
        this.$emit("onTitleCheckOrUncheck", bIscheckTitleItem);
      },
      callback4OnRowCheckOrUncheck: function (oRow) {
        this.$emit("onRowCheckOrUnCheck", oRow);
      },
      callback4OnRowRadioCheck: function (oRow) {
        this.$emit("onRowRadionCheckOrUnCheck", oRow);
      },
      callback4UpdateRow: function (oRow, oAfterUpdate) {
        this.$emit("updateRow", oRow, oAfterUpdate)
      },

      //#endregion
      //#region 3rd

      setSkip: function (iSkip) {
        this.curPageIndex = iSkip + 1;
        this.skip = iSkip;
      },

      //#endregion
    },
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
  }

  .gridWrapper .grid {
    height: calc(100% - 32px);
  }

  .gridWrapper .empty {
    background: url("../../../../static/images/common/emptyTip2.png") no-repeat center;
    background-size: 14%;
  }

  .gridWrapper .grid .gridCont {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    border: 1px solid #ffffff;
    box-sizing: border-box;
  }

  table thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .gridWrapper .grid .gridCont thead {
    padding-right: 8px;
    position: relative;
    box-sizing: border-box;
  }

  .gridWrapper .grid .gridCont thead tr th {
    background-color: #e1e4e5;
    height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #212121;
    padding: 0 8px;
    position: relative;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 14px;
    font-weight: 100;
    text-align: center;
  }

  .gridWrapper .grid .gridCont thead tr th:last-child:after {
    content: "";
    height: 30px;
    background-color: #eee;
    width: 8px;
    display: inline-block;
    position: absolute;
    top: 0;
    right: -8px;
  }

  .gridWrapper .grid .gridCont thead tr .titleIcon {
    float: right;
  }

  .gridWrapper .grid .gridCont tbody {
    width: 100%;
    height: calc(100% - 32px);
    display: block;
    overflow-x: auto;
    overflow-y: scroll;
  }

  .gridWrapper .grid .gridCont tbody tr td {
    color: #333;
    height: 40px;
    padding: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 15px;
  }

  .gridWrapper .grid .gridCont tbody tr .icon {
    margin-right: 8px;
  }

  .gridWrapper .grid .gridCont tbody tr .iconOnly {
    float: right;
    cursor: pointer;
    margin-left: 10px;
  }

  .gridWrapper .grid .gridCont tbody tr .iconOnly:hover {
    color: #3399ff;
  }

  .gridWrapper .grid .gridCont tbody tr:nth-child(odd) {
    background-color: #f7f7f7;
  }

  .gridWrapper .grid .gridCont tbody tr:hover {
    background-color: #eaf6f9;
  }

  .gridWrapper .footArea {
    height: 32px;
    padding: 4px;
    box-sizing: border-box;
    text-align: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .gridWrapper .footArea .foot {
    display: inline-block;
    overflow: hidden;
    height: 100%;
  }

  .gridWrapper .footArea .foot .pageSwitch {
    float: left;
  }

  .gridWrapper .footArea .foot .pageSwitch .item {
    height: 100%;
    float: left;
    line-height: 26px;
    color: #666;
    padding: 0 4px;
    maring: 0 4px;
    font-size: 12px;
    cursor: pointer;
  }

  .gridWrapper .footArea .foot .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .gridWrapper .footArea .foot .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  .gridWrapper .footArea .foot .pageDrop {
    float: left;
    padding: 0 10px;
    height: 22px;
    width: 40px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 22px;
    font-size: 14px;
    color: #333;
    outline: none;
  }

  .gridWrapper .footArea .foot .text {
    height: 100%;
    float: left;
    line-height: 26px;
    color: #666;
    margin: 0 4px;
    padding: 0 4px;
    font-size: 12px;
  }

  /*region dark theme*/

  .dark .gridWrapper {
    background-color: #161C36;
  }

  .dark .grid {
  }

  .dark .empty {
  }

  .dark .grid .gridCont {
    border: 1px solid rgb(128, 128, 128);
  }

  .dark .grid .gridCont thead {
  }

  .dark .grid .gridCont thead tr th {
    background-color: #2a3255;
    color: #ffffff;
    border-bottom: 1px solid rgb(128, 128, 128);
    border-right: 1px solid rgb(128, 128, 128);
  }

  .dark .grid .gridCont thead tr th:last-child:after {
    background-color: #2a3255;
  }

  .dark .grid .gridCont thead tr .titleIcon {
  }

  .dark .grid .gridCont tbody {
  }

  .dark .grid .gridCont tbody tr td {
    color: #ffffff;
    border-bottom: 1px solid rgb(128, 128, 128);
    border-right: 1px solid rgb(128, 128, 128);
  }

  .dark .grid .gridCont tbody tr td:last-child {
    border-right: none;
  }

  .dark .grid .gridCont tbody tr td:last-child {
    color: #ffffff;
    border-right: none;
  }

  .dark .grid .gridCont tbody tr .icon {
  }

  .dark .grid .gridCont tbody tr .iconOnly {
  }

  .dark .grid .gridCont tbody tr .iconOnly:hover {
    color: #3399ff;
  }

  .dark .grid .gridCont tbody tr:nth-child(odd) {
    background-color: #161C36;
  }

  .dark .grid .gridCont tbody tr:nth-child(even) {
    background-color: #13213c;
  }

  .dark .grid .gridCont tbody tr:hover {
    background-color: #1d3b60;
  }

  .dark .footArea {
    border-top: none;
    border-bottom: 1px solid rgb(128, 128, 128);
  }

  .dark .footArea .foot {
  }

  .dark .footArea .foot .pageSwitch {
  }

  .dark .footArea .foot .pageSwitch .item {
    color: #ffffff;
  }

  .dark .footArea .foot .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .dark .footArea .foot .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  .dark .footArea .foot .pageDrop {
    border: 1px solid #ccc;
    color: #333;
  }

  .dark .footArea .foot .text {
    color: #ffffff;
  }

  /*endregion*/

  /*sl start*/
  /*check start*/
  * {
    box-sizing: border-box
  }

  .checkBoxWrapper {
    display: inline-block;
  }

  .dpn {
    display: none;
  }

  .checkBoxWrapper .checkBox {
    width: 16px;
    height: 16px;
    position: relative;
    float: left;
  }

  .checkBoxWrapper .checkBox input[type=checkbox] {
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label:after {
    /*pos*/
    /*style*/
    opacity: 1;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label {
    /*pos*/
    /*style*/
    background: #3399ff;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label:after {
    /*pos*/
    /*style*/
    border: 2px solid #999999;
    border-top: none;
    border-right: none;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label {
    /*pos*/
    /*style*/
    border: 1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .checkBoxWrapper .checkBox label {
    /*pos*/
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    /*style*/
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 2px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .checkBoxWrapper .checkBox label:hover {
    border: 1px solid #60b0ff;
  }

  .checkBoxWrapper .checkBox label:after {
    /*pos*/
    position: absolute;
    width: 7px;
    height: 4px;
    top: 3px;
    left: 2px;
    /*style*/
    opacity: 0;
    content: '';
    background: transparent;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  /*check end*/
  /*radio start*/
  .radioWrapper {
    display: inline-block;
  }

  .dpn {
    display: none;
  }

  .radioWrapper .radio {
    width: 16px;
    height: 16px;
    position: relative;
    float: left;
  }

  .radioWrapper .radio input[type=radio] {
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }

  .radioWrapper .radio input[type=radio]:checked + label:after {
    /*pos*/
    /*style*/
    opacity: 1;
    border-top: none;
    border-right: none;
  }

  .radioWrapper .radio input[type=radio]:checked + label {
    /*pos*/
    /*style*/
    background-color: #3399ff;
  }

  .radioWrapper .radio input[type=radio]:disabled + label:after {
    /*pos*/
    /*style*/
    background-color: #aaa;
  }

  .radioWrapper .radio input[type=radio]:disabled + label {
    /*pos*/
    /*style*/
    border: 1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .radioWrapper .radio label {
    /*pos*/
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    /*style*/
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 100%;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .radioWrapper .radio label:hover {
    border: 1px solid #60b0ff;
  }

  .radioWrapper .radio label:after {
    /*pos*/
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    top: 4px;
    left: 4px;
    /*style*/
    opacity: 0;
    content: '';
    background-color: #fff;
  }

  /*radio end*/
  /*input start*/
  .inputWrapper {
    width: 100%;
  }

  .inputWrapper .inputDefault {
    padding: 0 10px;
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    outline: none;
  }

  .inputWrapper .inputDefault:hover, .inputWrapper .inputDefault:focus {
    border: 1px solid #3399ff;
  }

  .inputWrapper .errorTip {
    color: #ff4c4c;
    line-height: 36px;
    font-size: 14px;
    display: none;
  }

  .inputWrapper .errorTip:before {
    margin-right: 10px;
  }

  .error .inputDefault {
    border: 1px solid #ff4c4c !important;
  }

  .error .errorTip {
    display: block;
  }

  .disable .inputDefault {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  /*region dark theme*/
  .dark .inputWrapper {
    background-color: transparent;
  }

  .dark .inputDefault {
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #ffffff;
    background-color: transparent;
  }

  /*endregion*/

  .mini .inputDefault {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
  }

  /*input end*/
  /*sl end*/
</style>
