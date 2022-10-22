const startBtn = document.querySelector("#start-btn")
const screens = document.querySelectorAll(".screen")
const timeList = document.querySelector('#time-list')
const timeTable = document.querySelector("#time")
const board = document.querySelector("#board")

let poinsts = 0
let time = 0
let setIntervalIndex = 0;
const circleClickHandler = (event) =>{
  if(event.target.classList.contains("circle")){
    event.target.remove()
    createRandomCircle()
    poinsts++;
  }
}

board.addEventListener("click",circleClickHandler)


const gameBegin = (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
}
const setTime = (value) => {
  timeTable.innerHTML = `00:${value}`
}

const decreaseTime = () => {
  if (time === 0) {
    finishGame()
  } else {
    let current = `${time < 10 ? 0 : ""}${time--}`
    setTime(current)
  }
}
const startGame = () => {
  setIntervalIndex = setInterval(decreaseTime, 1000)
  createRandomCircle()
}
const chooseTime = (event) => {
  if(event.target.classList.contains("time-btn")){
    time = parseInt(event.target.dataset.time)
    timeTable.innerHTML =`00:${time}`
    screens[1].classList.add('up')
    startGame()
  }
}

const finishGame = () => {
  clearInterval(setIntervalIndex)
  timeTable.parentNode.classList.add("hide")
  board.innerHTML = `
  <h1>Ваш счёт: <span class="primary">${poinsts}</span></h1>
  `
}
const createRandomCircle = () => {
  const circle = document.createElement('div')
  const {width, height} = board.getBoundingClientRect()
  const size =Math.floor(Math.random() * (65 - 10) + 10)
  const x = Math.floor(Math.random() * (width - size))
  const y = Math.floor(Math.random() * (height - size))
  circle.style.background = chroma.random()
  circle.classList.add('circle')
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  board.append(circle)
}

timeList.addEventListener("click", chooseTime)
startBtn.addEventListener("click", gameBegin)

