<template>
  <div class="hello">
    <!-- <h1>{{msg}}</h1> -->
    <!-- <div> -->

    <PieChart class="bar" @getRouteName="getRouteName" />
    <div class="filter_select">
      <!-- <div class="table-title">
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
      </div> -->
      <a-select
        show-search
        placeholder="请选择线路名称"
        style="width: 140px"
        @change="handleSelectChange"
        allowClear
      >
        <a-select-option v-for="item in routes" :key="item.id" :value="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>
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
        placeholder="请选择超期范围"
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
        <a-tooltip slot="expire" slot-scope="text">
          <template slot="title"> {{ text }} </template>
          {{ text }}
        </a-tooltip>
        <a-tooltip slot="device" slot-scope="text">
          <template slot="title"> {{ text }} </template>
          {{ text }}
        </a-tooltip>
        <span slot="isPowerCut" slot-scope="text">
          {{ text === true ? "是" : "否" }}
        </span>
        <span
          :style="{
            color:
              text < 1
                ? '#57f705'
                : text > 1 && text < 10
                ? 'rgb(168 197 4)'
                : text > 10 && text < 20
                ? '#f7b805'
                : text > 20 && text < 30
                ? '#f76a05'
                : '#f72705',
          }"
          slot="exceed"
          slot-scope="text"
        >
          {{ text }}
        </span>
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
import PieChart from "../components/charts/PieChart.vue";
import Detail from "../components/custome/Detail";
import moment from "moment";
const columns = [
  {
    title: "线路ID",
    dataIndex: "id",
    key: "id",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "电压等级",
    dataIndex: "voltageClass",
    key: "voltageClass",
    width: 150,
    ellipsis: true,
  },
  {
    title: "线路名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },

  {
    title: "检修内容",
    dataIndex: "content",
    key: "content",
    ellipsis: true,
    scopedSlots: { customRender: "content" },
  },
  {
    title: "到期时间",
    dataIndex: "expire",
    key: "expire",
    ellipsis: true,
    scopedSlots: { customRender: "expire" },
  },
  {
    title: "超期时间(天)",
    dataIndex: "exceed",
    key: "exceed",
    ellipsis: true,
    align: "center",
    scopedSlots: { customRender: "exceed" },
    sorter: (a, b) => a.exceed - b.exceed,
    defaultSortOrder: "descend",
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "检修单位",
    dataIndex: "unitName",
    key: "unitName",
    ellipsis: true,
  },
  {
    title: "建议检修时间",
    dataIndex: "device",
    key: "device",
    ellipsis: true,
    scopedSlots: { customRender: "device" },
  },
  {
    title: "检修方案",
    dataIndex: "scheme",
    key: "scheme",
    ellipsis: true,
  },
  {
    title: "是否停电",
    dataIndex: "isPowerCut",
    key: "isPowerCut",
    ellipsis: true,
    scopedSlots: { customRender: "isPowerCut" },
  },
  // {
  //   title: "检修部件",
  //   dataIndex: "assemb",
  //   key: "assemb",
  //   ellipsis: true,
  // },
  // {
  //   title: "检修级别",
  //   dataIndex: "level",
  //   key: "level",
  //   ellipsis: true,
  // },
  // {
  //   title: "检修类型",
  //   dataIndex: "type",
  //   key: "type",
  //   ellipsis: true,
  //   scopedSlots: { customRender: "type" },
  // },
  // {
  //   title: "检修对象",
  //   dataIndex: "obj",
  //   key: "obj",
  //   ellipsis: true,
  //   scopedSlots: { customRender: "obj" },
  // },
  // {
  //   title: "检修任务",
  //   dataIndex: "task",
  //   key: "task",
  //   ellipsis: true,
  //   scopedSlots: { customRender: "task" },
  // },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
const data = [...new Array(23)].map((item, index) => {
  return {
    key: index + 1,
    id: index + 1,
    voltageClass: "110KV",
    name: `线路${index + 1}`,
    content: "插销是否脱落",
    expire: "2020-09-21 12:00:08",
    exceed:
      index % 3 === 0 ? 0 : index % 3 === 1 ? index * 5 + 1 : index * 2 + 2,
    unitName: "中电",
    device: "2020-10-21 12:00:08",
    scheme: "检修方案1",
    isPowerCut: false,
    assemb: "插销",
    level: "4",
    type: "日常检修",
    obj: "插销",
    task: "日常检修3",
  };
});

export default {
  name: "HelloWorld1",
  components: { PieChart, Detail },
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
        { value: "1 - 1", text: "无超期" },
        { value: "1 - 10", text: "超期10天以内" },
        { value: "10 - 20", text: "超期10-20天" },
        { value: "20 - 30", text: "超期20-30天" },
        { value: "30 - 30", text: "超期30天以上" },
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
            item.exceed > parseInt(value.split("-")[0]) &&
            item.exceed < parseInt(value.split("-")[1])
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
      titles = [
        ...titles,
        "检修部件",
        "检修级别",
        "检修类型",
        "检修对象",
        "检修任务",
      ];
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
  height: 320px;
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
