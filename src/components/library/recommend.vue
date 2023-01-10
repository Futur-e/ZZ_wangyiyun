<template>
 <div class="wenben">
   <h2 v-show="tit">推荐歌单   &gt;</h2>
   <div class="xiaoimg">
     <div  v-for="(item,index) in list" :key="item.id" >
       <div  @click="checkAll(item.id)" style="cursor: pointer">
         <img :src="item.picUrl" alt="">
       </div>
       <h4>{{item.name}}</h4>
     </div>
   </div>
 </div>
</template>

<script>
import router from "@/router";

export default {
  name:'Recommend',
  props:['list','tit'  ],
  setup(props){
    //跳转到专辑详情页面
    const checkAll = (id) =>{
      router.push({name: 'playpage',params:{id}})
    }
    return{
      checkAll,
      props
    }
  }
}
</script>

<style scoped>
.wenben{
  width: 1180px;
  margin: 0px 20px;
}
.xiaoimg{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 24px
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
