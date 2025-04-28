<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const { modelValue, isOpen } = toRefs(props)

const emits = defineEmits(['update:modelValue'])

const closeModal = () => {
  emits('update:modelValue', false)
}
</script>

<template>
  <div class="fixed inset-0" v-if="modelValue">
    <Teleport to="#modalsField">
      <AtomBackdrop :is-open="isOpen" @click="closeModal" />
      <Transition name="fade" appear>
        <div
          class="absolute left-1/2 top-1/2 flex w-[calc(100%-80px)] lg:w-auto -translate-x-1/2 aspect-video -translate-y-1/2 flex-col justify-between rounded-lg bg-white p-2 lg:p-3 shadow-popup"
        >
          <div class="flex items-center justify-center bg-black lg:h-full">
            <slot>
              <video class="h-full" controls autoplay muted controlsList="nodownload">
                <source :src="fetchImg('/video/video.mp4')" type="video/mp4" />
              </video>
            </slot>
          </div>
          <div class="absolute right-0 top-0 -translate-y-full translate-x-full cursor-pointer text-white" @click="closeModal">
            <AtomIcon name="close" :size="36" class="text-white" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transform: translate(-50%, -50%);
  transition: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(-50%, -30%);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: translate(-50%, -50%);
  opacity: 1;
}
</style>
