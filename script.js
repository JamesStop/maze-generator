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
    newMaze.carveMaze();
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
                let cell = new Cell(r, c, this.grid, this.size)
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
        startDiv.style['border-top'] = 'none';
    }
    
    createEnd () {
        let endNum = Math.floor(Math.random() * this.columns);
        let endCell  = this.grid[this.rows - 1][endNum];
        end = endCell;
        let endDiv = document.querySelector(`#_${this.rows - 1 < 10 ? '0' + (this.rows - 1) : this.rows - 1}${endNum < 10 ? '0' + endNum : endNum}`)
        endDiv.innerText = 'end'
        endDiv.style['border-bottom'] = 'none';
    }

    breakWalls(cell1, cell2) {
        let x = cell1.column - cell2.column;
        let cell1Div = document.querySelector(`#_${cell1.row < 10 ? '0' + (cell1.row) : (cell1.row)}${cell1.column < 10 ? '0' + (cell1.column) : (cell1.column)}`)
        let cell2Div = document.querySelector(`#_${cell2.row < 10 ? '0' + (cell2.row) : (cell2.row)}${cell2.column < 10 ? '0' + (cell2.column) : (cell2.column)}`)
        if (x == 1) {
            cell1Div.style['border-left'] = 'none';
            cell2Div.style['border-right'] = 'none';
        } else if (x == -1) {
            cell1Div.style['border-right'] = 'none';
            cell2Div.style['border-left'] = 'none';
        }
        let y = cell1.row - cell2.row;
        if (y == 1) {
            cell1Div.style['border-top'] = 'none';
            cell2Div.style['border-bottom'] = 'none';
        } else if (y == -1) {
            cell1Div.style['border-bottom'] = 'none';
            cell2Div.style['border-top'] = 'none';
        }
    }


    carveMaze() {
        currentPosition.visited = true

        if (currentPosition.row == end.row && currentPosition.column == end.column) {
            this.stack.pop();
            currentPosition = this.stack.pop();
        }


        let next = currentPosition.lookForNeighbors();

        if (next) {
            next.visited = true
            this.stack.push(currentPosition);
            this.breakWalls(currentPosition, next);
            currentPosition = next;
        } else if (this.stack.length > 0) {
            let cell = this.stack.pop();
            currentPosition = cell;
        }

        if (this.stack.length == 0) {
            return;
        }

        this.carveMaze()

    }





}

class Cell {
    constructor(row, column, mazeGrid) {
        this.column = column;
        this.row = row;
        this.visited = false;
        this.mazeGrid = mazeGrid
    }



    lookForNeighbors() {
        let row = this.row
        let col = this.column
        let grid = this.mazeGrid;
        let neighbors = [];

        let top = row != 0 ? grid[row-1][col] : undefined;
        let bottom = row != grid[0].length - 1 ? grid[row + 1][col] : undefined;
        let left = col != 0 ? grid[row][col - 1] : undefined;
        let right = col != grid.length - 1 ? grid[row][col + 1] : undefined;

        if (top && !top.visited) neighbors.push(top);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);
        if (right && !right.visited) neighbors.push(right);

        if (neighbors.length != 0) {
            let random = Math.floor(Math.random() * neighbors.length)
            return neighbors[random]
        } else {
            return undefined;
        }

    }
    
}







