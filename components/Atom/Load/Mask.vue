<script setup></script>

<template>
  <div
    class="w-full overflow-hidden rounded-md duration-300"
  >
    <div class="load | aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-200"></div>
    <div class="load | mt-3 h-4 w-2/3"></div>
    <div class="load | mt-2 h-4 w-1/2"></div>
  </div>
</template>

<style scoped>
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
.load {
  position: relative;
  background-color: #eee;
  border-radius: 6px;
  overflow: hidden;
}
.load::after {
  display: block;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: loading 1.5s infinite;
}
</style>
