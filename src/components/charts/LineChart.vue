<template>
  <v-chart :options="option" @click="onClick" />
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";

export default {
  name: "lineChart",
  components: {
    "v-chart": ECharts,
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["按时检修", "待检修", "超期检修"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "线路1",
              "线路2",
              "线路3",
              "线路4",
              "线路5",
              "线路6",
              "线路7",
              "线路8",
              "线路9",
              "线路10",
              "线路11",
              "线路12",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "次数",
            interval: 2,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "按时检修",
            type: "line",
            itemStyle: {
              color: "#0f0"
            },
            data: [6, 6, 4, 9, 2, 13, 3, 4, 5, 2, 3, 5, 3],
          },
          {
            name: "待检修",
            type: "line",
            itemStyle: {
              color: "#fa0"
            },
            data: [6, 4, 5, 3, 3, 3, 6, 5, 8, 2, 1, 0],
          },
          {
            name: "超期检修",
            type: "line",
            itemStyle: {
              color: "#f00"
            },
            data: [2, 4, 9, 2, 1, 7, 5, 3, 2, 4, 1, 1],
          },
        ],
      },
    };
  },
  methods: {
    onClick(params) {
      this.$emit("getRouteName", params.name);
    },
  },
  created() {
    this.$emit("getRouteName", "线路1");
  },
};
</script>