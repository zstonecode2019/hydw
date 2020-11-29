<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';

// import moment from 'moment';
// import 'moment/locale/zh-cn';

// moment.locale('zh');

export default {
  name: "App",
  // components: {
  //   HelloWorld,
  // },
  created() {
    // console.log(this);
  },
  data() {
    return {
      locale: zhCN,
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
