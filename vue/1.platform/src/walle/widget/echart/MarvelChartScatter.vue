<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/map/js/china');
  require('echarts/lib/chart/scatter');
  require('echarts/lib/chart/effectScatter');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  /**
   *  MarvelChartScatter widget description
   *  @vuedoc
   *  @exports MarvelChartScatter
   */
  export default {
    name: 'MarvelChartScatter',
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
          //region basic
          backgroundColor: '#404a59',
          title: {
            text: this.chartData.title,
            subtext: this.chartData.subtxt,
            sublink: this.chartData.sublink,
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          //endregion
          //region tooltip
          tooltip: {
            trigger: 'item'
          },
          //endregion
          //region legend
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: [this.chartData.name],
            textStyle: {
              color: '#fff'
            }
          },
          //endregion
          //region geo
          geo: {
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
            map: this.chartData.geoType,
            itemStyle: {
              emphasis: {
                areaColor: '#2a333d'
              },
              normal: {
                borderColor: '#111',
                areaColor: '#323c48'
              }
            }
          },
          //endregion
          //region series
          series: [
            {
              name: this.chartData.name,
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.chartData.data,
              symbolSize: function (value) {
                return value[2] / 10;
              },
              label: {
                emphasis: {
                  show: true
                },
                normal: {
                  position: 'right',
                  show: false,
                  formatter: '{b}'
                }
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            },
            {
              name: "Top " + this.chartData.topN,
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.chartData.data.sort(function (a, b) {
                return b.value[2] - a.value[2];
              }).slice(0, this.chartData.topN),
              rippleEffect: {
                brushType: 'stroke'
              },
              showEffectOn: 'render',
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  position: 'right',
                  formatter: '{b}',
                  show: true
                }
              },
              zlevel: 1,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  color: '#f4e925',
                  shadowColor: '#333'
                }
              }
            }
          ]
          //endregion
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
