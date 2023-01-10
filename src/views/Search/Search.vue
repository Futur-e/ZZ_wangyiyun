<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 1200px;margin: 10px 26px">
    <el-tab-pane label="单曲" name="first">
<XsearchSongs ></XsearchSongs>
    </el-tab-pane>
    <el-tab-pane label="歌手" name="second">
      <XsearchSongers :type="1000"></XsearchSongers>
    </el-tab-pane>
    <el-tab-pane label="专辑" name="third">
      <XsearchSongers :type="10"></XsearchSongers>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {ref} from "vue";

export default {
  name:'Search',
  components: {},

  setup(){
    const activeName =ref('first')
    function  handleClick(tab, event) {
      console.log(tab, event);
    }
    return{
      activeName,
      handleClick
    }
  }
}
</script>

<style scoped>

</style>
