


//light/dark theme

const toggleElement = document.querySelector(".themes__toggle");

const toggleeDarkTheme = ()=>{
    toggleElement.classList.toggle("themes__toggle--isActive");
}

const toggleDarkThemeWithEnter =(event)=>{
   if( event.key === "Enter"){
    toggleeDarkTheme();
   }
}

 toggleElement.addEventListener("keydown",toggleDarkThemeWithEnter);
toggleElement.addEventListener("click", toggleeDarkTheme);



//logic for calc

let storedNumber= "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result") ;
const keyElement = document.querySelectorAll("[data-type]");

const updateScreenUI = (value)=>{
    resultElement.innerText = !value ? "0" : value ;
}


const nymberButtonHandler = (value)=>{
    
            if(value === "." && currentNumber.includes(".")) {return;}
            if(value === "0" && !currentNumber) {return;}
           
     currentNumber += value;
       updateScreenUI(currentNumber);
}

const resetButtonHandler = ()=>{
    storedNumber="";
    currentNumber = "";
    operation = "";
    updateScreenUI(currentNumber);
}

const deleteButtonHandler = ()=>{
    if(!currentNumber || currentNumber === "0") return;

    if(currentNumber.length ===1){
        currentNumber="";
    }else {
currentNumber =currentNumber.substring(0, currentNumber.length-1);
    }

    updateScreenUI(currentNumber);
};



const  executeOperation= ()=>{
if(currentNumber && storedNumber && operation){
    switch(operation){
        case"+":
storedNumber= parseFloat(storedNumber)+parseFloat(currentNumber)
currentNumber=""
updateScreenUI(storedNumber);
        break;

        case"-":
        storedNumber= parseFloat(storedNumber) - parseFloat(currentNumber)
        currentNumber=""
        updateScreenUI(storedNumber);
        break;

        case"*":
        storedNumber= parseFloat(storedNumber) * parseFloat(currentNumber)
        currentNumber=""
        updateScreenUI(storedNumber);
        break;

        case"/":
        storedNumber= parseFloat(storedNumber) / parseFloat(currentNumber)
        currentNumber=""
        updateScreenUI(storedNumber);
        break;
    }
}
}

const  operationButtonHandler =(operationValue)=>{
    if(!storedNumber && !currentNumber)return;
    if(currentNumber && !storedNumber){
        storedNumber=currentNumber;
        currentNumber="";
        operation = operationValue
    }else if (storedNumber){
        operation= operationValue;

        if(currentNumber)executeOperation();
    }

 
}

const keyElementHandler = (element)=> {
    element.addEventListener("click",()=>{
        const type = element.dataset.type;
        if(type === "number"){
         nymberButtonHandler(element.dataset.value);
        }else if(type === "operation") {
switch(element.dataset.value){
    case"c":
    resetButtonHandler();
    break;

    case"Backspace":
    deleteButtonHandler();
    break;


    case"Enter":
    executeOperation();
    break;
    default:
        operationButtonHandler(element.dataset.value)
}
        }
    } );
    
};




keyElement.forEach(keyElementHandler);




// // Use keyboard as input source
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["+", "-", "*", "/"];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  "Backspace",
  "Enter",
  "c",
];

window.addEventListener("keydown", (event) => {
  //   keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});

const keyboardWithoutHover = (key) => {
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButtonHandler();
  } else if (key === "Enter") {
    executeOperation();
  } else if (key === "c") {
    resetButtonHandler();
  }
};

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();
    setTimeout(() => elem.classList.remove("hover"), 100);
  }
};



