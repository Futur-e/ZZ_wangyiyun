<template>
  <div class="songbox">
    <!--    //左边-->
    <div>
      <div style="display: flex;width: 260px" v-if="store.state.show==='1'">
        <img  :src="songurl||''" alt="" style="width: 50px;height: 50px;border-radius: 6px;margin-right: 10px">
        <div style="display: flex;flex-direction: column">
          <span>{{store.state.songlist[store.state.songIndex].name||''}}</span>
          <span style="margin-top:6px;color: #a4a3a3;font-size: 14px">{{store.state.songlist[store.state.songIndex].ar[0].name||''}}</span>
        </div>
      </div>
    </div>
    <audio ref="divRef" :src="store.state.url" autoplay
            @play="changePlay(true)"
           @pause="changePlay(false)"
    ></audio>
    <!--    中间-->
    <div style="display: flex;width:550px;flex-direction: column;justify-content: space-between; align-items: center">
      <div class="contorlbutton">
        <span style="cursor: pointer">
          <play-cycle theme="outline" size="22" fill="#e42222" v-if="0"/>
          <shuffle-one theme="outline" size="22" fill="#e42222" v-else/>
        </span>
        <span style="cursor: pointer" @click="changMusic(-1)"><go-start theme="outline" size="24" fill="#e42222" /></span>
        <span @click="changePlaystate()" style="cursor: pointer">
<!--          //正在暂停-->
          <play-one theme="filled" size="24" fill="#e42222" v-if="!store.state.play"/>
<!--          //正在播放-->
          <pause theme="outline" size="24" fill="#e42222" v-else/>
        </span>
        <span style="cursor: pointer">
          <go-end theme="outline" size="24" fill="#e42222" @click="changMusic()"/>
        </span>
        <span style="cursor: pointer">
            <like theme="outline" size="24" fill="#e42222"/>
            <like theme="filled" size="24" fill="#e42222" v-show="0"/>
        </span>
      </div>
      <div style="display: flex;width:100%;justify-content: space-between; align-items: center">
        <span>{{runTime}}</span>
        <div class="block">
          <el-slider
              class="progrechangMusiclider"
              height="10px"
              v-model="value1"
              :show-tooltip="false"
              @change="changeProgress"
          ></el-slider>
        </div>
        <span>{{totalTime}}</span>
      </div>
    </div>
    <!--    右边-->
    <div>
      <div style="width: 140px;display: flex;justify-content: space-around;align-items:center;margin: 14px 30px"
           v-if="store.state.show==='1'"
      >
        <!--      <volume-small theme="outline" size="24" fill="#e42222"/>-->
        <span><volume-notice theme="outline" size="20" fill="#e42222"/></span>
        <div class="block">
          <el-slider
              class="progrechangMusiclider1"
              height="10px"
              v-model="volume"
              :show-tooltip="false"
              @input="changeVolume"
          ></el-slider>
        </div>
      </div>
    </div>
  </div>
  <el-drawer
      title="我是标题"
      :visible="drawer"
      :with-header="false">
    <span>我来啦!</span>
  </el-drawer>
</template>

<script>
import {computed, nextTick, ref, watch} from "vue";
import {useStore} from "vuex";
import {handleMusicTime} from "@/utils/utils";
import {getSong} from "@/api/songControl";

export default {
  name: 'XsongControl',
  setup() {

    const drawer = ref('false')
    const value1 = ref()
    const store = useStore()
    const songurl = ref('')
    //获取audio
    const divRef = ref(null)
    const runTime = ref("00:00")
    const totalTime = ref("00:00")
    const volume=ref(30)
    function showchouti() {
      drawer.value = true
      alert(drawer.value)
    }
    function formatTooltip(val) {
      return val/100;
    }
    //点击播放按钮的回调
    function changePlay(play) {
      store.commit('changePlay',play)
    }
    //audio暂停
    function pauseMusic() {
      divRef.value.pause()
    }
    //audio播放
    function playMusic() {
      divRef.value.play()
    }
    //控制仓库中的播放状态
    function changePlaystate(){
      !store.state.play?playMusic():pauseMusic()
    }
    function changMusic(type) {
      if (type===-1){
        store.state.songIndex===0?store.state.songIndex=0:store.state.songIndex-=1
      }
      else {
        store.state.songIndex+=1
      }
    }

    nextTick(()=>{
      store.commit('getRunTime',runTime.value)
    })
    const u = computed(()=>{
      return store.state.songIndex
    })
    watch(u,()=>{
      store.state.url===''?setInterval(timer,900):clearInterval(timer,900)
      songurl.value=store.state.songlist[store.state.songIndex].al.picUrl
      const id=store.state.songlist[store.state.songIndex].id
      getSong(id).then((res)=>{
        store.commit('geturl',res.data.data[store.state.songIndex].url)
      })
      store.state.play=false
    },{
      deep:true
    })
    const timer= ()=>{
      totalTime.value=handleMusicTime(divRef.value.duration)
      runTime.value= handleMusicTime(divRef.value.currentTime)
      value1.value=Math.floor((divRef.value.currentTime/divRef.value.duration)*100)
    }
    // console.log("媒体元素：",divRef)
    function changeProgress(e) {
        runTime.value=Math.floor((e/100)*divRef.value.duration)
      divRef.value.currentTime=runTime.value
      // console.log(e)
    }
    function changeVolume(e) {
            divRef.value.volume=e/100
    }

    return {
      drawer,
      showchouti,
      value1,
      store,
      songurl,
      changeProgress,
      divRef,
      runTime,
      totalTime,
      changePlay,
      changePlaystate,
      changMusic,
      volume,
      changeVolume
    }
  }
}
</script>

<style scoped>
.songbox {
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 50px;
  border: 1px solid #eaeaea;
  background-color: #f0f0f0;
  padding: 10px 15px;
  bottom: 0px;
  z-index: 1000;
}

.progrechangMusiclider {
  width: 400px;
}
.progrechangMusiclider1 {
  width: 100px;
}
.contorlbutton{
  margin-top: 8px;
  width: 300px;
  display: flex;
  justify-content: space-between;
}

/deep/ .el-slider__bar {
  background: #e60b0b;
}

/deep/ .el-slider__button {
  background: #e60b0b;
  width: 12px;
  height: 12px;
  border: none;
}
</style>
