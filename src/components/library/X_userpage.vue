<template>
  <div class="b_box1">
    <div class="topbox">
      <img :src="userDetail.avatarUrl" alt="" style="width: 220px;height: 220px;border-radius: 50%">
      <div class="topr">
        <h2>{{ userDetail.nickname }}</h2>
        <div class="grend">
          <span class="sp" style="background-color: #430505;color: #e39466">CNIP·{{ userDetail.gender }}</span>
          <span class="sp">Lv{{ userDetail1.level }}</span>
          <span class="sp" style="background-color: #51d9fb">
            <i v-show="userDetail.gender===1" class="el-icon-male"></i>
            <i v-show="userDetail.gender===2" class="el-icon-female"></i>
          </span>
          <div>
            ···
          </div>
          <div>
            <i class="el-icon-plus" style="color: red;margin-right: 4px"></i>
            <span>关注</span>
          </div>
          <div>
            <i class="el-icon-message" style="margin-right: 4px"></i>
            <span>发私信</span>
          </div>
        </div>
        <div class="x_box">
          <div>
            <span>{{ userDetail.eventCount }}</span>
            <span>动态</span>
          </div>
          <div>
            <span>{{ userDetail.follows }}</span>
            <span>关注</span>
          </div>
          <div>
            <span>{{ userDetail.followeds }}</span>
            <span>粉丝</span>
          </div>
        </div>
        <span>所在地区：{{ userDetail.province + " " + userDetail.city }}</span>
        <span>社交网络：未绑定</span>
        <span>个人介绍：{{ userDetail.signature === '' ? '暂无简介' : userDetail.signature }}</span>
      </div>
    </div>
    <div class="playbox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="创建的歌单" name="first">
          <recommend :list="userplayList" ></recommend>
        </el-tab-pane>
        <el-tab-pane label="收藏的歌单" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="收藏的博客" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="创建的音乐专辑" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import {getUserDetail, getUserPlaylist} from "@/api/recommond";
import {useRoute, useRouter} from "vue-router";
import {reactive, ref, watch} from "vue";

export default {
  name: 'XUserpage',
  components: {},

  setup() {
    const router = useRoute()
    const userDetail = ref({})
    const userDetail1 = ref({})
    const timestamp = Date.parse(new Date())
    const playList = ref([])
    const userplayList = reactive([])
    const activeName=ref('first')
    // 获取用户数据
    getUserDetail(router.params.uid).then((res) => {
      res.data.profile["level"] = res.data.level;
      userDetail1.value = res.data
      userDetail.value = res.data.profile
    })
    // 获取用户创建的歌单
    getUserPlaylist(router.params.uid, timestamp.value).then((res) => {
      playList.value = res.data.playlist
    })
    // 遍历歌单更改属性名（方便组件recommend的复用）
    watch(playList, () => {
      playList.value.forEach(({coverImgUrl,name,id}, index) => {
        userplayList.push({picUrl:coverImgUrl,name,id})
      })
    })
    function handleClick(tab, event) {
      console.log(tab, event);
    }
    return {
      userDetail,
      userDetail1,
      userplayList,
      playList,
      activeName,
      handleClick
    }
  }


}
</script>

<style scoped>
.b_box1 {
  width: 1000px;
  margin: 20px 24px;
}

.topr {
  width: 900px;
  height: 230px;
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
  flex-direction: column;
}

.topbox {
  display: flex;
  margin-bottom: 20px;
}

.grend {
  width: 900px;
  border-bottom: 1px solid gainsboro;
  padding-bottom: 10px;
}

.grend .sp {
  float: left;
  margin-top: 10px;
  margin-right: 10px;
  padding: 0 8px;
  border-radius: 20px;
  background-color: #c0c0c0;
}

.grend div {
  float: right;
  margin: 0 4px;
  padding: 4px 10px;
  border: 1px solid gainsboro;
  border-radius: 20px;
}

.x_box {
  display: flex;
}

.x_box div:nth-child(n) {
  display: flex;
  flex-direction: column;
  width: 80px;
  border-right: 1px solid gray;
  align-items: center;

}
</style>
