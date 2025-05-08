<script setup>
import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const threeContainer = ref(null)

onMounted(async () => {
  const clock = new THREE.Clock()
  // 建立場景
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xe3cf57)
  const loader = new GLTFLoader()

  // 物理場景
  const world = new CANNON.World()
  world.gravity.set(0, -9.82, 0) // 設置重力
  const physicsMaterial = new CANNON.Material('physics')
  const objectMaterial = new CANNON.Material('object')
  const contactMaterial = new CANNON.ContactMaterial(physicsMaterial, objectMaterial, {
    restitution: 0.5, // 彈性係數，0 表示不彈，1 表示完全彈性
    friction: 0.3, // 摩擦係數
  })
  world.addContactMaterial(contactMaterial)

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

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-2, 2, 2)
  light.castShadow = true
  scene.add(light)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  //物件與物理合體
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0xff00ff }))
  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true // 地板接收陰影
  scene.add(plane)
  const planeBody = new CANNON.Body({
    mass: 0, // 靜態物體
    position: new CANNON.Vec3(0, 0, 0), // 中心位置
    material: physicsMaterial, // 使用物理材質
    shape: new CANNON.Plane(new CANNON.Vec3(0.5, 0.5, 0.5)), // 添加平面形狀
  })
  planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // 旋轉平面與視覺平面一致
  world.addBody(planeBody)

  const box = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshStandardMaterial({ color: 0xffffff }))
  const line = new THREE.EdgesGeometry(box.geometry, 1)
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
  const lineMesh = new THREE.LineSegments(line, lineMaterial)
  box.add(lineMesh)
  box.position.set(0, 0.05, 0)
  box.castShadow = true // 物體投射陰影
  scene.add(box)
  const boxBody = new CANNON.Body({
    mass: 1, // 質量
    position: new CANNON.Vec3(0, 1, 0), // 初始位置，稍微高於平面
    material: objectMaterial, // 使用正確的材質
    shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)),
  })
  world.addBody(boxBody)

  const animate = () => {
    requestAnimationFrame(animate)
    // 更新物理世界
    const delta = clock.getDelta()
    world.step(1 / 60, delta, 3)
    // 將剛體的位置同步到 Three.js 的 Mesh
    const currentTime = Date.now()
    box.position.copy(boxBody.position)
    box.quaternion.copy(boxBody.quaternion)
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
