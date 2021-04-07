function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

function throttle(fn, delay) {
  let flag = true;

  return function () {
    if (flag) {
      fn();
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

let elementList = [];

let callAPI = debounce(mainAPI, 500);
let callThrottleAPI = throttle(mainAPI, 1000);
document.getElementById("call").addEventListener("click", callAPI);
document
  .getElementById("callThrottle")
  .addEventListener("click", callThrottleAPI);

function mainAPI() {
  console.log("FUNCTION CALL");
  fetch(
    "https://api.strataprop.com/api/v1/user-management/users/kyc/country-code/"
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}
