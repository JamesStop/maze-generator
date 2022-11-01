const maze = document.querySelector('#maze')




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
}




const createGrid = (columns, rows) => {

    maze.style['grid-template-columns'] = `repeat(${columns}, 1fr)`
    maze.style['grid-template-rows'] = `repeat(${rows}, 1fr)`


    for (let i = 1; i <= columns; i++ ) {
        for (let k = 1; k <= rows; k++) {
            const newCell = document.createElement("div")
            newCell.setAttribute('class', 'cell')
            maze.appendChild(newCell)
        }
    }
}