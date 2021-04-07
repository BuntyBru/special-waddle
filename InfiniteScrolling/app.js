let FetchButton = document.getElementById("call");
let elementList = document.createElement("div");
elementList.classList.add("elementList");
let pageNo = 0;
let listOfElems = [];
function debounce(fn, delay) {
  let timer;
  return () => {
    clearInterval(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

const callAPI = debounce(mainAPI, 500);
const UIShow = () => {
  addElements(0);
};

function mainAPI() {
  console.log("Hi");
  fetch(
    "https://api.strataprop.com/api/v1/user-management/users/kyc/country-code/"
  )
    .then((res) => res.json())
    .then((res) => {
      while (res.length) {
        listOfElems.push(res.splice(0, 25));
      }
      UIShow();
    });
}

function addElements(page) {
  pageNo = page;
  elementList.innerHTML = "";
  listOfElems[page].forEach((x) => {
    elementList.innerHTML += `<div><img src=${x.flag} ></img>${x.name}</div>`;
  });

  table.append(elementList);
}

FetchButton.addEventListener("click", callAPI);

const Scroller = debounce(scrollFunc, 100);
function scrollFunc() {
  if (
    elementList.offsetHeight + elementList.scrollTop >=
    0.9 * elementList.scrollHeight
  ) {
    pageNo += 1;
    listOfElems[pageNo].forEach((x) => {
      elementList.innerHTML += `<div><img src=${x.flag} ></img>${x.name}</div>`;
    });
  }
}

elementList.addEventListener("scroll", Scroller);
