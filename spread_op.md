# js 展開運算符 `...`
## 用途
1. 數組/對象的複製（淺複製）
2. 數組的合併
3. 展開成為函數參數
4. 展開object與覆蓋屬性
5. ES6之前的替代方案
## 例子
1. 數組/對象的複製（淺複製）
```js
const arr = [1, 2, 3];
const copy_arr = [...arr];
// copy_arr = [1, 2, 3]
// arr !== copy_arr

const obj = { a: 1, b: 2 };
const copy_obj = { ...obj };
// copy_obj = { a: 1, b: 2 }
// obj !== copy_obj
```
2. 數組的合併
```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = [...arr1, ...arr2, 7, 8, 9];
// result = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
3. 展開成為函數參數
```js
const numbers = [1, 2, 3, 4, 5];

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

const result = sum(...numbers);
// result = 1 + 2 + 3 + 4 + 5 
```
4. 展開object與覆蓋屬性
```js
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { b: 4, c: 5, d: 6 };
const result = { ...obj1, ...obj2 };
// result = { a: 1, b: 4, c: 5, d: 6 }
```
## 更多用途
5. 遇到不支持ES6的環境，相信是應用`Function.prototype.apply`方法來把數組放入函數的參數裡面
```js
function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

const numbers = [1, 2, 3, 4, 5];
const result = sum.apply(null, numbers);
// result = 15;
```
6. 與解構賦值結合使用  

數組解構
```js
const [first, ...rest] = [1, 2, 3, 4, 5];
// first == 1
// rest == [2, 3, 4, 5]
```
object解構  
```js
const { a, ...others } = { a: 1, b: 2, c: 3 };
// a = 1
// others = { b: 2, c: 3 }
// 注意變量命名決定了取哪些被others提取
```
 
7. string轉換char數組
```js
const str = "hello";
const chars = [...str];
// chars =  ['h', 'e', 'l', 'l', 'o']
```
# 更多使用場景
。。。
# 我寫的flat
把所有的`Array`, `Object`的自身可枚舉屬性都展開成為一維數組
```js
function flat(...parameters) {
    const result = [];
    parameters.forEach(p => {
        if (Array.isArray(p)) {
            result.push(...flat(...p));
        } else if (typeof p === 'object') {
            Object.keys(p).forEach(key => {
                result.push(...flat(p[key]));
            });
        } else {
            result.push(p);
        }
    });
    return result;
}
```