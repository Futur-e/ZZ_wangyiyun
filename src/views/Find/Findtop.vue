<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
      <router-link to="/identify">个性推荐</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/playlist">歌单</router-link>
    </el-menu-item>
    <el-menu-item index="3" >排行榜</el-menu-item>
    <el-menu-item index="4">歌手</el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>

<script>
export default {
  name:'Find'
}
</script>

<style scoped>

</style>
