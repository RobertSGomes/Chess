export function placePieces(pattern) {
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            var square = document.getElementById(`square-${i}${j}`)
            square.classList.add(pattern[i][j])
            square.classList.add("square")
        }
    }
}