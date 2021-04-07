let apiButton = document.getElementById("call");
let tableParent = document.getElementById("tableParent");
let searchBtn = document.getElementById("searchBtn");
let tableData = [];
let inputBlock = document.getElementById("input_block");
let mainTable = document.createElement("table");
mainTable.setAttribute("id", "table_data");
let tableHead = document.createElement("tr");

function debounce(fn, delay) {
  let timer;
  return function () {
    clearInterval(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

let APICall = debounce(callAPI, 1000);

function callAPI() {
  fetch(
    "https://api.strataprop.com/api/v1/user-management/users/kyc/country-code/"
  )
    .then((res) => res.json())
    .then((res) => {
      tableData = res;
      UIShow(tableData);
    });
}

function UIShow(elementList) {
  mainTable.innerHTML = ``;
  tableHead.innerHTML = ` <th>Flag</th>
  <th>Name</th>
  <th>Code</th>`;
  mainTable.appendChild(tableHead);

  elementList.forEach((x) => {
    mainTable.innerHTML += `<tr><th><img src=${x.flag}></th>
  <th>${x.name}</th>
  <th>${x.phone[0]}</th></tr>`;
  });

  tableParent.appendChild(mainTable);
}

function search() {
  if (inputBlock.value.trim().length > 0) {
    let newArr = tableData.filter((x) => {
      if (x.name.includes(inputBlock.value)) {
        return x;
      }
    });

    console.log(newArr);
    UIShow(newArr);
  }
}

let searchElements = debounce(search, 1000);

searchBtn.addEventListener("click", searchElements);

apiButton.addEventListener("click", APICall);
