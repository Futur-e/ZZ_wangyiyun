
<template>
  <div class="sbox">
    <h1>找到{{totalMusic}}首单曲</h1>
    <h3>最佳匹配</h3>
    <div style="display: flex;width: 350px;height:100px;line-height: 100px;border-radius: 18px;background-color: #ebebeb;overflow: hidden"
        v-for="(list,index) in multimatch"
         :key="index"
    >
      <img :src="list.picUrl" alt="" style="width: 100px;height: 100px">
      <span style="font-size: 18px;margin-left: 20px">歌手：{{list.name}}&nbsp;&nbsp;&nbsp;&nbsp;></span>
    </div>
    <!--{{songlists}}-->
  </div>
  <div class="tab">
    <el-table
        :data="songlists"
        stripe
        style="width: 1200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
        :row-class-name="tableRowClassName"
        @row-click="getsongUrl"
    >
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
import {getMultimatch, getSearchSong, getSong, getSongList} from "@/api/songControl";
import {computed, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {handleMusicTime} from "@/utils/utils";
import store from "@/store";

export default {
  name:'XsearchSongs',
  setup(){
    const songlists=ref([])
    const multimatch=ref([])
    const offset=ref(0)
    const totalMusic=ref(0)
    const total=ref(0)
    const router1=useRouter()
      getSongList(router1.currentRoute.value.params.keywords,offset.value).then((res)=>{
        songlists.value = res.data.result.songs
        totalMusic.value = res.data.result.songCount
        total.value=Math.ceil(totalMusic.value/30)*10
        //处理音乐时长
        songlists.value.forEach((item, index) => {
          songlists.value[index].dt = handleMusicTime(item.dt);
        });
      })
    getMultimatch(router1.currentRoute.value.params.keywords).then((res)=>{
      multimatch.value=res.data.result.artist
    })
    const keywords = computed(()=>{
      return router1.currentRoute.value.params.keywords
    })
    watch(keywords,()=>{
      offset.value=0
      getSongList(router1.currentRoute.value.params.keywords,offset.value)
      router1.go(0)
    })
    //改变页面
    const currentchange = (val)=>{
      offset.value = (val-1)*30
      getSongList(router1.currentRoute.value.params.keywords,offset.value).then((res)=>{
        songlists.value = res.data.result.songs
        totalMusic.value = res.data.result.songCount
        total.value=Math.ceil(totalMusic.value/30)*10
        //处理音乐时长
        songlists.value.forEach((item, index) => {
          songlists.value[index].dt = handleMusicTime(item.dt);
        });
      })
    }
    function tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    }
    //获取歌曲地址的回调
    const songlist=ref([])
    //                   row, column, cell, event
    const  getsongUrl = (row)=>{
      const {id,index} = row
      store.commit('getsongId',songlists.value)
      store.commit('getsongIndex',index)
      store.commit('altershow')
      getSong(id).then((res)=>{
        store.commit('geturl',res.data.data[0].url)
      })
    }
    return{
      songlists,
      multimatch,
      totalMusic,
      total,
      currentchange,
      getsongUrl,
      tableRowClassName,
      songlist
    }
  }
}
</script>

<style scoped>
.sbox{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 220px;
}
.tab{
  width: 1100px;
  margin-bottom: 100px;
  margin-left: 26px;
}
</style>
