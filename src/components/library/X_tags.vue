<template>
  <div class="box" >
    <div class="left">
      <span @click="showHid">{{current}}&nbsp;<i class="el-icon-arrow-right"></i></span>
    </div>
    <div class="hid" v-show="!showhid">
      <div class="showBox">
        <span
            v-for="(list,index) in allTags" :key="index"
            :class="current === list.name ? 'active':''"
            @click="changeCurrent(list)"
        >{{list.name}}</span>
      </div>
    </div>
    <div class="right">
      <span
          v-for="(list,index) in hotTags" :key="list.id"
          :class="current ===list.name? 'active1':''"
          @click="changeCurrent(list)"
      >{{list.name}}</span>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name:'Xtags',
  props:['hotTags','allTags'],
  setup(props,{emit}){
    const current = ref()
    const allTags = ref([])
    const showhid = ref(true)
    current.value = props.hotTags[0].name
    allTags.value = props.allTags
    emit('getTagList',current.value)
    const showHid = ()=>{
      showhid.value = !showhid.value
    }
    const changeCurrent = (item) => {
      current.value = item.name
      emit('getTagList',item.name)
    }
    return{
      current,
      showHid,
      showhid,
      allTags,
      changeCurrent
    }
  }
}
</script>

<style scoped>
.box{
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-top: 15px;
}
span{
  font-size: 14px;
}
.left{
  width: 110px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid gainsboro;
  border-radius: 30px;
  position: relative;
}
.hid{
  position: absolute;
  top: 350px;
}
.showBox{
  width: 350px;
  height: 300px;
  border-radius: 10px;
  background-color: #cccccc;
  overflow: auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 15px;
}
.showBox span{
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
}
.right{
  width: 600px;
  display: flex;
  justify-content: space-around;
}
.active{
  background-color: rgb(252, 235, 235);
  color: rgb(234, 112, 112);
}
.active1{
  padding: 0 14px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 20px;
  background-color: rgb(252, 235, 235);
  color: rgb(234, 112, 112);
}
</style>
