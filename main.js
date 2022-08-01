const playerFact = (name, mark) => {
    return {name, mark};
}
let players = [playerFact('John', 'X'), playerFact('James', 'O')];

const Game = (() => {
    let pFlag = 0;
    const changePlayer = (players) => {
        if(pFlag === 0) {
            pFlag = 1;
            return players[0].mark;
            
        } else {
            pFlag = 0;
            return players[1].mark;
        }
    }
    return {changePlayer};
})();

const Gameboard = (() => {
    let board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
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
        if (board[row][cell] != "X" && board[row][cell] != "O"){
            mark = Game.changePlayer(players);
            changeBoard(mark, row, cell);
        }
    };
    
    // add mark
    const changeBoard = (mark, row, cell) => {
            board[row][cell] = mark;
            displayController.render(); 
    }

    const clearBoard = () => {
        for(i=0;i<3;i++) {
            for(j=0;j<3;j++) {
                changeBoard(".", i, j);
            }
        }
    }

    return {rows, board, initRows, changeBoard, clearBoard};})();

const displayController = (() => {

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
    return {render};
})();

Gameboard.initRows();
displayController.render();