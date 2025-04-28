<script setup>
const items = ref([
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
  '/images/default.jpg',
])
</script>

<template>
  <div class="container">
    <div class="lg:px-40 py-10">
      <h2 class="text-2xl font-bold mb-5 mt-10">Single</h2>
      <ModalSliderSingle id="single_slider" pagination-id="single_slider_Pagination" :slide-data="items" :autoplay="false">
        <template #default="{ slotSlideData, slotIndex }">
          <div class="swiper-slide" v-for="slide in slotSlideData" :key="slide.src">
            <img class="w-[420px] aspect-[16/9] rounded-xl object-cover" :src="fetchImg(slide)" alt="slide" />
          </div>
        </template>
      </ModalSliderSingle>
      <h2 class="text-2xl font-bold mb-5 mt-10">Basic</h2>
      <ModalSliderBasic id="default_slider" pagination-id="default_slider_Pagination" :slide-data="items" :autoplay="false">
        <template #default="{ slotSlideData, slotIndex }">
          <div class="swiper-slide" v-for="slide in slotSlideData" :key="slide.src">
            <img class="size-full aspect-[16/9] rounded-xl object-cover" :src="fetchImg(slide)" alt="slide" />
          </div>
        </template>
      </ModalSliderBasic>
      <h2 class="text-2xl font-bold mb-5 mt-10">Center</h2>
      <ModalSliderCenter id="center_slider" pagination-id="center_slider_Pagination" :slide-data="items" :autoplay="false">
        <template #default="{ slotSlideData, slotIndex }">
          <div class="swiper-slide" v-for="slide in slotSlideData" :key="slide.src">
            <img class="size-full aspect-[16/9] rounded-xl object-cover" :src="fetchImg(slide)" alt="slide" />
          </div>
        </template>
      </ModalSliderCenter>
      <h2 class="text-2xl font-bold mb-5 mt-10">Thumb</h2>
      <ModalSliderThumb id="Thumb_slider" pagination-id="center_slider_Pagination" :slide-data="items" :autoplay="false" />
    </div>
  </div>
</template>

<style scoped></style>
