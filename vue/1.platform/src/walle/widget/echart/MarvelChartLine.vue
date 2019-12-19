<template>
  <div class="chart" v-bind:id="id" v-bind:style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  /**
   *  MarvelChartLine widget description
   *  @vuedoc
   *  @exports MarvelChartLine
   */
  export default {
    name: 'MarvelChartLine',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      theme: {
        type: String,
        default: "",
        required: false,
      },
      width: {
        type: Number,
        default: undefined,
        required: false,
      },
      height: {
        type: Number,
        default: undefined,
        required: false,
      }
    },
    data: function () {
      return {
        chartObj: undefined,
        chartData: undefined
      }
    },
    beforeDestroy: function () {
      //#region destroy

      this._destroy();

      //#endregion
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
        this.chartObj = echarts.init(document.getElementById(this.id), this.theme);
      },
      _destroy: function () {
        this.chartObj.clear();
      },

      //#endregion

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setData: function (oData) {
        this.chartData = oData;
        var option = {
          title: {
            text: oData.title
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            formatter: function (params) {
              var param = params[0];
              return param.name + ' : ' + param.value[1];
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {show: false},
            boundaryGap: [0, '100%']
          },
          xAxis: {
            splitLine: {show: false},
            type: 'time'
          },
          series: [{
            type: 'line',
            name: 'lineData',
            hoverAnimation: false,
            showSymbol: false,
            data: this.chartData.data
          }]
        };
        this.chartObj.setOption(option, true);
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
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
