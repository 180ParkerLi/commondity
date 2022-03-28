<!--
 * @Author: your name
 * @Date: 2022-01-02 15:37:42
 * @LastEditTime: 2022-02-11 16:28:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \commodity\src\App.vue
-->
<template>
  <div id="app">
    <!-- <h1 v-upper="msg"> </h1> -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home 、 Search显示，在Login 、 Register隐藏-->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
// 引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  data() {
    return {
      // msg:'测试:asdabc'
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action，通知vuex发请求，获取商品分类三级列表的数据，存贮于仓库当中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
