<template>
  <div class="selection-sort-visualizer">
    <h2>Selection Sort Visualizer</h2>

    <!-- Controls -->


   <div class="c">

     <!-- Array bars -->
         <div class="array-container-c">
             <div class="controls">
      <button @click="prevStep" :disabled="currentStepIndex === 0">السابق</button>
      <button @click="nextStep" :disabled="currentStepIndex === steps.length - 1">التالي</button>
      <button @click="reset">إعادة للبداية</button>
    </div>
    <div class="array-container">
      <div
        v-for="(value, index) in currentArray"
        :key="index"
        class="bar"
        :class="{
          currentI: index === currentStep.i,
          currentJ: index === currentStep.j,
          currentMin: index === currentStep.minIndex,
          sorted: index < currentStep.sortedBoundary
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
<span :class="lineClass(1)">1  procedure selectionSort(A):</span>
<span :class="lineClass(2)">2      n = length(A)</span>
<span :class="lineClass(3)">3      for i from 0 to n-2:</span>
<span :class="lineClass(4)">4          minIndex = i</span>
<span :class="lineClass(5)">5          for j from i+1 to n-1:</span>
<span :class="lineClass(6)">6              if A[j] &lt; A[minIndex]:</span>
<span :class="lineClass(7)">7                  minIndex = j</span>
<span :class="lineClass(8)">8          swap A[i], A[minIndex]</span>
</code>
    </pre>
  </div>
  </div>
  </div>
</template>


<script>
export default {
  name: "SelectionSortVisualizer",
  data() {
    const initialArray = [8,2,1,6,4,5,2]; // change as needed
    const { steps } = generateSelectionSortSteps(initialArray);

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
    lineClass(lineNumber) {
      const activeLine = this.currentStep.activeLine;
      return {
        "code-line": true,
        active: activeLine === lineNumber
      };
    }
  }
};

// Step generator for selection sort
function generateSelectionSortSteps(array) {
  const arr = array.slice();
  const steps = [];
  const n = arr.length;

  const pushStep = ({
    arrayState = arr,
    i = -1,
    j = -1,
    minIndex = -1,
    sortedBoundary = 0,
    activeLine = 1,
    description = ""
  }) => {
    steps.push({
      array: arrayState.slice(),
      i,
      j,
      minIndex,
      sortedBoundary,
      activeLine,
      description
    });
  };

  // Initial state
  pushStep({
    sortedBoundary: 0,
    activeLine: 1,
    description: "تهيئة المصفوفة"
  });

  // n = length(A)
  pushStep({
    sortedBoundary: 0,
    activeLine: 2,
    description: "نسخ طول المصفوفة للمتحول n"
  });

  for (let i = 0; i < n - 1; i++) {
    // Start outer loop
    pushStep({
      i,
      j: -1,
      minIndex: i,
      sortedBoundary: i,
      activeLine: 3,
      description: `الحلقة الخارجية بقيمة عداد i = ${i}. العناصر التي تسبق العنصر ذو الفهرس ${i} مرتبة.`
    });

    // minIndex = i
    let minIndex = i;
    pushStep({
      i,
      j: -1,
      minIndex,
      sortedBoundary: i,
      activeLine: 4,
      description: `فهرس أصغر قيم = ${i}.`
    });

    // Inner loop
    for (let j = i + 1; j < n; j++) {
      // for j from i+1 ...
      pushStep({
        i,
        j,
        minIndex,
        sortedBoundary: i,
        activeLine: 5,
        description: `المقارنة مع العنصر التالي ذو الفهرس j = ${j}.`
      });

      // if A[j] < A[minIndex]
      pushStep({
        i,
        j,
        minIndex,
        sortedBoundary: i,
        activeLine: 6,
        description: `مقارنة A[${j}] = ${arr[j]} أصغر قيمة حالية A[${minIndex}] = ${arr[minIndex]}.`
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        // minIndex = j
        pushStep({
          i,
          j,
          minIndex,
          sortedBoundary: i,
          activeLine: 7,
          description: `العثور على اصغر قيمة جديدة ${j}; فهرس أصغر عنصر جديد = ${j}.`
        });
      }
    }

    if (minIndex !== i) {
      // swap A[i], A[minIndex]
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      pushStep({
        arrayState: arr,
        i,
        j: -1,
        minIndex,
        sortedBoundary: i + 1,
        activeLine: 8,
        description: `استبدال A[${i}] بـ A[${minIndex}]. العنصر ضمن الفهرس ${i} في موقعه النهائي.`
      });
    } else {
      // no swap but still mark as sorted
      pushStep({
        arrayState: arr,
        i,
        j: -1,
        minIndex,
        sortedBoundary: i + 1,
        activeLine: 8,
        description: `لا حاجة للاستبدال، ${i} في مكانه المناسب.`
      });
    }
  }

  // Final state
  pushStep({
    arrayState: arr,
    i: n - 1,
    j: -1,
    minIndex: -1,
    sortedBoundary: n,
    activeLine: 1,
    description: "المصفوفة مرتبة كلياً."
  });

  return { steps };
}
</script>

<style scoped>
.selection-sort-visualizer {
  width: 80%;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.controls {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  width:100%;
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

.bar.currentI {
  background-color: #ffb74d; /* current i (position to fill) */
}

.bar.currentJ {
  background-color: #64b5f6; /* current j being checked */
}

.bar.currentMin {
  background-color: #e57373; /* current minimum element */
}

.bar.sorted {
  background-color: #81c784; /* already placed in correct position */
}

.step-info {
  margin-bottom: 1rem;
}

.pseudocode {
  background: #cccccc;
  color: #f8f8f2;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem !important;
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
