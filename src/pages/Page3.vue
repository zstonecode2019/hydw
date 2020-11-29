<template>
  <div class="hello">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld3",
  data() {
    return {
      msg: "检修查询",
    };
  },
  created() {
    // console.log(this.$router);
  }
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
.hello {
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
