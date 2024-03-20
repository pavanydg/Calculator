let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
let reset = false;
const screen = document.querySelector('.screen')

init()

function init(){
    var buttons = document.querySelectorAll(".btn")
    for(var i = 0; buttons.length;i++){
        buttons[i].addEventListener("click",function(event){
            buttonclick(event.target.innerText)
        })
    }
}

function buttonclick(value){
    if(isNaN(parseInt(value))){
        handleSymbols(value);
    }
    else{
        handleNumbers(value);
    }
    renderScreen();
}

function handleSymbols(symbol){
    switch(symbol){
        case "C":
            buffer = "0";
            break;
        case "←":
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0,buffer.length-1)
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(symbol)
            break
        case "=":
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            reset = "true";
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
    }
}

function handleMath(symbol){
    if(buffer === "0"){
        return;
    }
    
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';                                                   
}

function flushOperation(intBuffer){
    if(previousOperator === "+"){
        runningTotal+=intBuffer;
    }
    else if(previousOperator == "-"){
        runningTotal-=intBuffer;
    }
    else if(previousOperator == "×"){
        runningTotal*=intBuffer;
    }
    else if(previousOperator == "÷"){
        if(intBuffer == 0){
            runningTotal = "infinity";
        }
        else{
            runningTotal/=intBuffer;
        }
    }
}

function handleNumbers(number){
    if(buffer === "0" || reset == "true"){
        buffer = number
    }
    else{
        buffer += number;
    }
    reset = false;
}

function renderScreen(){
    screen.innerText = buffer;
}
















































