<script setup>
const { $gsap } = useNuxtApp()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  underLine: {
    type: Boolean,
    default: false,
  },
  /**
   * 單位 秒
   */
  time: {
    type: Number,
    default: 3,
  },
})
const { modelValue, underLine, time } = toRefs(props)

const emits = defineEmits(['update:modelValue'])

const isLoading = ref(false)
const timeL = ref(null)
const container = ref(null)

const closeModal = () => {
  emits('update:modelValue', false)
}

const timer = () => {
  isLoading.value = true
  $gsap.set(timeL.value, { width: '0' })
  $gsap.to(timeL.value, {
    width: '100%',
    duration: time.value,
    ease: 'none',
    onComplete: () => {
      $gsap.to(container.value, {
        opacity: 0,
        onComplete: () => {
          closeModal()
          isLoading.value = false
        },
      })
    },
  })
}

watch(modelValue, () => {
  if (modelValue.value) {
    nextTick(() => {
      if (!isLoading.value) {
        timer()
      }
    })
  }
})
</script>

<template>
  <div class="fixed inset-0" v-if="modelValue">
    <Teleport to="#modalsField">
      <!-- <AtomBackdrop :is-open="isOpen" @click="closeModal" /> -->
      <Transition name="fade" appear>
        <div
          ref="container"
          class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none flex-col justify-between overflow-hidden rounded-lg bg-white px-10 py-5 shadow-popup"
        >
          <div>
            <div>
              <p class="text-center text-[18px] font-normal">已送出你的選擇</p>
            </div>
          </div>
          <div v-if="underLine" ref="timeL" class="absolute bottom-0 left-0 h-1 bg-txt-light"></div>
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
