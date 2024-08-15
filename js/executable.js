import { initIntensityBar } from './game.js';

// Referências aos elementos
const intensityBarContainer = document.getElementById('intensity-bar-container');
const intensityBar = document.getElementById('intensity-bar');
const arrow = document.getElementById('arrow_image');
const ball = document.getElementById('ball_image');

let isFirstClick = true;
let lastIntensity = 0;
let lastDirection = '0px'; // Variável para armazenar a última direção da seta

// Função para lidar com o clique no joystick
function clickButton() {
    if (isFirstClick) {
        // Primeiro clique: inicializa a barra de intensidade
        initIntensityBar();
        isFirstClick = false;
    } else {
        // Segundo clique: coleta e exibe as informações
        const direction = arrow.style.left || '0px'; // Direção da seta
        const intensity = intensityBar.style.width || '0%'; // Intensidade da barra

        lastDirection = direction;
        lastIntensity = parseFloat(intensity); // Remove a unidade '%' e converte para número

        console.log(`Direção: ${lastDirection}`);
        console.log(`Intensidade: ${lastIntensity}%`);
        
        // Lança a bola
        launchBall();

        // Reinicia o estado para o próximo clique
        isFirstClick = true;
        intensityBarContainer.style.display = 'none'; // Oculta a barra de intensidade
    }
}

// Função para lançar a bola
function launchBall() {
    const directionInPixels = parseFloat(lastDirection); // Converte a direção para número
    const intensityFactor = lastIntensity / 100; // Converte intensidade para um valor entre 0 e 1

    let ballX = directionInPixels; // Posição inicial horizontal
    let ballY = 10; // Posição inicial vertical (bottom)

    const directionMultiplier = directionInPixels > 400 ? 1 : -1; // Define se a bola vai para a direita ou esquerda

    function moveBall() {
        // A bola se move com base na intensidade e direção
        ballX += directionMultiplier * intensityFactor * 10; // Aumenta a velocidade baseado na intensidade
        ballY += intensityFactor * 5; // Aumenta o movimento vertical

        // Atualiza a posição da bola no DOM
        ball.style.left = `${ballX}px`; // Move a bola horizontalmente
        ball.style.bottom = `${ballY}px`; // Move a bola verticalmente

        // Continua movendo a bola até que ela atinja o gol
        if (ballY < 300) { // Limite de altura (ponto de impacto do gol)
            requestAnimationFrame(moveBall);
        }
    }

    requestAnimationFrame(moveBall); // Inicia a animação
}

// Adiciona o ouvinte de eventos
document.getElementById('joystick').addEventListener('click', clickButton);
