<script setup>
import { useYouTubeAPI } from '@/composables/useYoutube'
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
})
const { videoId, autoplay, id } = toRefs(props)

const { loadYouTubeAPI } = useYouTubeAPI()
const player = ref(null)

onMounted(async () => {
  try {
    const YT = await loadYouTubeAPI()

    player.value = new YT.Player(id.value, {
      videoId: videoId.value,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: autoplay.value ? 1 : 0,
        controls: 0,
      },
      events: {
        // onReady: () => console.log("播放器已就緒"),
        // onStateChange: (event) => console.log("狀態改變:", event.data),
      },
    })
  } catch (error) {
    // console.error(`播放器 ${id.value} 初始化失敗:`, error)
  }
})

// 控制影片
const isPlay = ref(false)
const playVideo = () => {
  isPlay.value = true
  player.value?.playVideo()
}
const pauseVideo = () => {
  isPlay.value = false
  player.value?.pauseVideo()
}
</script>

<template>
  <div class="relative">
    <div class="absolute top-0 size-full bg-transparent" @click="isPlay ? pauseVideo() : playVideo()"></div>
    <div :id="id" :style="{ aspectRatio: '16/9', pointerEvents: 'none' }" class="youtube-player"></div>
  </div>
</template>

<style scoped>
.youtube-player {
  max-width: 100%;
  margin: auto;
}
</style>
