# js 閉包 鏈式調用錯誤用法之研習

## 定義
1. 一函數的回傳是以另一個函數
2. 一個函數被定義時，他會用到定義在他外部的變量，如果這個函數在其他作用域，通常是兄弟作用域（sebling），他仍然能夠訪問他當時的環境變量，就成為閉包（closure）
## 例子

```js
function counter(start) {
    return {
        count: () => {
            return start;
        },
        increase: () => {
            console.log(++start);
            return counter(start);
        }
    }
}
```
在此定義了一個函數，我假設「計數器(0)」是呼叫counter(0)所產生的作用域，這個作用域包含一個變量start(函數參數)，以及一個物件（被回傳的那個），物件內部為了實現鏈式調用，我會在增加函數中，回傳了一個新的計數器，從舊的0，+1做為參數傳入。( return counter(start++) )
```js
const c = counter(0);
```
此時，c賦值為「計數器(0)」作用域下的那個物件
```js
// 「計數器(0)」的環境
let start = 0; // 現在這個環境start: 0

ret = {
    count: () => {
        return start;
    },
    increase: () => {
        console.log(start);
        return counter(start);
    }
} 
```
此時我這樣子調用：
```js
c.increase().increase().increase(); //打印 1 2 3
c.increase(); // 打印 2
```
為什麼呢，為什麼計數沒有1，2，3，4那樣增加  
因為創造了新環境（新作用域）
```js
// c.increase() 創造了一個新作用域，我命名為計數器(1)
// 該環境為：
// let start = 1;
// ret = {
//     count: () => {
//         return start;
//     },
//     increase: () => {
//         console.log(start);
//         return counter(start);
//     }
// }
// 當你c.increase().increase()的時候，你在對計數器(1)環境中的start進行+1
// 原有的計數器(0)環境沒有受到影響，數字沒有變化
```
可以改成這樣，可以鏈式調用，但又不會創造新的環境導致改不了了原來環境的變數  
```js
function counter(start) {
    const a = {
        getCount: () => {
            return start;
        },
        increase: () => {
            console.log(++start);
            return a;
        }
    }
    return a;
}
```
:D  