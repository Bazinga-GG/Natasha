<template>
  <div class="marvelTablePanelWrapper">
    <div v-if="divDirection == 'vertical'" class="marvelTablePanel_vertical">
      <div v-if="showFirst" class="firstDiv_vertical" :style="{height:showSecond?'calc(' + firstDivH + ' - ' + (calH + dragSpace/2) +'px)':'100%'}">
        <slot name="firstDiv"></slot>
      </div>
      <div v-if="showFirst&&showSecond" class="dragArea_vertical" :style="{height: dragSpace+'px'}" v-on:mousedown="_onMouseDown"><div class="dragDashLine"></div></div>
      <div v-if="showSecond" class="second_vertical" :style="{height:showFirst?'calc(' + secondDivH + ' + ' + (calH - dragSpace/2) +'px)':'100%'}">
        <slot name="secondDiv"></slot>
      </div>
    </div>
    <div v-if="divDirection == 'horizontal'" class="marvelTablePanel_horizontal">
      <div v-if="showFirst" class="firstDiv_horizontal" :style="{width:showSecond?'calc(' + firstDivH + ' - ' + (calW + dragSpace/2) +'px)':'100%'}">
        <slot name="firstDiv"></slot>
      </div>
      <div v-if="showFirst&&showSecond" class="dragArea_horizontal" :style="{width: dragSpace+'px'}" v-on:mousedown="_onMouseDown"><div class="dragDashLine"></div></div>
      <div v-if="showSecond" class="second_horizontal" :style="{width:showFirst?'calc(' + secondDivH + ' + ' + (calW - dragSpace/2) +'px)':'100%'}">
        <slot name="secondDiv"></slot>
      </div>
    </div>
  </div>
</template>

<script>

  /**
   *  MarvelTablePanel widget description
   *  @vuedoc
   *  @exports MarvelTablePanel
   */
  export default {
    name: 'MarvelTablePanel',
    props: {
      divDirection: {
        type: String,
        default: "vertical",
        required: false,
        validator: function (str) {
          if (str == "vertical" || str == "horizontal") {
            return true;
          } else {
            return false;
          }
        }
      },
      firstDivW: {
        type: String,
        default: "50%",
        required: false
      },
      firstDivH: {
        type: String,
        default: "50%",
        required: false
      },
      secondDivW: {
        type: String,
        default: "50%",
        required: false
      },
      secondDivH: {
        type: String,
        default: "50%",
        required: false
      },
      dragSpace: {
        type: Number,
        default: 20,
        required: false
      },
    },
    data() {
      return {
        bIsDragging:false,
        showFirst: true,
        showSecond: true,

        calH:0,
        iMouseDownY:0,

        calW:0,
        iMouseDownX:0,
      }
    },
    mounted() {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy() {
      //#region destroy

      this._destroy();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.oWrapperFun = _.throttle(this._onMouseMove, 100);
        document.body.addEventListener("mousemove", this.oWrapperFun);
        document.body.addEventListener("mouseup", this._onMouseUp);
      },
      _destroy: function () {
        document.body.removeEventListener("mousemove", this.oWrapperFun);
        document.body.removeEventListener("mouseup", this._onMouseUp);
      },

      //#endregion
      
      _onMouseDown: function (e) {
        this.bIsDragging = true;

        if(this.divDirection == "vertical"){
          this.iMouseDownY = e.pageY;
        }else if(this.divDirection == "horizontal"){
          this.iMouseDownX = e.pageX;
        }
      },
      
      _onMouseMove: function (e) {
        if(!this.bIsDragging){
          return;
        }

        if(this.divDirection == "vertical"){
          var y = e.pageY;
          var iDistanceY = this.iMouseDownY - y;
          this.iMouseDownY = y;
          this.calH = this.calH + iDistanceY;
        }else if(this.divDirection == "horizontal"){
          var x = e.pageX;
          var iDistanceX = this.iMouseDownX - x;
          this.iMouseDownX = x;
          this.calW = this.calW + iDistanceX;
        }
      },

      _onMouseUp: function (e) {
        if(this.bIsDragging){
          this.bIsDragging = false;
        }
      },

      //#region callback
      //#endregion

      //#region 3rd
      
      showFirstOnly: function () {
        this.showFirst = true;
        this.showSecond = false;
      },

      showSecondOnly: function () {
        this.showFirst = false;
        this.showSecond = true;
      },

      showAll: function () {
        this.showFirst = true;
        this.showSecond = true;
      },
      
      //#endregion
    },
  }
</script>

<style>
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

  .marvelTablePanelWrapper{
    width: 100%;
    height: 100%;
  }

  .marvelTablePanel_vertical{
    width: 100%;
    height: 100%;
  }

  .marvelTablePanel_horizontal{
    width: 100%;
    height: 100%;
  }

  .firstDiv_horizontal{
    height: 100%;
    float: left;
  }

  .second_horizontal{
    height: 100%;
    float: left;
  }

  .dragArea_horizontal{
    height: 100%;
    float: left;
  }

  .dragArea_vertical{
    position: relative;
    cursor: row-resize;
  }

  .dragArea_vertical .dragDashLine{
    width: 100%;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    border-top: 2px dashed #aaa;
    display: none;
  }

  .dragArea_vertical:hover .dragDashLine{
    display: block;
  }

  .dragArea_horizontal{
    position: relative;
    cursor: col-resize;
  }

  .dragArea_horizontal .dragDashLine{
    height: 100%;
    position: absolute;
    left: 50%;
    margin-left: -1px;
    border-left: 2px dashed #aaa;
    display: none;
  }

  .dragArea_horizontal:hover .dragDashLine{
    display: block;
  }

</style>
