import './styles/app.scss'

const title = document.getElementById("title")
const button = document.getElementById("start")
const score = document.getElementById("score")
const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

let isCanStart = true
let isFinished = false
const gravitaion = 0.9
const blockWidth = 50
const holeHeight = 150
let scoreCount = 0

const bird = {
    xPos: 30,
    yPos: 235,
    width: 30,
    height: 30,
}

const blocks = [{
    x: cvs.width,
    y: 0,
    topItemHeight: 150,
}]

const firstRender = () => {
    ctx.fillStyle = "white";
    ctx.font = "24px Verdana";
    ctx.fillText('Click on start to play', 130, 250);
}
firstRender()

const moveUp = () => bird.yPos -= 30
document.addEventListener("keydown", moveUp)

const renderBlock = (x, y, width, height) => {
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.fillStyle = 'white'
    ctx.fill()
}

const renderBird = () => renderBlock(bird.xPos, bird.yPos, bird.width, bird.height)

const render = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    bird.yPos += gravitaion

    renderBird()

    blocks.forEach(block => {
        renderBlock(block.x, block.y, blockWidth, block.topItemHeight)
        renderBlock(block.x, block.topItemHeight + holeHeight, blockWidth, cvs.height - (block.topItemHeight + holeHeight))

        block.x = block.x - 2

        if (bird.xPos + bird.width >= block.x && bird.xPos <= block.x + blockWidth) {
            const maxCurrentTop = block.y + block.topItemHeight
            const maxCurrentBottom = maxCurrentTop + holeHeight
            if (bird.yPos < maxCurrentTop || bird.yPos + bird.height > maxCurrentBottom) {
                isFinished = true
                return
            }
        }

        if (block.x === 200) {
            blocks.push({
                x: cvs.width,
                y: 0,
                topItemHeight: 100 + Math.floor(Math.random() * 200),
            })
        }

        if (block.x === 10) {
            scoreCount++
            score.innerHTML = scoreCount
        }
    })

    if (bird.yPos + bird.height < cvs.height && !isFinished) {
        requestAnimationFrame(render)
    } else {
        isFinished = true
    }
}

const onStartHandler = () => {
    if (isCanStart) {
        isCanStart = false
        renderBird()
        render()
    }
    if (isFinished) {
        title.innerHTML = `Fail. Score: ${scoreCount}`
    }
}

button.addEventListener('click', onStartHandler)
   