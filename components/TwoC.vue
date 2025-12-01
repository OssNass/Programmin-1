<script setup>
import { ref, computed } from 'vue'

// ---- FIRST BYTE ----
const bitsA = ref([0,0,0,0,0,0,0,0]) // LSB → MSB
const displayBitsA = computed(() => [...bitsA.value].reverse())

// ---- SECOND BYTE ----
const bitsB = ref([0,0,0,0,0,0,0,0]) // LSB → MSB
const displayBitsB = computed(() => [...bitsB.value].reverse())

// Toggle bits
const toggleBitA = (index) => bitsA.value[index] ^= 1
const toggleBitB = (index) => bitsB.value[index] ^= 1

// --- Unsigned ---
const unsignedA = computed(() =>
    bitsA.value.reduce((sum, bit, i) => sum + bit * (1 << i), 0)
)

const unsignedB = computed(() =>
    bitsB.value.reduce((sum, bit, i) => sum + bit * (1 << i), 0)
)

// --- Signed Two’s Complement ---
function signedValue(bits) {
  let val = 0
  bits.forEach((bit, i) => {
    if (i === 7) val -= bit * 128
    else val += bit * (1 << i)
  })
  return val
}

const signedA = computed(() => signedValue(bitsA.value))
const signedB = computed(() => signedValue(bitsB.value))
</script>

<template>
  <div class="binary-byte-container p-6 flex flex-col items-center gap-6">

    <!-- Labels -->
    <div class="bit-labels flex gap-2">
      <div v-for="i in [7,6,5,4,3,2,1,0]"
           :key="i"
           class="w-16 text-center text-sm font-semibold"
           :class="i === 7 ? 'text-red-500' : 'text-gray-500'">
        {{ i === 7 ? '-128' : 2 ** i }}
      </div>
    </div>

    <!-- ROW A -->
    <div class="bits-row flex gap-2">
      <div v-for="(bit, d) in displayBitsA"
           :key="d"
           @click="toggleBitA(7 - d)"
           class="bit-box w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer border rounded-lg"
           :class="[
             bit ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700',
             d === 0 ? 'ring-4 ring-red-400' : ''
           ]">
        {{ bit }}
      </div>
    </div>

    <!-- ROW B -->
    <div class="bits-row flex gap-2">
      <div v-for="(bit, d) in displayBitsB"
           :key="d"
           @click="toggleBitB(7 - d)"
           class="bit-box w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer border rounded-lg"
           :class="[
             bit ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700',
             d === 0 ? 'ring-4 ring-red-400' : ''
           ]">
        {{ bit }}
      </div>
    </div>

    <!-- Output -->
    <div class="grid grid-cols-2 gap-6 mt-4">

      <div class="bg-blue-500 text-white p-4 rounded-lg">
        <div class="text-sm">Row A Unsigned</div>
        <div class="text-2xl">{{ unsignedA }}</div>
        <div class="text-sm mt-1">Signed: {{ signedA }}</div>
      </div>

      <div class="bg-green-500 text-white p-4 rounded-lg">
        <div class="text-sm">Row B Unsigned</div>
        <div class="text-2xl">{{ unsignedB }}</div>
        <div class="text-sm mt-1">Signed: {{ signedB }}</div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.bit-box {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.bit-box:hover {
  transform: scale(1.05);
}

.flex{
  direction: ltr;
}
</style>
