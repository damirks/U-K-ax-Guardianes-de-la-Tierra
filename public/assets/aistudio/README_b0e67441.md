# U K'áax: Guardianes de la Tierra — proyecto completo

Videojuego educativo 2D sobre el maya yucateco (maaya t'aan), separado en sus archivos
HTML, CSS y JavaScript para trabajarlo cómodamente en Visual Studio Code.

## Abrir en Visual Studio Code
1. Extrae esta carpeta (`UKaaxGuardianes_VisualStudio_Completo`) en tu computadora.
2. En VS Code, ve a **Archivo > Abrir carpeta...** y selecciona esta carpeta.
3. Instala la extensión **Live Server** (si no la tienes): ícono de Extensiones
   (Ctrl+Shift+X), busca "Live Server", instala.
4. Haz clic derecho sobre `index.html` y elige **"Open with Live Server"**.
5. Si no ves la opción, confirma que la carpeta sea de confianza y que la
   extensión esté habilitada.

También puedes abrir `index.html` con doble clic desde el explorador de
archivos para probarlo directo en el navegador, sin instalar nada.

## Estructura del proyecto
```
index.html                     → estructura del juego (HTML)
style.css                      → todos los estilos visuales
script.js                      → toda la lógica del juego (JavaScript)
assets/escenarios/
  portada.png                  → ilustración de la pantalla de inicio
  casa.png                     → ícono del minijuego "La Na' (Casa)"
  escuela.png                  → ícono del minijuego "La Escuela"
  parque.png                   → ícono del minijuego "El Parque"
  kaax.png                     → ícono del minijuego "El K'áax"
  memoria.png                  → ícono del minijuego "Memoria Maya" (pendiente)
  construye.png                → ícono del minijuego "Construye la Palabra" (pendiente)
  mercado.png                  → ícono del minijuego "El Mercado Maya" (pendiente)
  templo.png                   → ícono del minijuego "El Templo de las Palabras" (pendiente)
assets/diccionario/
  diccionario-palabras-mayas.pdf → diccionario de referencia usado para
  verificar el vocabulario maya del juego
```

## Minijuegos nuevos (5 a 8)
Se agregaron cuatro minijuegos nuevos que funcionan igual que los primeros
cuatro: se desbloquean en orden, tienen 3 oportunidades para superarse,
suman palabras al glosario final y usan la misma pantalla de "Entrar al
minijuego" con su propia tarjeta en "Elige tu aventura".

- **Memoria Maya** (`memoria`) — voltea tarjetas y empareja cada palabra
  maya con su significado en español. 8 parejas, 100 segundos.
- **Construye la Palabra** (`construye`) — ordena las letras (incluyendo
  apóstrofos y acentos) para formar la palabra maya que corresponde a una
  imagen. 6 palabras, 140 segundos, con pista progresiva si te equivocas.
- **El Mercado Maya** (`mercado`) — un personaje te pide un objeto en maya
  y debes tocar el ícono correcto entre los del puesto. 6 misiones, 5
  oportunidades de error.
- **El Templo de las Palabras** (`templo`) — repaso final con 4 puertas
  progresivas (significado, letras, imágenes y una prueba final de 3
  preguntas) y una barra de progreso. 3 vidas compartidas entre puertas.

### Sobre los íconos de estos 4 minijuegos
Tal como se habló, los íconos de estos 4 minijuegos (como los que ya
tienen los primeros cuatro) los agregas tú manualmente. El código ya los
está esperando: cuando guardes tus imágenes en `assets/escenarios/` con
exactamente estos nombres —
`memoria.png`, `construye.png`, `mercado.png`, `templo.png` — aparecerán
solas en las tarjetas de selección, sin tocar nada más. Mientras no
existan esos archivos, cada tarjeta muestra automáticamente el emoji del
minijuego (🧠 🔤 🧺 🗿) para que no se vea roto.

## Notas
- El juego no depende de conexión a internet salvo para cargar la tipografía
  "Press Start 2P" de Google Fonts; si no hay internet, usa una tipografía de
  respaldo y el juego sigue funcionando igual.
- El vocabulario maya incluido fue verificado contra el diccionario de
  referencia incluido en `assets/diccionario/`. Aun así, antes de usarlo como
  entregable escolar es buena idea que alguien hablante de maaya t'aan lo
  revise una vez más.


## Añadir tu música (ya está preparado)
1. Abre la carpeta del proyecto y entra en `assets/audio/`.
2. Copia ahí el archivo de audio que descargaste.
3. Renómbralo exactamente `musica.mp3` (si es MP3). La ruta debe quedar `assets/audio/musica.mp3`.
4. Abre `index.html` con Live Server y pulsa **ENTER PARA INICIAR**. La música empezará tras ese clic, porque los navegadores no permiten normalmente reproducir sonido automáticamente antes de una interacción.
5. Usa el botón 🔊 de la esquina superior derecha para silenciar o reactivar la música y los efectos.

**Si tu archivo no es MP3:** convierte/exporta una copia a MP3 o dime su extensión para ajustar la ruta y el código. No pongas el audio en `assets/escenarios/`; debe ir en `assets/audio/`. El nombre debe ser exactamente `musica.mp3`, respetando la extensión.

## Rediseño de 3 minijuegos (versión nueva)
Los minijuegos de **La Escuela**, **El Campo** (antes El Parque) y **El K'áax** se rediseñaron. Conservan sus iconos, su escenario y su lugar en el progreso.

- **La Escuela · Clasifica la basura:** los residuos caen y tú eliges el contenedor correcto. Hay 4 contenedores según la clasificación mexicana (LGPGIR): Orgánico (verde), Reciclable (azul), No reciclable (gris) y Peligroso (rojo). Cada respuesta explica por qué. Ganas con 10 correctos y pierdes con 3 errores.
- **El Campo · Siembra en el campo:** la vista es desde arriba. Solo puedes plantar en el campo verde, en los cuadros café de suelo dañado. El pueblo no se siembra. Necesitas plantar 8 árboles.
- **El K'áax · Rescata la fauna de México:** la selva está oscura y solo ves a los animales cuando los iluminas con tu linterna. Rescata 4 de 5 especies en riesgo de México en 75 segundos. Cada rescate explica la especie.

Palabras mayas usadas en estos minijuegos: ja'as, janal, ju'un, ja', che', ya'ax che', lu'um, iik', báalam, áak, kuuts y k'áax. Guacamaya, manatí y vaquita marina aparecen solo en español, porque no hay una palabra maya verificada para ellas. Conviene que lo revise un hablante de maaya t'aan.
