const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

/**
 * Show the budget and expense form in a modal
 */

btn.onclick = function () {
  expName.value = "";
  expNumber.value = "";
  expenseForm.style.display = "block";
  editForm.style.display = "none";
  modal.style.display = "block";
  console.log("button clicked");
};

/**
 * Hide the modal
 */
span.onclick = function () {
  modal.style.display = "none";
  console.log("hide the modal");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    console.log("clicked here");
  }
};


const amountInput = document.getElementById("number");
const addForm = document.getElementById("addForm");
const budgetAmount = document.getElementById("budgetAmount");
const balanceAmount = document.getElementById("balanceAmount");

const editForm = document.getElementById("editForm");
const saveEdit = document.getElementById("saveEdit");
const editExpValue = document.getElementById("editExpValue");
const editExpNumber = document.getElementById("editExpNumber");

const expForm = document.getElementById("expForm");
const expensesAmount = document.getElementById("expensesAmount");
const expValue = document.getElementById("expValue");
const displayExpenses = document.getElementById("displayExpenses");
const expenseForm = document.getElementById("expense-form");
const budgetform = document.getElementById("budgetform");

let numOfExpenses = document.getElementById("numOfExpenses");
let expName = document.getElementById("expName");
let expNumber = document.getElementById("expNumber");
let id = 0;
let details = [];


/**
 * Get the budget amount and validation 
 * @param {*} amount 
 */

function getBudgetAmount(amount) {
  if (!amount) {
    amountInput.style.border = "1px solid #b80c09";
    amountInput.placeholder = "budget can not be empty";
    amountInput.style.color = "#b80c09";
    //timeout before red validation becomes grey
    setTimeout(() => {
      amountInput.style.color = "#495057";
      amountInput.style.border = "1px solid gray";
    }, 5000);
  } else {
    budgetAmount.innerText = amount;
    balanceAmount.innerText = amount;
    expenseForm.style.display = "block";
    budgetform.style.display = "none";
    editForm.style.display = "none";
    amountInput.value = "";
  }
}

/**
 * Get the expense and amount and store in an object
 * @param {*} name 
 * @param {*} number 
 */

function addExpenses(name, number) {
  if (!name.length || !number.length) {
    expName.style.border = "1px solid #b80c09";
    expName.placeholder = "Expense name can not be empty";
    expName.style.color = "#b80c09";

    expNumber.style.border = "1px solid #b80c09";
    expNumber.placeholder = "Expense amount can not be empty";
    expNumber.style.color = "#b80c09";

    //timeout before red validation becomes grey
    setTimeout(() => {
      expName.style.color = "#495057";
      expName.style.border = "1px solid gray";
      expName.placeholder = "Expense name can not be empty";

      expNumber.placeholder = "Expense amount can not be empty";
      expNumber.style.border = "1px solid gray";
      expNumber.style.color = "#495057";
    }, 5000);
  } else {
    // object containing ID, name, and number
    const userExp = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    console.log(userExp);
    details.push(userExp);
    displayExp(details);
    id++;
    expName.value = "";
    expNumber.value = "";
  }
}

/**
 * Display the form template for editing or deleting an expense
 * @param {*} details 
 */

function displayExp(details) {
  console.log("The number of expenses is: " + details.length);
  numOfExpenses.innerHTML = details.length;
  console.log("numOfExpenses: " + numOfExpenses);
  expValue.innerHTML = null;
  
  for (i = 0; i < details.length; i++) {
    expValue.innerHTML += `
    <div class="expValue" id="${details[i].id}">
      <div id="expTitleID" class="exp"><p>${details[i].id}</p></div>
      <div id="expTitleName" class="exp"><p>${details[i].name}</p></div>
      <div id="expValueAmount" class="exp"><p> <span>$ </span> ${details[i].number}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <i class="bi bi-pencil-square"></i></button> 
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><i class="bi bi-trash3-fill"></i></button>
        </p>
      </div>
    </div>

  `;
  }
  calcExpenses();
  displayExpenses.style.display = "block";
}

/**
 * Add the total amount of expenses
 */

function calcExpenses() {
  let totalExp = 0;
  for (i = 0; i < details.length; i++) {
    totalExp = details[i].number + totalExp;
  }
  expensesAmount.innerText = totalExp;
  updateBalance();
}

/**
 * Subtract the expenses amount from the budget
 */

function updateBalance() {
  balanceAmount.innerText =
    parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}

/**
 * Delete an expense by the expense ID
 * @param {*} id 
 */

function delExpenseDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  //remove 1 item starting at the index #
  details.splice(index, 1);
  displayExp(details);
}

/**
 * Update an expense record's description and amount
 * @param {*} id 
 */

function editExpDetails(id) {
  expenseForm.style.display = "none";
  budgetform.style.display = "none";
  editForm.style.display = "block";
  details.findIndex((item) => {
    if (item.id === id) {
      editExpId.value = item.id;
      editExpName.value = item.name;
      editExpNumber.value = item.number;
      saveEdit.children[2].id = item.id;
      modal.style.display = "block";
    }
  });
}
/**
 * Get and display the expense name & amount
 * @param {*} editExpName 
 * @param {*} editExpNumber 
 * @param {*} id 
 */
function getExpValue(editExpName, editExpNumber, id) {
  edited = details.findIndex((obj) => obj.id == id);
  details[edited].id = id;
  details[edited].name = editExpName;
  details[edited].number = parseInt(editExpNumber);
  displayExp(details);
  
  console.log("function getExpValue");
}


/**
 * Hide the expense form and show the budget form
 */

function callBudget() {
  budgetform.style.display = "block";
  expenseForm.style.display = "none";
  console.log("function callbudget");
}

/**
 * Event listener for add/edit 
 */

saveEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
  console.log("save/edit event listener");
});

/**
 * Event listener for expense form
 */

expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpenses(expName.value, expNumber.value);
  console.log("expense form event listener");
});

/**
 * Event listener for adding a budget
 */

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getBudgetAmount(amountInput.value);
  console.log("add a budget event listner")
});







    // <tr>
    //   <td><span class="expValue" id="${details[i].id}"></span></td>
    //   <td><span class="" id="expTitleID">${details[i].id}</span></td>
    //   <td><span id="expTitleName">${details[i].name}</span></td>
    //   <td><span id="expValueAmount">${details[i].number}</span></td>
    //   <td><span id="edite_delete"><button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> 
    //                                 <i class="bi bi-pencil-square"></i>
    //                               </button> 
    //                               <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})">
    //                                 <i class="bi bi-trash3-fill"></i>
    //                               </button>
    //       </span>
    //   </td>
    // </tr>