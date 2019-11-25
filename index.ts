// Import stylesheets
import './style.css';

export interface Coords2d {
  x: number,
  y: number
}

class CanvasApi {

  element: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(public el: HTMLCanvasElement) {
    this.element = el

    if (el.getContext)
      this.context = el.getContext('2d');
  }

  public draw(coords: Coords2d[]) {
    const ctx: CanvasRenderingContext2D = this.context

    ctx.beginPath()
    ctx.moveTo(coords[0].x, coords[0].y)

    coords.forEach((coord, index) => {
      if (index !== 0) {
        ctx.lineTo(coord.x, coord.y)
      } else if (index === coords.length - 1) {
        ctx.closePath()
      }
    })
    
    ctx.stroke()
    
  }

  public test(content: string) {
    const display: HTMLDivElement = document.querySelector('.display')
    display.innerHTML = content

    console.log(this.el)
  }
}

const canvasElement: HTMLCanvasElement = document.querySelector('#canvas')
const canvasApi = new CanvasApi(canvasElement)

canvasApi.test('This is a display')

let mouseButtonIsDown: boolean = false
const coords: Coords2d[] = []

canvasApi.element.addEventListener('mousemove', (event: MouseEvent) => {
  if (mouseButtonIsDown) {

    const coord: Coords2d = { 
      x: event.offsetX, 
      y: event.offsetY 
    }

    coords.push(coord)

    canvasApi.draw(coords)
  }
  

  canvasApi.test(`${event.offsetX}`)
})

canvasApi.element.addEventListener('mousedown', () => {
  mouseButtonIsDown = true
})

canvasApi.element.addEventListener('mouseup', () => {
  mouseButtonIsDown = false
})

// THIS CODE DRAW LINE FROM RANDOM ARRAY COORDS

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


