export function debounce(func, delay = 200) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle(fn, wait = 100, immediate = false) {
  var flag = true;
  var timer = null;
  var result;
  var _throttle = function(...args) {
    var context = this;
    if (immediate) {
      if (flag) {
        result = fn.apply(context, args);
        flag = false;
        timer = setTimeout(() => {
          flag = true;
        }, wait);
      }
    } else {
      if (flag) {
        flag = false;
        timer = setTimeout(() => {
          fn.apply(context, args);
          flag = true;
        }, wait);
      }
    }
    return result;
  };
  console.log('throttle');
  return _throttle;
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
