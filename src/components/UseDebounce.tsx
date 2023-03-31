// import { useState, useEffect, useRef } from "react";

// // 定义一个 useDebounce hook，接受一个 value 和一个 delay 作为参数
// export function useDebounce(value, delay) {
//   // 定义一个 state 和 setter 来存储防抖后的值
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(
//     () => {
//       // 设置一个定时器，在 delay 时间后更新防抖后的值
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);

//       // 在 value 或 delay 变化时，清除之前的定时器
//       return () => {
//         clearTimeout(handler);
//       };
//     },
//     [value, delay] // 只有当 value 或 delay 变化时才触发 useEffect
//   );

//   // 返回防抖后的值
//   return debouncedValue;
// }