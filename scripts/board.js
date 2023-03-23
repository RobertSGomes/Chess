var board = document.getElementById("board"),
    row = 0,
    col = 0

export function createBoard(size) {
    board.style = `display: flex; flex-wrap: wrap; max-width: ${size * 8}px; max-height: ${size * 8}px`

    for (let i = 0; i < 64; i++) {
        let square = document.createElement("div")

        square.setAttribute("id", `square-${row}${col}`)
        square.style = `width: ${size}px; height: ${size}px`

        board.append(square)

        newRow(i)
        newCol(i)
    }
}

function newRow(i) {
    if ((i + 1) % 8 === 0) {
        row += 1
    }
}

function newCol(i) {
    if ((i + 1) % 8 === 0) {
        col = 0
    } else {
        col += 1
    }
}