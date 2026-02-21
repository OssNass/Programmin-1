<template>
  <div class="bubble-sort-visualizer">
    <h2>Bubble Sort Visualizer</h2>

    <!-- Controls -->
    <div class="controls">
      <button @click="prevStep" :disabled="currentStepIndex === 0">السابق</button>
      <button @click="nextStep" :disabled="currentStepIndex === steps.length - 1">التالي</button>
      <button @click="reset">إعادة للبداية</button>
    </div>

   <div class="c">
     <!-- Array bars -->
         <div class="array-container-c">
    <div class="array-container">
      <div
        v-for="(value, index) in currentArray"
        :key="index"
        class="bar"
        :class="{
          compare: isComparing(index),
          swap: isSwapping(index),
          sorted: isSorted(index)
        }"
        :style="{ height: value * 20 + 'px' }"
      >
        {{ value }}
      </div>
    </div>
        <div class="step-info">
      <p>الخطوة {{ currentStepIndex + 1 }} / {{ steps.length }}</p>
      <p>{{ currentStep.description }}</p>
    </div>
    </div>
 
<div class="step-c">
    <!-- Step info -->


    <!-- Pseudocode -->
    <pre class="pseudocode">
<code>
<span :class="lineClass(1)">1  procedure bubbleSort(A):</span>
<span :class="lineClass(2)">2    n = length(A)</span>
<span :class="lineClass(3)">3    for i from 0 to n-1:</span>
<span :class="lineClass(4)">4      for j from 0 to n-i-1:</span>
<span :class="lineClass(5)">5        if A[j] > A[j+1]:</span>
<span :class="lineClass(6)">6          swap A[j], A[j+1]</span></code>    </pre></div>
  </div>
  </div>
</template>

<script>
export default {
  name: "BubbleSortVisualizer",
  data() {
    const initialArray = [8,2,1,6,4,5,2]; // you can chanweeeeeeeeeg 3333333ews3ewwwwwww344433e this

    const { steps } = generateBubbleSortSteps(initialArray);

    return {
      originalArray: initialArray,
      steps,
      currentStepIndex: 0
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.currentStepIndex];
    },
    currentArray() {
      return this.currentStep.array;
    }
  },
  methods: {
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
      this.currentStepIndex = 0;
    },
    isComparing(index) {
      const { j, comparing } = this.currentStep;
      return comparing && (index === j || index === j + 1);
    },
    isSwapping(index) {
      const { j, swapping } = this.currentStep;
      return swapping && (index === j || index === j + 1);
    },
    isSorted(index) {
      const { sortedBoundary } = this.currentStep;
      // all elements from sortedBoundary to end are sorted
      return index >= sortedBoundary;
    },
    lineClass(lineNumber) {
      const activeLine = this.currentStep.activeLine;
      return {
        "code-line": true,
        active: activeLine === lineNumber
      };
    }
  }
};

// Pure function to generate all steps of bubble sort
function generateBubbleSortSteps(array) {
  const arr = array.slice();
  const steps = [];

  const n = arr.length;

  // Initial state
  steps.push({
    array: arr.slice(),
    i: -1,
    j: -1,
    comparing: false,
    swapping: false,
    sortedBoundary: n, // none sorted yet
    activeLine: 1,
    description: "تهيئة المصفوفة"
  });

  // n and outer loop
  steps.push({
    array: arr.slice(),
    i: 0,
    j: -1,
    comparing: false,
    swapping: false,
    sortedBoundary: n,
    activeLine: 2,
    description: "نسخ طول المصفوفة للمتحول n"
  });

  for (let i = 0; i < n - 1; i++) {
    // outer loop start
    steps.push({
      array: arr.slice(),
      i,
      j: -1,
      comparing: false,
      swapping: false,
      sortedBoundary: n - i,
      activeLine: 3,
      description: `الحلقة الخارجية بقيمة عداد i = ${i}. العناصر التي تلي العنصر ذو الفهرس ${n - i - 1} مرتبة.`
    });

    for (let j = 0; j < n - i - 1; j++) {
      // inner loop line
      steps.push({
        array: arr.slice(),
        i,
        j,
        comparing: false,
        swapping: false,
        sortedBoundary: n - i,
        activeLine: 4,
        description: `الحلقة الداخلية بقيمة عداد j = ${j}.`
      });

      // comparison line
      steps.push({
        array: arr.slice(),
        i,
        j,
        comparing: true,
        swapping: false,
        sortedBoundary: n - i,
        activeLine: 5,
        description: `مقارنة A[${j}] = ${arr[j]} مع A[${j + 1}] = ${arr[j + 1]}.`
      });

      if (arr[j] > arr[j + 1]) {
        // swap line
        const newArr = arr.slice();
        const temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;

        // apply change to working array
        arr[j] = newArr[j];
        arr[j + 1] = newArr[j + 1];

        steps.push({
          array: newArr.slice(),
          i,
          j,
          comparing: true,
          swapping: true,
          sortedBoundary: n - i,
          activeLine: 6,
          description: `استبدال A[${j}] بـ A[${j + 1}].`
        });
      } else {
        // no swap step (optional, still show code line 6 as not executed)
        steps.push({
          array: arr.slice(),
          i,
          j,
          comparing: false,
          swapping: false,
          sortedBoundary: n - i,
          activeLine: 5,
          description: `لاحاجة للاستبدال ${arr[j]} ≤ ${arr[j + 1]}.`
        });
      }
    }
  }

  // Final state
  steps.push({
    array: arr.slice(),
    i: n - 1,
    j: -1,
    comparing: false,
    swapping: false,
    sortedBoundary: 0,
    activeLine: 1,
    description: "Array is fully sorted."
  });

  return { steps };
}
</script>

<style scoped>
.bubble-sort-visualizer {
  width: 80%;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.controls {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}

.controls button {
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

.array-container {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 200px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  padding: 0.5rem;
}

.bar {
  flex: 1;
  background-color: #90caf9;
  text-align: center;
  color: #000;
  font-size: 0.8rem;
}

.bar.compare {
  background-color: #ffb74d;
}

.bar.swap {
  background-color: #e57373;
}

.bar.sorted {
  background-color: #bbbbbb;
}

.step-info {
  margin-bottom: 1rem;
}

.pseudocode {
  background: #cccccc;
  color: #f8f8f2;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1.85rem;
  overflow-x: auto;
}

.code-line {
  display: block;
}

.code-line.active {
  background: #333f4a;
}
.c{
width: 100%;
display: flex;
}
.step-c{
width: 50%;
}
.array-container-c{
width: 50%}
</style>
