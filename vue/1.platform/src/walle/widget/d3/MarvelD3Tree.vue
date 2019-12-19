<template>
  <div class="treeMapWrapper" v-bind:style="{height: height + 'px'}" v-bind:id="id"></div>
</template>

<script>
  import "d3"

  /**
   *  MarvelD3Tree widget description
   *  @vuedoc
   *  @exports MarvelD3Tree
   */
  export default {
    name: 'MarvelD3Tree',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      height: {
        type: Number,
        default: undefined,
        required: false,
      },
    },
    data: function () {
      return {
        // 计算节点总数，最大标签长度
        totalNodes: 0,
        maxLabelLength: 0,
        // 拖拽变量
        selectedNode: null,
        draggingNode: null,
        duration: 750,
        root: undefined,
        // 图表的大小
        viewerWidth: null,
        viewerHeight: null,
        // 树
        tree: undefined,
        diagonal: undefined,
        // 缩放监听
        zoomListener: undefined,
        //svg
        svg: {},
      }
    },
    mounted: function () {

    },
    methods: {
      //#region inner

      visit: function (oParent, visitFunction, childrenFunction) {
        // 通过遍历所有节点执行某些设置的递归帮助函数
        if (!oParent) return;

        visitFunction(oParent);

        var children = childrenFunction(oParent);
        if (children) {
          var count = children.length;
          for (var i = 0; i < count; i++) {
            this.visit(children[i], visitFunction, childrenFunction);
          }
        }
      },
      sortTree: function () {
        // 根据节点名称对树进行排序
        this.tree.sort(function (oNode1, oNode2) {
          return oNode2.name.toLowerCase() < oNode1.name.toLowerCase() ? 1 : -1;
        });
      },
      zoom: function () {
        // 定义树的缩放功能
        this.svg.svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      },
      overCircle: function (d) {
        this.selectedNode = d;
        this.updateTempConnector();
      },
      outCircle: function (d) {
        this.selectedNode = null;
        this.updateTempConnector();
      },
      updateTempConnector: function () {
        // 用于更新指示拖动从属关系的临时连接器的函数
        var arrData = [];
        if (this.draggingNode !== null && this.selectedNode !== null) {
          // 对源坐标进行翻转
          arrData = [{
            target: {
              y: this.draggingNode.x0,
              x: this.draggingNode.y0,
            },
            source: {
              y: this.selectedNode.x0,
              x: this.selectedNode.y0,
            },
          }];
        }
        var oLink = this.svg.svgGroup.selectAll(".templink").data(arrData);

        oLink.enter().append("path")
          .attr("class", "templink")
          .attr("d", d3.svg.diagonal())
          .attr('pointer-events', 'none');

        oLink.attr("d", d3.svg.diagonal());

        oLink.exit().remove();
      },
      centerNode: function (source) {
        // 在单击/删除时将节点居中，这样在折叠/移动大量子节点时节点不会丢失。
        var scale = this.zoomListener.scale();
        var x = -source.y0;
        var y = -source.x0;
        x = x * scale + 200;
        y = y * scale + this.viewerHeight / 2;
        d3.select('g').transition()
          .duration(this.duration)
          .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
        this.zoomListener.scale(scale);
        this.zoomListener.translate([x, y]);
      },
      _click: function (d, funOnClick) {
        if (d.children) {
          return;
        }
        funOnClick(d);
        let nodeObjs = d3.selectAll("circle");
        for (const iterator of nodeObjs[0]) {
          if (d.nodeId === iterator.__data__.nodeId && !d.children) {
            iterator.style.fill = "#3399ff";
          } else if (!d.children) {
            iterator.style.fill = "#fff";
          }
        }
      },
      update: function (source, funOnClick) {
        // 计算新的高度，函数计算根节点的子节点总数并相应地设置树的高度。这样可以防止在新节点变为可见时布局看起来被挤压，
        // 或者在节点被移除时布局看起来稀疏，从而使布局更加一致。
        var self = this;
        var arrLevelWidth = [1];
        var childCount = function (iLevel, oNode) {

          if (oNode.children && oNode.children.length > 0) {
            if (arrLevelWidth.length <= iLevel + 1) arrLevelWidth.push(0);

            arrLevelWidth[iLevel + 1] += oNode.children.length;
            oNode.children.forEach(function (oSubNode) {
              childCount(iLevel + 1, oSubNode);
            });
          }
        };
        childCount(0, this.root);
        var newHeight = d3.max(arrLevelWidth) * 25; // 25 pixels per line
        this.tree = this.tree.size([newHeight, this.viewerWidth]);

        // 计算新的树布局。
        var nodes = this.tree.nodes(this.root).reverse(),
          links = this.tree.links(nodes);

        // 基于最大标签长度设置级别之间的宽度。
        nodes.forEach(function (d) {
          d.y = (d.depth * (self.maxLabelLength * 10)); //maxLabelLength * 9px
        });

        // 更新树节点
        var nodeId = 0;
        var node = this.svg.svgGroup.selectAll("g.node")
          .data(nodes, function (d) {
            return d.id || (d.id = ++nodeId);
          });

        // 在父节点的上一个位置输入任何新节点。
        var oNodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
          }).on('click', function (oNode) {
            self._click(oNode, funOnClick);
          });

        oNodeEnter.append("circle")
          .attr('class', 'nodeCircle')
          .attr("r", 0)
          .style("fill", function (oNode) {
            return !oNode.children ? "lightsteelblue" : "#fff";
          });

        oNodeEnter.append("text")
          .attr("x", function (oNode) {
            return oNode.children || oNode._children ? -10 : 10;
          })
          .attr("dy", ".35em")
          .attr('class', 'nodeText')
          .attr("text-anchor", function (oNode) {
            return oNode.children || oNode._children ? "end" : "start";
          })
          .text(function (oNode) {
            return oNode.name;
          })
          .style("fill-opacity", 0);

        // 节点给我们一个半径范围内的鼠标悬停
        oNodeEnter.append("circle")
          .attr('class', 'ghostCircle')
          .attr("r", 30)
          .attr("opacity", 0.2) // 将此值更改为零以隐藏目标区域
          .attr('pointer-events', 'mouseover')
          .on("mouseover", function (oNode) {
            this.overCircle(oNode);
          })
          .on("mouseout", function (oNode) {
            this.outCircle(oNode);
          });

        // 更新文本以反映节点是否有子节点
        node.select('text')
          .attr("x", function (oNode) {
            return oNode.children || oNode._children ? -10 : 10;
          })
          .attr("text-anchor", function (oNode) {
            return oNode.children || oNode._children ? "end" : "start";
          })
          .text(function (oNode) {
            let strText = oNode.label || oNode.name;
            if (strText && strText.length > 12) {
              return oNode.name.substr(0, 12) + ".."
            }
            return strText;
          })
          .append("svg:title").text(function (oNode) {
          return oNode.name;
        });

        // 根据是否有子项和是否折叠来更改圆填充
        node.select("circle.nodeCircle")
          .attr("r", function (d) {
            return !d.children ? 7 : 5;
          })
          .style("fill", "#fff")
          .style("stroke", function (d) {
            return !d.children ? "#3399ff" : "#888";
          })
          .append("svg:title")
          .text(function (d) {
            return d.name;
          });

        // 将节点转换到新位置
        var oNodeToUpdate = node.transition()
          .duration(this.duration)
          .attr("transform", function (oNode) {
            return "translate(" + oNode.y + "," + oNode.x + ")";
          });

        // 淡入文本
        oNodeToUpdate.select("text")
          .style("fill-opacity", 1);

        // 退出节点到父节点的新位置
        var oNodeExit = node.exit().transition()
          .duration(this.duration)
          .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();

        oNodeExit.select("circle")
          .attr("r", 0);

        oNodeExit.select("text")
          .style("fill-opacity", 0);

        // 更新link
        var oLink = this.svg.svgGroup.selectAll("path.link")
          .data(links, function (d) {
            return d.target.id;
          });

        // 在父级的上一个位置输入新link
        oLink.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function (d) {
            var o = {
              y: source.y0,
              x: source.x0
            };
            return self.diagonal({
              target: o,
              source: o,
            });
          });

        // 转换link到他们的新位置
        oLink.transition()
          .duration(this.duration)
          .attr("d", this.diagonal);

        // 退出节点到父节点的新位置
        oLink.exit().transition()
          .duration(this.duration)
          .attr("d", function (d) {
            var o = {
              y: source.y,
              x: source.x
            };
            return diagonal({
              target: o,
              source: o,
            });
          })
          .remove();

        // 把旧的位置藏起来以便过渡
        nodes.forEach(function (oNode) {
          oNode.x0 = oNode.x;
          oNode.y0 = oNode.y;
        });
      },
      clearCache: function () {
        this.totalNodes = 0;
        this.maxLabelLength = 0;
        this.selectedNode = null;
        this.draggingNode = null;
        this.duration = 750;
        this.root = undefined;
        this.viewerWidth = null;
        this.viewerHeight = null;
        this.tree = undefined;
        this.diagonal = undefined;
        this.zoomListener = undefined;
        this.svg.svgGroup = undefined
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setData: function (treeData, funOnClick) {
        var self = this;
        // 清除容器
        $("#" + this.id).empty();
        // 清除缓存
        this.clearCache();

        // 图表的大小
        this.viewerWidth = $("#" + this.id).width();
        this.viewerHeight = $("#" + this.id).height();

        this.tree = d3.layout.tree().size([this.viewerHeight, this.viewerWidth]);

        // 定义一个d3对象，供以后的节点路径使用。
        this.diagonal = d3.svg.diagonal().projection(function (d) {
          return [d.y, d.x];
        });


        // 调用访问函数以建立最大标签长度
        this.visit(treeData, function (d) {
          self.totalNodes++;
          self.maxLabelLength = Math.max(d.name.length, self.maxLabelLength);

        }, function (d) {
          return d.children && d.children.length > 0 ? d.children : null;
        });

        // 首先对树进行排序，以防JSON不按排序顺序排列。
        this.sortTree();

        // 定义zoomListener监听
        this.zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", this.zoom);

        // 定义baseSvg
        var baseSvg = d3.select("#" + this.id).append("svg")
          .attr("width", this.viewerWidth)
          .attr("height", this.viewerHeight)
          .attr("class", "overlay")
          .call(this.zoomListener);

        // 附加一个组，该组包含所有节点，缩放侦听器可以对其执行操作。
        this.svg.svgGroup = baseSvg.append("g");

        // 定义根节点
        this.root = treeData;
        this.root.x0 = this.viewerHeight / 2;
        this.root.y0 = 0;

        // 以根节点为中心进行布局
        this.update(this.root, funOnClick);
        this.centerNode(this.root);
      },

      //#endregion
    }
  }
</script>

<style>
  .overlay {
    background-color: #EEE;
  }

  .node {
    cursor: pointer;
  }

  .node text {
    font-size: 10px;
    font-family: sans-serif;
  }

  .node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 1.5px;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }

  .templink {
    fill: none;
    stroke: red;
    stroke-width: 3px;
  }

  .ghostCircle.show {
    display: block;
  }

  .ghostCircle, .activeDrag .ghostCircle {
    display: none;
  }
</style>

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

  .treeMapWrapper {
    height: 100%;
  }

  .node {
    cursor: pointer;
  }

  .overlay {
    background-color: #fff;
    border: 1px solid #ccc;
  }

  .node circle {
    stroke: #3399ff;
    stroke-width: 2px;
  }

  .node:hover {
    stroke-width: 3px;
    font-size: 15px;
  }

  .node text {
    font-size: 14px;
    color: #666;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }

  .templink {
    fill: none;
    stroke: red;
    stroke-width: 3px;
  }

  .ghostCircle .show {
    display: block;
  }

  .ghostCircle, .activeDrag .shortCircle {
    display: none;
  }

  /*region dark theme*/

  .dark .overlay {
    background-color: #5a6069;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .dark .node circle {
    fill: #ffffff;
    stroke: #3399ff;
  }

  .dark .node text {
    color: #ffffff !important;
  }

  .dark .link {
    stroke: #555;
  }

  .dark .templink {
    stroke: red;
  }

  /*endregion*/

  /*blackBg theme*/

  .blackBg .overlay {
    background-color: #5a6069;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .blackBg .node circle {
    fill: #ffffff;
    stroke: #3399ff;
  }

  .blackBg .node text {
    color: #ffffff !important;
  }

  .blackBg .link {
    stroke: #555;
  }

  .blackBg .templink {
    stroke: red;
  }

  /*endregion*/
</style>
