document.getElementById('joystick').addEventListener('click', clickButton);

const left = 0;
const right = 800;

let dataElements = {
    x: 500,
    y: left,
    move: true,
    to: right
};

function clickButton() {
    dataElements.move = false;
}

function moveArrow(x, y) {
    const arrow = document.querySelector('#arrow_image');
    arrow.style.transition = 'all 1ms';
    arrow.style.top = x + 'px';
    arrow.style.left = y + 'px';
}

function moveElements() {
    let lastTime = 0;

    function step(timestamp) {
        if (!dataElements.move) {
            return;
        }

        if (!lastTime) {
            lastTime = timestamp;
        }

        const elapsed = timestamp - lastTime;

        if (elapsed > 1) { // Ajuste para a frequência de atualização desejada
            if (dataElements.to === right) {
                dataElements.y += 15;
                if (dataElements.y >= right) {
                    dataElements.y = right;
                    dataElements.to = left;
                }
            } else {
                dataElements.y -= 15;
                if (dataElements.y <= left) {
                    dataElements.y = left;
                    dataElements.to = right;
                }
            }

            moveArrow(dataElements.x, dataElements.y);

            lastTime = timestamp;
        }

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Inicializa a animação
moveElements();
