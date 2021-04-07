let clickBtn = document.getElementById("call");
let table = document.getElementById("table");
let prevPage = document.getElementById("prevPagination");
let nextPage = document.getElementById("nextPagination");
let listOfElems = [];
let pageNo = 0;
let pageLimit = 0;
let elementList;
elementList = document.createElement("div");
elementList.classList = ["elementList"];
let otherButtons = document.getElementById("otherBtns");

const debounce = (fn, delay) => {
  let timer;
  let go = true;

  return () => {
    /*clearInterval(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);*/

    if (go) {
      go = false;
      setTimeout(() => {
        fn();
        go = true;
      }, delay);
    }
  };
};

const UIShow = () => {
  addElements(0);
};

function addElements(page) {
  pageNo = page;
  elementList.innerHTML = "";
  listOfElems[page].forEach((x) => {
    elementList.innerHTML += `<div><img src=${x.flag} ></img>${x.name}</div>`;
  });

  table.append(elementList);
}

const mainAPI = () => {
  fetch(
    "https://api.strataprop.com/api/v1/user-management/users/kyc/country-code/"
  )
    .then((res) => res.json())
    .then((res) => {
      pageLimit = res.length / 10;
      addButtons();

      while (res.length) {
        listOfElems.push(res.splice(0, 10));
      }
      UIShow();
    });
};

const changeElems = (item) => {
  if (item == "prev") {
    if (pageNo > 0 && pageNo < pageLimit) {
      pageNo--;
      addElements(pageNo);
    }
  }

  if (item == "next") {
    if (pageNo < pageLimit - 1) {
      pageNo++;
      addElements(pageNo);
    }
  }
};

const addButtons = () => {
  for (let i = 1; i < pageLimit; i++) {
    otherButtons.innerHTML += `<button class=${i}>${i}</button>`;
  }
};

prevPage.addEventListener("click", () => {
  changeElems("prev");
});
nextPage.addEventListener("click", () => {
  changeElems("next");
});

let callApi = debounce(mainAPI, 1000);

clickBtn.addEventListener("click", callApi);

const paginationFunc = (e) => {
  if (e.target.classList.value != "") {
    otherButtons.childNodes.forEach((x) => {
      if (x.classList) {
        x.classList.remove("activeBtn");
      }
    });
    e.target.classList.add("activeBtn");
    addElements(e.target.classList[0]);
  }
};

otherButtons.addEventListener("click", paginationFunc);
