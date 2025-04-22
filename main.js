const palabras = [
    "javascript", "ahorcado", "computadora", "teclado", "raton", "pantalla",
    "internet", "codigo", "variable", "funcion", "programa", "sintaxis",
    "bucle", "condicional", "navegador", "desarrollador", "depurar", "framework",
    "backend", "frontend", "servidor", "cliente", "base", "datos", "objeto",
    "clase", "modulo", "evento", "asincrono", "promesa", "recurso", "memoria",
    "logica", "algoritmo", "estructura", "vector", "matriz", "array", "string",
    "booleano", "numero", "caracter", "constante", "lenguaje", "ingeniero", "software",
    "hardware", "bit", "byte"
  ];
  
  let palabraSecreta = "";
  let errores = 0;
  
  const maxErrores = 7;
  const teclado = document.getElementById("teclado");
  const contenedorPalabra = document.getElementById("contenedor-palabra");
  const partes = document.querySelectorAll(".parte");
  const btnReiniciar = document.getElementById("reiniciar");
  
  function iniciarJuego() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    errores = 0;
  
    for (let letra of palabraSecreta) {
      const span = document.createElement("span");
      span.textContent = "‎ ";
      contenedorPalabra.appendChild(span);
    }
  
    for (let i = 65; i <= 90; i++) {
      const letra = String.fromCharCode(i);
      const boton = document.createElement("button");
      boton.textContent = letra;
      boton.addEventListener("click", () => comprobarLetra(letra.toLowerCase(), boton));
      teclado.appendChild(boton);
    }
  
    function comprobarLetra(letra, boton) {
      boton.disabled = true;
      let acierto = false;
      const spans = contenedorPalabra.querySelectorAll("span");
  
      palabraSecreta.split("").forEach((letraPalabra, i) => {
        if (letraPalabra === letra) {
          spans[i].textContent = letra;
          acierto = true;
        }
      });
  
      if (!acierto) {
        partes[errores].style.display = "block";
        errores++;
        if (errores === maxErrores) {
          alert("¡Perdiste! La palabra era: " + palabraSecreta);
          desactivarTeclado();
        }
      } else if ([...spans].every(span => span.textContent !== "‎ ")) {
        alert("¡Ganaste!");
        desactivarTeclado();
      }
    }
  
    function desactivarTeclado() {
      const botones = teclado.querySelectorAll("button");
      botones.forEach(boton => boton.disabled = true);
    }
  }
  
  btnReiniciar.addEventListener("click", () => {
    contenedorPalabra.replaceChildren();
    teclado.replaceChildren();
    partes.forEach(parte => parte.style.display = "none");
    iniciarJuego();
  });
  

  document.addEventListener("keydown", manejarTecla);
  function manejarTecla(e) {
    const letra = e.key.toLowerCase();
  

    if (letra.match(/^[a-z]$/)) {
     
      const boton = Array.from(teclado.querySelectorAll("button"))
        .find(b => b.textContent.toLowerCase() === letra && !b.disabled);
  
      if (boton) {
        boton.click(); 
      }
    }
  }

  iniciarJuego();