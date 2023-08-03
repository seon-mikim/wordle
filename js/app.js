import getAnswerWord from './getAnswerWord.js'

let attempts = 0
let index = 0
let timer

async function appStart() {
  const getAnswer = await getAnswerWord()
  const answerWord = getAnswer[0]
  console.log(answerWord)

  // const handleNotMatchAnswerWord = (rowIndex) => {

  //   const guessWordRow = document.querySelector(`.board-row .row-${rowIndex}`)
  //   guessWordRow.classList.add('not_match_answer')
  //   if(rowIndex !== attempts) guessWordRow.classList.remove('not_match_answer')
  // }
  /**종료시 모달창 나오는 함수 */
  const displayGameover = () => {
    const divCreateEl = document.createElement('div')
    divCreateEl.innerText = '게임이 종료 되었습니다.'
    divCreateEl.style =
      'display:flex; justify-content:center; align-items:center; position:absolute; top: 35%; left: 45%; background-color: white; width: 200px; height: 150px;'
    document.body.appendChild(divCreateEl)
  }
  /**게임 종료 함수 */
  const gameover = () => {
    window.removeEventListener('keydown', handleKeydown)
    displayGameover()
    clearInterval(timer)
  }
  /**엔터를 누를 시 다음 줄로 넘어가는 함수*/
  const nextLine = () => {
    if (attempts === 6) return gameover()
    attempts += 1
    index = 0
  }
  /**스페이스 누를 시 입력키 지워지는 함수 */
  const handleBackspaceKey = () => {
    if (index > 0) {
      const preBlock = document.querySelector(`.board_block[data-index='${attempts}${index - 1}']`)
      preBlock.innerText = ''
    }
    if (index !== 0) index -= 1
  }
  /**엔터 누를 시 조건에 따른 상호작용 함수 */
  const handleEnterKey = () => {
    let hitNumber = 0
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(`.board_block[data-index='${attempts}${i}']`)
      const letter = block.innerText
      const answer = answerWord[i].toUpperCase()
      console.log(answer)
      const keyBlock = document.querySelector(`.key-block[data-keyboard='${letter}']`)
      if (letter === answer) {
        hitNumber += 1
        block.style.background = '#6AAA64'
        keyBlock.style.background = '#6AAA64'
      } else if (answerWord.includes(letter)) {
        block.style.background = '#C9B458'
        keyBlock.style.background = '#C9B458'
      } else {
        block.style.background = '#787C7E'
        keyBlock.style.background = '#787C7E'
      }
      block.style.color = 'white'
      keyBlock.style.color = 'white'
    }
    if (hitNumber === 5) gameover()
    else nextLine()
    // if(hitNumber <4) return handleNotMatchAnswerWord(attempts)
      
  }
  /**키 누를 시 해당 조건에 맞는 동작하게 하는 함수 */
  const handleKeydown = (event) => {
    event.preventDefault()
    const { key, keyCode } = event
    const block = document.querySelector(`.board_block[data-index='${attempts}${index}']`)
    if (key === 'Backspace') handleBackspaceKey()
    else if (index === 5) {
      if (key === 'Enter') handleEnterKey()
      else return
    } else if (65 <= keyCode && keyCode <= 90) {
      block.innerText = key.toUpperCase()
      index += 1
    }
  }
  const handleClick = (event) => {
    event.preventDefault()
    const key = event.target.innerText
    const block = document.querySelector(`.board_block[data-index='${attempts}${index}']`)
    const keyBlock = document.querySelector(`.key-block[data-keyboard ='${key}']`)
    if (key === 'x') handleBackspaceKey()
    if (key === keyBlock.innerText) {
      if (index === 5) {
        if (key === 'Enter') handleEnterKey()
        else return
      }
      if (keyBlock.innerText !== 'Enter' && keyBlock.innerText !== 'x') {
        block.innerText = keyBlock.innerText
        index += 1
      }
    }
  }

  /**게임 시작시 시간 경과 시간을 나타내는 함수 */
  const startTimer = () => {
    const startTime = new Date()
    function setTime() {
      const nowTime = new Date()
      const elapsedTime = new Date(nowTime - startTime)
      const minutes = elapsedTime.getMinutes().toString().padStart(2, '0')
      const seconds = elapsedTime.getSeconds().toString().padStart(2, '0')
      const timeDivEl = document.getElementById('timer')
      timeDivEl.innerText = `${minutes}:${seconds}`
    }
    timer = setInterval(setTime, 1000)
  }

  startTimer()
  window.addEventListener('keydown', (event) => handleKeydown(event))
  window.addEventListener('click', (event) => handleClick(event))
}

appStart()
