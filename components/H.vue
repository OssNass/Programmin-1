<script setup>
import { ref, computed } from 'vue'

// Props for customization
const props = defineProps({
  numDisks: {
    type: Number,
    default: 4
  }
})

// Initialize towers - Tower A has all disks, B and C are empty
const towers = ref({
  A: Array.from({ length: props.numDisks }, (_, i) => props.numDisks - i), // [4, 3, 2, 1]
  B: [],
  C: []
})

// Track moves count
const moves = ref(0)

// Track which disk is being dragged
const draggedDisk = ref(null)
const sourceTower = ref(null)

// Check if game is won (all disks on tower C)
const isWon = computed(() => {
  return towers.value.C.length === props.numDisks
})

// Minimum moves required to solve
const minMoves = computed(() => {
  return Math.pow(2, props.numDisks) - 1
})

// Start dragging a disk
const startDrag = (towerName, diskIndex) => {
  const tower = towers.value[towerName]
  // Only allow dragging the top disk
  if (diskIndex !== tower.length - 1) {
    return
  }
  draggedDisk.value = tower[diskIndex]
  sourceTower.value = towerName
}

// Handle drop on a tower
const dropDisk = (targetTowerName) => {
  if (!draggedDisk.value || !sourceTower.value) return

  const targetTower = towers.value[targetTowerName]
  const topDisk = targetTower[targetTower.length - 1]

  // Check if move is valid (can only place smaller disk on larger disk)
  if (topDisk && draggedDisk.value > topDisk) {
    // Invalid move - reset
    draggedDisk.value = null
    sourceTower.value = null
    return
  }

  // Valid move - perform it
  const sourceTowerArray = towers.value[sourceTower.value]
  sourceTowerArray.pop()
  targetTower.push(draggedDisk.value)

  moves.value++

  // Reset drag state
  draggedDisk.value = null
  sourceTower.value = null
}

// Allow drop event
const allowDrop = (event) => {
  event.preventDefault()
}

// Reset the game
const resetGame = () => {
  towers.value = {
    A: Array.from({ length: props.numDisks }, (_, i) => props.numDisks - i),
    B: [],
    C: []
  }
  moves.value = 0
  draggedDisk.value = null
  sourceTower.value = null
}

// Get disk color based on size
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

// Calculate disk width percentage (larger disks are wider)
const getDiskWidth = (size) => {
  const baseWidth = 40
  const increment = 15
  return baseWidth + (size * increment)
}
</script>

<template>
  <div class="tower-of-hanoi-container p-6 flex flex-col items-center gap-6">

    <!-- Title and Instructions -->
    <div class="text-center mb-4">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Tower of Hanoi
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Move all disks from Tower A to Tower C. Only one disk at a time, and never place a larger disk on a smaller one.
      </p>
    </div>

    <!-- Stats Display -->
    <div class="stats-bar flex gap-6 mb-4">
      <div class="stat-item px-6 py-3 rounded-lg bg-blue-500 text-white shadow-lg">
        <div class="text-sm font-semibold opacity-90">Moves</div>
        <div class="text-2xl font-bold">{{ moves }}</div>
      </div>
      <div class="stat-item px-6 py-3 rounded-lg bg-purple-500 text-white shadow-lg">
        <div class="text-sm font-semibold opacity-90">Minimum Moves</div>
        <div class="text-2xl font-bold">{{ minMoves }}</div>
      </div>
      <button
          @click="resetGame"
          class="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-all duration-200 shadow-lg"
      >
        Reset
      </button>
    </div>

    <!-- Win Message -->
    <div
        v-if="isWon"
        class="win-message px-8 py-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-xl animate-bounce"
    >
      <div class="text-2xl font-bold">🎉 Congratulations! 🎉</div>
      <div class="text-sm mt-1">You solved it in {{ moves }} moves!</div>
    </div>

    <!-- Towers Container -->
    <div class="towers-container flex gap-12 items-end justify-center w-full max-w-4xl">

      <!-- Tower A -->
      <div class="tower-wrapper flex flex-col items-center gap-2">
        <div class="tower-label text-xl font-bold text-gray-700 dark:text-gray-300">Tower A</div>
        <div
            @drop="dropDisk('A')"
            @dragover="allowDrop"
            class="tower relative flex flex-col-reverse items-center justify-end bg-gray-100 dark:bg-gray-800 rounded-t-lg border-4 border-gray-300 dark:border-gray-600 transition-all duration-200"
            :class="draggedDisk && sourceTower !== 'A' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : ''"
        >
          <!-- Tower Peg -->
          <div class="tower-peg absolute bottom-0 w-3 bg-gray-600 dark:bg-gray-400 rounded-t"></div>

          <!-- Disks -->
          <div
              v-for="(disk, index) in towers.A"
              :key="`A-${index}`"
              :draggable="index === towers.A.length - 1"
              @dragstart="startDrag('A', index)"
              class="disk rounded-full shadow-lg cursor-move transition-all duration-200 hover:shadow-xl"
              :class="[
              getDiskColor(disk),
              index === towers.A.length - 1 ? 'hover:scale-105' : 'cursor-not-allowed opacity-75',
              'bg-gradient-to-br'
            ]"
              :style="{
              width: `${getDiskWidth(disk)}px`,
              height: '30px',
              marginTop: '4px'
            }"
          >
            <div class="flex items-center justify-center h-full text-white font-bold text-sm">
              {{ disk }}
            </div>
          </div>

          <!-- Empty state placeholder -->
          <div v-if="towers.A.length === 0" class="empty-placeholder text-gray-400 dark:text-gray-600 text-sm py-4">
            Empty
          </div>
        </div>
        <div class="tower-base w-full h-4 bg-gray-700 dark:bg-gray-500 rounded"></div>
      </div>

      <!-- Tower B -->
      <div class="tower-wrapper flex flex-col items-center gap-2">
        <div class="tower-label text-xl font-bold text-gray-700 dark:text-gray-300">Tower B</div>
        <div
            @drop="dropDisk('B')"
            @dragover="allowDrop"
            class="tower relative flex flex-col-reverse items-center justify-end bg-gray-100 dark:bg-gray-800 rounded-t-lg border-4 border-gray-300 dark:border-gray-600 transition-all duration-200"
            :class="draggedDisk && sourceTower !== 'B' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : ''"
        >
          <!-- Tower Peg -->
          <div class="tower-peg absolute bottom-0 w-3 bg-gray-600 dark:bg-gray-400 rounded-t"></div>

          <!-- Disks -->
          <div
              v-for="(disk, index) in towers.B"
              :key="`B-${index}`"
              :draggable="index === towers.B.length - 1"
              @dragstart="startDrag('B', index)"
              class="disk rounded-full shadow-lg cursor-move transition-all duration-200 hover:shadow-xl"
              :class="[
              getDiskColor(disk),
              index === towers.B.length - 1 ? 'hover:scale-105' : 'cursor-not-allowed opacity-75',
              'bg-gradient-to-br'
            ]"
              :style="{
              width: `${getDiskWidth(disk)}px`,
              height: '30px',
              marginTop: '4px'
            }"
          >
            <div class="flex items-center justify-center h-full text-white font-bold text-sm">
              {{ disk }}
            </div>
          </div>

          <!-- Empty state placeholder -->
          <div v-if="towers.B.length === 0" class="empty-placeholder text-gray-400 dark:text-gray-600 text-sm py-4">
            Empty
          </div>
        </div>
        <div class="tower-base w-full h-4 bg-gray-700 dark:bg-gray-500 rounded"></div>
      </div>

      <!-- Tower C -->
      <div class="tower-wrapper flex flex-col items-center gap-2">
        <div class="tower-label text-xl font-bold text-gray-700 dark:text-gray-300">Tower C</div>
        <div
            @drop="dropDisk('C')"
            @dragover="allowDrop"
            class="tower relative flex flex-col-reverse items-center justify-end bg-gray-100 dark:bg-gray-800 rounded-t-lg border-4 border-gray-300 dark:border-gray-600 transition-all duration-200"
            :class="draggedDisk && sourceTower !== 'C' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : ''"
        >
          <!-- Tower Peg -->
          <div class="tower-peg absolute bottom-0 w-3 bg-gray-600 dark:bg-gray-400 rounded-t"></div>

          <!-- Disks -->
          <div
              v-for="(disk, index) in towers.C"
              :key="`C-${index}`"
              :draggable="index === towers.C.length - 1"
              @dragstart="startDrag('C', index)"
              class="disk rounded-full shadow-lg cursor-move transition-all duration-200 hover:shadow-xl"
              :class="[
              getDiskColor(disk),
              index === towers.C.length - 1 ? 'hover:scale-105' : 'cursor-not-allowed opacity-75',
              'bg-gradient-to-br'
            ]"
              :style="{
              width: `${getDiskWidth(disk)}px`,
              height: '30px',
              marginTop: '4px'
            }"
          >
            <div class="flex items-center justify-center h-full text-white font-bold text-sm">
              {{ disk }}
            </div>
          </div>

          <!-- Empty state placeholder -->
          <div v-if="towers.C.length === 0" class="empty-placeholder text-gray-400 dark:text-gray-600 text-sm py-4">
            Empty
          </div>
        </div>
        <div class="tower-base w-full h-4 bg-gray-700 dark:bg-gray-500 rounded"></div>
      </div>

    </div>

    <!-- Rules Section -->
    <div class="rules-section mt-6 p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 max-w-2xl">
      <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Rules:</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
        <li>Only one disk can be moved at a time</li>
        <li>Only the top disk from any tower can be moved</li>
        <li>A larger disk cannot be placed on top of a smaller disk</li>
        <li>The goal is to move all disks from Tower A to Tower C</li>
        <li>Drag and drop disks to move them between towers</li>
      </ul>
    </div>

  </div>
</template>

<style scoped>
.tower {
  width: 180px;
  min-height: 300px;
  padding: 8px;
}

.tower-peg {
  height: 280px;
  z-index: 0;
}

.disk {
  position: relative;
  z-index: 1;
  user-select: none;
}

.disk:active {
  cursor: grabbing;
}

.tower-base {
  width: 200px;
}

.stat-item {
  text-align: center;
  min-width: 120px;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
