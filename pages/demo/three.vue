<script setup>
import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const threeContainer = ref(null)
const isDragging = ref(false)
const previousMousePosition = ref({
  x: 0,
  y: 0,
})
const boxCompoundRef = ref(null)
const controlRotate = (boxContainer) => {
  const onMouseMove = (e) => {
    if (!isDragging.value) return

    const deltaMove = {
      x: e.clientX - previousMousePosition.value.x,
      y: e.clientY - previousMousePosition.value.y,
    }

    // 設定旋轉的靈敏度
    const sensitivity = 0.005

    // 旋轉容器
    boxContainer.position.x += deltaMove.x * sensitivity
    boxContainer.position.y -= deltaMove.y * sensitivity

    previousMousePosition.value.x = e.clientX
    previousMousePosition.value.y = e.clientY
  }

  const onMouseUp = () => {
    isDragging.value = false
    // 移除事件監聽器，避免重複添加
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  threeContainer.value.addEventListener('mousedown', (e) => {
    isDragging.value = true
    previousMousePosition.value.x = e.clientX
    previousMousePosition.value.y = e.clientY

    // 添加事件到document而不是threeContainer
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })
}

onMounted(async () => {
  // 建立場景
  const scene = new THREE.Scene()
  const loader = new GLTFLoader()
  // 物理場景
  const world = new CANNON.World()

  const physicsMaterial = new CANNON.Material('physics')
  const physicsMaterial2 = new CANNON.Material('physics2')
  const contactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial2, {
    restitution: 0.7, // 彈性係數，0 表示不彈，1 表示完全彈性
    friction: 0.5, // 摩擦係數
  })
  world.addContactMaterial(contactMaterial)

  world.gravity.set(0, -9.82, 0) // 設置重力

  // 建立球體剛體
  const createBall = (position = { x: 0, y: 10, z: 0 }, color = 0x00ff00) => {
    const sphereBody = new CANNON.Body({
      mass: 1, // 質量
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)), // 半徑為 1 的球體
      position: new CANNON.Vec3(position.x, position.y, position.z), // 初始位置
      material: physicsMaterial2,
    })
    world.addBody(sphereBody)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const ball = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: color }))
    ball.castShadow = true // 球投射陰影
    const edges = new THREE.EdgesGeometry(geometry)
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }) // 黑色邊緣
    const wireframe = new THREE.LineSegments(edges, edgeMaterial)

    // 將邊緣線條添加為球體的子物件
    ball.add(wireframe)
    scene.add(ball)

    return {
      body: sphereBody,
      mesh: ball,
      creationTime: Date.now(), // 記錄創建時間
    }
  }

  // groundBody.material = physicsMaterial

  const boxSize = { width: 8, height: 8, depth: 8 }
  const thickness = 0.2 // 牆壁厚度
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff, transparent: true, opacity: 0.5 })
  const boxContainer = new THREE.Object3D()
  boxContainer.position.set(0, boxSize.height / 2, 0)
  scene.add(boxContainer)

  // 創建盒子的六個面
  // 底面
  const bottomWall = new THREE.Mesh(new THREE.BoxGeometry(boxSize.width, thickness, boxSize.depth), boxMaterial)
  bottomWall.position.set(0, -boxSize.height / 2, 0) // 相對於容器中心
  boxContainer.add(bottomWall)

  // 頂面
  const topWall = new THREE.Mesh(new THREE.BoxGeometry(boxSize.width, thickness, boxSize.depth), boxMaterial)
  topWall.position.set(0, boxSize.height / 2, 0) // 相對於容器中心
  boxContainer.add(topWall)

  // 左側面
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(thickness, boxSize.height, boxSize.depth), boxMaterial)
  leftWall.position.set(-boxSize.width / 2, 0, 0) // 相對於容器中心
  boxContainer.add(leftWall)

  // 右側面
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(thickness, boxSize.height, boxSize.depth), boxMaterial)
  rightWall.position.set(boxSize.width / 2, 0, 0) // 相對於容器中心
  boxContainer.add(rightWall)

  // 後面
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(boxSize.width, boxSize.height, thickness), boxMaterial)
  backWall.position.set(0, 0, -boxSize.depth / 2) // 相對於容器中心
  boxContainer.add(backWall)

  // 前面（可選）
  const frontWall = new THREE.Mesh(new THREE.BoxGeometry(boxSize.width, boxSize.height, thickness), boxMaterial)
  frontWall.position.set(0, 0, boxSize.depth / 2) // 相對於容器中心
  boxContainer.add(frontWall)

  const wallBodies = []
  const wallShape = {
    bottom: new CANNON.Box(new CANNON.Vec3(boxSize.width / 2 + 0.1, thickness / 2 + 0.1, boxSize.depth / 2 + 0.1)),
    top: new CANNON.Box(new CANNON.Vec3(boxSize.width / 2 + 0.1, thickness / 2 + 0.1, boxSize.depth / 2 + 0.1)),
    left: new CANNON.Box(new CANNON.Vec3(thickness / 2 + 0.1, boxSize.height / 2 + 0.1, boxSize.depth / 2 + 0.1)),
    right: new CANNON.Box(new CANNON.Vec3(thickness / 2 + 0.1, boxSize.height / 2 + 0.1, boxSize.depth / 2 + 0.1)),
    back: new CANNON.Box(new CANNON.Vec3(boxSize.width / 2 + 0.1, boxSize.height / 2 + 0.1, thickness / 2 + 0.1)),
    front: new CANNON.Box(new CANNON.Vec3(boxSize.width / 2 + 0.1, boxSize.height / 2 + 0.1, thickness / 2 + 0.1)),
  }

  const boxCompound = new CANNON.Body({
    mass: 0, // 靜態物體
    type: CANNON.Body.static,
    position: new CANNON.Vec3(0, boxSize.height / 2, 0), // 中心位置
  })

  // 添加六個面作為這個複合體的一部分
  boxCompound.addShape(wallShape.bottom, new CANNON.Vec3(0, -boxSize.height / 2, 0))
  boxCompound.addShape(wallShape.top, new CANNON.Vec3(0, boxSize.height / 2, 0))
  boxCompound.addShape(wallShape.left, new CANNON.Vec3(-boxSize.width / 2, 0, 0))
  boxCompound.addShape(wallShape.right, new CANNON.Vec3(boxSize.width / 2, 0, 0))
  boxCompound.addShape(wallShape.back, new CANNON.Vec3(0, 0, -boxSize.depth / 2))
  boxCompound.addShape(wallShape.front, new CANNON.Vec3(0, 0, boxSize.depth / 2))

  world.addBody(boxCompound)

  scene.background = new THREE.Color(0x000000)
  // 建立相機
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(10, 5, 15)
  camera.lookAt(0, 0, 0)

  // 建立渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)
  threeContainer.value.appendChild(renderer.domElement)

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }))
  plane.rotation.x = -Math.PI / 2.5

  plane.receiveShadow = true // 地板接收陰影

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-2, 2, 2)
  light.castShadow = true
  scene.add(light)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const clock = new THREE.Clock()

  const balls = []
  const ballCreationInterval = 50 // 5秒
  let lastCreationTime = Date.now()
  boxCompoundRef.value = boxCompound
  controlRotate(boxContainer)
  // 啟用連續碰撞檢測
  const animate = () => {
    requestAnimationFrame(animate)
    boxCompoundRef.value.position.set(boxContainer.position.x, boxContainer.position.y, boxContainer.position.z)
    boxCompoundRef.value.velocity.set(0, 0, 0)
    boxCompoundRef.value.aabbNeedsUpdate = true
    boxCompound.quaternion.setFromEuler(boxContainer.rotation.x, boxContainer.rotation.y, boxContainer.rotation.z)
    // 更新物理世界
    const delta = clock.getDelta()
    world.step(1 / 60, delta, 3)
    // 將剛體的位置同步到 Three.js 的 Mesh
    const currentTime = Date.now()
    if (currentTime - lastCreationTime > ballCreationInterval && balls.length < 30) {
      // 在隨機位置創建新球

      balls.push(createBall({ x: 0, y: 5, z: 0 }, 0xffffff))
      lastCreationTime = currentTime
    }
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i]
      ball.mesh.position.copy(ball.body.position)
      ball.mesh.quaternion.copy(ball.body.quaternion)

      // 檢查球是否掉出場景
      if (ball.body.position.y < -10 || balls.length > 30) {
        // 移除舊球 (從場景和物理世界)
        scene.remove(ball.mesh)
        world.removeBody(ball.body)

        // 從陣列中移除
        balls.splice(i, 1)
        i-- // 調整索引，避免跳過下一個項目
      }
    }

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
