---
theme: ./slidev-theme-penguin-rtl
colorSchema: light
class: text-center
transition: slide-right
title: "المحاضرة  6: بنى التحكم - الجزء الثاني"
mdc: true
author: Dr.Suhel AlHammoud & Dr. Ossama Nasser
exportFilename: "5"
layout: cover
---

# المحاضرة 6

## بنى التحكم: الجزء الثاني

## while – do while – for

### د. سهيل الحمود

### د. أسامه ناصر

2025-2026
---

# مقدمة

* بنى التكرار **Loops** هي أدوات برمجية تسمح بتكرار تنفيذ جزء من التعليمات عدة مرات.
* نستخدمها عندما نحتاج:

    * تنفيذ تعليمة أكثر من مرة.
    * المرور على عناصر مصفوفة.
    * تنفيذ خوارزمية تعتمد على عدد محدد أو غير محدد من التكرارات.

---

# الأنواع الأساسية لبنى التكرار

<div class="grid grid-cols-2">
<div >

* حلقة while

</div>
<div>

```c++
while(condition){
  statements
}
```

</div>
<div>

* حلقة do while

</div>
<div>

```c++
do{
  statements
}while(condition);
```

</div>

</div>

<div>

* حلقة for

</div>
<div>

```c++
for(initialization; condition; update){
  statements
}
```

</div>

---

# أولاً: حلقة while

## الشكل العام

```cpp
while(condition){
	// تعليمة أو مجموعة تعليمات
	statements
}
```

## آلية التنفيذ

1. يتم فحص الشرط **قبل** الدخول للحلقة.
2. إذا كان ناتج تقييم الشرط true عندها قم بتنفيذ كتلة الحلقة.
3. بعد التنفيذ قم بالعودة إلى بداية الحلقة و افحص الشرط مرة أخرى.
4. تستمر العملية حتى يصبح الشرط false.

---

# مثال: طباعة الأعداد من 1 إلى 5

<div class="grid grid-cols-2 gap-4">
<div>

```bash
1
2
3
4
5
```

</div>
<div>

```cpp
int i = 1;
while(i <= 5){
	cout << i << endl;
	i++;
}
```

</div>

</div>

---

# مثال: حساب مجموع الأعداد من 1 حتى n

```cpp
int n; cin >> n;
int sum = 0;
int i = 1;
while(i <= n){
	sum += i;
	i++;
}
cout << sum << endl;
```

---

# ملاحظة مهمة

* إذا نسينا تحديث المتغير داخل الحلقة قد نحصل على **حلقة لانهائية**.

```cpp
int n; cin >> n;
int sum = 0;
int i = 1;
while(i <= n){ // حلقة لانهائية
	sum += i;
	// i++; لايتم تحديث متغير الحلقة
}
cout << sum << endl;
```

---

# ثانياً: حلقة do while

<div class="grid grid-cols-2 gap-4">

<div>

## آلية التنفيذ

* يتم تنفيذ جسم الحلقة **قبل** فحص الشرط.
* يتم فحص الشرط بعد التنفيذ.
* تستمر الحلقة ما دام الشرط محققًا.
* أي أن جسم الحلقة ينفّذ **مرة واحدة على الأقل مهما كان الشرط**.

</div>

<div>

## الشكل العام

```cpp
do{
	// تعليمة أو أكثر
	statements
}while(condition);
```

</div>


</div>

---

# مثال: قراءة رقم موجب فقط وحساب جذره التربيعي

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main(){
  int x;
  do{
    cout << "Enter positive number: ";
    cin >> x;
  }while(x <= 0);
  cout << sqrt(x) << endl;
  return 0;
} 
```

---

# الفرق بين while و do while

| الخاصية              | while            | do while                 |
|----------------------|------------------|--------------------------|
| توقيت فحص الشرط      | قبل التنفيذ      | بعد التنفيذ              |
| تنفيذ كتلة التعليمات | قد لا تنفذ أبداً | تنفذ مرة واحدة على الأقل |

---

# ثالثاً: حلقة for

## الشكل العام

```cpp
for(initialization; condition; update){
	// تعليمات
}
```


## آلية التنفيذ

1. تنفيذ الجزء **initialization** لمرة واحدة.
2. فحص الشرط condition.
3. إذا تحقق الشرط → تنفيذ جسم الحلقة.
4. تنفيذ update ثم العودة للشرط.





---

# مثال: طباعة الأعداد من 1 إلى 10

```cpp
for(int i=1; i<=10; i++){
	cout << i << endl;
}
```

---

# مثال: مجموع أول n عدد

```cpp
int n; cin >> n;
int sum = 0;
for(int i=1; i<=n; i++){
	sum += i;
}
cout << sum;
```

---

# مقارنة بين أنماط الحلقات الثلاث

|              | **while**                   | **do while**                    | **for**                  |
|--------------------|-------------------------|-----------------------------|----------------------|
| **مكان تهيئة المتغير** | خارج الحلقة             | خارج الحلقة غالبًا          | داخل تعريف الحلقة    |
| **توقيت فحص الشرط**    | قبل التنفيذ             | بعد التنفيذ                 | قبل التنفيذ          |
| **أمثلة استخدام**      | حلقات ذات عدد غير معروف | قراءة مدخلات حتى تصبح صحيحة | حلقات ذات عدد معروف |

---

## مثال: طباعة الأعداد الزوجية من 2 إلى 20 بثلاث طرق

<div class="grid grid-cols-2 gap-8">

<div v-click>

### باستخدام do while

```cpp
int i = 2;
do{
	cout << i << " ";
	i += 2;
}while(i <= 20);
```

</div>

<div v-click>

### باستخدام while

```cpp
int i = 2;
while(i <= 20){
	cout << i << " ";
	i += 2;
}
```

</div>

</div>


<div v-click>

### باستخدام for

```cpp
for(int i=2; i<=20; i+=2){
	cout << i << " ";
}
```

</div>

---

# تحذير: الحلقات اللانهائية

## حلقة لا تنتهي باستخدام while :

```cpp
int i = 1;
while(i > 0){
	cout << i;
} // i لا يتغير أبداً!
```

## حلقة لانهائية باستخدام for

```cpp
for(;;){
	// تعمل للأبد
}
```

---

## مثال: حساب متوسط العلامة لمجموعة من المواد

### خطوات الحل

* قرائة عدد المواد
* تكرار القراءة داخل حلقة بحسب العدد المدخل
* جمع كل الدرجات داخل متغير sum
* بعد انتهاء الحلقة نحسب المتوسط
    * المتوسط = مجموع الدرجات / عدد المواد
* طباعة الناتج

---

## مثال: حساب متوسط العلامة لمجموعة من المواد

### باستخدام حلقة for

```cpp
  int n;
  cout << "Enter the number of modules: ";
  cin >> n; // عدد المواد

  double sum = 0;
  for(int i = 0; i < n; i++){
    int grade;
    cin >> grade;
    sum += grade;
  }

  double average = sum / n;
  cout << "Average = " << average << endl;
```

---

## مثال: حساب متوسط العلامة لمجموعة من المواد

### باستخدام حلقة while

```cpp
  int n;
  cout << "Enter the number of modules: ";
  cin >> n; // عدد المواد

  double sum = 0;
  while(n > 0){ 
    int grade;
    cin >> grade;
    sum += grade;
    n--;
  }

  double average = sum / n;
  cout << "Average = " << average << endl;
```

---

## مثال: حساب متوسط العلامة لمجموعة من المواد

### باستخدام حلقة  while

استخدام الشرط و تغيير عداد الحلقة في خطوة واحدة

```cpp
  int n;
  cout << "Enter the number of modules: ";
  cin >> n; // عدد المواد

  double sum = 0;
  while(n--){ 
    int grade;
    cin >> grade;
    sum += grade;
  }

  double average = sum / n;
  cout << "Average = " << average << endl;
```

---


# التحكم بسير الحلقات

## باستخدام break و continue

* في الحلقات التكرارية (for – while – do while) نحتاج أحيانًا لتغيير مسار التنفيذ.
* توفر ++C أداتين مهمتين:

    * **break** → للخروج من الحلقة بالكامل.
    * **continue** → لتجاوز المرور الحالي والانتقال إلى المرور التالي.

---

# تعليمة break

* توقف الحلقة فورًا.
* تخرج مباشرة إلى أول سطر بعد جسم الحلقة.
* تستخدم بشكل مرافق لتعليمات شرطية

### الشكل العام

```cpp
while(condition){
    statements;
    if(condition) 
        break;
    statements;
}
```

---

## مثال على break

<div class="grid grid-cols-3 gap-8">

<div>

**النتيجة:** 1 2 3 4 5

</div>

<div class="col-span-2">
```cpp
for(int i = 1; i <= 10; i++){
    if(i == 6) break;
    cout << i << " ";
}
```
</div>

</div>

### لماذا؟

* عند i = 6 يتم تنفيذ break و عندها يتم إنهاء الحلقة و الانتقال إلى التعليمة التالية بعد الحلقة.

---


## مثال: حساب متوسط العلامة لمجموعة من المواد

### باستخدام حلقة  while و break

عدد المواد غير محدد من البداية, استمر بالقراءة حتى تحصل على علامة خارج المجال

```cpp
  int n = 0;
  double sum = 0;
  do {
    double grade;
    cout << "Enter the grade: ";
    cin >> grade;
    if (grade < 0 || grade > 100)
      break;
    sum += grade;
    n++;
  } while (true);
  cout << "Number of modules: " << n << endl;
  cout << "Average = " << sum / n << endl;
```

---

# تعليمة continue

<div class="grid grid-cols-3 gap-4">



<div>

### الوظيفة

* لا تخرج من الحلقة.
* تتجاوز بقية تعليمات المرور الحالي.
* تنتقل مباشرة إلى **بداية الحلقة**.
* تستخدم عادة مع تعليمات شرطية

</div>

<div class="col-span-2">

### الشكل العام

```cpp
for(initialization; condition; step){
    statements;
    if(condition) continue;
    statements; // 
}

```

</div>

</div>

---

# مثال على continue

## طباعة الأعداد الفردية فقط

```cpp
for(int i = 1; i <= 10; i++){
    if(i % 2 == 0)
        continue; // تجاوز العدد الزوجي
    cout << i << " "; // يطبع العدد الفردي فقط
}

// output: 1 3 5 7 9
```

**النتيجة:** 1 3 5 7 9

---

# مثال على continue و break

## طباعة الجذر التربيعي لعدد
- حلقة لانهائية
- اقرأ العدد
- اذا كان العدد سالبا أهمل بقية التعليمات لهذا المرور و ارجع إلى بداية الحلقة
- إذا كان العدد يساوي صفرا عندها قم بالخروج من الحلقة نهائيا

---

# مثال على continue و break

## طباعة الجذر التربيعي لعدد

```cpp
while(true){
    int x; cin >> x;

    if(x < 0) continue; // تجاهل القيم السالبة
    if(x == 0) break; // اخرج من الحلقة عند الصفر
    
    cout << "sqrt(" << x << ")=" << sqrt(x) << endl;
}
```

---


## الفرق بين break و continue

| الخاصية   | break                      | continue                             |
|-----------|----------------------------|--------------------------------------|
| تأثيرها   | الخروج من الحلقة بالكامل   | تجاوز بقية تعليمات المرور الحالي فقط |
| الانتقال  | إلى أول سطر **بعد** الحلقة     | إلى **بداية** الحلقة                     |
| الاستخدام |  إيقاف التكرار             | تخطي تعليمات أو حالات معينة          |

---


#  الحلقات المتداخلة (Nested Loops)

* هي استخدام حلقة داخل حلقة أخرى.
* تُستخدم عندما نريد تنفيذ تكرار متعدد الأبعاد مثل:

    * الطباعة على شكل جداول.
    * التعامل مع مصفوفات ثنائية.

---

# الشكل العام للحلقات المتداخلة

```cpp
for(int i = 1; i <= n; i++){
    for(int j = 1; j <= m; j++){
        // تعليمات تعتمد على i و j
    }
}
```

* الحلقة الخارجية تتحكم بعدد الصفوف.
* الحلقة الداخلية تتحكم بعدد الأعمدة.

---

# مثال: طباعة جدول 3 × 3

```cpp
for(int i = 1; i <= 3; i++){
    for(int j = 1; j <= 3; j++){
        cout << 10 * i + j << " ";
    }
    cout << endl;
}
```

**النتيجة:**

```
11 12 13 
21 22 23 
31 32 33
```

---

## مثال: طباعة أرقام الصف + العمود

```cpp
for(int i = 1; i <= 3; i++){
    for(int j = 1; j <= 3; j++){
        cout <<"(" << i << "," << j << ") ";
    }
    cout << endl;
}
```

**النتيجة:**

```
(1,1) (1,2) (1,3) 
(2,1) (2,2) (2,3) 
(3,1) (3,2) (3,3) 
```

---

## مثال: طباعة مربع نجوم

**الناتج:**

<div class="grid grid-cols-3 gap-8">

<div>


```
*****
*****
*****
*****
*****
```

</div>

<div class="col-span-2">

```cpp
int n = 5;
for(int i = 1; i <= n; i++){
    for(int j = 1; j <= n; j++){
        cout << "*";
    }
    cout << endl;
}
```

</div>
</div>

---


## مثال: طباعة مثلث نجوم

**الناتج:**

<div class="grid grid-cols-3 gap-8">

<div>


```
*
**
***
****
*****
```

</div>

<div class="col-span-2">

```cpp
for(int i = 1; i <= 5; i++){
    for(int j = 1; j <= i; j++){
        cout << "*";
    }
    cout << endl;
}
```

</div>
</div>

---




## مثال: جدول الضرب باستخدام حلقات متداخلة

```cpp
for(int i = 1; i <= 10; i++){
    for(int j = 1; j <= 10; j++){
        cout << i * j << "\t";
    }
    cout << endl;
}
```

---


#  استخدام break داخل حلقات متداخلة

<div class="grid grid-cols-3 gap-4">

<div>

- break توقف الحلقة الداخلية فقط
- خرج البرنامج:
```
row 1 --> 1 2 
row 2 --> 1 2 
row 3 --> 1 2 
row 4 --> 1 2 
row 5 --> 1 2
```
</div>

<div class="col-span-2">

```cpp
for(int i = 1; i <= 5; i++){
  cout << "row " << i << " --> ";
  for(int j = 1; j <= 5; j++){
    if(j == 3) break; 
    cout << j << " ";
  }
  cout << endl;
}
```
</div>
</div>

---

# استخدام continue داخل حلقات متداخلة

```cpp
for(int i = 1; i <= 5; i++){
    for(int j = 1; j <= 5; j++){
        if(j == 2) continue; // يتجاوز العمود الثاني
        cout << j << " ";
    }
    cout << endl;
}
```

---

# تمارين 

1. احسب مجموع الأعداد بين عددين صحيحين n و m.
2. احسب القاسم المشترك الأعظم لعددين صحيحين باستخدام خوارزمية اقليدس
3. تبديل ترتيب الخانات العشرية لرقم صحيح
4. احسب قيمة العاملي لعدد معين !n
4. اطبع جدول الضرب من 1 إلى 10 باستخدام حلقة متداخلة.
5. تحديد إذا كان العدد أوليا


