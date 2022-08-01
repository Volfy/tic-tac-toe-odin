

const Gameboard = (() => {
    let board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
    // add mark
    return {board};})();

const playerFact = (name, mark) => {
    return {name, mark};
}

const displayController = (() => {
    const rows = [document.querySelectorAll(".cell-1"), document.querySelectorAll(".cell-2"), document.querySelectorAll(".cell-3")]

    // renders gameboard
    const render = () => {
        for(item of Gameboard.board) {
            let rowNum = Gameboard.board.indexOf(item);
            let cellNum = 0;
            rows[rowNum].forEach(cell => {
                cell.textContent = `${item[cellNum]}`;
                cellNum += 1;
            });
        }
    }
    return {render};
})();


// add event listener to spots?
// rotate players 
// prevent overlap 