<template>
  <div>
    <div class="item" v-for="item in detailData" :key="item.label">
      <span class="lable">{{ item.label }}:</span>
      <span
        class="content"
        :style="{ color: exchangeColor(item.label, item.content) }"
      >
        {{ exchangeText(item.label, item.content) }}
      </span>
    </div>
  </div>
</template>

<script>
function exchangeText(label, value) {
  if (value === false) {
    return "否";
  } else if (value === true) {
    return "是";
  } else {
    return value;
  }
}
function exchangeColor(label, value) {
  if (label === "检修状态") {
    if (value === "按时检修") {
      return "#0f0";
    } else if (value === "待检修") {
      return "#fa0";
    } else if (value === "超期检修") {
      return "#f00";
    } else {
      return "000";
    }
  }
  if (label === "超期时间(天)") {
    if (value < 1) {
      return "#57f705";
    } else if (value < 10 && value > 1) {
      return "rgb(168 197 4)";
    } else if (value < 20 && value > 10) {
      return "#f7b805";
    } else if (value < 30 && value > 20) {
      return "#f76a05";
    } else {
      return "#f72705";
    }
  }
}
import "./index.less";
export default {
  name: "detail",
  props: {
    detailData: {
      type: Array,
      required: true,
    },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    exchangeText,
    exchangeColor,
  },
};
</script>