<template>
 <div class="wenben">
   <div class="xiaoimg">
     <div v-for="(item,index) in list" :key="item.id">
       <router-link to="">
         <img :src="item.coverImgUrl" alt="">
       </router-link>
       <h4>{{item.name}}</h4>
     </div>
   </div>
 </div>
</template>

<script>
import {ref} from "vue";
import {getrecommondList} from "@/api/recommond";

export default {
  name:'Xrank',
  props:['list']
}
</script>

<style scoped>
.wenben{
  width: 1180px;
}
.xiaoimg{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.xiaoimg div{
  width: 200px;
  text-align: center;
  margin-top: 20px;
}
.xiaoimg img{
  width: 200px;
  height: 200px;
  border-radius: 20px;

}
</style>
