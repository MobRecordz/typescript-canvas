// Import stylesheets
import './style.css';

export interface Coords2d {
  x: number,
  y: number,
  size: number
}

class CanvasApi {

  context: CanvasRenderingContext2D

  constructor(public el: HTMLCanvasElement) {

    if (el.getContext)
      this.context = el.getContext('2d');
  } 

  public draw(coords: Coords2d[]) {
    const ctx: CanvasRenderingContext2D = this.context
    coords.map(coord => ctx.fillRect(coord.x, coord.y, coord.size, coord.size))
  }

  public clearCanvas() {
    this.context.clearRect(0, 0, this.el.width, this.el.height);
  }

  public sendMessageToDisplay(content: string) {
    const display: HTMLDivElement = document.querySelector('.display')
    display.innerHTML = content
  }

  private initMouseEvents(event: MouseEvent) {
    console.log(this.el)
  }
}

const canvasElement: HTMLCanvasElement = document.querySelector('#canvas')
const canvasApi = new CanvasApi(canvasElement)

canvasApi.sendMessageToDisplay('This is a display')

// SNAKE
const speed = 100

const snakeHead: Coords2d = { x: 10, y: 10, size: 2 }
const snake: Coords2d[] = [snakeHead]

let direction: number = 0 // 0 - up, 1 - right, 2 - down, 3 - left
let nextDirection: number = 0

// Starter snake body
for (let i = 0; i < 20; i++) {
  const item = { ...snake[snake.length - 1] }
  item.x += item.size
  snake.push(item)
}

// console.log(snake)wds

const render = setInterval(snakeRender, speed)

function snakeRender() {
  try {
    window.requestAnimationFrame(() => {
      canvasApi.clearCanvas()
      snakeMove()
    })

    // canvasApi.sendMessageToDisplay(`${JSON.stringify(snakeTail)}`)
  } catch(e) {
    clearInterval(render)
  }
  
}

function snakeMove() {
  const { width, height } = canvasApi.el
  let lastX, lastY

  snake.forEach((item, index) => {
    
      // canvasApi.sendMessageToDisplay(index + "")

      let { x, y, size } = snake[0]
      direction = nextDirection
      
      switch(direction) {
        case 0: if (y < 0) y = height
                else y--; 
                break;
        case 1: if (x > width) x = 0
                else x++; 
                break;
        case 2: if (y > height) y = 0
                else y++; 
                break;
        case 3: if (x < 0) x = width
                else x--; 
                break;
      }

      snake.pop()
      const head: Coords2d = { x, y, size: 5 }
      snake.unshift(head)

      canvasApi.draw(snake)

  })
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
  canvasApi.sendMessageToDisplay(`KEY: ${event.key}, DIRECTION: ${direction}`)

  switch(event.key) {
    case 'w': nextDirection = 0; break;
    case 'd': nextDirection = 1; break;
    case 's': nextDirection = 2; break;
    case 'a': nextDirection = 3; break;
  }
})

// --------------------
// TO DRAW WITH A MOUSE 
// --------------------
// let mouseButtonIsDown: boolean = false
// let coords: Coords2d[] = []

// canvasApi.el.addEventListener('mousemove', (event: MouseEvent) => {
//   if (mouseButtonIsDown) {

//     const coord: Coords2d = { 
//       x: event.offsetX, 
//       y: event.offsetY 
//     }

//     coords.push(coord)
//     canvasApi.draw(coords)
//   }

//   // canvasApi.sendMessageToDisplay(`${event.offsetX}`)
// })

// canvasApi.el.addEventListener('mousedown', () => {
//   mouseButtonIsDown = true
// })

// canvasApi.el.addEventListener('mouseup', () => {
//   mouseButtonIsDown = false
//   coords = []
// })

// --------------------------------------------
// THIS CODE DRAW LINE FROM RANDOM ARRAY COORDS
// --------------------------------------------
// const coord: Coords2d = {
//   x: 0,
//   y: 0
// }

// const coords: Coords2d[] = []

// for (let i = 0; i < 30; i++) {
//   coord.x = Math.floor(Math.random() * 500)
//   coord.y = Math.floor(Math.random() * 500)

//   coords.push({ ...coord })
// }

// canvasApi.draw(coords)


