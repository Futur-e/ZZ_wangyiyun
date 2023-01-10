<template>
  <div class="headerBar">
    <div class="left">
      <img src="@/assets/img/logo.png" alt=""/>
    </div>
    <div class="center">
      <el-button circle @click="this.$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <el-button circle @click="this.$router.go(1)">
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class="search1">
      <el-input v-model="input" placeholder="请输入搜索内容"
                @keyup.enter="goSearch()"
                @focus="input===''?showHot=true:showSearch=true" ></el-input>
    </div>

    <div v-show="showHot"
         @mouseleave="showHot=false"
         style="position: absolute;top: 70px;left:257px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  height: 400px;overflow: auto;">
      <div class="hotbox" v-for="(list,index) in hotList" :key="index">
        <div class="hotxbox" @click="getsongUrl(list.id,index)">
          <span :class="index>2?'gray':'red'"
                style="align-items: center;padding-left: 10px;width: 34px;height:40px;line-height: 40px">{{ index + 1 }}</span>
          <div style="display: flex;flex-direction: column;justify-content: space-around">
            <span style="font-weight: bold">{{ list.searchWord }}</span>
            <span style="color: #b5b5b5">{{ list.content }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-show="showSearch"
         @mouseleave="showSearch=false"
         style="position: absolute;top: 70px;left:257px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  overflow: auto;">
      <div class="hotbox" v-for="(list,index) in suggestList" :key="index">
        <div class="hotxbox">
        <span style="align-items: center;padding-left: 10px;width: 34px;height:40px;line-height: 40px;">
          <img :src="list.artists[0].img1v1Url" alt=""
               style="width: 22px;height: 22px;border-radius: 50%;margin-top: 10px">
        </span>
          <div style="display: flex;flex-direction: column;justify-content: space-around">
            <span style="font-weight: bold"
                  @click="getsongUrl(list.id,index)">{{ list.name }}-{{ list.artists[0].name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!--&lt;!&ndash;     注册框组件 &ndash;&gt;-->
    <!--        <registered :isDialogShow="isRegisteredShow" @closeRegistered="closeRegistered"></registered>-->
  </div>
</template>


<script>
import {onMounted, reactive, ref, watch} from "vue";
import {getHot, getList, getsuggest} from "@/api/recommond";
import {useStore} from "vuex";
import {getSearchSong, getSong} from "@/api/songControl";
import router from "@/router";

export default {
  name: 'HeaderBar',
  setup() {
    const visible = ref(false)
    const showHot = ref(false)
    const input = ref('')
    const hotList = ref([])
    const suggestList = ref([])
    const value1 = ref('')
    const showSearch = ref(false)
    const store = useStore()
    const songList = ref([])
    const changeShow = () => {
      visible.value = !visible.value
      console.log(visible.value)
    }
    onMounted(() => {
      getHot().then((res) => {
        hotList.value = res.data.data
      })
    })
    watch(input, () => {
      input.value === '' ? (showHot.value = true, showSearch.value = false) : (showHot.value = false, showSearch.value = true)
      getsuggest(input.value).then((res) => {
        suggestList.value = res.data.result.songs
      })
    })

    function handleSelect(item) {
      console.log(item);
    }

    //获取歌曲地址的回调
    const getsongUrl = (id, index) => {
      getSearchSong(id).then((res) => {
        songList.value = res.data.songs
      })
      getSong(id).then((res) => {
        store.commit('geturl', res.data.data[0].url)
      })
      watch(songList,()=>{
        store.commit('getsongId', songList.value)
        store.commit('getsongIndex', index)
        store.commit('altershow')
      })
    }
    //路由跳转
    function goSearch() {
      router.push({name: 'Search',params: {keywords:input.value}})
    }

    return {
      visible,
      showHot,
      changeShow,
      input,
      hotList,
      value1,
      handleSelect,
      suggestList,
      showSearch,
      getsongUrl,
      songList,
      store,
      goSearch
    }
  }
}
</script>


<style scoped>
/*@import "./HeaderBar-element.css";*/

.headerBar {
  background-color: #e13e3e;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  position: relative;
  z-index: 30000;
}

.left {
  width: 110px;
  margin: 0 50px 0 10px;
}

.left img {
  width: 100%;
}

.center {
  display: flex;
  align-items: center;
}

.search1 {
  margin-left: 20px;
  background-color: #e13e3e;
}

.hotbox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  width: 360px;
  cursor: pointer;
}

.hotbox:hover {
  background-color: #ededed;
}

.red {
  color: red;
}

.gray {
  color: #a4a3a3;
}

.hotxbox {
  width: 360px;
  display: flex;
  justify-content: left;
  padding: 6px 3px;
}


.buttons {
  color: rgb(235, 235, 235);
  /* display: flex; */
  height: 22px;
}

.buttons i {
  background-color: #e13e3e;
  font-size: 12px;
  transform: scale(0.8);
  padding: 5px;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  margin: 0 3px;
}

.my-autocomplete
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
  color: #ddd;
}

.right {
  display: flex;
  position: absolute;
  right: 50px;
  top: 0;
  line-height: 50px;
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 7px;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 0px;
}

.avatar img {
  width: 100%;
}

.userName {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  width: 100px;
}

.loginButton {
  width: 100%;
  text-align: center;
}

.loginButton .el-button {
  width: 200px;
}

.el-form /deep/ .el-form-item__label {
  font-size: 13px !important;
}

.hotSearchTitle {
  font-size: 13px;
  margin: 10px 0 5px 20px;
}

.hotSearchItem {
  display: flex;
  align-items: center;
  padding: 6.5px 15px;
  cursor: pointer;
}

.hotSearchItem:hover {
  background-color: #f2f2f2;
}

.hotSearchIndex {
  margin-right: 15px;
  color: #aaa;
}

.topThree {
  color: #e13e3e;
}

.hotSearchWord {
  font-size: 12px;
  color: rgb(51, 51, 51);
}

.hotSearchWordTopThree {
  font-weight: 600;
  color: black;
}

.hotSearchContent {
  font-size: 12px;
  transform: scale(0.9) translateX(-5%);
}

.searchSuggest {
  font-size: 12px;
}

.searchSuggestItemTitle {
  background-color: #f5f5f7;
  padding: 4px 8px;
}

.searchSuggestItemTitle i {
  font-size: 15px;
}

.searchSuggestItem {
  cursor: pointer;
}

.suggestItemDetail {
  padding: 4px 27px;
  font-size: 12px;
}

.suggestItemDetail:hover {
  background-color: #f2f2f2;
}
</style>
