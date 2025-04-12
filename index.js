const canvas = document.querySelector('canvas');
const scoreEL = document.querySelector('#scoreEL');
const c = canvas.getContext('2d');
console.log(c);

canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
    static width = 40
    static height = 40

    constructor({ position, image }) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    draw() {
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet {
    constructor({ position }) {
        this.position = position
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
}

const boundaries = []
const pellets = []

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    }, velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastkey = ''
let score = 0

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', 'x', '.', 'y', '.', 'y', '.', 'x', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '|', '.', '|', '.', '.', '.', '.', '.', '|'],
    ['|', '-', 'r', '.', '1', '-', '3', '.', '4', '-', '2', '.', 'l', '-', '|'],
    ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '|'],
    ['|', '.', 'l', '-', '3', '.', 'l', '-', 'r', '.', '4', '-', 'r', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'l', '-', '2', '.', 'l', '-', 'r', '.', '1', '-', 'r', '.', '|'],
    ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '|'],
    ['|', '-', 'r', '.', '4', '-', '2', '.', '1', '-', '3', '.', 'l', '-', '|'],
    ['|', '.', '.', '.', '.', '.', '|', '.', '|', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', 'y', '.', 'x', '.', 'x', '.', 'y', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]


function createImage(src) {
    const image = new Image()
    image.src = src
    return image
}


map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeHorizontal.png')
                }))
                break
            case '|':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeVertical.png')
                }))
                break
            case '1':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner1.png')
                }))
                break
            case '2':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner2.png')
                }))
                break
            case '3':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner3.png')
                }))
                break
            case '4':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner4.png')
                }))
                break
            case 'b':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/block.png')
                }))
                break
            case 'r':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/capRight.png')
                }))
                break
            case 'l':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/capLeft.png')
                }))
                break
            case 'y':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/capTop.png')
                }))
                break
            case 'x':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/capBottom.png')
                }))
                break
            case '.':
                pellets.push(new Pellet({
                    position: {
                        x: j * Boundary.width + Boundary.width / 2,
                        y: i * Boundary.height + Boundary.height / 2
                    }
                }))
                break
        }
    })
})

function circleCollidewithrectangle({
    circle, rectangle
}) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <=
        rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >=
        rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <=
        rectangle.position.x + rectangle.width
    )
}

let frame;
function animate() {
    frame = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (keys.w.pressed && lastkey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidewithrectangle({
                circle: { ...player, velocity: { x: 0, y: -5 } }, rectangle: boundary
            })) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = -5
            }
        }
    } else if (keys.a.pressed && lastkey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidewithrectangle({
                circle: { ...player, velocity: { x: -5, y: 0 } }, rectangle: boundary
            })) {
                player.velocity.x = 0
                breakass
            } else {
                player.velocity.x = -5
            }
        }
    } else if (keys.s.pressed && lastkey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidewithrectangle({
                circle: { ...player, velocity: { x: 0, y: 5 } }, rectangle: boundary
            })) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = 5
            }
        }

    } else if (keys.d.pressed && lastkey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidewithrectangle({
                circle: { ...player, velocity: { x: 5, y: 0 } }, rectangle: boundary
            })) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = 5
            }
        }
    }

    if (pellets.length === 0) {
        console.log('win')
        cancelAnimationFrame(frame)
    }

    for (let i = pellets.length - 1; 0 < i; i--) {
        const pellet = pellets[i]
        pellet.draw()
        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
            console.log('touching ');
            pellets.splice(i, 1)
            score += 10
            scoreEL.innerHTML = score
        }
    }

    boundaries.forEach((boundary) => {
        boundary.draw();

        if (circleCollidewithrectangle({
            circle: player, rectangle: boundary
        })
        ) {
            console.log("collide");
            player.velocity.y = 0
            player.velocity.x = 0
        }
    })
    player.update()

}

animate()



addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})