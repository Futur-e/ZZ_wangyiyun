<template>
  <div class="rankingContainer">
    <div class="guanfang">
      <div class="title">官方榜</div>
      <div class="x_box"
           v-for="(list,index) in ranklist.splice(0,4)"
           :key="index"
      >
        <Xselect :list="list"></Xselect>
      </div>
    </div>
    <div class="world">
      <div class="title">全球榜</div>
      <Xrank :list="ranklist"></Xrank>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {getRankList} from "@/api/recommond";

export default {
  name: 'Ranklist',
  components: {},

  setup() {
    const ranklist = ref([])
    getRankList().then(data => {
      ranklist.value = data.data.list
    })
    return {
      ranklist
    }
  }
}
</script>

<style scoped>
.rankingContainer {
  margin: 20px 20px;
}

.title {
  font-size: 20px;
  color: #606266;
}
</style>
