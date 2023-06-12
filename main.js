const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

// expenses array
let details = [];
let id = 0;

// income array
let incomeArray = [];
let incomeId = 0;

/**
 * Show the budget and expense form in a modal
 */

btn.onclick = function () {
  expName.value = "";
  expNumber.value = "";
  expenseForm.style.display = "block";
  incomeForm.style.display = "block";
  editForm.style.display = "none";
  editIncomeForm.display = "none";
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

//Editing expenses form
const editForm = document.getElementById("editForm");
const saveEdit = document.getElementById("saveEdit");
const editExpValue = document.getElementById("editExpValue");
const editExpNumber = document.getElementById("editExpNumber");

//Editing income form
const editIncomeForm = document.getElementById("editIncomeForm");
const saveEditIncome = document.getElementById("saveEditIncome");
const editIncomeId = document.getElementById("editIncomeId");
const editIncomeName = document.getElementById("editIncomeName");
const editIncomeNumber = document.getElementById("editIncomeNumber");

// Expenses form
const expForm = document.getElementById("expForm");
const expensesAmount = document.getElementById("expensesAmount");
const expValue = document.getElementById("expValue");

// Income form
const incForm = document.getElementById("incomeForm");
const incomeAmount = document.getElementById("incomeAmount");
const incomeValue = document.getElementById("incomeValue");

const displayExpenses = document.getElementById("displayExpenses");
const displayIncome = document.getElementById("displayIncome");

// All forms
const expenseForm = document.getElementById("expense-form");
const incomeForm = document.getElementById("income-form");
const budgetform = document.getElementById("budgetform");

// Number of expenses and income
let numOfExpenses = document.getElementById("numOfExpenses");
let numOfIncome = document.getElementById("numOfIncome");
let incomeName = document.getElementById("incomeName");
let incomeNumber = document.getElementById("incomeNumber");




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
    updateBalance();
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

    console.log("*** expense ID from object is: " + userExp.id + " ***");


    //push to array
    details.push(userExp);
    displayExp(details);

    //increase the counter and clear form
    console.log("The array index before increment is: " + id);
    id++;
    console.log("The array index after increment is: " + id);
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
      console.log("*** income ID from object is: " + userIncome.id + " ***");
      //push to array
      incomeArray.push(userIncome);
      displayInc();

      //increase the counter and clear form

      console.log("The income array index before increment is: " + incomeId);
      incomeId++;
      console.log("The income array index after increment is: " + incomeId);
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


/**
 * Display the list of income, the number of income transactions, and update the total balance.
 */

function displayInc() {
  console.log("display income function");
  numOfIncome.innerHTML = incomeArray.length;
  console.log("income array length: " + incomeArray.length);
  incomeValue.innerHTML = null;
  
  for (index = 0; index < incomeArray.length; index++) {
    incomeValue.innerHTML += `
    <tr>
      <td id="expTitleID" class="exp">${incomeArray[index].id}</td>
      <td id="expTitleName" class="exp">${incomeArray[index].name}</td>
      <td id="expValueAmount" class="exp"> <span>$ </span> ${incomeArray[index].number}</td>
      <td id="edite_delete">
        
          <button id="${incomeArray[index].id}" onclick="editIncomeDetails(${incomeArray[index].id})"> <i class="bi bi-pencil-square"></i></button> 
          <button id="${incomeArray[index].id}" onclick="deleteIncomeDetails(${incomeArray[index].id})"><i class="bi bi-trash3-fill"></i></button>
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

/**
 *  Calculate the total amount of income, and call the update balance function
 */

function calcIncome() {

  let totalInc = 0;
  for (incomeArrayIndex = 0; incomeArrayIndex < incomeArray.length; incomeArrayIndex++) {
    totalInc = incomeArray[incomeArrayIndex].number + totalInc;
  }
  incomeAmount.innerText = totalInc;
  updateBalance();

}

/**
 * Subtract the expenses amount from the budget
 */

function updateBalance() {
  console.log("updating the balance");
  console.log("budget amount is: " + budgetAmount.innerText);
  console.log("income amount is: " + incomeAmount.innerText);
  console.log("expense amount is: " + expensesAmount.innerText);
  balanceAmount.innerText =
  parseInt(incomeAmount.innerText) + parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
     
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
 * Delete an income by income ID
 * @param {*} id 
 */

function deleteIncomeDetails(id) {
  console.log("*** Deleting an expense");
  let index = details.findIndex((item) => item.id === id);
  //remove 1 item starting at the index #
  incomeArray.splice(index, 1);
  displayInc();


}


/**
 * Update an expense record's description and amount
 * @param {*} id 
 */

function editExpDetails(id) {
  console.log("Editing an expense");
  incomeForm.style.display = "none";
  expenseForm.style.display = "none";
  budgetform.style.display = "none";
  editIncomeForm.style.display = "none";
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
 * Update an expense record's description and amount
 * @param {*} id 
 */

function editIncomeDetails(incomeId) {

  console.log("Editing the income form");
  expenseForm.style.display = "none";
  incomeForm.style.display = "none";
  budgetform.style.display = "none";
  editForm.style.display = "none";
  editIncomeForm.style.display = "block";

  incomeArray.findIndex((item) => {
    console.log("item.id is: " + item.id);
    console.log("incomeId is: " + incomeId);
    if (item.id === incomeId) {
      editIncomeId.value = item.id;
      console.log("editIncomeId is " + editIncomeId.value);
      editIncomeName.value = item.name;
      console.log("editIncomeName is " + editIncomeName.value);
      editIncomeNumber.value = item.number;
      console.log("editIncomeValue is " + editIncomeNumber.value);
      saveEditIncome.children[2].id = item.id;
      console.log("saveEditIncome.children[2].id: " + saveEditIncome.children[2].id);
      
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
 * Get and display the expense name & amount
 * @param {*} editExpName 
 * @param {*} editExpNumber 
 * @param {*} id 
 */
function getIncomeValue(editIncomeName, editIncomeValue, id) {
  console.log("function getIncomeValue");
  edited = incomeArray.findIndex((obj) => obj.id == id);
  incomeArray[edited].id = id;
  incomeArray[edited].name = editIncomeName;
  incomeArray[edited].number = parseInt(editIncomeValue);
  displayInc();
  
  
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
 * Event listener for editng an expense
 */

saveEdit.addEventListener("submit", (e) => {
  console.log("edit an expense event listener");
  e.preventDefault();
  getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
  
});

/**
 * Event listener for editng an income
 */

saveEditIncome.addEventListener("submit", (e) => {
  console.log("edit an income event listener");
  e.preventDefault();
  getIncomeValue(editIncomeName.value, editIncomeNumber.value, saveEditIncome.children[2].id);
  
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



/**
 * Load some default values
 * 
 */

function loadDefaultNumbers() {

  addIncome("Work","2000");
  addIncome("Side hustle", "1000")
  addIncome("Rental Income","2000");
  
  addExpenses("Groceries","500");
  addExpenses("Rent","1000");
  addExpenses("Food","500");

  getBudgetAmount("1000");
}