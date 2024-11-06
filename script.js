function goToScreen(screenId) {
    const currentScreen = document.querySelector('.screen:not(.hidden)');
  
    // Transición de salida de la pantalla actual hacia arriba
    if (currentScreen) {
      gsap.to(currentScreen, {
        y: -100,         // Mueve la pantalla actual hacia arriba
        opacity: 0,     // Reduce opacidad para desvanecer
        duration: 0.5,  // Duración de la animación
        onComplete: () => {
          currentScreen.classList.add('hidden');
          gsap.set(currentScreen, { y: 0, opacity: 1 }); // Resetea la posición y opacidad
        }
      });
    }
  
    // Transición de entrada para la nueva pantalla desde abajo
    const nextScreen = document.getElementById(screenId);
    nextScreen.classList.remove('hidden');
    gsap.fromTo(nextScreen, 
      { y: 50, opacity: 0 },  // Inicia desde abajo con opacidad 0
      { y: 0, opacity: 1, duration: 0.4 } // Llega a su posición original
    );
  
    // Activa la explosión de sushi en la pantalla more-info
    if (screenId === 'more-info') {
      sushiExplosion();
    }
  }
  
  // Función para crear la explosión de sushi
  function sushiExplosion() {
    const container = document.getElementById('more-info');
    const emojiCount = 50; // Número de emojis en la explosión
  
    for (let i = 0; i < emojiCount; i++) {
      const sushi = document.createElement('div');
      sushi.classList.add('sushi-emoji');
      sushi.textContent = '🍣';
      container.appendChild(sushi);
  
      // Posiciona el emoji en el centro del contenedor
      sushi.style.left = '50%';
      sushi.style.top = '50%';
  
      // Anima el emoji para que se mueva en una dirección aleatoria hacia arriba
      gsap.fromTo(sushi, 
        { opacity: 1, x: 0, y: 0, scale: 1 },
        { 
          opacity: 0, 
          x: (Math.random() - 0.5) * 300, 
          y: (Math.random() - 1) * 600, // Valor ajustado para moverse hacia arriba
          scale: 0.5,
          duration: 2.5, 
          ease: "power2.out",
          onComplete: () => sushi.remove() // Elimina el emoji después de la animación
        }
      );
    }
  }
  