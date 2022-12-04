document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 
  let appleIndex = 0 
  let currentSnake = [2, 1, 0]
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0


  //start,restart
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }


  //function ที่เกี่ยวข้องกับผลลัพธ์ทั้งหมดของงู
  function moveOutcomes() {

    //งูชนขอบและงูชนตัวเอง
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || //ถ้างูชนผนังด้านล่าง
      (currentSnake[0] % width === width - 1 && direction === 1) || //ถ้างูชนผนังด้านขวา
      (currentSnake[0] % width === 0 && direction === -1) || //ถ้างูชนผนังด้านซ้าย
      (currentSnake[0] - width < 0 && direction === -width) ||  //ถ้างูชนผนังด้านบน
      squares[currentSnake[0] + direction].classList.contains('snake') //ถ้างูหันมากินตัวเอง
    ) {
      return clearInterval(interval) 
    }

    const tail = currentSnake.pop() 
    squares[tail].classList.remove('snake')  
    currentSnake.unshift(currentSnake[0] + direction) 

    //เมื่องูได้กินแอปเปิ้ล
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }


  //สร้างแอปเปิ้ลใหม่เมื่อกินแอปเปิ้ล
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) //ตรวจสอบให้แน่ใจว่าแอปเปิ้ลไม่เกิดบนตัวงู
    squares[appleIndex].classList.add('apple')
  }


  //กำหนดฟังก์ชั่นให้กับ keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
      direction = 1 //ถ้ากดลูกศรขวาบนแป้นพิมพ์ งูก็จะไปทางขวา
    } else if (e.keyCode === 38) {
      direction = -width 
    } else if (e.keyCode === 37) {
      direction = -1 
    } else if (e.keyCode === 40) {
      direction = +width 
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})
