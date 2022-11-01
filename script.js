const maze = document.querySelector('#maze')
let columnMax = 5;
let rowMax = 5;



const clearMaze = () => {
    while (maze.firstChild) {
        maze.removeChild(maze.firstChild)
    }
}





const generateMaze = () => {
    event.preventDefault()
    const columns = document.querySelector('#columns').value;
    const rows = document.querySelector('#rows').value;
    clearMaze();
    createGrid(columns, rows)
    createDataPoints(columns, rows)
}




const createGrid = (columns, rows) => {
    maze.style['grid-template-columns'] = `repeat(${columns}, 1fr)`
    maze.style['grid-template-rows'] = `repeat(${rows}, 1fr)`
    for (let i = 1; i <= rows; i++ ) {
        for (let k = 1; k <= columns; k++) {
            const newCell = document.createElement("div")
            newCell.setAttribute('class', 'cell')
            let columnId = columns < 10 ? `0${k}` : `${k}`
            let rowId = rows < 10 ? `0${i}` : `${i}`
            newCell.setAttribute('id', `${rowId}${columnId}`)
            maze.appendChild(newCell)
        }
    }
    columnMax = columns;
    rowMax = rows;
}

class Cell {
    constructor(column, row) {
        this.column = column < 10 ? `0${column}` : `${column}`;
        this.row = row < 10 ? `0${row}` : `${row}`;
        this.solution = false;
        this.visited = false;
        this.top = parseInt(this.row) == 1 ? null : parseInt(this.row) - 1 < 10 ? `_0${parseInt(this.row) - 1}${this.column}` : `_${parseInt(this.row) - 1}${this.column}`;
        this.bottom = parseInt(this.row) == rowMax ? null : parseInt(this.row) + 1 < 10 ? `_0${parseInt(this.row) + 1}${this.column}` : `_${parseInt(this.row) + 1}${this.column}`;
        this.left = parseInt(this.column) == 1 ? null : parseInt(this.column) - 1 < 10 ? `_${this.row}0${parseInt(this.column) - 1}` : `_${this.row}${parseInt(this.column) - 1}`;
        this.right = parseInt(this.column) == columnMax ? null : parseInt(this.column) + 1 < 10 ? `_${this.row}0${parseInt(this.column) + 1}` : `_${this.row}${parseInt(this.column) + 1}`;
    }
}



const createDataPoints = (columns, rows) => {
    for (let i = 1; i <= columns; i++ ) {
        for (let k = 1; k <= rows; k++) {
            let columnId = columns < 10 ? `0${i}` : `${i}`
            let rowId = rows < 10 ? `0${k}` : `${k}`
            window[`_${rowId}${columnId}`] = new Cell (i, k);
        }
    }

}