<template>
  <div class="singerContainer">
    <div class="singer">
      <div class="selectors">
        <div class="selectorItem">
          <div class="title">语种：</div>
          <Xsongersel :SelData="languageSort" @changesel="changearea"></Xsongersel>
        </div>
      </div>
      <div class="selectors">
        <div class="selectorItem">
          <div class="title">分类：</div>
          <Xsongersel :SelData="typeSort" @changesel="changetype"></Xsongersel>
        </div>
      </div>
      <div class="selectors">
        <div class="selectorItem">
          <div class="title" style="width: 116px">筛选：</div>
          <Xsongersel :SelData="initialSort" @changesel="changeinitial"></Xsongersel>
        </div>
      </div>
    </div>
  </div>
  <Xsonger :list="songerList"></Xsonger>
  <el-pagination
      style="margin: 0 400px 100px"
      background
      layout="prev, pager, next"
      @current-change="currentchange"
      :total="100">
  </el-pagination>
</template>

<script>
import {onMounted, ref} from "vue";
import {getSoner} from "@/api/recommond";

export default {
  name: 'Songer',
  setup() {
    const languageSort = ref([
      {area: -1, name: "全部"},
      {area: 7, name: "华语"},
      {area: 96, name: "欧美"},
      {area: 8, name: "日本"},
      {area: 16, name: "韩国"},
      {area: 0, name: "其它"},
    ])
    const area = ref(-1)
    const typeSort = ref([
      {type: -1, name: "全部"},
      {type: 1, name: "男歌手"},
      {type: 2, name: "女歌手"},
      {type: 3, name: "乐队"},
    ])
    const type = ref(-1)
    const initialSort = ref([
      {initial: -1, name: "热门"},
      {initial: "a", name: "A"},
      {initial: "b", name: "B"},
      {initial: "c", name: "C"},
      {initial: "d", name: "D"},
      {initial: "e", name: "E"},
      {initial: "f", name: "F"},
      {initial: "g", name: "G"},
      {initial: "h", name: "H"},
      {initial: "i", name: "I"},
      {initial: "j", name: "J"},
      {initial: "k", name: "K"},
      {initial: "l", name: "L"},
      {initial: "m", name: "M"},
      {initial: "n", name: "N"},
      {initial: "o", name: "O"},
      {initial: "p", name: "P"},
      {initial: "q", name: "Q"},
      {initial: "r", name: "R"},
      {initial: "s", name: "S"},
      {initial: "t", name: "T"},
      {initial: "u", name: "U"},
      {initial: "v", name: "V"},
      {initial: "w", name: "W"},
      {initial: "x", name: "X"},
      {initial: "y", name: "Y"},
      {initial: "z", name: "Z"},
      {initial: 0, name: "#"},
    ])
    const initial = ref(-1)
    const songerList = ref([])
    const page = ref(0)
    //页面初始加载调用，渲染数据
    getSoner(type.value,area.value,initial.value,page.value).then((data)=>{
      songerList.value = data.data.artists
    })
    const getNewSonger = ()=>{
      getSoner(type.value,area.value,initial.value,page.value).then((data)=>{
        songerList.value = data.data.artists
      })
    }
    //改变语种的回调
    const changearea = (index)=>{
      songerList.value =[]
      area.value = languageSort.value[index].area
      getNewSonger()
    }
    //改变分类的回调
    const changetype = (index)=>{
      songerList.value =[]
      type.value = typeSort.value[index].type
      getNewSonger()
    }
    //改变筛选的回调
    const changeinitial = (index)=>{
      songerList.value =[]
      initial.value = initialSort.value[index].initial
      getNewSonger()
    }
    //改变页面
    const currentchange = (val)=>{
      page.value = (val-1)*30
      songerList.value=[]
      getNewSonger()
    }
    return {
      languageSort,
      typeSort,
      initialSort,
      songerList,
      currentchange,
      changearea,
      changetype,
      changeinitial
    }
  }
}
</script>

<style scoped>
.singerContainer {
  display: flex;
}

.singer {
  max-width: 1200px;
  padding: 0 10px;
}

.selectorItem {
  display: flex;
}

.title {
  font-size: 18px;
  width: 55px;
  padding-top: 5px;
  line-height: 33px;
  color: #606266;
}

.secondNavBar {
  width: calc(100% - 60px);
}

.page {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
}

.listCardContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
