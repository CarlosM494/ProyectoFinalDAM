import processing.sound.*;

SoundFile song;
SoundFile boom;
PImage backgroundImage; // Imagen de fondo del lienzo
PImage circleImage1; // Imagen del círculo
PImage circleImage2; // Imagen del círculo
PImage rectImageA; // Imagen del rectángulo A
PImage rectImageB; // Imagen del rectángulo B
PImage rectImageC; // Imagen del rectángulo C
PImage rectImageD; // Imagen del rectángulo D
PImage projectileImage; // Imagen del proyectil
PImage projectileImage1;
PImage projectileImage2;

float amplitud = 30; // Amplitud del movimiento de sacudida
float velocidad = 0.05; // Velocidad de la animación

float circle1X, circle1Y; // Posición del círculo superior
float circle2X, circle2Y; // Posición del círculo inferior
float circleSize = 180; // Tamaño de los círculos
float speed1, speed2; // Velocidad de movimiento de los círculos
boolean direction1, direction2; // Dirección de movimiento de los círculos (true: derecha, false: izquierda)
boolean rectAActive = false; // Estado del rectángulo A (true: activo, false: inactivo)
boolean rectCActive = false; // Estado del rectángulo C (true: activo, false: inactivo)
boolean playSound = false; // Estado del reproducctor de la explosión (true: activo, false: inactivo)

boolean projectile1Active = false; // Estado del proyectil del círculo superior
boolean projectile2Active = false; // Estado del proyectil del círculo inferior
float projectile1X, projectile1Y; // Posición del proyectil del círculo superior
float projectile2X, projectile2Y; // Posición del proyectil del círculo inferior
float projectileSpeed = 35; // Velocidad de movimiento de los proyectiles
float projectileSize = 40; // Tamaño de los proyectiles

int scoreTeamA = 0; // Puntuación del equipo A
int scoreTeamB = 0; // Puntuación del equipo B

float fondoX; // Posición en el eje X del fondo
float fondoY; // Posición en el eje Y del fondo
float amplitudSacudida = 20; // Amplitud de la sacudida del fondo
float velocidadSacudida = 2; // Velocidad de la sacudida del fondo


void setup() {
  size(1080, 2400); // Tamaño del lienzo
  //fullScreen();
  backgroundImage = loadImage("background.png"); // Cargar la imagen de fondo
  circleImage1 = loadImage("airplane.png"); // Cargar la imagen del círculo
  circleImage2 = loadImage("submarine.png"); // Cargar la imagen del círculo
  rectImageA = loadImage("button1.png"); // Cargar la imagen del rectángulo A
  rectImageB = loadImage("button2.png"); // Cargar la imagen del rectángulo B
  rectImageC = loadImage("button1.png"); // Cargar la imagen del rectángulo C
  rectImageD = loadImage("button2.png"); // Cargar la imagen del rectángulo D
  projectileImage = loadImage("rocket.png"); // Cargar la imagen del proyectil
  projectileImage1 = loadImage("rocket2.png");
  projectileImage2 = loadImage("rocket.png");
  
  fondoX = width / 2; // Posición inicial del fondo en el centro del eje X
  fondoY = height / 2; // Posición inicial del fondo en el centro del eje Y  
  
  circle1X = width / 4; // Inicializar posición X del círculo superior a un cuarto del ancho del lienzo
  circle1Y = height / 4; // Inicializar posición Y del círculo superior a un cuarto de la altura del lienzo
  circle2X = 3 * width / 4; // Inicializar posición X del círculo inferior a tres cuartos del ancho del lienzo
  circle2Y = 3 * height / 4; // Inicializar posición Y del círculo inferior a tres cuartos de la altura del lienzo
  speed1 = 5; // Velocidad de movimiento del círculo superior
  speed2 = 5; // Velocidad de movimiento del círculo inferior
  direction1 = true; // Inicializar dirección de movimiento del círculo superior a la derecha
  direction2 = true; // Inicializar dirección de movimiento del círculo inferior a la derecha
  
  song = new SoundFile(this, "song.wav");
  boom = new SoundFile(this, "boom.wav");
  // Reproducir la canción
  song.play();
  
}


void draw() {
  background(backgroundImage); // Establecer la imagen de fondo
  
  background(0); // Limpiar el lienzo en cada iteración
  
  // Actualizar la posición del fondo con una sacudida lateral
  fondoX += velocidadSacudida;
  
  // Si el fondo se ha desplazado más allá de la amplitud de sacudida, invertir la dirección
  if (fondoX > width / 2 + amplitudSacudida || fondoX < width / 2 - amplitudSacudida) {
    velocidadSacudida *= -1;
  }
  
  // Dibujar el fondo en su posición actual
  imageMode(CENTER);
  image(backgroundImage, fondoX, fondoY);
  
  // Actualizar posición de los círculos
  circle1X += direction1 ? speed1 : -speed1; // Si direction1 es true, mover hacia la derecha; de lo contrario, mover hacia la izquierda
  circle2X += direction2 ? speed2 : -speed2; // Si direction2 es true, mover hacia la derecha; de lo contrario, mover hacia la izquierda
  
  // Verificar si los círculos han alcanzado los bordes del lienzo
  if (circle1X < 0 || circle1X > width) {
    direction1 = !direction1; // Cambiar la dirección del círculo superior
  }
  
  if (circle2X < 0 || circle2X > width) {
    direction2 = !direction2; // Cambiar la dirección del círculo inferior
  }
  
  
  // Dibujar los rectángulos
  if (rectAActive) {
    fill(0, 255, 0); // Color verde
  } else {
    fill(0); // Color negro
  }
  image(rectImageA, width / 4 - circleSize / 6, height / 8 - circleSize / 2, circleSize / 1, circleSize / 1); // Rectángulo a
  
  fill(0); // Color negro
  image(rectImageB, 3 * width / 4 - circleSize / 6, height / 8 - circleSize / 2, circleSize / 1, circleSize / 1); // Rectángulo b
  
  if (rectCActive) {
    fill(0, 255, 0); // Color verde
  } else {
    fill(0); // Color negro
  }
  image(rectImageC, width / 4 - circleSize / 6, 7 * height / 8 - circleSize / 4, circleSize / 1, circleSize / 1); // Rectángulo c
  
  fill(0); // Color negro
  image(rectImageD,3 * width / 4 - circleSize / 6, 7 * height / 8 - circleSize / 3.5, circleSize / 1, circleSize / 1); // Rectángulo d
  
  
  // Dibujar los círculos
  image(circleImage1, circle1X, circle1Y, circleSize, circleSize); // Dibujar círculo superior
  image(circleImage2, circle2X, circle2Y, circleSize, circleSize); // Dibujar círculo inferior
  
  // Actualizar posición de los proyectiles del círculo superior e inferior
  if (projectile1Active) {
    projectile1Y += projectileSpeed; // Mover el proyectil superior hacia abajo
    if (projectile1Y > height) {
      projectile1Active = false; // Desactivar el proyectil superior cuando toca el final del lienzo
    }
    
    // Verificar colisión con el círculo inferior
    if (projectile1X >= circle2X - circleSize / 2 && projectile1X <= circle2X + circleSize / 2 &&
      projectile1Y >= circle2Y - circleSize / 2 && projectile1Y <= circle2Y + circleSize / 2) {
      scoreTeamA++; // Incrementar la puntuación del equipo A
      boom.play();
      projectile1Active = false; // Desactivar el proyectil superior
    }
  }
  
  if (projectile2Active) {
    projectile2Y -= projectileSpeed; // Mover el proyectil inferior hacia arriba
    if (projectile2Y < 0) {
      projectile2Active = false; // Desactivar el proyectil inferior cuando toca el final del lienzo
    }
    
    // Verificar colisión con el círculo superior
    if (projectile2X >= circle1X - circleSize / 2 && projectile2X <= circle1X + circleSize / 2 &&
      projectile2Y >= circle1Y - circleSize / 2 && projectile2Y <= circle1Y + circleSize / 2) {
      scoreTeamB++; // Incrementar la puntuación del equipo B
      boom.play();
      projectile2Active = false; // Desactivar el proyectil inferior
    }
  }

  
  // Dibujar los proyectiles
  if (projectile1Active) {
    image(projectileImage1, projectile1X, projectile1Y, projectileSize, projectileSize); // Dibujar proyectil superior
  }
  
  if (projectile2Active) {
    image(projectileImage2, projectile2X, projectile2Y, projectileSize, projectileSize); // Dibujar proyectil inferior
  }
  
  // Mostrar marcador
  fill(0); // Color negro
  textSize(50); // Tamaño de fuente
  textAlign(CENTER, CENTER); // Alineación del texto
  text("AIRPLANE: " + scoreTeamA, width / 2 - 300, 1500); // Puntuación del equipo A
  text("SUBMARINE: " + scoreTeamB, width / 2 + 300, 1500); // Puntuación del equipo B
}

  
public void mousePressed() {
  // Verificar si se hizo clic en los rectángulos A, B, C y D
  if (mouseX >= 70 && mouseX < width / 4 && mouseY > 70 && mouseY < height / 8) {
    rectAActive = !rectAActive; // Cambiar el estado del rectángulo A
    direction1 = !direction1; // Cambiar la dirección del círculo superior
  } else if (mouseX > 3 * width / 4 - circleSize / 2 && mouseX < 3 * width / 4 && mouseY > height / 8 - circleSize / 2 && mouseY < height / 7) {
    if (!projectile1Active) {
      projectile1X = circle1X; // Posicionar el proyectil superior en la posición actual del círculo superior
      projectile1Y = circle1Y; // Posicionar el proyectil superior en la posición actual del círculo superior
      projectile1Active = true; // Activar el proyectil superior
    }
  } else if (mouseX > width / 4 - circleSize / 2 && mouseX < width / 4 && mouseY > 7 * height / 8 - circleSize / 2 && mouseY < 7 * height / 8) {
    rectCActive = !rectCActive; // Cambiar el estado del rectángulo C
    direction2 = !direction2; // Cambiar la dirección del círculo superior
  } else if (mouseX > 3 * width / 4 - circleSize / 2 && mouseX < 3 * width / 4 && mouseY > 7 * height / 8 - circleSize / 2 && mouseY < 7 * height / 8) {
    if (!projectile2Active) {
      projectile2X = circle2X; // Posicionar el proyectil inferior en la posición actual del círculo inferior
      projectile2Y = circle2Y; // Posicionar el proyectil inferior en la posición actual del círculo inferior
      projectile2Active = true; // Activar el proyectil inferior
    }
  } 
}
