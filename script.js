// Lista de eventos disponibles (cada objeto incluye la propiedad "description")
const allEvents = [
  { id: 1, title: "Descubrimiento del número cero", date: -500, img: "images/cero.jpg", description: "¿Cuándo se utilizó por primera vez el concepto del cero? Explora su origen en la antigua India." },
  { id: 2, title: "Pascal y la teoría de probabilidades", date: 1654, img: "images/pascal.jpg", description: "¿Qué aportes hizo Pascal en la teoría de probabilidades? Descubre su impacto en la estadística." },
  { id: 3, title: "La fórmula de Herón", date: 100, img: "images/heron.jpg", description: "¿Cómo calculaba Herón el área de un triángulo? Observa su ingeniosa fórmula." },
  { id: 4, title: "Teorema de Pitágoras", date: -500, img: "images/pitagoras.jpg", description: "¿Qué demuestra el teorema de Pitágoras? Reflexiona sobre su importancia en la geometría." },
  { id: 5, title: "Sistema decimal", date: 500, img: "images/decimal.jpg", description: "¿Cuándo se popularizó el sistema decimal? Explora cómo facilitó las matemáticas." },
  { id: 6, title: "El número Pi (π)", date: -2500, img: "images/pi.jpg", description: "¿Cuándo se utilizó por primera vez el número π? Investiga las primeras aproximaciones en la antigüedad." },
  { id: 7, title: "Geometría Euclidiana", date: -300, img: "images/euclides.jpg", description: "¿Qué hizo Euclides con la geometría? Conoce la sistematización en 'Los Elementos'." },
  { id: 8, title: "Números primos", date: -300, img: "images/primos.jpg", description: "¿Cómo se demostró la infinitud de los números primos? Descubre el legado de Euclides." },
  { id: 9, title: "Teorema Fundamental del Álgebra", date: 1799, img: "images/gauss-algebra.jpg", description: "¿Por qué es tan importante el teorema fundamental del álgebra? Explora su significado en la resolución de ecuaciones." },
  { id: 10, title: "Cálculo Diferencial e Integral", date: 1666, img: "images/calculo.jpg", description: "¿Cómo surgió el cálculo? Reflexiona sobre el trabajo de Newton y Leibniz." },
  { id: 11, title: "Regla de los signos", date: 1550, img: "images/signos.jpg", description: "¿Qué nos dice la regla de los signos en álgebra? Observa cómo determina los resultados." },
  { id: 12, title: "Notación decimal (Fibonacci)", date: 1202, img: "images/fibonacci.jpg", description: "¿Cómo influyó Fibonacci en la notación decimal? Analiza su legado en la aritmética." },
  { id: 13, title: "Teorema de Fermat", date: 1637, img: "images/fermat.jpg", description: "¿Qué misterio encerraba el teorema de Fermat? Piensa en su desafío durante siglos." },
  { id: 14, title: "Fracciones continuas", date: 1768, img: "images/fracciones.jpg", description: "¿Cómo se utilizan las fracciones continuas en matemáticas? Explora sus aplicaciones." },
  { id: 15, title: "Sucesión de Fibonacci", date: 1202, img: "images/fibonacci2.jpg", description: "¿Por qué es famosa la sucesión de Fibonacci? Descubre su presencia en la naturaleza." },
  { id: 16, title: "El número de Euler (e)", date: 1731, img: "images/euler.jpg", description: "¿Qué papel juega el número e en el cálculo? Investiga su relevancia en las matemáticas." },
  { id: 17, title: "Trigonometría", date: -150, img: "images/trigonometria.jpg", description: "¿Cómo se estudian las relaciones entre ángulos y lados? Reflexiona sobre los inicios de la trigonometría." },
  { id: 18, title: "Integral de Riemann", date: 1854, img: "images/riemann.jpg", description: "¿Cómo se define la integral en el análisis? Observa la aportación de Riemann." },
  { id: 19, title: "Funciones algebraicas", date: 1600, img: "images/funciones.jpg", description: "¿Cuál fue el avance en el estudio de funciones? Explora sus fundamentos en el análisis." },
  { id: 20, title: "Teoría de conjuntos (Cantor)", date: 1874, img: "images/cantor.jpg", description: "¿Qué revolucionó la teoría de conjuntos? Descubre la noción de infinito de Cantor." }
];

let selectedEvents = [];
let correctOrder = [];
let attemptCount = 0;
const maxAttempts = 3;
let score = 0;
let timeLeft = 120; // 2 minutos en segundos
let timerInterval = null;
let avisoReproducido = false;

// Referencias a elementos HTML
const bannerDiv = document.getElementById("banner");
const startButton = document.getElementById("startButton");
const timerDiv = document.getElementById("timer");
const cardsContainer = document.getElementById("cards-container");
const timelineDiv = document.getElementById("timeline");
const checkButton = document.getElementById("checkButton");
const restartButton = document.getElementById("restartButton");
const resultDiv = document.getElementById("result");
const detailPanel = document.getElementById("detail-panel");
const detailDescription = document.getElementById("detail-description");
const audioInicio = document.getElementById("inicio");
const audioFondo = document.getElementById("fondo");
const audioComplete = document.getElementById("complete");
const audioIncompleto = document.getElementById("incompleto");
const audioCeropuntos = document.getElementById("ceropuntos");
const audioAviso = document.getElementById("aviso");

// Función para detener todos los sonidos para evitar solapamientos
function stopAllAudio() {
  audioFondo.pause();
  audioInicio.pause();
  audioAviso.pause();
  audioFondo.currentTime = 0;
  audioInicio.currentTime = 0;
  audioAviso.currentTime = 0;
}

// Función para formatear el tiempo en MM:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Función para actualizar el temporizador
function updateTimer() {
  timerDiv.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;
  // Se activa el aviso a 30 segundos en lugar de 60
  if (timeLeft === 30 && !avisoReproducido) {
    stopAllAudio();
    audioAviso.play();
    avisoReproducido = true;
  }
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endGameDueToTime();
  }
  timeLeft--;
}

// Función para iniciar el temporizador
function startTimer() {
  timerDiv.style.display = "block";
  timerDiv.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;
  timerInterval = setInterval(updateTimer, 1000);
}

// Función que se ejecuta cuando se agota el tiempo
function endGameDueToTime() {
  stopAllAudio();
  let correctCount = 0;
  document.querySelectorAll(".dropzone").forEach((zone, index) => {
    if (zone.firstChild) {
      const card = zone.firstChild;
      // Eliminar clase 'selected' si estuviera
      card.classList.remove("selected");
      if (parseInt(card.dataset.id) === correctOrder[index]) {
        card.classList.add("correct"); // Sombra verde para acertadas
        const dateP = card.querySelector(".date");
        if (dateP) dateP.style.display = "block";
        correctCount++;
      }
    }
  });
  score = correctCount;
  timerDiv.style.display = "none";
  checkButton.style.display = "none";
  if (score === 5) {
    resultDiv.textContent = `¡Excelente! Has colocado correctamente todas las cartas. Puntaje: ${score} - ¡Juego excelente!`;
    audioComplete.play();
  } else if (score === 0) {
    resultDiv.textContent = `¡Tiempo agotado! No lograste ninguna carta correcta. Puntaje: ${score} - ¡Mucho ánimo, prepárate para la próxima ocasión!`;
    audioCeropuntos.play();
  } else {
    resultDiv.textContent = `¡Tiempo agotado! Tienes ${score} cartas correctas. Puntaje: ${score} - ¡Sigue esforzándote!`;
    audioIncompleto.play();
  }
  restartButton.style.display = "inline-block";
}

// Función para mezclar un array (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para inicializar o reiniciar el juego
// El parámetro showBanner indica si se debe mostrar el banner (true al reiniciar) o no (false al comenzar)
function initializeGame(showBanner = true) {
  attemptCount = 0;
  score = 0;
  timeLeft = 120;
  avisoReproducido = false;
  checkButton.disabled = false;
  resultDiv.textContent = '';
  
  // Ocultar elementos de juego
  timerDiv.style.display = "none";
  cardsContainer.style.display = "none";
  timelineDiv.style.display = "none";
  checkButton.style.display = "none";
  restartButton.style.display = "none";
  detailPanel.style.display = "none";
  
  // Actualizar mensaje de instrucciones a estado inicial
  document.querySelector(".instruction").textContent = "Bienvenido a Línea de Tiempo de las Matemáticas, aprende jugando y adivinando el orden de los acontecimientos.";
  
  // Mostrar u ocultar el banner según el parámetro
  bannerDiv.style.display = showBanner ? "block" : "none";
  
  // Seleccionar aleatoriamente 5 eventos
  selectedEvents = shuffle(allEvents.slice()).slice(0, 5);
  
  // Calcular el orden correcto (ascendente según fecha)
  correctOrder = selectedEvents.slice().sort((a, b) => a.date - b.date).map(e => e.id);
  
  // Limpiar dropzones
  document.querySelectorAll(".dropzone").forEach(zone => {
    zone.innerHTML = '';
  });
  
  // Limpiar contenedor de cartas e insertar mensaje de inicio
  cardsContainer.innerHTML = '<p class="hint">Arrastra las cartas de aquí a la línea de tiempo. Al seleccionar una carta, podrás ver una descripción del evento.</p>';
  
  // Crear las cartas (agregando la descripción en dataset)
  const shuffledCards = shuffle(selectedEvents.slice());
  shuffledCards.forEach(event => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("draggable", "true");
    card.dataset.id = event.id;
    card.dataset.date = event.date;
    card.dataset.description = event.description;
    
    const img = document.createElement("img");
    img.src = event.img;
    img.alt = event.title;
    
    const titleP = document.createElement("p");
    titleP.classList.add("title");
    titleP.textContent = event.title;
    
    const dateP = document.createElement("p");
    dateP.classList.add("date");
    dateP.textContent = `(${event.date})`;
    dateP.style.display = "none";
    
    card.appendChild(img);
    card.appendChild(titleP);
    card.appendChild(dateP);
    
    card.addEventListener("dragstart", dragStart);
    // Al hacer click, agregar clase 'selected' y mostrar el detalle (solo descripción)
    card.addEventListener("click", () => {
      // Remover la clase "selected" de todas las cartas
      document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      showDetail(card);
    });
    
    cardsContainer.appendChild(card);
  });
}

// Función para mostrar detalle de la carta seleccionada (solo descripción)
function showDetail(card) {
  const description = card.dataset.description;
  detailDescription.textContent = description;
  detailPanel.style.display = "block";
}

// Función para iniciar el arrastre
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.closest(".card").dataset.id);
}

// Función para permitir el arrastre sobre una zona
function dragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add("over");
}

// Función para quitar la clase visual al salir de una zona
function dragLeave(e) {
  e.currentTarget.classList.remove("over");
}

// Función para soltar la carta en una dropzone
function dropCard(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text/plain");
  const card = document.querySelector(`.card[data-id='${id}']`);
  if (card) {
    if (e.currentTarget.firstChild) {
      cardsContainer.appendChild(e.currentTarget.firstChild);
    }
    e.currentTarget.appendChild(card);
  }
}

// Función para soltar la carta en el contenedor (para reubicarla)
function dropToContainer(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text/plain");
  const card = document.querySelector(`.card[data-id='${id}']`);
  if (card) {
    cardsContainer.appendChild(card);
  }
}

// Asignar eventos a las dropzones
document.querySelectorAll(".dropzone").forEach(zone => {
  zone.addEventListener("dragover", dragOver);
  zone.addEventListener("dragleave", dragLeave);
  zone.addEventListener("drop", dropCard);
});

// Asignar eventos al contenedor de cartas
cardsContainer.addEventListener("dragover", dragOver);
cardsContainer.addEventListener("dragleave", dragLeave);
cardsContainer.addEventListener("drop", dropToContainer);

// Evento para el botón de Comprobar Orden
checkButton.addEventListener("click", () => {
  attemptCount++;
  let correctCount = 0;
  document.querySelectorAll(".dropzone").forEach((zone, index) => {
    if (zone.firstChild) {
      const card = zone.firstChild;
      // Remover la clase 'selected' en caso de que se haya dejado
      card.classList.remove("selected");
      if (parseInt(card.dataset.id) === correctOrder[index]) {
        card.classList.add("correct"); // Sombra verde para acertadas
        const dateP = card.querySelector(".date");
        if (dateP) dateP.style.display = "block";
        correctCount++;
      }
    }
  });
  
  resultDiv.textContent = `Tienes ${correctCount} cartas correctas. Intento ${attemptCount} de ${maxAttempts}.`;
  
  if (correctCount === 5) {
    score = 5;
    resultDiv.textContent = `¡Excelente! Has colocado correctamente todas las cartas. Puntaje: ${score} - ¡Juego excelente!`;
    stopAllAudio();
    audioComplete.play();
    checkButton.style.display = "none";
    clearInterval(timerInterval);
    timerDiv.style.display = "none";
    restartButton.style.display = "inline-block";
  } else if (attemptCount >= maxAttempts) {
    score = correctCount;
    let mensaje = "";
    if (score === 0) {
      mensaje = `¡Has terminado la partida! No lograste ninguna carta correcta. Puntaje: ${score} - ¡Mucho ánimo, prepárate para la próxima ocasión!`;
      stopAllAudio();
      audioCeropuntos.play();
    } else {
      mensaje = `¡Has terminado la partida! Tienes ${score} cartas correctas. Puntaje: ${score} - ¡Sigue esforzándote!`;
      stopAllAudio();
      audioIncompleto.play();
    }
    resultDiv.textContent = mensaje;
    checkButton.style.display = "none";
    clearInterval(timerInterval);
    timerDiv.style.display = "none";
    restartButton.style.display = "inline-block";
  }
});

// Evento para el botón de Reiniciar Juego
restartButton.addEventListener("click", () => {
  bannerDiv.style.display = "block"; // Mostrar el banner al reiniciar
  startButton.style.display = "inline-block";
  checkButton.style.display = "none";
  resultDiv.style.display = "none";
  if (timerInterval) clearInterval(timerInterval);
  initializeGame(true);
  timerDiv.style.display = "none";
  detailPanel.style.display = "none";
});

// Evento para el botón de Comenzar
startButton.addEventListener("click", () => {
  document.querySelector(".instruction").textContent = "Arrastra las cartas de aquí a la línea de tiempo y ¡Adivina el orden de los acontecimientos!";
  bannerDiv.style.display = "none"; // Ocultar el banner al comenzar
  initializeGame(false);
  timerDiv.style.display = "block";
  cardsContainer.style.display = "flex";
  timelineDiv.style.display = "flex";
  checkButton.style.display = "inline-block";
  resultDiv.style.display = "block";
  startButton.style.display = "none";
  
  startTimer();
  
  stopAllAudio();
  audioInicio.play();
  audioInicio.onended = function() {
    audioFondo.play();
  };
});
