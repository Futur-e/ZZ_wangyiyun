<template>
  <div class="navBar">
    <div
        class="barItem"
        v-for="(item, index) in SelData"
        :key="index"
        @click="changeSel(index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Xsongersel",
  props:['SelData'],
  setup(props,{emit}){
    const changeSel = (index) => {
      emit('changesel',index)
    }
    return{
      changeSel
    }
  }

};
</script>

<style scoped>
.navBar {
  display: flex;
  flex-wrap: wrap;
}

.barItem {
  margin: 4px -2px;
  padding: 6px 10px;
  font-size: 18px;
  color: #606266;
  width: 60px;
  text-align: center;
  box-sizing: content-box;
  transform: scale(0.9, 0.9);
  cursor: pointer;
}

.active {
  background-color: #fdf5f5;
  color: #ec4747;
  border-radius: 11px;
}
</style>
