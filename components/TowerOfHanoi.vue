<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  numDisks: {
    type: Number,
    default: 4
  }
})

// Editable input for number of disks
const numDisksInput = ref(props.numDisks)

// Initialize towers
const towers = ref({
  A: Array.from({ length: numDisksInput.value }, (_, i) => numDisksInput.value - i),
  B: [],
  C: []
})

// Moves counter
const moves = ref(0)

// Drag state
const draggedDisk = ref(null)
const sourceTower = ref(null)

// Win condition
const isWon = computed(() => {
  return towers.value.C.length === numDisksInput.value
})

// Minimum moves
const minMoves = computed(() => {
  return Math.pow(2, numDisksInput.value) - 1
})

// Drag start
const startDrag = (towerName, diskIndex) => {
  const tower = towers.value[towerName]
  if (diskIndex !== tower.length - 1) return
  draggedDisk.value = tower[diskIndex]
  sourceTower.value = towerName
}

// Drop disk
const dropDisk = (targetTowerName) => {
  if (!draggedDisk.value || !sourceTower.value) return

  const targetTower = towers.value[targetTowerName]
  const topDisk = targetTower[targetTower.length - 1]

  if (topDisk && draggedDisk.value > topDisk) {
    draggedDisk.value = null
    sourceTower.value = null
    return
  }

  towers.value[sourceTower.value].pop()
  targetTower.push(draggedDisk.value)
  moves.value++

  draggedDisk.value = null
  sourceTower.value = null
}

// Allow drop
const allowDrop = (event) => {
  event.preventDefault()
}

// Reset game with new disk count
const resetGame = (count = numDisksInput.value) => {
  const n = Math.max(1, Math.min(count, 8)) // limit 1–8
  numDisksInput.value = n

  towers.value = {
    A: Array.from({ length: n }, (_, i) => n - i),
    B: [],
    C: []
  }

  moves.value = 0
  draggedDisk.value = null
  sourceTower.value = null
}

// Disk color
const getDiskColor = (size) => {
  const colors = [
    'from-red-400 to-red-600',
    'from-orange-400 to-orange-600',
    'from-yellow-400 to-yellow-600',
    'from-green-400 to-green-600',
    'from-blue-400 to-blue-600',
    'from-indigo-400 to-indigo-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600'
  ]
  return colors[size - 1] || colors[0]
}

// Disk width
const getDiskWidth = (size) => {
  return 40 + size * 15
}
</script>

<template>
  <div class="tower-of-hanoi-container p-6 flex flex-col items-center gap-6">

    <!-- Controls -->
    <div class="stats-bar flex gap-6 items-center flex-wrap mb-4">
      <div class="stat-item px-6 py-3 rounded-lg bg-blue-500 text-white shadow-lg">
        <div class="text-sm font-semibold opacity-90">Moves</div>
        <div class="text-2xl font-bold">{{ moves }}</div>
      </div>

      <div class="stat-item px-6 py-3 rounded-lg bg-purple-500 text-white shadow-lg">
        <div class="text-sm font-semibold opacity-90">Minimum Moves</div>
        <div class="text-2xl font-bold">{{ minMoves }}</div>
      </div>

      <!-- Number of disks input -->
      <div class="flex flex-col items-center">
        <label class="text-sm font-semibold text-gray-700">Number of Disks</label>
        <input
            type="number"
            min="1"
            max="8"
            v-model.number="numDisksInput"
            @change="resetGame(numDisksInput)"
            class="w-24 px-3 py-2 rounded-lg border text-center font-bold"
        />
      </div>

      <button
          @click="resetGame(numDisksInput)"
          class="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold shadow-lg"
      >
        Reset
      </button>
    </div>

    <!-- Win Message -->
    <div
        v-if="isWon"
        class="px-8 py-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500
             text-white shadow-xl animate-bounce"
    >
      <div class="text-2xl font-bold">🎉 Congratulations!</div>
      <div class="text-sm">Solved in {{ moves }} moves</div>
    </div>

    <!-- Towers -->
    <div class="towers-container flex gap-12 items-end justify-center">

      <div v-for="towerName in ['A','B','C']" :key="towerName"
           class="flex flex-col items-center gap-2">

        <div class="text-xl font-bold">Tower {{ towerName }}</div>

        <div
            @drop="dropDisk(towerName)"
            @dragover="allowDrop"
            class="tower relative flex flex-col-reverse items-center bg-gray-100
                 rounded-t-lg border-4 border-gray-300"
        >
          <div class="tower-peg absolute bottom-0 w-3 bg-gray-600 rounded-t"></div>

          <div
              v-for="(disk, index) in towers[towerName]"
              :key="towerName + index"
              :draggable="index === towers[towerName].length - 1"
              @dragstart="startDrag(towerName, index)"
              class="disk rounded-full shadow-lg cursor-move
                   bg-gradient-to-br"
              :class="getDiskColor(disk)"
              :style="{ width: getDiskWidth(disk) + 'px', height: '30px', marginTop: '4px' }"
          >
            <div class="text-white font-bold text-sm text-center">{{ disk }}</div>
          </div>

          <div v-if="towers[towerName].length === 0"
               class="text-gray-400 text-sm py-4">Empty</div>
        </div>

        <div class="tower-base w-full h-4 bg-gray-700 rounded"></div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.tower {
  width: 180px;
  min-height: 150px;
  padding: 8px;
}
.tower-peg {
  height: 140px;
  z-index: 0;
}
.disk {
  position: relative;
  z-index: 1;
  user-select: none;
}
.tower-base {
  width: 200px;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
