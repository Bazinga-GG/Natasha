<template>
  <div class="marvelLogWrapper">
    <div class="filterWrapper">
      <div class="filterArea" v-for="item in filterOptions" :key="item.id + '_key'">
        <div v-if="item.type == 'button'" class="customAreaSession btnSession">
          <marvel-button :ref="item.id + '_textBtn'"
                         :id="item.id + '_textBtn'"
                         size="mini"
                         classCustom="classCustom4MopLogBtn"
                         :label="item.name" :isPrimary=false
                         :icon="item.icon" v-on:onClick="_onBtnClick(item)"></marvel-button>
        </div>
        <div v-if="item.type == 'checkbox'" class="customAreaSession checkSession">
          <marvel-check-box :ref="item.id + '_checkBox'"
                            :id="item.id + '_checkBox'"
                            :label="item.name"
                            :buObj="item"
                            v-bind:check="true"
                            :showLabel=true
                            v-on:onChange="_onCheckBoxChange()"></marvel-check-box>
        </div>
      </div>
    </div>
    <div :id="logSessionWrapperId" class="logSessionWrapper">
      <div class="logSession" :class="{activeLog: logItem.logId == activeLogId}" v-for="logItem in logItems">
        <span class="logText"
              :id="logItem.logId"
              :class="[
              {clickable: logItem.clickable},
              {warningLog: logItem.status == 'warning'},
              {errorLog: logItem.status == 'error'},
              {noticeLog: logItem.status == 'notice'}
              ]" v-on:click="_onLogItemClick(logItem)">[{{logItem.createTime}}]: <b>{{logItem.content}}</b></span>
      </div>
    </div>
  </div>
</template>

<script>
  import MarvelCheckBox from "../select/MarvelCheckBox";
  import MarvelButton from "../btn/MarvelButton";
  import StrUtils from "../../component/str";

  /**
   *  MarvelLogView widget description
   *  @vuedoc
   *  @exports MarvelLogView
   */
  export default {
    name: 'MarvelLogView',
    components: {
      MarvelCheckBox,
      MarvelButton
    },
    props: {
      logItems: {
        type: Array,
        default: undefined,
        required: true,
      },
      filterOptions: {
        type: Array,
        default: undefined,
        required: true,
      },
    },
    data: function () {
      return{
        activeLogId:undefined,
        logSessionWrapperId:undefined
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
        this.logSessionWrapperId = StrUtils.uuid();
      },

      //#endregion

      _onBtnClick: function (oItem) {
        var oParams = this._getFilterValues();
        this._callback4OnBtnClick(oParams, oItem);
      },
      _onCheckBoxChange: function(){
        var oParams = this._getFilterValues();
        this._callback4OnCheckBoxChange(oParams);
      },
      _getFilterValues: function(){
        var arrPramas = [];
        for(var i = 0; i<this.filterOptions.length; i++){
          var oFilter = this.filterOptions[i];
          if(oFilter.type == 'checkbox'){
            var oParam = {
              oItem:oFilter,
              bIsChecked: this.$refs[oFilter.id + '_checkBox'][0].getCheckItem()
            };
            arrPramas.push(oParam);
          }
        }

        return arrPramas;
      },

      _onLogItemClick: function(oLogItem){
        if(oLogItem.clickable){
          this._callback4OnLogItemClick(oLogItem);
        }
      },

      //#endregion
      //#region callback

      _callback4OnBtnClick: function (oCheckParams, oItem) {
        this.$emit("onBtnClick", oCheckParams, oItem)
      },
      _callback4OnCheckBoxChange: function (oCheckParams) {
        this.$emit("onCheckBoxChange", oCheckParams)
      },
      _callback4OnLogItemClick: function (oLogItem) {
        this.$emit("onLogItemClick", oLogItem)
      },

      //#endregion
      //#region 3rd

      anchorTo: function (strAnchorId) {
        this.activeLogId = strAnchorId;
        var anchor = document.getElementById(strAnchorId);
        var oParentDiv = document.getElementById(this.logSessionWrapperId);
        if(anchor){
          var iOffsetTop =anchor.offsetTop;
          oParentDiv.scrollTop = iOffsetTop - 8; //设置距顶部8的间隙
        }else{
          console.log("can not find " + strAnchorId);
        }
      },

      anchorToBottom: function () {
        var oParentDiv = document.getElementById(this.logSessionWrapperId);
        oParentDiv.scrollTop = oParentDiv.scrollHeight;
      }

      //#endregion
    },
  }
</script>

<style scoped>
  /*region basic*/

  * {
    font-family: "Microsoft YaHei", "arial", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/

  .marvelLogWrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .filterWrapper{
    overflow: hidden;
    position: absolute;
    top: 3px;
    right: 0;
    white-space: nowrap;
    padding: 4px 0 0 0 ;
    border-radius: 2px;
  }

  .filterArea{
    display: inline-block;
    vertical-align: center;
  }

  .customAreaSession {
    float: right;
    margin: 0 8px;
  }

  .logSessionWrapper{
    width: 100%;
    height: calc(100% - 34px);
    overflow: auto;
    padding: 6px;
    box-sizing: border-box;
    position: relative;
    top: 34px;
    background-color: #f0f0f0;
  }

  .logSession{
    margin-bottom: 3px;
    padding: 0 6px;
    box-sizing: border-box;
  }

  .activeLog{
    box-sizing: border-box;
    background-color: #d1e8ff;
  }

  .logText{
    color: #333;
    font-size: 12px;
    line-height: 14px;
    position: relative;
    bottom: 2px;
  }

  .clickable{
    cursor: pointer;
    text-decoration: underline;
  }

  .clickable:hover{
    font-style: italic;
  }

  .noticeLog{
    color: #3dcca6;
  }

  .warningLog{
    color: #ff8833;
  }

  .errorLog{
    color: #ff4c4c;
  }
</style>
