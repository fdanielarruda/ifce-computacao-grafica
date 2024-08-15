// gauge.js

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

// Função para desenhar o gráfico gauge
function drawGauge(centerX, centerY, radius, value) {
    const intensityCanvas = document.getElementById('intensity-canvas');
    const ctx = intensityCanvas.getContext('2d');

    intensityCanvas.width = radius * 2 + 20; // Ajusta o tamanho do canvas
    intensityCanvas.height = radius * 2 + 20;

    ctx.clearRect(0, 0, intensityCanvas.width, intensityCanvas.height); // Limpa o canvas

    // Desenha o arco do gauge
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.lineWidth = 30;
    ctx.strokeStyle = '#333333'; // Cor de fundo do gauge
    ctx.stroke();

    // Adiciona gradiente dinâmico para a parte preenchida do gauge
    const gaugeColor = getGradientColor(value);

    // Desenha a parte preenchida do gauge
    ctx.beginPath();
    const endAngle = Math.PI + (value / 100) * Math.PI; // Calcula o ângulo final
    ctx.arc(centerX, centerY, radius, Math.PI, endAngle, false);
    ctx.lineWidth = 30;
    ctx.strokeStyle = gaugeColor; // Usa a cor gradiente dinâmica
    ctx.stroke();

    // Adiciona uma borda ao gauge
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000'; // Cor da borda
    ctx.stroke();

    // Desenha uma sombra no gráfico
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
}

// Função para animar o gráfico gauge
function animateGauge(centerX, centerY, radius) {
    let value = 0;
    let increasing = true;

    function step() {
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

        drawGauge(centerX, centerY, radius, value);
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Inicializar e animar o gauge quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Ajuste a posição e o tamanho conforme necessário
    const centerX = 110;
    const centerY = 60;
    const radius = 100;

    // Inicializa o gauge
    drawGauge(centerX, centerY, radius, 0);

    // Inicia a animação
    animateGauge(centerX, centerY, radius);
});
