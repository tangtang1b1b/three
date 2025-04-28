<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const props = defineProps({
  slideData: {
    type: Array,
    default: () => [],
  },
  isNavigation : {
    type: Boolean,
    default: false
  },
  autoplay : {
    type: Boolean,
    default: false
  }
})
const { slideData, isNavigation, autoplay } = toRefs(props)

const swiperThumbs = ref(null)

// 監聽縮圖 Swiper 的初始化
const onThumbsSwiper = (swiper) => {
  swiperThumbs.value = swiper
}
</script>

<template>
  <!-- Main Swiper -->
  <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :loop="true"
    :spaceBetween="20"
    :initialSlide="0"
    :autoplay="autoplay ? { delay: 4000, disableOnInteraction: false } : false"
    :navigation="isNavigation"
    :thumbs="{ swiper: swiperThumbs }"
    :modules="[FreeMode, Navigation, Thumbs, Autoplay]"
    class="mySwiper2"
  >
    <swiper-slide v-for="item in slideData" :key="item">
      <img class="aspect-square rounded-md object-cover" :src="item" />
    </swiper-slide>
  </swiper>

  <!-- Thumbnails Swiper -->
  <swiper
    @swiper="onThumbsSwiper"
    :loop="true"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="[FreeMode, Navigation, Thumbs]"
    class="mySwiper"
  >
    <swiper-slide v-for="item in slideData" :key="item">
      <img class="aspect-square rounded-md object-cover" :src="item" />
    </swiper-slide>
  </swiper>
</template>

<style scoped>
/* 你的樣式保持不變 */
.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
