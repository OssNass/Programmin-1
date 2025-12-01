<script setup>
import { ref, computed } from 'vue'

// Bits stored logically as LSB → MSB (index 0 = LSB)
const bits = ref([0, 1, 0, 1, 0, 0, 0, 1])

// Display order (MSB → LSB)
const displayBits = computed(() => [...bits.value].reverse())

// Toggle bit
const toggleBit = (logicalIndex) => {
  bits.value[logicalIndex] = bits.value[logicalIndex] === 0 ? 1 : 0
}

// Unsigned decimal
const unsignedValue = computed(() => {
  return bits.value.reduce((acc, bit, index) => {
    return acc + bit * Math.pow(2, index)
  }, 0)
})

// Signed (Two’s Complement)
const signedValue = computed(() => {
  let value = 0

  bits.value.forEach((bit, index) => {
    if (index === 7) {
      value -= bit * 128  // sign bit
    } else {
      value += bit * Math.pow(2, index)
    }
  })

  return value
})
</script>

<template>
  <div class="binary-byte-container p-6 flex flex-col items-center gap-6">

    <!-- Decimal Weight Labels -->
    <div class="bit-labels flex gap-2">
      <div
          v-for="index in [7,6,5,4,3,2,1,0]"
          :key="index"
          class="w-16 text-center text-sm font-semibold"
          :class="index === 7 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'"
      >
        {{ index === 7 ? '-128' : Math.pow(2, index) }}
      </div>
    </div>

    <!-- Bits -->
    <div class="bits-row flex gap-2">
      <div
          v-for="(bit, displayIndex) in displayBits"
          :key="displayIndex"
          @click="toggleBit(7 - displayIndex)"
          class="bit-box w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-200 rounded-lg border-2 select-none"
          :class="[
          bit === 1
            ? 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600'
            : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600',

          displayIndex === 0 ? 'ring-4 ring-red-400 scale-105' : ''
        ]"
      >
        {{ bit }}
      </div>
    </div>

    <!-- Power Labels -->
    <div class="bit-labels flex gap-2">
      <div
          v-for="index in [7,6,5,4,3,2,1,0]"
          :key="index"
          class="w-16 text-center text-sm font-semibold"
          :class="index === 7 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'"
      >
        <span v-if="index === 7">−2<sup>7</sup></span>
        <span v-else>2<sup>{{ index }}</sup></span>
      </div>
    </div>

    <!-- Explanation -->
    <div class="text-sm text-gray-500 dark:text-gray-400">
      Red bit = Sign bit (Two’s complement). ON → Negative number.
    </div>

    <!-- Decimal Output -->
    <div class="decimal-display grid grid-cols-2 gap-4 w-full max-w-md">

      <div class="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
        <div class="text-sm font-semibold text-white opacity-90 mb-1">
          Unsigned
        </div>
        <div class="text-3xl font-bold text-white">
          {{ unsignedValue }}
        </div>
      </div>

      <div class="p-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
        <div class="text-sm font-semibold text-white opacity-90 mb-1">
          Signed (2’s Complement)
        </div>
        <div class="text-3xl font-bold text-white">
          {{ signedValue }}
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.bit-box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bit-box:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.bit-box:active {
  transform: translateY(0) scale(1.02);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.decimal-display {
  min-width: 300px;
  text-align: center;
}

.flex {
  direction: ltr;
}
</style>
