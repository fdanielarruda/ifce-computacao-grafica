// Referências aos elementos
const joystick = document.getElementById('joystick');
const intensityBarContainer = document.getElementById('intensity-bar-container');
const intensityBar = document.getElementById('intensity-bar');
const dataElements = {
    x: 10, // Inicia mais à esquerda para a visualização inicial
    y: 0,
    move: true,
    to: 800
};

// Variável para controlar o ciclo de animação
let animationActive = false;
let currentIntensity = 0; // Armazena o valor atual da intensidade

// Função para lidar com o clique no joystick
function clickButton() {
    if (!animationActive) {
        dataElements.move = false;
        intensityBarContainer.style.display = 'block'; // Mostra a barra de intensidade
        initIntensityBar(); // Inicializa a barra de intensidade
        animationActive = true; // Marca que a animação está ativa
    }
}

// Função para inicializar a barra de intensidade
function initIntensityBar() {
    intensityBar.style.width = '0%'; // Começa com largura 0%
    intensityBar.style.backgroundColor = 'green'; // Começa verde
    animateIntensityBar(); // Inicia a animação
}

// Função para animar a barra de intensidade
function animateIntensityBar() {
    let value = 0;
    let increasing = true;

    function step() {
        if (!animationActive) {
            return;
        }

        if (increasing) {
            value += 4; // Ajuste a velocidade de animação
            if (value >= 100) {
                value = 100;
                increasing = false;
            }
        } else {
            value -= 4; // Ajuste a velocidade de animação
            if (value <= 0) {
                value = 0;
                increasing = true;
            }
        }

        intensityBar.style.width = `${value}%`; // Atualiza a largura como porcentagem
        intensityBar.style.backgroundColor = getGradientColor(value); // Atualiza a cor gradiente
        currentIntensity = value; // Armazena o valor atual da intensidade

        // Continua animando enquanto a animação estiver ativa
        if (animationActive) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Função para criar um gradiente com base no valor
function getGradientColor(value) {
    const colorStart = { r: 0, g: 255, b: 0 }; // Verde (para 0%)
    const colorEnd = { r: 255, g: 0, b: 0 }; // Vermelho (para 100%)

    const percent = value / 100;
    const r = Math.round(colorStart.r + percent * (colorEnd.r - colorStart.r));
    const g = Math.round(colorStart.g + percent * (colorEnd.g - colorStart.g));
    const b = Math.round(colorStart.b + percent * (colorEnd.b - colorStart.b));

    return `rgb(${r},${g},${b})`;
}

// Adiciona o ouvinte de eventos
joystick.addEventListener('click', clickButton);

// Atualiza a posição do gráfico
function positionArrow(x, y) {
    const arrow = document.querySelector('#arrow_image');
    arrow.style.left = `${x}px`;
    arrow.style.bottom = `${y}px`; // Usa bottom para ajustar a posição em relação à parte inferior
}

// Função para mover o gráfico de acordo com a intensidade
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
            if (dataElements.to === 800) {
                dataElements.x += 15; // Atualiza a posição horizontal
                if (dataElements.x >= 800) {
                    dataElements.x = 800;
                    dataElements.to = 0;
                }
            } else {
                dataElements.x -= 15; // Atualiza a posição horizontal
                if (dataElements.x <= 0) {
                    dataElements.x = 0;
                    dataElements.to = 800;
                }
            }

            positionArrow(dataElements.x, dataElements.y);
            lastTime = timestamp;
        }

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Inicializa o movimento dos elementos
moveElements();

// Exporta as funções necessárias
export { initIntensityBar, animateIntensityBar, getGradientColor };
