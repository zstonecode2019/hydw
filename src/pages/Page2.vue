<template>
  <div class="hello">
    <!-- <h1>{{msg}}</h1> -->
    <!-- <div> -->

    <LineChart class="bar" @getRouteName="getRouteName" />
    <div class="filter_select">
      <div class="table-title">
        <span class="lable">当前线路：</span>
        <a-select
          id="routeSelect"
          show-search
          placeholder="请选择线路名称"
          style="width: 120px,display:inline-block;color:#42b983;border:0px solid #fff !important;"
          @change="handleRouteSelectChange"
          :value="routes.find((item) => item.name === activeRouteName).id"
        >
          <a-select-option
            v-for="item in routes"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <!-- <span class="content">{{ activeRouteName }}</span> -->
      </div>
      <a-select
        show-search
        placeholder="请选择电压等级"
        style="width: 140px"
        @change="handleSelectChange"
        :defaultValue="voltageLevels[0].value"
        allowClear
      >
        <a-select-option
          v-for="item in voltageLevels"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </a-select-option>
      </a-select>
      <a-range-picker @change="onDateChange" :defaultValue="defaultDateValue" />
      <a-select
        allowClear
        show-search
        placeholder="请选择区域"
        style="width: 140px"
        @change="handleSelectChange"
        :defaultValue="areas[0].value"
      >
        <a-select-option
          v-for="item in areas"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </a-select-option>
      </a-select>
      <a-select
        show-search
        placeholder="请选择检修状态"
        style="width: 140px"
        @change="handleStatusSelectChange"
        allowClear
      >
        <a-select-option
          v-for="item in checkStatus"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </a-select-option>
      </a-select>
    </div>
    <!-- </div> -->
    <div class="table">
      <a-table :columns="columns" :data-source="data">
        <a-tooltip slot="realStartTime" slot-scope="text">
          <template slot="title"> {{ text }} </template>
          {{ text }}
        </a-tooltip>
        <a-tooltip slot="realEndTime" slot-scope="text">
          <template slot="title"> {{ text }} </template>
          {{ text }}
        </a-tooltip>
        <span slot="isBigCheck" slot-scope="text">
          {{ text === true ? "是" : "否" }}
        </span>
        <span
          :style="{
            color:
              text === '按时检修'
                ? '#0f0'
                : text === '待检修'
                ? '#fa0'
                : '#f00',
          }"
          slot="status"
          slot-scope="text"
        >
          {{ text }}
        </span>
        <a slot="id" slot-scope="text">{{ text }}</a>
        <template slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="toDetail(record)"> 详情 </a-button>
        </template>
      </a-table>
      <a-drawer
        :title="recordTitle"
        placement="right"
        :closable="false"
        :visible="visible"
        @close="onDrawerClose"
        width="520"
      >
        <Detail :detailData="detailData"></Detail>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import LineChart from "../components/charts/LineChart.vue";
import Detail from "../components/custome/Detail";
import moment from "moment";
const columns = [
  {
    title: "检修编号",
    dataIndex: "id",
    key: "id",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "检修计划名称",
    dataIndex: "name",
    key: "name",
    width: 150,
    ellipsis: true,
  },
  {
    title: "检修级别",
    dataIndex: "level",
    key: "level",
    ellipsis: true,
  },
  {
    title: "检修类型",
    dataIndex: "type",
    key: "type",
    ellipsis: true,
  },
  {
    title: "检修对象",
    dataIndex: "obj",
    key: "obj",
    ellipsis: true,
  },
  {
    title: "实际开始时间",
    dataIndex: "realStartTime",
    key: "realStartTime",
    ellipsis: true,
    scopedSlots: { customRender: "realStartTime" },
  },
  {
    title: "实际结束时间",
    dataIndex: "realEndTime",
    key: "realEndTime",
    ellipsis: true,
    scopedSlots: { customRender: "realEndTime" },
  },
  {
    title: "是否重大检修",
    dataIndex: "isBigCheck",
    key: "isBigCheck",
    ellipsis: true,
    scopedSlots: { customRender: "isBigCheck" },
  },
  {
    title: "检修状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    scopedSlots: { customRender: "status" },
  },
  // {
  //   title: "地域Id",
  //   dataIndex: "areaId",
  //   key: "areaId",
  //   ellipsis: true,
  // },
  // {
  //   title: "业务单位Id",
  //   dataIndex: "unitId",
  //   key: "unitId",
  //   ellipsis: true,
  // },
  // {
  //   title: "业务单位名称",
  //   dataIndex: "unitName",
  //   key: "unitName",
  //   ellipsis: true,
  // },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
const data = [...new Array(23)].map((item, index) => {
  let status =
    index % 3 === 0 ? "按时检修" : index % 3 === 1 ? "待检修" : "超期检修";
  return {
    key: index + 1,
    id: index + 1,
    name: `日常维护计划${index + 1}`,
    level: 4,
    type: "日常维护",
    obj: "鸟巢障碍",
    realStartTime: "2020-09-21 12:00:08",
    realEndTime: "2020-09-21 12:00:08",
    isBigCheck: false,
    status: status,
    areaId: "3",
    unitId: "4",
    unitName: "中电公司",
  };
});

export default {
  name: "HelloWorld1",
  components: { LineChart, Detail },
  data() {
    return {
      msg: "历史检测台账",
      data,
      columns,
      activeRouteName: "",
      recordTitle: "",
      visible: false,
      detailData: [],
      voltageLevels: [
        { value: 1, text: "110KV" },
        { value: 2, text: "220KV" },
        { value: 3, text: "380KV" },
      ],
      routes: [
        { id: 1, name: "线路1" },
        { id: 2, name: "线路2" },
        { id: 3, name: "线路3" },
        { id: 4, name: "线路4" },
        { id: 5, name: "线路5" },
        { id: 6, name: "线路6" },
        { id: 7, name: "线路7" },
        { id: 8, name: "线路8" },
        { id: 9, name: "线路9" },
        { id: 10, name: "线路10" },
        { id: 11, name: "线路11" },
        { id: 12, name: "线路12" },
      ],
      checkStatus: [
        { value: 1, text: "按时检修" },
        { value: 2, text: "待检修" },
        { value: 3, text: "超期检修" },
      ],
      // periods: [
      //   { value: 1, text: "当日" },
      //   { value: 2, text: "本月" },
      //   { value: 3, text: "本年" },
      // ],
      areas: [
        { value: 1, text: "本镇" },
        { value: 2, text: "本县" },
        { value: 3, text: "本市" },
      ],
      defaultDateValue: [moment(), moment().add(30, "days")],
    };
  },
  methods: {
    onDateChange(dates) {
      console.log(dates);
    },
    handleSelectChange(value) {
      console.log(value);
    },
    handleRouteSelectChange(value) {
      this.activeRouteName = this.routes.find((item) => item.id === value).name;
    },
    handleStatusSelectChange(value) {
      if (value) {
        this.data = data.filter(
          (item) =>
            item.status ===
            this.checkStatus.find((status) => status.value === value).text
        );
      } else {
        this.data = data;
      }
    },
    getRouteName(routeName) {
      this.activeRouteName = routeName;
    },
    toDetail(record) {
      this.recordTitle = record.name;
      delete record.key;
      let titles = columns
        .filter((colomn) => colomn.title !== "操作")
        .map((colomn) => colomn.title);
      titles = [...titles, "地域Id", "业务单位Id", "业务单位名称"];
      this.detailData = Object.keys(record).map((item, index) => {
        return {
          label: titles[index],
          content: record[item],
        };
      });
      this.visible = true;
    },
    onDrawerClose() {
      this.visible = false;
    },
  },
  created() {
    this.activeRouteName = this.routes[0].name;
    // console.log(this.$router);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  // height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* align-items: center; */
}
.bar {
  height: 260px;
  margin-top: 15px;
}
.table {
  /* margin-top: 15px; */
}
.table-title {
  display: inline-block;
  color: #021233;
  font-weight: 600;
  font-size: 16px;
  background: #fff;
  height: 36px;
  line-height: 36px;
  width: 182px;
  text-align: center;
  border-radius: 8px;
  margin: 0 0 15px 15px;

  .label {
    margin-left: 8px;
  }
  .content {
    color: #42b983;
  }
}
.filter_select {
  margin: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 1000px;
}
#routeSelect /deep/ .ant-select-selection {
  display: block;
  // box-sizing: border-box;
  background-color: #fff;
  border: 0px solid #fff;
  // position: relative;
  // top: -2px;
  border-top-width: 0px;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
