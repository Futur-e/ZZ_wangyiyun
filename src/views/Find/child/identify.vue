<template>
  <swiper
      style="margin-right: 100px"
      :effect="'coverflow'"
      :grabCursor="true"
      :autoplay = "{delay:2000}"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
  >
  <swiper-slide v-for="(item,index) in bannerList" :key="item.id">
    <img class="my_swiper_imgs" :src="item.imageUrl" alt="" />
  </swiper-slide>
  </swiper>

  <Recommend :list="list" :tit="title"></Recommend>


</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

import {ref} from "vue";
import {getbanner} from "@/api/banner";
import { EffectCoverflow, Pagination, Autoplay} from "swiper";
import "./style.css";
import Recommend from "@/components/library/recommend";
import Left from "@/views/Find/left";
import {getrecommondList} from "@/api/recommond";

// 在modules加入要使用的模块

export default {
  name: "Identify",
  components: {
    Swiper,
    SwiperSlide,
      Recommend,
  },

  setup() {
    const activeIndex = ref('1')
    const bannerList = ref([])
    const title = ref('推荐歌单')
    const list = ref([])
    getrecommondList(10).then(res=>{
      list.value = res.data.result
    })
    getbanner().then((data) => {
      bannerList.value = data.data.banners
    })
    const onSwiper = (swiper) => {

    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      list,
      title,
      activeIndex,
      bannerList,
      onSwiper,
      onSlideChange,
      modules: [EffectCoverflow, Pagination,Autoplay],
    };
  },
};
</script>



<style >
.swiper {
  width: 900px;
  height: 150px;
}
</style>
