<template>
  <div class="box">
    <div class="l">
      <img :src="songAllList.coverImgUrl" alt="">
    </div>

    <div class="r">
      <div>
        <span class="playlist">歌单</span>
        <h4>{{ songAllList.name }}</h4>
      </div>
      <div>
        <img :src="songAvatar.avatarUrl" alt="" style="width: 20px;height: 20px;border-radius: 50%">
        <span style="color: #29b9db">{{ songAvatar.nickname }}</span>
        <span>最近更新：{{
            formatDate(new Date(songAllList.updateTime), "YYYY-MM-DD")
          }}</span>
      </div>
      <div>
        <div class="play3 active">
          <i class="el-icon-caret-right"></i>
          <span>播放全部</span>
          <i class="el-icon-plus"></i>
        </div>
        <div class="play3">
          <i class="el-icon-folder-add"></i>
          <span>收藏({{ songAllList.subscribedCount>10000? (floor(songAllList.subscribedCount / 10000))+'万':songAllList.subscribedCount }})</span>
        </div>
        <div class="play3">
          <i class="el-icon-ice-cream-round"></i>
          <span>分享({{ songAllList.shareCount>10000?(floor(songAllList.shareCount / 10000))+'万':songAllList.shareCount }})</span>
        </div>
        <div class="play3">
          <i class="el-icon-download"></i>
          <span>下载全部</span>
        </div>
      </div>
      <div>
        <span>歌曲：{{ songAllList.trackCount }}</span>
        <span>播放量：{{ songAllList.playCount>100000000?(floor(songAllList.playCount / 100000000))+'亿':songAllList.playCount }}</span>
      </div>
      <div>
        <span>简介：{{ songAllList.description==''?'暂无简介':songAllList.description}}</span>
      </div>
    </div>
  </div>
  {{}}
 <div class="tab">
   <el-tabs v-model="activeName" @tab-click="handleClick">
     <el-tab-pane label="歌曲列表" name="first">
       <el-table
           :data="songAllList.tracks"
           :row-class-name="tableRowClassName"
           @row-click="getsongUrl"
           stripe
           style="width: 1200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
         <el-table-column
             type="index"
             width="50">
         </el-table-column>
         <el-table-column
             prop=""
             label="操作"
             width="70">
           <svg style="height: 14px;width: 14px" t="1672724603946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1446" width="200" height="200"><path d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z" fill="#000000" p-id="1447"></path></svg>
           &nbsp;&nbsp;<i style="height: 14px;width: 14px" class="el-icon-download"></i>
         </el-table-column>
         <el-table-column
             prop="name"
             label="音乐标题"
             width="280px">
         </el-table-column>
         <el-table-column
             prop="mst"
             label="飙升率"
             width="70px">
         </el-table-column>
         <el-table-column
             prop="ar[0].name"
             label="歌手"
             width="280px">
         </el-table-column>
         <el-table-column
             prop="al.name"
             label="专辑"
             min-width="280px">
         </el-table-column>
         <el-table-column
             prop="dt"
             label="时长">
         </el-table-column>
       </el-table>
     </el-tab-pane>
     <el-tab-pane :label=total1 name="second">
       <XComments @getCommentTotal="getCommentTotal"></XComments>
     </el-tab-pane>
     <el-tab-pane label="收藏者" name="third">

        <XCollection></XCollection>
     </el-tab-pane>
   </el-tabs>
 </div>

</template>

<script>
import {useRoute} from "vue-router";
import {computed, ref, watch} from "vue";
import {getList} from "@/api/recommond";
import {formatDate} from "@vueuse/shared/index";
import {floor} from "lodash-es";
import {handleMusicTime} from "@/utils/utils";
import store from "@/store";
import {getSong} from "@/api/songControl";

export default {
  name: 'Xplaytop',

  setup() {
    const router = useRoute()
    const songAllList = ref({})
    const songAvatar = ref({})
    const activeName=ref('first')
    const total = ref()
    //获取歌单信息
    getList(router.params.id).then((res) => {
      songAllList.value = res.data.playlist
      songAvatar.value = res.data.playlist.creator
      //处理音乐时长
      songAllList.value.tracks.forEach((item, index) => {
        songAllList.value.tracks[index].dt = handleMusicTime(item.dt);
      });
    })
    // 导航切换
    const handleClick=(tab, event)=> {
      console.log(tab, event);
    }
    //获取评论总数（emit通信）
    const getCommentTotal=(val)=> {
      total.value=val
    }
    const total1=computed(()=>{
      if (total.value==undefined){
        return '评论'+(0)
      }
      return '评论'+(total.value)
    })

    function tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    }
    //获取歌曲地址的回调
    //                   row, column, cell, event
    const  getsongUrl = (row)=>{
      const {id,index} = row
      store.commit('getsongId',songAllList.value.tracks)
      store.commit('getsongIndex',index)
      store.commit('altershow')
      getSong(id).then((res)=>{
        store.commit('geturl',res.data.data[0].url)
      })
    }

    return {
      songAllList,
      songAvatar,
      formatDate,
      floor,
      activeName,
      handleClick,
      getCommentTotal,
      total1,
      total,
      getsongUrl,
      tableRowClassName

    }
  }
}
</script>


<style scoped>
.tab{
width: 1200px;
  margin-left: 20px;
}
.box {
  margin: 15px 20px;
  width: 1180px;
  display: flex;
  justify-content: space-between;
}

.l {
  width: 200px;
  height: 200px;
  overflow: hidden;
  background-color: #317ffb;
  border-radius: 20px;
}

.l img {
  width: 200px;
  height: 200px;
}

.r {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 960px;
}

.r div {
  display: flex;
}

.r div span, h4, div, img {
  margin-right: 10px;
  line-height: 20px;
}

.playlist {
  border: 1px solid red;
  color: red;
  height: 18px;
  width: 30px;
  font-size: 8px;
  padding-left: 4px;

  align-items: center;
}

.play3 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  width: 120px;
  height: 24px;
  border: #cccccc solid 1px;
  border-radius: 16px;
}

.active {
  color: white;
  background-color: red;
}
.listRows {
  height: 35px;
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

.index {
  text-align: center;
  line-height: 28px;
  width: 30px;
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
</style>
