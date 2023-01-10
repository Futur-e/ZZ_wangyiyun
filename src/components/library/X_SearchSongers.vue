<template>
  <div class="sbox1">
     <h2 style="height: 35px;width:200px;background-color: #d51212;color: white;border-radius: 20px;text-align: center">找到{{taotalSongers}}个歌单</h2>
     <recommend :list="songerLists" v-show="songerLists"></recommend>
     <recommend :list="albumsList" v-show="albumsList"></recommend>
    <el-pagination
        style="margin: 20px 400px 70px"
        background
        layout="prev, pager, next"
        @current-change="currentchange"
        :total="Math.ceil(taotalSongers/30)*10">
    </el-pagination>
  </div>
</template>

<script>
import {reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {getSongers, getSongList} from "@/api/songControl";
import {handleMusicTime} from "@/utils/utils";

export default {
  name: 'XsearchSongers',
  props:['type'],
  setup(props) {
    const router = useRouter()
    const songerList = ref([])
    const albumsList = ref([])
    const songerLists = ref([])
    const offset = ref(0)
    const taotalSongers = ref(0)
    getSongers(router.currentRoute.value.params.keywords,offset.value,props.type).then((res)=>{
     if (props.type===1000){
       taotalSongers.value=res.data.result.playlistCount
       songerList.value=res.data.result.playlists
     }else if (props.type===10)
       taotalSongers.value=res.data.result.albumCount
       albumsList.value=res.data.result.albums
    })
    const currentchange = (val)=>{
      offset.value = (val-1)*30
      getSongers(router.currentRoute.value.params.keywords,offset.value,props.type).then((res)=>{
        if (props.type===1000){
          taotalSongers.value=res.data.result.playlistCount
          songerList.value=res.data.result.playlists
        }else if(props.type===10){
          taotalSongers.value=res.data.result.albumCount
          albumsList.value=res.data.result.albums
        }
      })
    }
    watch(songerList,()=>{
      songerList.value.forEach(({coverImgUrl,name,id},index)=>{
        songerLists.value.push({picUrl: coverImgUrl, name, id})
      })
    })
    return{
      songerLists,
      taotalSongers,
      currentchange,
      albumsList,
      props
    }
  }
}
</script>

<style scoped>
.sbox1 {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
