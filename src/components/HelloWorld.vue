<template>
  <div class="hello">
    <h1>Hello {{ msg }}</h1>
    <img src="../assets/logo.png" alt="logo"/>
    <p>
      <router-link to="/example">To Example Page</router-link>
      <br>
      <router-link to="/about">To About Page</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      default: "world"
    }
  }
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
</style>
