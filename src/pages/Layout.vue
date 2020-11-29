<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo">
        <span class="title"> 衡阳电网停电检修辅助决策系统 </span>
        <span class="to_home" @click="toHome('/app')">首页</span>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :selectedKeys="selectMenu"
        @select="onMenuSelect"
        :style="{
          lineHeight: '64px',
          display: 'inline-block',
          verticalAlign: 'top',
        }"
      >
        <a-menu-item
          v-for="item in routes"
          :key="item.id"
          @click="toRoute(item.id)"
          >{{ item.name }}</a-menu-item
        >
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <router-view></router-view>
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        Content
      </div> -->
    </a-layout-content>
    <a-layout-footer
      v-if="
        this.$router.history.current.path === '/app' ||
        this.$router.history.current.path === '/app/'
      "
      style="text-align: center"
    >
      Copyright ©2020 国家电网
    </a-layout-footer>
  </a-layout>
</template>

<style lang="less">
#components-layout-demo-top .logo {
  width: 320px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  text-align: center;
  display: inline-block;
  .title {
    color: aquamarine;
    line-height: 32px;
    vertical-align: top;
  }
  .to_home {
    margin-left: 8px;
    color: #fff;
    line-height: 32px;
    vertical-align: top;
  }
}
</style>


<script>
export default {
  name: "Home",
  data() {
    return {
      routes: [
        { id: "key1", name: "历史检修台账" },
        { id: "key2", name: "到(超)期管理" },
        { id: "key3", name: "检修查询" },
        { id: "key4", name: "辅助决策" },
      ],
      selectMenu: [""],
    };
  },
  created() {},
  methods: {
    toRoute: function (route) {
      // console.log(`/app/${route}`);
      this.$router.push(`/app/${route}`);
    },
    toHome: function (route) {
      this.$router.push(`${route}`);
      this.selectMenu = [""];
    },
    onMenuSelect: function (item) {
      this.selectMenu = [item.key];
      // console.log(item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
