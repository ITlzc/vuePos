<template>
  <div id="app">
    <!-- <i class="icon iconfont icon-dianpu"></i>
    <i class="icon iconfont icon-gongnengjianyi"></i>
    <i class="icon iconfont icon-hanbao"></i> -->
    <leftNav></leftNav>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
export default {
  name: 'App',
  components: {
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main{
  width: 95%;
  height: 100%;
  float: left;
  background-color: #Eff2f7;
  overflow: hidden;
}
</style>
