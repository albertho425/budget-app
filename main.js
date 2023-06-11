const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

//local storage
let data = [];

let details = [];

let income = [];


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
let expName = document.getElementById("expName");
let expNumber = document.getElementById("expNumber");
let id = 0;



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

    //store in local storage;
    data.push(userExp);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(JSON.stringify(data));

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
      id: id,
      name: name,
      number: parseInt(number),
    };
    //push to array
    income.push(userIncome);
    displayInc()

    // //store in local storage;
    // data.push(userIncome);
    // localStorage.setItem("data", JSON.stringify(data));
    // console.log(JSON.stringify(data));

    //increase the counter and clear form
    id++;
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

function displayInc(details) {
  console.log("The number of income is: " + details.length);
  // numOfExpenses.innerHTML = details.length;
  // console.log("numOfExpenses: " + numOfExpenses);
  incomeValue.innerHTML = null;
  
  for (i = 0; i < details.length; i++) {
    incomeValue.innerHTML += `
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
  incomeAmount.inner
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


/**
 * Push data into local storage
 */

let acceptData = () => {
  data.push({
    expenseID: textInput.value,
    expenseName: dateInput.value,
    expenseAmount: textarea.value,
  });

  console.log("accepting task: " + textInput.value);
  console.log("accepting date: " + dateInput.value);
  console.log("accepting description: " + textarea.value);
  
  localStorage.setItem("data", JSON.stringify(data));

  console.log(JSON.stringify(data));
}