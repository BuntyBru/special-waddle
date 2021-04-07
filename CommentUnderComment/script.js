let mainParent = document.getElementById("mainParent");
let count = 0;

let addComments = (e) => {
  if (e.target.id.split("_")[0] == "fc") {
    e.preventDefault();
    count += 1;
    if (e.target.previousElementSibling.value.trim().length > 0) {
      let x = UIFunc(e.target.previousElementSibling.value);

      e.target.parentElement.appendChild(x);
      e.target.previousElementSibling.value = "";
    }
  }
};

const UIFunc = (comment) => {
  let elem = document.createElement("ul");
  elem.setAttribute("id", "ul_" + count);
  elem.innerHTML = `
    <li>
    <p>${comment}</p>
    <form id="myForm_"+${count}>
        <input type='text' name='comment_'+${count}></input>
        <button type="submit" id='fc_'+${count}>Post</button>
    </form>
    </li>
    `;

  return elem;
};

mainParent.addEventListener("click", addComments);
