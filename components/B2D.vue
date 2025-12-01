<script setup>
import {ref, computed} from 'vue'

// Initialize 8 bits, all set to 0
const bits = ref([1, 0, 1, 0, 1,1, 0, 1])

// Toggle bit at specific index
const toggleBit = (index) => {
  bits.value[index] = bits.value[index] === 0 ? 1 : 0
}

// Calculate decimal value from binary
const decimalValue = computed(() => {
  return bits.value.reduce((acc, bit, index) => {
    // Calculate from right to left (LSB to MSB)
    return acc + (bit * Math.pow(2, index))
  }, 0)
})
</script>

<template>
  <div class="binary-byte-container p-6 flex flex-col items-center gap-6">

    <!-- Bit positions labels -->

    <div class="bit-labels flex gap-2">
      <div
          v-for="index in 8"
          :key="index"
          class="w-16 text-center text-sm font-semibold text-gray-500 dark:text-gray-400"
      >

        {{ Math.pow(2, index - 1) }}
      </div>
    </div>

    <!-- Bit boxes -->
    <div class="bitss-row flex gapd-2">
      <div
          v-for="(bit, index) in bits"
          :key="index"
          @click="toggleBit(index)"
          class="bit-box w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-200 rounded-lg border-2 select-none"
          :class="bit === 1
          ? 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600' 
          : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'"
      >
        {{ bit }}
      </div>
    </div>

    <!-- Bit positions labels -->

    <div class="bit-labels flex gap-2">
      <div
          v-for="index in 8"
          :key="index"
          class="w-16 text-center text-sm font-semibold text-gray-500 dark:text-gray-400"
      >

        2<sup>{{ index - 1 }}</sup>
      </div>
    </div>

    <!-- Decimal value display -->
    <div class="decimal-display mt-4 p-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
      <div class="text-sm font-semibold text-white opacity-90 mb-2">
        Decimal Value
      </div>
      <div class="text-4xl font-bold text-white">
        {{ decimalValue }}
      </div>
    </div>

  </div>
</template>

<style scoped>
.bit-box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bit-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.bit-box:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.decimal-display {
  min-width: 200px;
  text-align: center;
}

</style>
