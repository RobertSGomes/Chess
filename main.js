import {
    createBoard
} from "./scripts/board.js"
import {
    placePieces
} from "./scripts/pieces.js"

export const size = 80,
    pattern = [
        ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
        ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
        ["ep", "ep", "ep", "ep", "ep", "ep", "ep", "ep"],
        ["ep", "ep", "ep", "ep", "ep", "ep", "ep", "ep"],
        ["ep", "ep", "ep", "ep", "ep", "ep", "ep", "ep"],
        ["ep", "ep", "ep", "ep", "ep", "ep", "ep", "ep"],
        ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
        ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
    ]

createBoard(size)
placePieces(pattern)

var isHolding = false,
    canPass = true,
    x,
    y,
    matrixX,
    matrixY,
    square

document.getElementById("board").addEventListener("mousedown", function (event) {
    x = event.clientX
    y = event.clientY
    matrixX = Math.floor((x - document.getElementById("board").getBoundingClientRect().left) / size)
    matrixY = Math.floor((y - document.getElementById("board").getBoundingClientRect().top) / size)

    if (isHolding) {
        let squareDrop = document.getElementById(`square-${matrixY}${matrixX}`),
            classListDrop = squareDrop.classList,
            classListSquare = square.classList

        if (classListDrop[2] === "capture" || classListDrop[2] === "dot") {
            classListDrop.remove(classListDrop[0], "square")
            classListDrop.add(classListSquare[0], "square")
            classListSquare.remove(classListSquare[0], "square")
            classListSquare.add("ep", "square")
        }

        removeDots()
        removeCapture()
        removeHighlight()

        isHolding = false
    } else {
        square = document.getElementById(`square-${matrixY}${matrixX}`)

        possibleMoves(square)
        isHolding = true
    }
})

function possibleMoves(square) {
    let squareClassList = square.classList,
        position = square.id.split("-"),
        col = parseInt(position[1].substr(1, 1)),
        row = parseInt(position[1].substr(0, 1)),
        piece = squareClassList[0]

    removeDots()
    removeHighlight()
    removeCapture()

    squareClassList.add("highlight")

    // Peão Branco
    if (piece === "wp") {
        if (row == 6) {
            for (let i = 1; i <= 2; i++) {
                setDots(row - i, col, piece)
            }
            canPass = true
        } else if (row - 1 >= 0) {
            setDots(row - 1, col, piece)
            canPass = true
        }
        if (row - 1 >= 0 && col - 1 >= 0) {
            setDots(row - 1, col - 1, "wd")
            canPass = true
        }
        if (row - 1 >= 0 && col + 1 <= 7) {
            setDots(row - 1, col + 1, "wd")
            canPass = true
        }
    }

    // Peão preto
    if (piece === "bp") {
        if (row == 1) {
            for (let i = 1; i <= 2; i++) {
                setDots(row + i, col, piece)
            }
            canPass = true
        } else {
            setDots(row + 1, col, piece)
            canPass = true
        }
        if (row + 1 >= 0 && col - 1 >= 0) {
            setDots(row + 1, col - 1, "bd")
            canPass = true
        }
        if (row + 1 >= 0 && col + 1 <= 7) {
            setDots(row + 1, col + 1, "bd")
            canPass = true
        }
    }

    // Torres
    if (piece === "br" || piece === "wr") {
        // Para cima
        for (let i = row - 1; i >= 0; i--) {
            setDots(i, col, piece)
        }
        canPass = true
        // Para baixo
        for (let i = row + 1; i <= 7; i++) {
            setDots(i, col, piece)
        }
        canPass = true
        // Para esquerda
        for (let i = col - 1; i >= 0; i--) {
            setDots(row, i, piece)
        }
        canPass = true
        // Para direita
        for (let i = col + 1; i <= 7; i++) {
            setDots(row, i, piece)
        }
        canPass = true
    }

    // Bispos
    if (piece === "bb" || piece === "wb") {
        // Diagonal direita baixo
        for (let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
            setDots(i, j, piece)
        }
        canPass = true
        // Diagonal direita cima
        for (let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
            setDots(i, j, piece)
        }
        canPass = true
        // Diagonal esquerda baixo
        for (let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
            setDots(i, j, piece)
        }
        canPass = true
        // Diagonal esquerda cima
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            setDots(i, j, piece)
        }
        canPass = true
    }

    // Rainhas
    if (piece === "bq" || piece === "wq") {
        // Para cima
        for (let i = row - 1; i >= 0; i--) {
            setDots(i, col, piece)
        }
        canPass = true
        // Para baixo
        for (let i = row + 1; i <= 7; i++) {
            setDots(i, col, piece)
        }
        canPass = true
        // Para esquerda
        for (let i = col - 1; i >= 0; i--) {
            setDots(row, i, piece)
        }
        canPass = true
        // Para direita
        for (let i = col + 1; i <= 7; i++) {
            setDots(row, i, piece)
        }
        canPass = true
        // Diagonal direita baixo
        for (let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
            setDots(i, j, piece)
        }
        canPass = true
        // Diagonal direita cima
        for (let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
            setDots(i, j, piece)
        }
        canPass = true
        // Diagonal esquerda baixo
        for (let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
            setDots(i, j, piece)
        }
        canPass = true
        // Diagonal esquerda cima
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            setDots(i, j, piece)
        }
        canPass = true
    }

    // Cavalos
    if (piece === "bn" || piece === "wn") {
        if (row + 2 <= 7 && col + 1 <= 7) {
            setDots(row + 2, col + 1, piece)
        }
        canPass = true
        if (row + 2 <= 7 && col - 1 >= 0) {
            setDots(row + 2, col - 1, piece)
        }
        canPass = true
        if (row - 2 >= 0 && col + 1 <= 7) {
            setDots(row - 2, col + 1, piece)
        }
        canPass = true
        if (row - 2 >= 0 && col - 1 >= 0) {
            setDots(row - 2, col - 1, piece)
        }
        canPass = true
        if (row + 1 <= 7 && col + 2 <= 7) {
            setDots(row + 1, col + 2, piece)
        }
        canPass = true
        if (row - 1 >= 0 && col + 2 <= 7) {
            setDots(row - 1, col + 2, piece)
        }
        canPass = true
        if (row + 1 <= 7 && col - 2 >= 0) {
            setDots(row + 1, col - 2, piece)
        }
        canPass = true
        if (row - 1 >= 0 && col - 2 >= 0) {
            setDots(row - 1, col - 2, piece)
        }
        canPass = true
    }

    // Reis
    if (piece === "bk" || piece === "wk") {
        // Para direita
        if (col + 1 <= 7) {
            setDots(row, col + 1, piece)
            canPass = true
        }
        // Para esquerda
        if (col - 1 >= 0) {
            setDots(row, col - 1, piece)
            canPass = true
        }
        // Para baixo
        if (row + 1 <= 7) {
            setDots(row + 1, col, piece)
            canPass = true
        }
        // Para cima 
        if (row - 1 >= 0) {
            setDots(row - 1, col, piece)
            canPass = true
        }
        // Para baixo direita
        if (row + 1 <= 7 && col + 1 <= 7) {
            setDots(row + 1, col + 1, piece)
            canPass = true
        }
        // Para baixo esquerda
        if (row + 1 <= 7 && col - 1 >= 0) {
            setDots(row + 1, col - 1, piece)
            canPass = true
        }
        // Para cima direita
        if (row - 1 >= 0 && col + 1 <= 7) {
            setDots(row - 1, col + 1, piece)
            canPass = true
        }
        // Para cima esquerda    
        if (row - 1 >= 0 && col - 1 >= 0) {
            setDots(row - 1, col - 1, piece)
            canPass = true
        }
    }

    // Rei Preto
    if (piece === "bk") {
        if (row == 0 && col == 4) {
            if (col + 2 <= 7) {
                setDots(row, col + 2, piece)
                canPass = true
            }
            if (col - 2 >= 0) {
                setDots(row, col - 2, piece)
                canPass = true
            }
        }
    }

    // Rei Branco
    if (piece === "wk") {
        if (row == 7 && col == 4) {
            if (col + 2 <= 7) {
                setDots(row, col + 2, piece)
                canPass = true
            }
            if (col - 2 >= 0) {
                setDots(row, col - 2, piece)
                canPass = true
            }
        }
    }
}

function setDots(row, col, piece) {
    if (canPass) {
        if (pseudoMoves(row, col, piece)) {
            let dot = document.getElementById(`square-${row}${col}`)

            dot.classList.add("dot")
        }
    }
}

function removeDots() {
    let square = document.getElementsByClassName("square")

    for (let i = 0; i < square.length; i++) {
        square[i].classList.remove("dot")
    }
}

function removeHighlight() {
    let square = document.getElementsByClassName("square")

    for (let i = 0; i < square.length; i++) {
        square[i].classList.remove("highlight")
    }
}

function removeCapture() {
    let square = document.getElementsByClassName("square")

    for (let i = 0; i < square.length; i++) {
        square[i].classList.remove("capture")
    }
}

function pseudoMoves(row, col, currentPiece) {
    let square = document.getElementById(`square-${row}${col}`),
        piece = square.classList,
        currentPieceColor = currentPiece.substr(0, 1)

    if (piece[0] === "ep" && currentPiece !== "wd" && currentPiece !== "bd" && currentPiece !== "wrookleft" && currentPiece !== "brookleft" && currentPiece !== "wrookright" && currentPiece !== "brookright") {
        return true
    } else {
        if (piece[0].substr(0, 1) !== currentPieceColor && currentPiece != "bp" && currentPiece != "wp" && currentPiece !== "wd" && currentPiece !== "bd" && currentPiece !== "wrookleft" && currentPiece !== "brookleft" && currentPiece !== "wrookright" && currentPiece !== "brookright") {
            square.classList.add("capture")
        } else if (currentPiece === "wd" || currentPiece === "bd") {
            if (piece[0].substr(0, 1) !== currentPieceColor && piece[0] !== "ep") {
                square.classList.add("capture")
            }
        }
    }

    canPass = false
    return false
}