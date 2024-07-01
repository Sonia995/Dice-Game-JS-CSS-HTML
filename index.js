const playButton1 = document.querySelector(".botonJug1");
const playButton2 = document.querySelector(".botonJug2");

let resultadoJugador1 = 0;
let resultadoJugador2 = 0;
let dadosJugador1, dadosJugador2;

var rondaCount = 1;
document.querySelector(".numeroRonda").innerHTML = rondaCount;

playButton2.classList.add("refreshButtonAnimation");

//DADOS JUGADOR 1

playButton1.addEventListener("click", function playJug1() {
  let manoJugador1 = [];
  let dadosJugador1 = document.querySelectorAll(".img1");
  let contador1 = document.querySelector(".contador1");

  // Crear 5 numeros random y asignar a cada img los números creados
  // Primer bucle
  for (let i = 0; i < 5; i++) {
    const randomNumbersPlayer1 = Math.floor(Math.random() * 6) + 1;
    manoJugador1.push(randomNumbersPlayer1);
    console.log(manoJugador1);
  }

  // Segundo bucle con retardo entre imágenes
  for (let j = 0; j < manoJugador1.length; j++) {
    // Utilizar una función para crear un ámbito de bloque. Esta técnica, conocida como el patrón de función inmediata o
    // IIFE (Immediately Invoked Function Expression), permite que la función anónima capture el valor actual de j
    // para cada iteración del bucle, evitando así el problema del cierre del bucle
    (function (indice) {
      setTimeout(function () {
        dadosJugador1[indice].src =
          "./images/dice" + manoJugador1[indice] + ".png";
        dadosJugador1[indice].classList.add("shakeDice");
        // Remover la clase "shakeDice" después de 1000 milisegundos
        setTimeout(function () {
          dadosJugador1[indice].classList.remove("shakeDice");
        }, 1000);
      }, j * 500); // El retardo es de medio segundo (500 milisegundos) multiplicado por el índice para la animación y para cada img
    })(j);
  }

  //Resultado Jugador 1
  resultadoJugador1 = manoJugador1.reduce((total, valor) => total + valor, 0);

  setTimeout(() => {
    document.querySelector(".resultado1").innerHTML = resultadoJugador1;
    contador1.classList.add("marcadorAnimation");
    playButton1.setAttribute("value", "Espera");
    playButton2.setAttribute("value", "Tu turno");
    playButton1.classList.add("refreshButtonAnimation");
    playButton2.classList.remove("refreshButtonAnimation");
  }, 2000);

  setTimeout(() => {
    contador1.classList.remove("marcadorAnimation");
  }, 3000);
});

// DADOS JUGADOR 2

playButton2.addEventListener("click", function playJug2() {
  let manoJugador2 = [];
  dadosJugador2 = document.querySelectorAll(".img2");

  let contador2 = document.querySelector(".contador2");

  // Crear 5 numeros random y asignar a cada img los números creados
  // Primer bucle
  for (let i = 0; i < 5; i++) {
    const randomNumbersPlayer2 = Math.floor(Math.random() * 6) + 1;
    manoJugador2.push(randomNumbersPlayer2);
    console.log(manoJugador2);
  }

  // Segundo bucle con retardo entre imágenes
  for (let j = 0; j < manoJugador2.length; j++) {
   (function (indice) {
      setTimeout(function () {
        dadosJugador2[indice].src =
          "./images/dice" + manoJugador2[indice] + ".png";
        dadosJugador2[indice].classList.add("shakeDice");
        setTimeout(function () {
          dadosJugador2[indice].classList.remove("shakeDice");
        }, 1000);
      }, j * 500); 
    })(j);
  }

  // Resultado Jugador 2
  resultadoJugador2 = manoJugador2.reduce((total, valor) => total + valor, 0);

  setTimeout(() => {
    document.querySelector(".resultado2").innerHTML = resultadoJugador2;
    contador2.classList.add("marcadorAnimation");
    playButton2.setAttribute("value", "Espera");
    playButton1.setAttribute("value", "Tu turno");
    playButton2.classList.add("refreshButtonAnimation");
    playButton1.classList.remove("refreshButtonAnimation");
  }, 2000);

  setTimeout(() => {
    contador2.classList.remove("marcadorAnimation");
  }, 3000);

  setTimeout(() => {
    document.querySelector(".numeroRonda").innerHTML = ++rondaCount;
    totalizar();
  }, 3000);
});

//Totales

let totalJug1 = 0;
let totalJug2 = 0;

function totalizar() {
  let title = document.querySelector("h1");
  let marcador = document.querySelector(".marcador");

  if (resultadoJugador1 > resultadoJugador2) {
    totalJug1++;
    document.querySelector(".total1").innerHTML = totalJug1;
    title.innerHTML = "Gana Jugador 1";
  } else if (resultadoJugador2 > resultadoJugador1) {
    totalJug2++;
    document.querySelector(".total2").innerHTML = totalJug2;
    title.innerHTML = "Gana Jugador 2";
  } else {
    document.querySelector(".total1").innerHTML = totalJug1;
    document.querySelector(".total2").innerHTML = totalJug2;
    title.innerHTML = "¡Empate!";
  }

  title.classList.add("h1Animated");
  marcador.classList.add("marcadorAnimation");

  setTimeout(() => {
    title.classList.remove("h1Animated");
    marcador.classList.remove("marcadorAnimation");
    document.querySelector(".resultado1").innerHTML = "0";
    document.querySelector(".resultado2").innerHTML = "0";
  }, 2000);
}
