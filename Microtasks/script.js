console.log("script start");
setTimeout(() => {
  console.log("set Timeout One");
}, 0);
setTimeout(() => {
  console.log("set Timeout two");
}, 0);
/*fetch(
  "https://api.strataprop.com/api/v1/user-management/users/kyc/country-code/"
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });*/

Promise.resolve()
  .then((res) => {
    console.log("promise1");
  })
  .then((res) => {
    console.log("promise2");
  });
setTimeout(() => {
  console.log("set Timeout three");
}, 0);

console.log("Script End");
