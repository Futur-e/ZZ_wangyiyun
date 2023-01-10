<template>
  <div class="box" >
    <div class="l">
      <img :src="list.coverImgUrl" alt="">
    </div>

    <div class="r">
      <div class="listRows"
           v-for="(i,index) in songlist[0]"
           :key="index"
           v-show="index<7"
           @dblclick="getsongUrl(i.id ,index)"
           >
        <span class="index">{{index+1}}</span>
        <span class="musicName">{{i.name}}</span>
        <span class="singer">{{i.ar[0].name}}</span>
      </div>
      <div class="checkAll" >
        <span @click="checkAll(props.list.id)">查看全部&gt;</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getList} from "@/api/recommond";
import {nextTick, onMounted, provide, ref} from "vue";
import router from "@/router";
import {useStore} from "vuex";
import {getSong} from "@/api/songControl";

export default {
  name:'Xselect',
props:['list'],
  setup(props,{emit}){
    const songlist = ref([])
    const songAllList = ref([])
    const store = useStore()
    getList(props.list.id).then((res)=>{
      songlist.value.push(res.data.playlist.tracks)
    })
    const checkAll = (id) => {
      router.push({name: 'playpage',params:{id}})
    }
    //获取歌曲地址的回调
    const  getsongUrl = (id,index)=>{
      store.commit('getsongId',songlist.value[0])
      store.commit('getsongIndex',index)
      store.commit('altershow')
      getSong(id).then((res)=>{
        store.commit('geturl',res.data.data[0].url)
      })
    }
    //

    return{
      songlist,
      props,
      checkAll,
      songAllList,
      getsongUrl,
    }
  }
}
</script>

<style scoped>
.box{
  margin: 15px 0;
  width: 1180px;
  display: flex;
  justify-content: space-between;
}
.l{
  width: 200px;
  height: 200px;
  overflow: hidden;
  background-color: #317ffb;
  border-radius: 20px;
}
.l img{
  width:200px;
  height: 200px;
}
.r{
  width: 960px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

.listRows {
  height: 30px;
  font-size: 14px;
  color: rgb(153, 153, 153);
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.listRows:nth-child(odd) {
  background-color: #f9f9f9;
}
.listRows:hover {
  background-color: #f4f4f4;
}

.listRows td {
  transform: scale(0.9);
}

.index {
  text-align: center;
  line-height: 28px;
  width: 30px;
}

.topthree {
  color: crimson;
}

.listRows .musicName {
  color: rgb(31, 31, 31);
  transform: translate(-5%, -5%) scale(0.9);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 80%;
}

.singer {
  text-align: right;
  position: absolute;
  right: 10px;
}

.checkAll {
  color: rgb(134, 134, 134);
  font-size: 16px;
  transform: scale(0.9) translateX(-5%);
  width: 100px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.checkAll i {
  font-size: 12px;
}

.selectRow {
  background-color: #efefef !important;
}

tr {
  cursor: pointer;
}
</style>
