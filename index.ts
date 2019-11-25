// Import stylesheets
import './style.css';

export interface Coords2d {
  x: number,
  y: number
}

class CanvasApi {

  context: CanvasRenderingContext2D

  constructor(public el: HTMLCanvasElement) {

    if (el.getContext)
      this.context = el.getContext('2d');
  }

  public draw(coords: Coords2d[]) {
    const ctx: CanvasRenderingContext2D = this.context

    ctx.beginPath()
    ctx.moveTo(coords[0].x, coords[0].y)
    ctx.lineWidth = 10

    coords.forEach((coord, index) => {
      if (index !== 0) {
        ctx.lineTo(coord.x, coord.y)
      } else if (index === coords.length - 1) {
        ctx.closePath()
      }
    })
    
    ctx.stroke()
    
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
const fps = 1000 / 60

interface SnakeBlock {
  x: number,
  y: number
}

const snakeHead: Coords2d = { x: 10, y: 10 }
const snake: Coords2d[] = [snakeHead]

let direction: number = 0 // 0 - up, 1 - right, 2 - down, 3 - left

// Starter snake body
const item: Coords2d = {
  x: 11, y: 10
}
snake.push({ ...item })
item.x = 12
snake.push({ ...item })

// const render = setInterval(snakeRender, fps)

function snakeRender() {
  canvasApi.clearCanvas()
  snakeMove()
  canvasApi.draw(snake)

  // canvasApi.sendMessageToDisplay(`${JSON.stringify(snakeTail)}`)
}

function snakeMove() {
  const { width, height } = canvasApi.el

  for (const item of snake) {

    switch(direction) {
      case 0: item.y--; break;
      case 1: item.x--; break;
      case 2: item.y++; break;
      case 3: item.x--; break;
    }

  }
}

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


