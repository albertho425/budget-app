const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

//local storage
let data = [];

// expenses array
let details = [];

// income array
let incomeArray = [];


// let textInput = document.getElementById("textInput");
// let dateInput = document.getElementById("dateInput");
// let progressInput = document.getElementById("progressInput");
// let textarea = document.getElementById("textarea");
// expenseID
// expenseName
// expenseAmount

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
const incForm = document.getElementById("incomeForm");

const expensesAmount = document.getElementById("expensesAmount");
const incomeAmount = document.getElementById("incomeAmount");

const expValue = document.getElementById("expValue");
const incomeValue = document.getElementById("incomeValue");

const displayExpenses = document.getElementById("displayExpenses");
const displayIncome = document.getElementById("displayIncome");

const expenseForm = document.getElementById("expense-form");
const incomeForm = document.getElementById("income-form");
const budgetform = document.getElementById("budgetform");

let numOfExpenses = document.getElementById("numOfExpenses");
let numOfIncome = document.getElementById("numOfIncome");
let incomeName = document.getElementById("incomeName");
let incomeNumber = document.getElementById("incomeNumber");

let id = 0;
let incomeId = 0;



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
    //push to array
    details.push(userExp);
    displayExp(details);

    //increase the counter and clear form
    id++;
    expName.value = "";
    expNumber.value = "";


  }
}

/**
 * Get the expense and amount and store in an object
 * @param {*} name 
 * @param {*} number 
 */

function addIncome(name, number) {
  if (!name.length || !number.length) {
    incomeName.style.border = "1px solid #b80c09";
    incomeName.placeholder = "Income name can not be empty";
    incomeName.style.color = "#b80c09";

    incomeNumber.style.border = "1px solid #b80c09";
    incomeNumber.placeholder = "Income amount can not be empty";
    incomeNumber.style.color = "#b80c09";

    //timeout before red validation becomes grey
    setTimeout(() => {
      incomeName.style.color = "#495057";
      incomeName.style.border = "1px solid gray";
      incomeName.placeholder = "Income name can not be empty";

      incomeNumber.placeholder = "Income amount can not be empty";
      incomeNumber.style.border = "1px solid gray";
      incomeNumber.style.color = "#495057";
    }, 5000);
  } else {
    // object containing ID, name, and number
      const userIncome = {
        id: incomeId,
        name: name,
        number: parseInt(number),
      };
      //push to array
      incomeArray.push(userIncome);
      displayInc(incomeArray);

      // //store in local storage;
      // data.push(userIncome);
      // localStorage.setItem("data", JSON.stringify(data));
      // console.log(JSON.stringify(data));

      //increase the counter and clear form
      incomeId++;
      console.log("Income ID: " + incomeId);
      incomeName.value = "";
      incomeNumber.value = "";


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
    <tr>
      <td id="expTitleID" class="exp">${details[i].id}</td>
      <td id="expTitleName" class="exp">${details[i].name}</td>
      <td id="expValueAmount" class="exp"> <span>$ </span> ${details[i].number}</td>
      <td id="edite_delete">
        
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <i class="bi bi-pencil-square"></i></button> 
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><i class="bi bi-trash3-fill"></i></button>
      </td>
      </tr>    
  `;
  }
  calcExpenses();
  displayExpenses.style.display = "block";
}




function displayInc(income) {
  console.log("display income function");
  console.log("income array length: " + incomeArray.length);
  // console.log("The number of income is: " + income.length);
  numOfIncome.innerHTML = incomeArray.length;
  // console.log("numOfExpenses: " + numOfExpenses);
  incomeValue.innerHTML = null;
  
  for (i = 0; i < incomeArray.length; i++) {
    incomeValue.innerHTML += `
    <tr>
      <td id="expTitleID" class="exp">${incomeArray[i].id}</td>
      <td id="expTitleName" class="exp">${incomeArray[i].name}</td>
      <td id="expValueAmount" class="exp"> <span>$ </span> ${incomeArray[i].number}</td>
      <td id="edite_delete">
        
          <button id="${incomeArray[i].id}" onclick="editIncomeDetails(${incomeArray[i].id})"> <i class="bi bi-pencil-square"></i></button> 
          <button id="${incomeArray[i].id}" onclick="deleteIncomeDetails(${incomeArray[i].id})"><i class="bi bi-trash3-fill"></i></button>
      </td>
      </tr>    
  `;
  }
  calcIncome();
  displayIncome.style.display = "block";
  
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
  // incomeAmount.inner
  updateBalance();

}

function calcIncome() {

  let totalInc = 0;
  for (incomeId = 0; incomeId < incomeArray.length; incomeId++) {
    totalInc = incomeArray[incomeId].number + totalInc;
  }
  incomeAmount.innerText = totalInc;
  updateBalance();

}

/**
 * Subtract the expenses amount from the budget
 */

function updateBalance() {
  balanceAmount.innerText =
    parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText) + parseInt(incomeAmount.innerText);
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

  // id.parentElement.parentElement.remove();

  // // remove from array
  // data.splice(id.parentElement.parentElement.id, 1);

  // // update local storage
  // localStorage.setItem("data", JSON.stringify(data));

  // console.log(data);

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

      let selectedTask = id.parentElement.parentElement;
      console.log(selectedTask);



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
 * 
 */

function callIncome() {
  console.log("function callbudget");
  budgetform.style.display = "none";
  expenseForm.style.display = "none"
  incomeForm.style.display = "block";
  
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
 * Event listener for adding an income
 */

incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("add an income event listner");
  console.log(incomeName.value);
  console.log(incomeNumber.value);
  addIncome(incomeName.value, incomeNumber.value);
  // console.log("add income: " + incomeName.value + " " + incomeNumber.value);
  
});


/**
 * Event listener for adding a budget
 */

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getBudgetAmount(amountInput.value);
  console.log("add a budget event listner")
});

