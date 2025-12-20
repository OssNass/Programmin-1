<template>
  <div class="binary-search-visualizer">
    <h2>Binary Search Visualizer</h2>

    <!-- Controls -->
    <div class="controls">
      <input v-model.number="target" type="number" placeholder="Target (10-60)" min="10" max="60" />
      <button @click="startSearch" :disabled="!target || steps.length > 0">البحث</button>
      <button @click="prevStep" :disabled="currentStep === 0 || steps.length === 0">السابق</button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1 || steps.length === 0">التالي</button>
      <button @click="reset">العودة للبداية</button>
    </div>

    <!-- Linear Array Visualization -->
    <div class="array-section">

      <div class="array-container">
        <div
          v-for="(value, index) in sortedArray"
          :key="index"
          class="array-bar"
          :class="getArrayBarClass(index)"
        >
          {{ value }}
        </div>
      </div>
      <div class="range-info">
فهرس أول عنصر: {{ currentLow >= 0 ? currentLow : 'N/A' }} | 
        فهرس المنتصف: {{ currentMid >= 0 ? currentMid : 'N/A' }} | 
        فهرس آخر عنصر: {{ currentHigh >= 0 ? currentHigh : 'N/A' }}
      </div>
    </div>

    <!-- Status -->

      <p v-if="steps.length === 0">حدد القيمة واضغط بحث</p>
      <div v-else>
        <p>الخطوة {{ currentStep + 1 }} / {{ steps.length }}</p>
        <p>{{ currentStepData.description }}</p>

    </div>
  </div>
</template>

<script>
export default {
  name: "BinarySearchVisualizer",
  data() {
    return {
      target: null,
      sortedArray: [12, 16, 22, 30, 35, 42, 50],
      steps: [],
      currentStep: 0,
      searchResult: { found: null, index: -1, searched: [] }
    };
  },
  computed: {
    currentStepData() {
      return this.steps[this.currentStep] || {};
    },
    currentLow() {
      return this.currentStepData.low ?? -1;
    },
    currentHigh() {
      return this.currentStepData.high ?? -1;
    },
    currentMid() {
      return this.currentStepData.mid ?? -1;
    },
    isSearchComplete() {
      return this.currentStep === this.steps.length - 1;
    }
  },
  methods: {
    startSearch() {
      if (!this.target || this.target < 1 || this.target > 100) return;
      
      this.steps = this.generateSteps();
      this.currentStep = 0;
      this.searchResult = { found: null, index: -1, searched: [] };
    },
    
    generateSteps() {
      const steps = [];
      let low = 0;
      let high = this.sortedArray.length - 1;
      
      // Step 1: Initial range
      steps.push({
        low,
        high,
        mid: -1,
        description: `مجال البحث الأبتدائي: [${low}, ${high}]`
      });

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        // Step 2: Calculate and check mid
        steps.push({
          low,
          high,
          mid,
          description: `المنتصف = ${mid}, array[${mid}] = ${this.sortedArray[mid]}`,
          value: this.sortedArray[mid]
        });

        if (this.sortedArray[mid] === this.target) {
          // Found!
          steps.push({
            low,
            high,
            mid,
            description: `✅ العثور ${this.target} عند الفهرس ${mid}!`,
            found: true
          });
          this.searchResult = { found: true, index: mid, searched: steps.map(s => s.mid).filter(m => m >= 0) };
          return steps;
        } else if (this.sortedArray[mid] < this.target) {
          // Go right
          const oldLow = low;
          low = mid + 1;
          steps.push({
            low: oldLow,
            high,
            mid,
            description: `array[${mid}] (${this.sortedArray[mid]}) < ${this.target}, التحرك نحو اليمين: [${low}, ${high}]`,
            searching: 'right'
          });
        } else {
          // Go left
          const oldHigh = high;
          high = mid - 1;
          steps.push({
            low,
            high: oldHigh,
            mid,
            description: `array[${mid}] (${this.sortedArray[mid]}) > ${this.target}, التحرك نحو اليسار: [${low}, ${high}]`,
            searching: 'left'
          });
        }
      }

      // Not found
      steps.push({
        low,
        high: -1,
        mid: -1,
        description: `❌ مجال البحث فارغ. العنصر ${this.target} غير موجود.`,
        notFound: true
      });
      this.searchResult = { found: false, index: -1, searched: steps.map(s => s.mid).filter(m => m >= 0) };
      return steps;
    },

    getArrayBarClass(index) {
      const classes = [];
      
      // Current range boundaries
      if (this.currentLow === index) classes.push('low');
      if (this.currentHigh === index) classes.push('high');
      
      // Current mid point
      if (this.currentMid === index) classes.push('mid');
      
      // Found result
      if (this.searchResult.found && this.searchResult.index === index) {
        classes.push('found');
      }
      
      // Previously searched
      if (this.searchResult.searched.includes(index) && this.currentMid !== index) {
        classes.push('searched');
      }
      
      return classes.join(' ');
    },

    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },

    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },

    reset() {
      this.target = null;
      this.steps = [];
      this.currentStep = 0;
      this.searchResult = { found: null, index: -1, searched: [] };
    }
  }
};
</script>

<style scoped>
.binary-search-visualizer {
  max-width: 900px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
}

.controls input {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 120px;
}

.controls button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.controls button:not(:disabled) {
  background: #2196f3;
  color: white;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.array-section {
  margin-bottom: 2rem;
}

.array-section h3 {
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.array-container {
  display: flex;
  gap: 8px;
  height: 120px;
  align-items: flex-end;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 16px;
  border: 3px solid #e9ecef;
  margin-bottom: 1rem;
}

.array-bar {
  flex: 1;
  background: #90caf9;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.4s ease;
  border: 3px solid transparent;
  height: 90px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.array-bar.low {
  background: linear-gradient(135deg, #64b5f6, #42a5f5);
  border-color: #2196f3;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.array-bar.high {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  border-color: #ef6c00;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.array-bar.mid {
  background: linear-gradient(135deg, #e57373, #ef5350);
  border-color: #d32f2f;
  animation: pulse 1s infinite;
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
}

.array-bar.found {
  background: linear-gradient(135deg, #81c784, #66bb6a);
  border-color: #388e3c;
  animation: bounce 1s infinite;
}

.array-bar.searched {
  background: #e0e0e0;
  opacity: 0.6;
  transform: scale(0.95);
}

.range-info {
  text-align: center;
  padding: 1rem;
  background: #f0f4f8;
  border-radius: 12px;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  color: #333;
}

.status {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border-left: 6px solid #2196f3;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.status p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.result {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  display: inline-block;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.15); }
  50% { transform: scale(1.25); }
}

@keyframes bounce {
  0%, 100% { transform: scale(1.15); }
  50% { transform: scale(1.25) translateY(-5px); }
}
</style>
