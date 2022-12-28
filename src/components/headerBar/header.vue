<template>
  <div class="headerBar">
    <div class="left">
      <img src="@/assets/img/logo.png" alt=""/>
    </div>
    <div class="center">
      <el-button   circle>
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <el-button   circle>
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class="search1">
      <el-row class="demo-autocomplete">
        <el-col :span="30">
          <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
    </div>


<!--&lt;!&ndash;     注册框组件 &ndash;&gt;-->
<!--        <registered :isDialogShow="isRegisteredShow" @closeRegistered="closeRegistered"></registered>-->
  </div>
</template>


<script>
import {ref} from "vue";

export default {
  name: 'HeaderBar',
  setup() {
    const visible = ref(false)
    const input = ref()
    const changeShow = () => {
      visible.value = !visible.value
      console.log(visible.value)
    }
    return {
      visible,
      changeShow,
      input
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
.search1{
  margin-left: 20px;
  background-color: #e13e3e;
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
