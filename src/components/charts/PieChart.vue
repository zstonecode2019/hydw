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
import "echarts/lib/chart/pie";

export default {
  name: "pieChart",
  components: {
    "v-chart": ECharts,
  },
  data() {
    return {
      option: {
        title: {
          text: "检修超期分布图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [
            "无超期",
            "超期10天以内",
            "超期10-20天",
            "超期20-30天",
            "超期30天以上",
          ],
        },
        series: [
          {
            name: "超期时限",
            type: "pie",
            radius: [30, 110],
            // center: ["75%", "50%"],
            roseType: "area",
            data: [
              {
                value: 10,
                name: "无超期",
                itemStyle: {
                  color: "#57f705",
                },
              },
              {
                value: 5,
                name: "超期10天以内",
                itemStyle: {
                  color: "rgb(168 197 4)",
                },
              },
              {
                value: 15,
                name: "超期10-20天",
                itemStyle: {
                  color: "#f7b805",
                },
              },
              {
                value: 25,
                name: "超期20-30天",
                itemStyle: {
                  color: "#f76a05",
                },
              },
              {
                value: 5,
                name: "超期30天以上",
                itemStyle: {
                  color: "#f72705",
                },
              },
            ],
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