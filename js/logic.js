// Lógica del juego Piedra, Papel o Tijera

function play(userChoice) {
    if (typeof playSound === 'function') playSound('click');
    const opciones = ['piedra', 'papel', 'tijera'];
    const iconos = {
        piedra: '🪨',
        papel: '📄',
        tijera: '✂️'
    };
    const computerChoice = opciones[Math.floor(Math.random() * 3)];
    let resultado = '';
    let clase = '';
    let soundType = '';
    if (userChoice === computerChoice) {
        resultado = `<span style='font-size:2.5rem;'>🤝</span><br>¡Empate!<br><b>${iconos[userChoice]} ${userChoice.toUpperCase()}</b> vs <b>${iconos[computerChoice]} ${computerChoice.toUpperCase()}</b>`;
        clase = 'alert-info';
        soundType = 'draw';
    } else if (
        (userChoice === 'piedra' && computerChoice === 'tijera') ||
        (userChoice === 'papel' && computerChoice === 'piedra') ||
        (userChoice === 'tijera' && computerChoice === 'papel')
    ) {
        resultado = `<span style='font-size:2.5rem;'>🎉</span><br>¡Ganaste!<br><b>${iconos[userChoice]} ${userChoice.toUpperCase()}</b> vence a <b>${iconos[computerChoice]} ${computerChoice.toUpperCase()}</b>`;
        clase = 'alert-success';
        soundType = 'win';
    } else {
        resultado = `<span style='font-size:2.5rem;'>😢</span><br>Perdiste<br><b>${iconos[computerChoice]} ${computerChoice.toUpperCase()}</b> vence a <b>${iconos[userChoice]} ${userChoice.toUpperCase()}</b>`;
        clase = 'alert-danger';
        soundType = 'lose';
    }
    mostrarResultado(resultado, clase);
    if (typeof playSound === 'function') playSound(soundType);
}


let playAgainTimer;

function mostrarResultado(texto, clase) {
    const resultadoDiv = document.getElementById('resultado');
    // limpiar temporizador previo y UI previa
    if (playAgainTimer) clearTimeout(playAgainTimer);
    const previousInline = document.getElementById('play-again-inline');
    if (previousInline) previousInline.remove();

    resultadoDiv.innerHTML = texto;
    resultadoDiv.className = `alert text-center w-100 animated-result ${clase}`;
    resultadoDiv.classList.remove('d-none');
    // Animación popIn
    resultadoDiv.classList.remove('animated-result');
    void resultadoDiv.offsetWidth; // trigger reflow
    resultadoDiv.classList.add('animated-result');

    // Después de ~3 segundos, mostrar controles inline para jugar de nuevo
    playAgainTimer = setTimeout(() => {
        const actionsHtml = `
            <div id="play-again-inline" class="mt-3">
                <hr class="my-2">
                <div class="d-flex justify-content-center gap-2 flex-wrap">
                    <button id="pa-yes" class="btn btn-light text-dark fw-bold">Jugar de nuevo</button>
                    <button id="pa-no" class="btn btn-outline-light">No, gracias</button>
                </div>
            </div>`;
        resultadoDiv.insertAdjacentHTML('beforeend', actionsHtml);
        const yesBtn = document.getElementById('pa-yes');
        const noBtn = document.getElementById('pa-no');
        if (yesBtn) {
            yesBtn.addEventListener('click', () => {
                if (typeof playSound === 'function') playSound('click');
                resultadoDiv.classList.add('d-none');
                const inline = document.getElementById('play-again-inline');
                if (inline) inline.remove();
            });
        }
        if (noBtn) {
            noBtn.addEventListener('click', () => {
                if (typeof playSound === 'function') playSound('click');
                const inline = document.getElementById('play-again-inline');
                if (inline) inline.innerHTML = '<div class="mt-2">¡Gracias por jugar! 🥳</div>';
            });
        }
    }, 3000);
}
const showAlert = () => {
    document.getElementById('alert').classList.remove('hidden');
}

const closeAlert = () => {
    document.getElementById('alert').classList.add('hidden');
}

// Additional JavaScript logic can be added here
// For example, form validation, dynamic content loading, etc.
// This is a simple example of showing and hiding an alert box
// You can expand this file with more functions as needed
// Example function to toggle a class on an element
const toggleClass = (elementId, className) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle(className);
    }
}
// Example function to change the text of an element
const changeText = (elementId, newText) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = newText;
    }
}
// You can call these functions from your HTML elements as needed
// For example, you can use onclick attributes in your HTML to trigger these functions
// Remember to ensure that the DOM is fully loaded before attaching event listeners
// You can use window.onload or document.addEventListener('DOMContentLoaded', callback) for that
// This ensures that your JavaScript interacts with elements that are already present in the DOM
// Feel free to modify and expand this file based on your project's requirements
// Happy coding!    
// This file is linked in the HTML file and will be executed when the page loads
// Make sure to test your functions to ensure they work as expected
// You can also add event listeners directly in this file if needed
// For example, you can add a click event listener to a button

// --- Sombra/luz que sigue el cursor (global) ---
(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx, cy = ty; // valores suavizados

    const update = () => {
        cx = lerp(cx, tx, 0.18);
        cy = lerp(cy, ty, 0.18);
        document.body.style.setProperty('--mx', cx + 'px');
        document.body.style.setProperty('--my', cy + 'px');
        requestAnimationFrame(update);
    };
    update();

    window.addEventListener('mousemove', (e) => {
        tx = e.clientX;
        ty = e.clientY;
    });
})();

// --- Efecto de luz dentro de los botones que sigue el cursor ---
document.addEventListener('mousemove', (e) => {
    const buttons = document.querySelectorAll('.animated-btn');
    buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Normalizar a porcentaje para CSS
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        btn.style.setProperty('--bx', px + '%');
        btn.style.setProperty('--by', py + '%');
    });
});

// Soporte táctil: seguir el dedo y mostrar efecto
const updateButtonGlowFromPoint = (clientX, clientY) => {
    const buttons = document.querySelectorAll('.animated-btn');
    buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        btn.style.setProperty('--bx', px + '%');
        btn.style.setProperty('--by', py + '%');
    });
};

window.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    if (!t) return;
    // también actualizar luz global
    document.body.style.setProperty('--mx', t.clientX + 'px');
    document.body.style.setProperty('--my', t.clientY + 'px');
    updateButtonGlowFromPoint(t.clientX, t.clientY);
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (!t) return;
    document.body.style.setProperty('--mx', t.clientX + 'px');
    document.body.style.setProperty('--my', t.clientY + 'px');
    updateButtonGlowFromPoint(t.clientX, t.clientY);
}, { passive: true });

window.addEventListener('touchend', () => {
    // suavemente dejamos la luz en el centro tras levantar el dedo
    // el bucle de lerp ya lo lleva hacia su objetivo, aquí no forzamos
});