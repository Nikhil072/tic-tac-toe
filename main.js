let posNodes = document.querySelectorAll(".cell");

const win = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];
const typeMap = new Map();

const resetBtn = document.querySelector(".reset-btn");
const table = document.querySelector("table");

let turn = true;

resetHandler();

table.addEventListener("click", (e) => {
  const ele = e.target;
  if (ele.innerText === "/" && turn) {
    ele.innerText = "O";
    ele.classList.add("blue");
    turn = false;
    const type = ele.innerText;
    const pos = Number(ele.id);
    typeMap.set(type, [...typeMap.get(type), pos]);
  } else if (ele.innerText === "/") {
    ele.innerText = "X";
    ele.classList.add("red");
    turn = true;
    const type = ele.innerText;
    const pos = Number(ele.id);
    typeMap.set(type, [...typeMap.get(type), pos]);
  }
  setTimeout(checkGame, 100);
});

resetBtn.addEventListener("click", resetHandler);

function resetHandler() {
  for (cell of posNodes) {
    cell.innerText = "/";
    cell.classList.remove("blue");
    cell.classList.remove("red");
  }
  typeMap.clear();
  typeMap.set("O", []);
  typeMap.set("X", []);

  turn = true;
}

function checkGame() {
  for (combo of win) {
    if (isSubsetOf(typeMap.get("O"), combo)) {
      alert("O won");
      resetHandler();
    } else if (isSubsetOf(typeMap.get("X"), combo)) {
      alert("X won");
      resetHandler();
    }
  }
  if (typeMap.get("O").length + typeMap.get("X").length === 9) {
    alert("Nobody Won!");
    resetHandler();
  }
}

function isSubsetOf(set, subset) {
  return Array.from(new Set([...set, ...subset])).length === set.length;
}
