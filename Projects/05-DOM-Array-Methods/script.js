const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionersBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money); 

  updateDom();
}

// Filter only millioners
function showMillioners() {
  data = data.filter(user => user.money > 1_000_000);
  
  updateDom()
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div'); 
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formateMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl)
}

// Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDom();
}

// Update DOM
function updateDom(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formateMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formateMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listner
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionersBtn.addEventListener("click", showMillioners);
calculateWealthBtn.addEventListener("click", calculateWealth);
