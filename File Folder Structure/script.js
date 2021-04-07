let arrowIcon = document.getElementById("arrow_0");
let mainParent = document.getElementById("mainParent");
let count = 0;

let addElementsFunc = () => {
  count += 1;
  let ul = document.createElement("ul");
  ul.setAttribute("id", "ul_" + count);
  ul.innerHTML = `<li><span id='arrow_'+${count} class='arrowIcon'> =></span>
      <span>Element ${count}</span></li>`;

  return ul;
};

let addElems = (e) => {
  if (
    e.target.id.split("_")[0] == "arrow" &&
    !e.target.classList.contains("arrowIcon_rotate") &&
    !e.target.nextElementSibling.nextElementSibling
  ) {
    e.target.classList.toggle("arrowIcon_rotate");
    e.target.parentElement.appendChild(addElementsFunc());
  } else if (
    e.target.id.split("_")[0] == "arrow" &&
    !e.target.classList.contains("arrowIcon_rotate") &&
    e.target.nextElementSibling.nextElementSibling
  ) {
    console.log("hahaha");
    e.target.classList.toggle("arrowIcon_rotate");
    e.target.nextElementSibling.nextElementSibling.style.display = "block";
  } else if (
    e.target.id.split("_")[0] == "arrow" &&
    e.target.classList.contains("arrowIcon_rotate")
  ) {
    e.target.classList.toggle("arrowIcon_rotate");
    e.target.nextElementSibling.nextElementSibling.style.display = "none";
  }
};

mainParent.addEventListener("click", addElems);
