<script setup>
import {ref, computed} from 'vue'

// Initialize 8 bits, all set to 0
const bits = ref([0, 1, 0, 1, 1, 1, 0, 1].reverse())

// Input decimal value
const inputDecimal = ref(93)

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

// Calculate remaining value (input - calculated decimal)
const remainingValue = computed(() => {
  return inputDecimal.value - decimalValue.value
})
</script>

<template>
  <div class="binary-byte-container p-6 flex flex-col items-center gap-6">

    <!-- Input field for decimal number -->
    <div class="input-section w-full max-w-md">

      <input
          id="idec"
          v-model.number="inputDecimal"
          type="number"
          min="0"
          max="255"
          class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Enter a number (0-255)"

      />
    </div>

    <!-- Bit boxes -->
    <div class="bits-row flex gap-2">
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
        {{ Math.pow(2, index - 1) }}
      </div>
    </div>

    <!-- Calculated decimal value display -->
    <div class="flex gap-4">

      <div class="decimal-display mt-4 p-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
        <div class="text-sm font-semibold text-white opacity-90 mb-2">
          Calculated Decimal Value
        </div>
        <div class="text-4xl font-bold text-white">
          {{ decimalValue }}
        </div>
      </div>

      <!-- Remaining value display -->
      <div class="remaining-display p-6 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
        <div class="text-sm font-semibold text-white opacity-90 mb-2">
          Remaining Value
        </div>
        <label id="remains" class="text-4xl font-bold text-white">
          {{ remainingValue }}
        </label>
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

.decimal-display,
.remaining-display {
  min-width: 200px;
  text-align: center;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
