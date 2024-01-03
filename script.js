let boxes = document.querySelectorAll(".hit");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
//let draw = document.querySelector("#draw");

let turn0 = true; //X,Y
let clickCount = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turn0 = true;
    clickCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click",resetGame);


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0){
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        clickCount ++;
        let isWinner = checkWinner();

        if (clickCount === 9 && !isWinner){
            gameDraw();
        }

    });
});

const gameDraw = () => {
    msg.innerText = "It's a Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

resetBtn.addEventListener("click", resetGame);

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    };
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 != "" && pos2 != "" && pos3 !="") {
            if (pos1 === pos2 && pos2=== pos3) {
                showWinner(pos1);
                return true;
            }
        }
    };
};

