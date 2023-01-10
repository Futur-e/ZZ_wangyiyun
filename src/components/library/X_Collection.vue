<template>
    <ul class="box1 infinite-list"
        v-infinite-scroll="load"
        style="list-style: none">
      <li v-for="(item,index) in userLists"
          :key="index" class="infinite-list-item x_box1">

          <img :src="item.avatarUrl" alt="" style="width: 100px;height: 100px;border-radius: 50%">
          <div style="margin: 15px">
            <span>{{item.nickname}}</span>
            <span >{{item.description}}</span>
          </div>

      </li>
    </ul>
  <p v-if="loading">加载中...</p>
  <p v-if="noMore">没有更多了</p>
</template>

<script>
import {ref} from "vue";
import {getCollection} from "@/api/recommond";
import {useRoute} from "vue-router";

export default {
  name:'XCollection',
setup(){
    const offset = ref(0)
  const useRouter = useRoute()
  const userLists = ref()
   const getlists=()=>{
     getCollection(useRouter.params.id,offset.value).then((res)=>{
       userLists.value=res.data.subscribers
     })
   }
  getlists()
  const load = () => {
    offset.value+=20
    getCollection(useRouter.params.id,offset.value).then((res)=>{
      res.data.subscribers.forEach((item)=>{
        userLists.value.push(item)
      })
    })
  }
  return{
      userLists,
      load
  }
}
}
</script>

<style scoped>
.box1{
  display: flex;
  flex-wrap: wrap;
  width: 1100px ;
  justify-content: space-around;
  justify-items: center;
}
.x_box1{
  display: flex;
  width: 400px;
  margin: 16px 0;
}
</style>
