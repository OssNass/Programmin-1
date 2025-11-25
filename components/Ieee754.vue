<script setup>
import { ref, computed } from 'vue'

// 32-bit IEEE754 single precision: 1 sign, 8 exponent, 23 fraction
const bits = ref(Array(32).fill(0))

const toggleBit = (index) => {
  bits.value[index] = bits.value[index] === 0 ? 1 : 0
}

// Extract exponent information as a helper (for the explanation UI)
const exponentInfo = computed(() => {
  const expBits = bits.value.slice(1, 9)

  // Convert to unsigned int
  let raw = 0
  expBits.forEach((bit) => {
    raw = (raw << 1) | bit
  })

  const bias = 127
  let finalExp = raw - bias

  // Special cases
  let type = "Normal"
  if (raw === 0) type = "Denormal (Exponent = 0 → actual exponent = -126)"
  else if (raw === 255) type = "Special (Inf / NaN)"

  return {
    bits: expBits.join(""),
    raw,
    bias,
    finalExp,
    type,
  }
})

// Compute the actual float value
const floatValue = computed(() => {
  const b = bits.value

  const sign = b[0]
  const exponentBits = b.slice(1, 9)
  const mantissaBits = b.slice(9)

  let exponent = 0
  exponentBits.forEach((bit) => {
    exponent = (exponent << 1) | bit
  })

  let mantissa = 1.0
  let frac = 0.0
  mantissaBits.forEach((bit, i) => {
    if (bit === 1) frac += Math.pow(2, -(i + 1))
  })
  mantissa = exponent === 0 ? frac : 1 + frac

  const actualExp = exponent === 0 ? -126 : exponent - 127

  if (exponent === 255) {
    if (mantissaBits.some((b) => b === 1)) return "NaN"
    return sign === 1 ? "-Infinity" : "Infinity"
  }

  return (sign === 1 ? -1 : 1) * mantissa * Math.pow(2, actualExp)
})
</script>

<template>
  <div class="p-6 flex flex-col items-center gap-6 w-full">

    <h2 class="text-xl font-bold mb-4">IEEE-754 Single Precision (32-bit Float)</h2>

    <div class="flex gap-1 text-xs mb-1">
      <div class="text-center w-10 font-bold text-red-500">Sign</div>
      <div class="text-center w-[calc(10*2.5rem)] font-bold text-blue-500">Exponent (8 bits)</div>
      <div class="text-center w-[calc(23*2.5rem)] font-bold text-green-600">Mantissa (23 bits)</div>
    </div>

    <div class="flex flex-wrap gap-1">
      <div
          v-for="(bit, index) in bits"
          :key="index"
          @click="toggleBit(index)"
          class="bit-box w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer rounded-lg border-2 select-none transition-all"
          :class="[
          index === 0 ? 'border-red-500' : '',
          index >= 1 && index <= 8 ? 'border-blue-500' : '',
          index >= 9 ? 'border-green-600' : '',
          bit === 1
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        ]"
      >
        {{ bit }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- ⭐ NEW: Exponent explanation -->

      <div class="w-full max-w-3xl p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow">
        <h3 class="font-bold mb-2 text-lg">Exponent Calculation</h3>

        <div class="text-sm">
          <div><strong>Exponent bits:</strong> {{ exponentInfo.bits }}</div>
          <div><strong>Raw exponent (binary → int):</strong> {{ exponentInfo.raw }}</div>
          <div><strong>Bias:</strong> {{ exponentInfo.bias }}</div>
          <div><strong>Final exponent = raw − bias:</strong> {{ exponentInfo.finalExp }}</div>
          <div class="mt-2">
            <strong>Type:</strong>
            <span class="font-semibold">{{ exponentInfo.type }}</span>
          </div>
        </div>
      </div>

      <div class="mt-6 p-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
        <div class="text-sm font-semibold text-white opacity-90 mb-2">
          Floating-Point Value
        </div>
        <div class="text-4xl font-bold text-white break-all">
          {{ floatValue }}
        </div>
      </div>

    </div>


  </div>
</template>

<style scoped>

.rev {
  flex-direction: row-reverse;
}

.bit-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.bit-box:active {
  transform: translateY(0);
}
</style>
