const btnName = document.getElementById("btnName");
const replaceInputs = document.getElementById("replaceInputs");
const userName = document.getElementById("name");
const userNumber = document.getElementById("number");
const outputName = document.getElementById("outputName");
const outputTexts = document.getElementById("outputTexts");
const guess = document.createElement("input");
guess.type = "number";
guess.min = 1;
guess.max = 30;
let count = 1;
const resetBtn = document.createElement("button");
resetBtn.classList.add("btn", "btn-warning");
const resetFunction = () => {
  resetBtn.innerText = "RESTART";
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
  replaceInputs.append(resetBtn);
  return;
};

let randomNum;
const guessNumber = (num) => {
  const status = document.getElementById("status");
  const x = Math.floor(Math.random() * num) + 1;
  if (!randomNum) {
    randomNum = x;
  }
  console.log(randomNum);

  while (parseInt(guess.value) !== randomNum && count < 3) {
    status.innerHTML = `Wrong, Try again!\nAttempt:${count}!remaining Attempts:${
      3 - count
    }`;

    if (parseInt(guess.value) < randomNum) {
      status.innerHTML = `The number is greater, try again!\n Attempt:${count} <span id="remaining">remaining Attempts:${
        3 - count
      }</span>`;
      status.style.color = "brown";
    }
    if (parseInt(guess.value) > randomNum) {
      status.innerHTML = `The number is smaller, try again! Attempt:${count} <span id="remaining">remaining Attempts:${
        3 - count
      }</span>`;
      status.style.color = "brown";
    }
    if (
      parseInt(guess.value) === randomNum - 1 ||
      parseInt(guess.value) === randomNum + 1
    ) {
      status.innerHTML = `Too close, try again!\n Attempt:${count}\n<span id="remaining"> remaining Attempts:${
        3 - count
      }</span>`;
      status.style.color = "brown";
    }

    count++;
    return;
  }

  if (parseInt(guess.value) == randomNum && count <= 3) {
    status.innerHTML = `yeaaaaaaaaah! you won ${userName.value} `;
    status.style.color = "green";
    resetFunction();
  } else {
    status.innerHTML = `Sorry, you failed to guess the number in three attempts. The number was  <span id="remaining">${randomNum}</span> !`;
    status.style.color = "brown";
    resetFunction();
  }
};

const startGame = () => {
  if (!userName.value || !isNaN(userName.value)) {
    outputName.innerHTML = `enter your name....`;
    outputName.style.color = "brown";
    return;
  }

  outputName.innerHTML = `Hey <span id="userName">${userName.value}</span> lets start, you have three attempts:`;

  outputName.style.color = "black";
  userName.style.display = "none";
  btnName.style.display = "none";

  const checkMenu = document.createElement("select");
  checkMenu.classList.add("form-select");
  checkMenu.areaLabel = "Default select example";
  guess.classList.add("form-control");
  const btnCheck = document.createElement("button");
  btnCheck.classList.add("btn", "btn-primary");
  btnCheck.innerText = "Check";

  for (let i = 0; i < 4; i++) {
    const levels = ["Choice your level:", "Easy", "Medium", "Hard"];
    const checkOptions = document.createElement("option");
    checkOptions.value = i;
    checkOptions.innerText = levels[i];

    checkMenu.appendChild(checkOptions);
  }

  checkMenu.addEventListener("change", () => {
    const option = checkMenu.options[checkMenu.selectedIndex];

    outputName.innerHTML = `Ok <span id="userName">${
      userName.value
    }</span> lets start with level:   ${
      option.value == 0
        ? ""
        : option.value == 1
        ? "<br>Easy-level: 1 - 10"
        : option.value == 2
        ? "<br>Medium-level: 1 - 20"
        : "<br>Hard-level: 1 - 30"
    } `;
  });
  btnCheck.addEventListener("click", () => {
    const option = checkMenu.options[checkMenu.selectedIndex];
    const status = document.getElementById("status");

    if (option.value === "1") {
      checkMenu[2].disabled = "disabled";
      checkMenu[3].disabled = "disabled";

      if (!guess.value) {
        status.innerHTML = "enter your guess number";
        status.style.color = "brown";
      } else {
        guessNumber(10);
      }
    } else if (option.value === "2") {
      checkMenu[1].disabled = "disabled";
      checkMenu[3].disabled = "disabled";

      if (!guess.value) {
        status.innerHTML = "enter your guess number";
        status.style.color = "brown";
      } else {
        guessNumber(20);
      }
    } else if (option.value === "3") {
      checkMenu[2].disabled = "disabled";
      checkMenu[1].disabled = "disabled";
      if (!guess.value) {
        status.innerHTML = "enter your guess number";
        status.style.color = "brown";
      } else {
        guessNumber(30);
      }
    } else {
      status.innerHTML = "select your level!!";
      status.style.color = "brown";
    }
  });

  replaceInputs.append(checkMenu, guess, btnCheck);
};

btnName.addEventListener("click", startGame);
