<template>
<div class="D_box">
  <!--  精品歌单栏-->
  <div class="top">
    <img
        :src="playList.coverImgUrl"
        alt=""
        class="imgback"
    />
    <div class="l">
      <img :src="playList.coverImgUrl" alt="">
    </div>
    <div class="r">
      <div class="audio"><i class="el-icon-trophy"></i>精品歌单</div>
      <span>{{playList.name}}</span>
    </div>
  </div>
  <!--//tag栏-->
  <Xtags :hotTags="hotTags" :allTags="allTags" @getTagList="getTagList"></Xtags>
<!--  获取歌单-->
  <div class="wenben">
    <div class="xiaoimg">
      <div v-for="(item,index) in tagsList" :key="item.id">
        <router-link to="">
          <img :src="item.coverImgUrl" alt="">
        </router-link>
        <h4>{{item.name}}</h4>
      </div>
    </div>
  </div>
  <el-pagination
      style="margin: 0 400px"
      background
      layout="prev, pager, next"
      @current-change="currentchange"
      :total="total">
  </el-pagination>
</div>
</template>

<script>
import {ref} from "vue";
import {getAllTags, getHotTags, getPlaylist, getTagsList} from "@/api/recommond";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Playlist",
  components: {},

  setup(){
    const playList = ref({})
    const hotTags = ref([])
    const allTags = ref([])
    const tagsList = ref([])
    const total = ref(1)
    const page = ref(0)
    //精品歌单获取图片信息
    getPlaylist().then(data=>{
      playList.value = data.data.playlists[0]
    })
    //获取tags
    getHotTags().then(data=>{
      hotTags.value = data.data.tags
    })
    //获取全部歌单
    getAllTags().then(data=>{
      allTags.value = data.data.sub
    })
    // 获取全部歌单列表
    const  getAllTagsList= (list) => {
      getTagsList(list,page.value).then(data=>{
        tagsList.value = data.data.playlists
        total.value = data.data.total
      })
    }
    //获取全部歌单列表回调
    const getTagList = (list)=>{
     getAllTagsList(list)
    }
    //改变页面
    const currentchange = (val)=>{
      page.value = val
      getAllTagsList()
    }
    return{
      playList,
      hotTags,
      allTags,
      getTagList,
      tagsList,
      total,
      currentchange
    }
  }

}
</script>

<style scoped>
.D_box{
  width: 1200px;
}
.top{
  position: relative;
  display: flex;
  width: 1200px;
  height: 200px;
  border: 2px solid red;
  border-radius: 20px;
  margin-left: 30px;
  margin-top: 20px;
  overflow: hidden;
}
.imgback{
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  transform: translateY(-80px);
  filter: blur(30px) brightness(70%);
}
.l img{
  width: 180px;
  height: 180px;
  border-radius: 8px;
  margin-left: 20px;
  margin-top: 10px;
  margin-right: 20px;
}
.r{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.audio{
  width: 100px;
  height: 30px;
  border: 2px solid rgb(185, 137, 94);
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  color: rgb(185, 137, 94);
}
.r span{
  font-size: 20px;
  color: white;
}
.wenben{
  width: 1170px;
  margin: 0 30px;
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
}
.xiaoimg img{
  width: 200px;
  height: 200px;
  border-radius: 20px;

}
</style>
