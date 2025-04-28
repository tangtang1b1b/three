<script setup>
const props = defineProps({
  colorful: {
    type: Boolean,
    default: false,
  },
})
const { colorful } = toRefs(props)
const { $gsap } = useNuxtApp()
const isCursor = ref(false)

const setMouse = (e) => {
  if(isCursor.value){ return }
  isCursor.value = true

  let x = e.clientX
  let y = e.clientY
  let div = document.createElement('cc')
  let size = Math.max(10, Math.random() * 15)
  div.style.position = 'fixed'
  div.style.top = '0'
  div.style.left = '0'
  div.style.width = `${size}px`
  div.style.height = `${size}px`
  div.style.backgroundColor = colorful.value ? `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` : '#fff'
  div.style.pointerEvents = 'none'
  div.style.mixBlendMode = colorful.value ? 'normal' : 'exclusion'
  div.style.zIndex = '999'
  let transX = Math.random() * 300 - 150
  let transY = Math.random() * 300 - 150

  document.body.appendChild(div)

  $gsap.set(div, {
    top: `${y}px`,
    left: `${x}px`,
  })
  $gsap.to(div, {
    top: `${y + transY}px`,
    left: `${x + transX}px`,
    scale: 0.5,
    duration: 1.5,
    opacity: 0,
    ease: 'linear',
    onComplete: () => {
      document.body.removeChild(div)
    },
  })
  setTimeout(() => {
    isCursor.value = false
  }, 30);
}

onMounted(() => {
  window.addEventListener('mousemove', setMouse)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', setMouse)
})
</script>
