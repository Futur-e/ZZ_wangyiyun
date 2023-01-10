import { createStore } from 'vuex'

export default createStore({
  state: {
    // 歌曲地址
    url:'',
    songlist:[],
    songIndex:'',
    show:'0',
    // 播放键的回调
    play:false
  },
  getters: {
  },
  mutations: {
    geturl(state,songurl){
      state.url=songurl
    },
    getsongId(state,songId){
      state.songlist=songId
    },
    getsongIndex(state,index){
      state.songIndex = index
    },
    altershow(state){
      state.show='1'
    },
    changePlay(state,play){
      state.play=play
    }
  },
  actions: {
  },
  modules: {
  }
})
