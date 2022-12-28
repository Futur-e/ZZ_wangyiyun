<template>
  <el-row class="tac">
    <el-col :span="3">
      <Left></Left>
    </el-col>
    <el-col :span="18">
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
import Left from "@/views/Find/left";


export default {
  name:'Home',
  components:{
    Left
  },



}
</script>

<style scoped>
/*设置点击后的样式 */
:deep .router-link-active {
  text-decoration: none;
  font-size: 18px;
}

</style>
