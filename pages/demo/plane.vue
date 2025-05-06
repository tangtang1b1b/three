<script setup>
import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const threeContainer = ref(null)

onMounted(async () => {
  // 建立場景
  const scene = new THREE.Scene()
  const loader = new GLTFLoader()
  // 物理場景
  const world = new CANNON.World()

  const physicsMaterial = new CANNON.Material('physics')
  const objectMaterial = new CANNON.Material('physics2')
  const contactMaterial = new CANNON.ContactMaterial(physicsMaterial, objectMaterial, {
    restitution: 0.7, // 彈性係數，0 表示不彈，1 表示完全彈性
    friction: 0.5, // 摩擦係數
  })
  world.addContactMaterial(contactMaterial)

  world.gravity.set(0, -9.82, 0) // 設置重力

  scene.background = new THREE.Color(0xe3cf57)
  // 建立相機
  const aspectRatio = window.innerWidth / window.innerHeight
  const cameraWidth = 2 // 相機視圖寬度
  const cameraHeight = cameraWidth / aspectRatio // 按比例計算高度

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(1.25, 1.25, 1.25)
  camera.lookAt(0, 0, 0)

  // 建立渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)
  threeContainer.value.appendChild(renderer.domElement)

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0xffffff }))
  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true // 地板接收陰影
  scene.add(plane)

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-2, 2, 2)
  light.castShadow = true
  scene.add(light)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const clock = new THREE.Clock()

  // 啟用連續碰撞檢測
  const animate = () => {
    requestAnimationFrame(animate)
    // 更新物理世界
    const delta = clock.getDelta()
    world.step(1 / 60, delta, 3)
    // 將剛體的位置同步到 Three.js 的 Mesh
    const currentTime = Date.now()

    renderer.render(scene, camera)
  }
  animate()

  // 響應視窗大小變化
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
})
</script>

<template>
  <div ref="threeContainer" id="three-container" class="h-[calc(100vh-115px)] w-full"></div>
</template>

<style scoped>
#three-container {
  overflow: hidden;
}
</style>
