<template>
  <div class="box" >
    <div class="l">
      <img :src="list.coverImgUrl" alt="">
    </div>
    <div class="r">
      <div class="listRows"
           :getlist="getlist(list.id)"
           >
        <span class="index">1</span>
        <span class="musicName">{{songAllList[0]}}</span>
        <span class="singer">1</span>
      </div>
      <div
      class="checkAll"
      >
        查看全部&gt;
      </div>
    </div>
  </div>
</template>

<script>
import {getList} from "@/api/recommond";
import {nextTick, ref} from "vue";

export default {
  name:'Xselect',
props:['list'],
  setup(){
    const songList = ref([])
    const songAllList = ref([])
    const getsonglist = (id) => {
      getList(id).then(data=>{
          songList.value = data.data.playlist.tracks
      })
    }
    const getlist = (id) => {
      getsonglist(id)
    }
      songAllList.value.push(songList)
    // nextTick(getlist)
    return{
      songList,
      getlist,
      songAllList,
    }
  }
}
</script>

<style scoped>
.box{
  margin: 15px 0;
  width: 1180px;
  display: flex;
  border: 1px solid red;
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
  font-size: 12px;
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
