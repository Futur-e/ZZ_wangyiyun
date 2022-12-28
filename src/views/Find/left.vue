<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <router-link to="/find" >发现音乐</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <router-link to="/find" slot="title">视频</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <router-link to="/find" slot="title">收藏</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <router-link to="/find" slot="title">每日推荐</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Left',
  setup() {
    const handleOpen = (key, keypath) => {
      console.log(key, keypath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleClose,
      handleOpen
    }
  }
}
</script>

<style scoped>

</style>
