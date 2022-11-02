const maze = document.querySelector('#maze')
let columnMax = 5;
let rowMax = 5;
let currentPosition;
let start;
let end;

const clearMaze = () => {
    while (maze.firstChild) {
        maze.removeChild(maze.firstChild)
    }
}



const generateMaze = () => {
    event.preventDefault()
    const columns = parseInt(document.querySelector('#columns').value);
    const rows = parseInt(document.querySelector('#rows').value);
    cells = [];
    solution = [];
    clearMaze();
    createGrid(rows, columns);
    let newMaze = new Maze(rows, columns)
    newMaze.createCells()
}


const createGrid = (rows, columns) => {
    maze.style['grid-template-columns'] = `repeat(${columns}, 1fr)`
    maze.style['grid-template-rows'] = `repeat(${rows}, 1fr)`
    for (let i = 0; i < rows; i++ ) {
        for (let k = 0; k < columns; k++) {
            const newCell = document.createElement("div")
            newCell.setAttribute('class', 'cell')
            let columnId = k < 10 ? `0${k}` : `${k}`
            let rowId = i < 10 ? `0${i}` : `${i}`
            newCell.setAttribute('id', `_${rowId}${columnId}`)
            maze.appendChild(newCell)
        }
    }
    columnMax = columns;
    rowMax = rows;
}



class Maze {
    constructor(rows, columns) {
        this.columns = columns;
        this.rows = rows;
        this.grid = [];
        this.stack = []
    }

    createCells() {
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.columns; c++) {
                let cell = new Cell(r, c, this.gri, this.size)
                row.push(cell);
            }
            this.grid.push(row);
        }
        this.createStart();
        this.createEnd();
    }


    createStart() {
        let startNum = Math.floor(Math.random() * this.columns)
        let startCell  = this.grid[0][startNum]
        currentPosition = startCell;
        start = startCell;
        let startDiv = document.querySelector(`#_00${startNum < 10 ? '0' + startNum : startNum}`)
        startDiv.innerText = 'start'
    }
    
    createEnd () {
        let endNum = Math.floor(Math.random() * this.columns);
        let endCell  = this.grid[this.rows - 1][endNum];
        end = endCell;
        let endDiv = document.querySelector(`#_${this.rows - 1 < 10 ? '0' + (this.rows - 1) : this.rows - 1}${endNum < 10 ? '0' + endNum : endNum}`)
        console.log(endDiv)
        endDiv.innerText = 'end'
    }



}

class Cell {
    constructor(row, column, grid) {
        this.column = column < 10 ? `0${column}` : `${column}`;
        this.row = row < 10 ? `0${row}` : `${row}`;
        this.visited = false;
        this.mazeGrid = grid



        this.top = parseInt(this.row) == 1 ? null : parseInt(this.row) - 1 < 10 ? `_0${parseInt(this.row) - 1}${this.column}` : `_${parseInt(this.row) - 1}${this.column}`;
        this.bottom = parseInt(this.row) == rowMax ? null : parseInt(this.row) + 1 < 10 ? `_0${parseInt(this.row) + 1}${this.column}` : `_${parseInt(this.row) + 1}${this.column}`;
        this.left = parseInt(this.column) == 1 ? null : parseInt(this.column) - 1 < 10 ? `_${this.row}0${parseInt(this.column) - 1}` : `_${this.row}${parseInt(this.column) - 1}`;
        this.right = parseInt(this.column) == columnMax ? null : parseInt(this.column) + 1 < 10 ? `_${this.row}0${parseInt(this.column) + 1}` : `_${this.row}${parseInt(this.column) + 1}`;
    }
}



const createDataPoints = (columns, rows) => {
    for (let i = 1; i <= rows; i++ ) {
        for (let k = 1; k <= columns; k++) {
            let columnId = k < 10 ? `0${k}` : `${k}`
            let rowId = i < 10 ? `0${i}` : `${i}`
            window[`_${rowId}${columnId}`] = new Cell (k, i);
            cells.push(`_${rowId}${columnId}`)
        }
    }
}



