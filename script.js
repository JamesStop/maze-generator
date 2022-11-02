const maze = document.querySelector('#maze')
let columnMax = 5;
let rowMax = 5;
let cells = [];
let solution = [];
let currentPosition = '';
let previousPosition = null;

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
    createGrid(columns, rows);
    createDataPoints(columns, rows);
    createStart();
    createEnd();
    createSolution(solution[0]);
}


const createGrid = (columns, rows) => {
    maze.style['grid-template-columns'] = `repeat(${columns}, 1fr)`
    maze.style['grid-template-rows'] = `repeat(${rows}, 1fr)`
    for (let i = 1; i <= rows; i++ ) {
        for (let k = 1; k <= columns; k++) {
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
    for (let i = 1; i <= rows; i++ ) {
        for (let k = 1; k <= columns; k++) {
            let columnId = k < 10 ? `0${k}` : `${k}`
            let rowId = i < 10 ? `0${i}` : `${i}`
            window[`_${rowId}${columnId}`] = new Cell (k, i);
            cells.push(`_${rowId}${columnId}`)
        }
    }
}

const createStart = () => {
    let startNum = Math.floor(Math.random() * columnMax)
    let startCell  = cells[startNum];
    solution.push(startCell);
    cells.splice(startNum, 1)
    currentPosition = startCell;
    window[startCell].solution = true;
}

const createEnd = () => {
    let endNum = Math.floor(Math.random() * columnMax) + (cells.length - columnMax);
    let endCell  = cells[endNum];
    solution.push(endCell);
    cells.splice(endNum, 1);
    window[endCell].solution = true;
}

const createSolution = (currentCell) => {
    let options = [];
    console.log(window[currentCell])
    if (currentPosition == solution[solution.length - 1]) {
        return;
    }

//Determine if can move up
    !window[currentCell].top || 
    window[window[currentCell].top].solution
    ? null : options.push(window[currentCell].top);
    
//Determine if can move down
    !window[currentCell].bottom || 
    window[window[currentCell].bottom].solution 
    ? null : options.push(window[currentCell].bottom);

//Determine if can move left
    !window[currentCell].left || 
    window[window[currentCell].left].solution 
    ? null : options.push(window[currentCell].left);
    
    
//Determine if can move right
    !window[currentCell].right ||
    window[window[currentCell].right].solution 
    ? null : options.push(window[currentCell].right);


    let next = options[Math.floor(Math.random() * options.length)];
    window[next].solution = true;

    solution.splice(-1, 0, next)



    currentPosition = next;
    previousPosition = currentCell;

    console.log(options)
    
    // createSolution(currentPosition);


}