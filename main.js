////// OPTIONAL: add game ai 












const playerFact = (name, mark) => {
    return {name, mark};
}

const Game = (() => {
    let pFlag = 0;
    let winFlag = 0;
    let count = 0;
    let firstFlag = 0;
    let players = [];

    const setFlag = (tie) => {
        if(!tie && winFlag === 0) {
            winFlag = 1;
            displayController.renderWin(players[pFlag].name);
        } else if(tie && winFlag === 0) {
            winFlag = 1;
            displayController.renderWin("Tied");
        } else {winFlag = 0}
    }

    const checkCount = () => {
        if(count === 9) {
            return true;
        } else {return false}
    }

    const getFlag = () => {
        if(winFlag === 0) {
            return false;
        } else {return true;}
    }

    const changePlayer = () => {
        if(pFlag === 0) {
            pFlag = 1;
            count += 1;
            return players[0].mark;
            
        } else {
            pFlag = 0;
            count += 1;
            return players[1].mark;
        }
    }

    const startGame = () => {
        if (firstFlag===0) {
            players.push(playerFact(prompt("Please enter Player 1's Name: "), "X"));
            players.push(playerFact(prompt("Please enter Player 2's Name: "), "O"));
            firstFlag = 1;
        }
        
        Gameboard.clearBoard();
        Gameboard.initRows();
        displayController.init();
        displayController.render();
        winFlag = 0;
        pFlag = 0;
        count = 0;
    }

    return {checkCount, getFlag, setFlag, changePlayer, startGame, players};
})();

const Gameboard = (() => {
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    const rows = [document.querySelectorAll(".cell-1"), document.querySelectorAll(".cell-2"), document.querySelectorAll(".cell-3")];

    // add listeners
    const initRows = () => {
        for(item of rows) {
            let rowNum = rows.indexOf(item);
            for(cell of rows[rowNum]) {
                let cellNum = Array.from(rows[rowNum]).indexOf(cell);
                cell.addEventListener("click", () => clickBoard(rowNum, cellNum));
            }
        }
    };

    const clickBoard = (row, cell) => {
        if(!Game.getFlag()) {
            if (board[row][cell] != "X" && board[row][cell] != "O"){
            mark = Game.changePlayer();
            changeBoard(mark, row, cell);
            if(checkWin(mark, row, cell)) {
                Game.setFlag(false);
            } else if (Game.checkCount()) {
                Game.setFlag(true)
            }
            displayController.render();
        }}
    };
    
    // add mark
    const changeBoard = (mark, row, cell) => {
            board[row][cell] = mark;
             
    }

    const checkWin = (mark, row, cell) => {

        if(board[0][cell] === mark && board[0][cell] === board[1][cell] && board[0][cell] === board[2][cell]) {
            return true;
        } else if (board[row][cell] === mark && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return true;
        } else if ((board[1][1] === mark) 
               && ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) 
               ||  (board[0][2] === board[1][1] && board[1][1] === board[2][0]))) {
                return true;
        } else {
            return false;
        }
        
    }

    const clearBoard = () => {
        for(i=0;i<3;i++) {
            for(j=0;j<3;j++) {
                changeBoard("", i, j);
            }
        }
    }

    return {rows, board, initRows, clearBoard};})();

const displayController = (() => {
    const winDisplay = document.querySelector(".winner");
    const replay = document.querySelector(".replay");
    const players = document.querySelector(".players");

    const init = () => {
        players.textContent = `${Game.players[0].name}: 'O' ${Game.players[1].name}: 'X'`
        replay.addEventListener("click", Game.startGame);
        replay.style.cssText = "display:none;"
    }

    const renderWin = (name) => {
        winDisplay.textContent = `Winner: ${name}`;
        replay.style.cssText = "display:block;"
    }


    // renders gameboard
    const render = () => {
        for(item of Gameboard.board) {
            let rowNum = Gameboard.board.indexOf(item);
            let cellNum = 0;
            Gameboard.rows[rowNum].forEach(cell => {
                cell.textContent = `${item[cellNum]}`;
                cellNum += 1;
            });
        }
    }
    return {init, render, renderWin};
})();

Game.startGame();
