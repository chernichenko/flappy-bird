import './styles/app.scss'

const cvs = document.getElementById("canvas")
const button = document.getElementById("start")
const ctx = cvs.getContext("2d")

let isCanStart = true
let isFinished = false

const xPos = 30
let yPos = 235
const birdWidth = 30
const birdHeight = 30
const gravitaion = 0.7 

const firstRender = () => {
    ctx.fillStyle = "white";
    ctx.font = "24px Verdana";
    ctx.fillText('Click on start to play', 130, 250);
}
firstRender()

const moveUp = () => yPos -= 25
document.addEventListener("keydown", moveUp)

const renderBird = () => {
    ctx.beginPath()
    ctx.rect(xPos, yPos, birdWidth, birdHeight)
    ctx.fillStyle = 'white'
    ctx.fill()
}

const render = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    yPos += gravitaion

    renderBird()
    
    if (yPos + birdHeight < cvs.height) {
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
        location.reload()
    }
}

button.addEventListener('click', onStartHandler)
   