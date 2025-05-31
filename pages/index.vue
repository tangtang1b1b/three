<script setup>
const { $gsap } = useNuxtApp()
import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const threeContainer = ref(null)

const startMove = (body) => {
  // 追蹤按下的按鍵
  const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  }

  // 移動速度
  const moveSpeed = 0.1
  let currentDirection = 0
  const rotationSpeed = Math.PI / 2
  // 按下按鍵時
  const onKeyDown = (e) => {
    // 確認是否為方向鍵
    if (keysPressed.hasOwnProperty(e.key)) {
      let newPosition = { ...body.position }
      let needRotate = false

      // 根據按鍵執行動作
      switch (e.key) {
        case 'ArrowUp':
          // 向前移動 (根據當前朝向)
          newPosition.x += Math.sin(currentDirection) * moveSpeed
          newPosition.z += Math.cos(currentDirection) * moveSpeed
          break
        case 'ArrowDown':
          // 向後移動 (根據當前朝向)
          newPosition.x -= Math.sin(currentDirection) * moveSpeed
          newPosition.z -= Math.cos(currentDirection) * moveSpeed
          break
        case 'ArrowLeft':
          // 向左旋轉
          currentDirection += rotationSpeed
          needRotate = true
          break
        case 'ArrowRight':
          // 向右旋轉
          currentDirection -= rotationSpeed
          needRotate = true
          break
      }

      // 如果是移動 (上下)，則更新位置
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        $gsap.to(body.position, {
          x: newPosition.x,
          z: newPosition.z,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      // 如果是旋轉 (左右) 或需要同時旋轉，則更新旋轉
      if (needRotate || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const euler = new THREE.Euler(0, currentDirection, 0)
        const quaternion = new THREE.Quaternion()
        quaternion.setFromEuler(euler)

        $gsap.to(body.quaternion, {
          x: quaternion.x,
          y: quaternion.y,
          z: quaternion.z,
          w: quaternion.w,
          duration: 0.3, // 旋轉動畫可以快一些
          ease: 'power1.out',
        })
      }
    }
  }

  // 註冊按鍵事件
  window.addEventListener('keydown', onKeyDown)
}

onMounted(async () => {
  const clock = new THREE.Clock()
  // 建立場景
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xe3cf57)
  const loader = new GLTFLoader()
  // 載入模型
  const loadModel = (scene, position, scale) => {
    return new Promise((resolve, reject) => {
      loader.load(
        '/model/scene.gltf',
        (gltf) => {
          const model = gltf.scene

          model.position.set(position.x, position.y, position.z)
          // 設置模型位置、縮放和旋轉
          model.scale.set(scale, scale, scale)

          // 啟用模型的陰影
          model.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = true
              node.receiveShadow = true
            }
          })

          scene.add(model)
          resolve(model)
        },
        // 載入進度回調
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        // 錯誤回調
        (error) => {
          console.error('模型載入錯誤:', error)
          reject(error)
        },
      )
    })
  }
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
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(2, 2, 2)
  camera.lookAt(0, 0, 0)

  // 建立渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)
  threeContainer.value.appendChild(renderer.domElement)

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1)
  const light2 = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-0.5, 1, -0.5)
  light2.position.set(0.5, 1, 0.5)
  light.castShadow = true
  light2.castShadow = true
  scene.add(light)
  scene.add(light2)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  //物件與物理合體
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshStandardMaterial({ color: 0xffffff }))
  plane.rotation.x = -Math.PI / 2
  plane.position.y = 0.01
  plane.receiveShadow = true // 地板接收陰影
  scene.add(plane)
  const planeBody = new CANNON.Body({
    mass: 0, // 靜態物體
    position: new CANNON.Vec3(0, 0, 0), // 中心位置
    material: physicsMaterial, // 使用物理材質
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 0.01)), // 添加平面形狀
  })
  planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // 旋轉平面與視覺平面一致
  world.addBody(planeBody)

  const createBox = async (scene, world, position = { x: 0, y: 5, z: 0 }) => {
    const model = await loadModel(scene, { x: 0, y: 0, z: 0 }, 8)
    model.position.y = 0.5 // 調整模型位置
    const boundingBox = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    boundingBox.getSize(size)
    scene.add(model)

    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z)
    const box = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 }))

    const boxBody = new CANNON.Body({
      mass: 1, // 質量
      shape: new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)),
      position: new CANNON.Vec3(position.x, position.y / 2, position.z), // 初始位置
      material: objectMaterial, // 使用正確的材質
    })
    world.addBody(boxBody)
    return {
      body: boxBody,
      mesh: model,
      creationTime: Date.now(), // 記錄創建時間
      gg: box,
    }
  }
  let box = await createBox(scene, world, { x: 0, y: 1.5, z: 0 }, 0xffffff)
  startMove(box.body)

  let isRespawning = false
  const animate = async () => {
    requestAnimationFrame(animate)
    // 更新物理世界
    const delta = clock.getDelta()
    world.step(1 / 60, delta, 3)
    // 將剛體的位置同步到 Three.js 的 Mesh
    if (box.body.position.y < -5 && !isRespawning) {
      // 設置重新生成標誌，防止多次重新生成
      isRespawning = true

      // 如果球掉出場景，則重新設置位置
      scene.remove(box.mesh)
      world.removeBody(box.body)

      // 創建新的盒子
      try {
        box = await createBox(scene, world, { x: 0, y: 1, z: 0 }, 0xffffff)
        startMove(box.body)
      } catch (error) {
        console.error('重新生成模型失敗:', error)
      } finally {
        // 無論成功還是失敗，最後都重置標誌
        isRespawning = false
      }
    } else {
      // 同步位置
      box.mesh.position.x = box.body.position.x
      box.mesh.position.z = box.body.position.z
      box.mesh.position.y = box.body.position.y - box.gg.geometry.parameters.height / 2
      box.mesh.quaternion.copy(box.body.quaternion)
    }
    box.mesh.quaternion.copy(box.body.quaternion)
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
