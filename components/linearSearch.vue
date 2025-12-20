<template>
  <div class="linear-search-visualizer">
    <h2>Linear Search Visualizer</h2>

    <!-- Target input -->
    <div class="target-input">
      <label>البحث عن: </label>
      <input 
        v-model.number="target" 
        type="number" 
        :min="1" 
        :max="9"
        placeholder="e.g. 4"
      />
      <button @click="startSearch" :disabled="!target">بحث</button>
    </div>

    <!-- Controls -->
    <div class="controls" v-if="steps.length">
      <button @click="prevStep" :disabled="currentStepIndex === 0">السابق</button>
      <button @click="nextStep" :disabled="currentStepIndex === steps.length - 1">التالي</button>
      <button @click="reset">إعادة للبداية</button>
    </div>

    <!-- Array visualization -->
    <div class="array-container">
      <div
        v-for="(value, index) in currentArray"
        :key="index"
        class="bar"
        :class="{
          searching: currentStep.index === index && currentStep.status === 'checking',
          found: currentStep.status === 'found' && currentStep.foundIndex === index,
          checked: currentStep.index > index && currentStep.status !== 'found' && currentStep.status !== 'not-found',
          notFound: currentStep.status === 'not-found'
        }"
        :style="{ height: value * 12 + 'px' }"
      >
        {{ value }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LinearSearchVisualizer",
  data() {
    return {
      array: [3, 7, 2, 9, 1, 5, 8, 4, 6],
      target: null,
      steps: [],
      currentStepIndex: 0
    };
  },
  computed: {
    currentArray() {
      return this.array;
    },
    currentStep() {
      return this.steps[this.currentStepIndex] || {};
    }
  },
  methods: {
    startSearch() {
      if (!this.target || this.target < 1) return;
      
      this.steps = this.generateLinearSearchSteps(this.array, this.target);
      this.currentStepIndex = 0;
    },
    nextStep() {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
      }
    },
    prevStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
      }
    },
    reset() {
      this.target = null;
      this.steps = [];
      this.currentStepIndex = 0;
    },
    generateLinearSearchSteps(array, target) {
      const steps = [];

      // Step 0: Start
      steps.push({
        index: -1,
        description: `Start searching for ${target} from index 0.`,
        foundIndex: -1,
        status: 'searching'
      });

      // Check each element sequentially
      for (let i = 0; i < array.length; i++) {
        // Check this position
        steps.push({
          index: i,
          description: `Check index ${i}: array[${i}] = ${array[i]}`,
          foundIndex: array[i] === target ? i : -1,
          status: 'checking'
        });

        // If found, add final found step and STOP
        if (array[i] === target) {
          steps.push({
            index: i,
            description: `✅ Found ${target} at index ${i}!`,
            foundIndex: i,
            status: 'found'
          });
          return steps; // STOP here - no extra steps
        }
      }

      // Not found - final step
      steps.push({
        index: -1,
        description: `❌ ${target} not found after checking all ${array.length} elements.`,
        foundIndex: -1,
        status: 'not-found'
      });

      return steps;
    }
  }
};
</script>

<style scoped>
.linear-search-visualizer {
  max-width: 600px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 1rem;
}

.target-input {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.target-input input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.target-input button {
  padding: 0.5rem 1rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.target-input button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.controls {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}

.controls button {
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.array-container {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 220px;
  margin-bottom: 1rem;
  border: 2px solid #e0e0e0;
  padding: 1rem;
  border-radius: 8px;
  background: #fafafa;
}

.bar {
  flex: 1;
  background: linear-gradient(145deg, #e8f4fd, #90caf9);
  border: 2px solid #fff;
  text-align: center;
  color: #333;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar.searching {
  background: linear-gradient(145deg, #fff3cd, #ffeaa7);
  border-color: #f39c12;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.4);
}

.bar.found {
  background: linear-gradient(145deg, #d4edda, #81c784);
  border-color: #28a745;
  animation: pulse 1s infinite;
}

.bar.checked {
  background: linear-gradient(145deg, #e0e0e0, #bdbdbd);
  opacity: 0.7;
  border-color: #999;
}

.bar.notFound {
  background: linear-gradient(145deg, #f8d7da, #e57373);
  border-color: #dc3545;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.05); }
  50% { transform: scale(1.1); }
}

.status {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}
</style>
