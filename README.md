# 🌿 U K'áax: Guardianes de la Tierra

¡Bienvenido al código fuente completo de **U K'áax: Guardianes de la Tierra**, un videojuego educativo retro de aventuras, preservación de la naturaleza y aprendizaje del idioma maya (*maaya t'aan*)!

---

## 📥 ¿Cómo descargar este proyecto a tu computadora?

En la esquina superior de la interfaz de **Google AI Studio**:
1. Busca el botón de **Descargar / Exportar código** (ícono de descarga o menú de tres puntos `...` > *Download / Export Project*).
2. Descarga el archivo comprimido **`.zip`** a tu computadora.
3. Haz clic derecho sobre el archivo descargado y selecciona **"Extraer todo..."** (o descomprímelo en una carpeta de tu preferencia, por ejemplo en `Documentos/UKaax` o en el `Escritorio`).

---

## 🚀 Cómo abrir y correr el juego en Visual Studio Code

### Paso 1: Requisitos previos en tu computadora
- **Visual Studio Code**: Si no lo tienes, descárgalo gratis desde [https://code.visualstudio.com/](https://code.visualstudio.com/).
- **Node.js**: Si no lo tienes instalado, descárgalo e instálalo desde [https://nodejs.org/](https://nodejs.org/) (se recomienda la versión **LTS**).
  - Para comprobar que lo tienes listo, abre cualquier terminal y escribe:
    ```bash
    node -v
    npm -v
    ```
    *(Si te muestra versiones como v18 o v20 y npm 9 o 10, ¡estás listo!)*.

---

### Paso 2: Abrir la carpeta en Visual Studio Code
1. Abre **Visual Studio Code**.
2. En el menú superior izquierdo haz clic en:
   **Archivo (File) > Abrir Carpeta... (Open Folder...)**
3. Selecciona la carpeta que acabas de descomprimir (la que contiene `package.json`, `src/`, `public/`, etc.).

---

### Paso 3: Abrir la Terminal de Visual Studio Code
1. En el menú superior de Visual Studio Code ve a: **Terminal > Nueva Terminal** (o usa el atajo `Ctrl + ~` / `Ctrl + ñ`).
2. Aparecerá la consola en la parte inferior de tu pantalla.

---

### Paso 4: Instalar las dependencias
En la terminal escribe este comando y presiona `Enter`:
```bash
npm install
```
*(Esto descargará automáticamente React, Vite, Tailwind CSS y las librerías necesarias)*.

---

### Paso 5: Iniciar el juego
Una vez terminada la instalación, escribe en la terminal:
```bash
npm run dev
```

Verás un mensaje similar a este:
```text
  VITE v8.3.0  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

### Paso 6: Jugar en tu navegador
- Mantén presionada la tecla `Ctrl` y haz clic en el enlace `http://localhost:3000/` que aparece en la terminal.
- O abre tu navegador web favorito (Google Chrome, Edge, Brave, etc.) e ingresa a:
  👉 **`http://localhost:3000`**

---

## 🎮 Nuevo Flujo de Pantalla de Inicio

1. **Pantalla de Inicio Cinematográfica**:
   - Presenta el paisaje interactivo completo con sol brillante, nubes flotando, pájaros, mariposas, luciérnagas, montañas y la pirámide maya central con los escenarios flotantes.
   - Presiona la tecla **[Enter]** (o haz clic en el botón dorado **`▶ ENTER PARA INICIAR`**).
2. **Ventana de Registro del Guardián**:
   - Se abrirá la ventana emergente para que escribas tu **Nombre de Usuario / Guardián**, elijas tu **Avatar retro** (🧑🏽‍🌾, 🧝🏽, 🧑🏽, 👩🏽‍🌾, 🧒🏽, 🐆) y el nombre de tu **Guía NPC** (por defecto *Ixchel*).
3. **Segundo [Enter] para acceder al Mapa**:
   - Al volver a presionar **[Enter]** (o dar clic en **`▶ ENTER PARA ENTRAR AL MAPA`**), accedes de inmediato al mapa con **todos los minijuegos desbloqueados** para jugar libremente.

---

## 📁 Estructura del Proyecto

```text
├── public/
│   └── assets/
│       ├── escenarios/          # Imágenes PNG de los escenarios y minijuegos
│       │   ├── casa.png         # Minijuego 1: Canoa en el río
│       │   ├── escuela.png      # Minijuego 2: Clasificación de residuos
│       │   ├── parque.png       # Minijuego 3: Siembra sagrada
│       │   ├── kaax.png         # Minijuego 4: Rescate en la selva
│       │   ├── memoria.png      # Minijuego 5: Códice de memoria
│       │   ├── construye.png    # Minijuego 6: Construye la palabra
│       │   ├── mercado.png      # Minijuego 7: Mercado sustentable
│       │   ├── templo.png       # Minijuego 8: Templo de los guardianes
│       │   └── portada.png      # Arte de portada oficial
│       ├── diccionario/         # Diccionario maya en PDF
│       │   └── diccionario-palabras-mayas.pdf
│       └── audio/               # Carpeta lista para tus canciones y audios personalizados
├── src/
│   ├── components/
│   │   ├── TitleScreen.tsx      # Portada animada + modal de registro con Enter
│   │   ├── MapSelectScreen.tsx  # Mapa con selector de los 8 minijuegos
│   │   ├── HUD.tsx              # Barra arcade superior de vidas y tiempo
│   │   ├── MayaQuizModal.tsx    # Preguntas de los sabios NPC
│   │   ├── MayaTetsScreen.tsx   # Modo Quiz / MayaTets
│   │   ├── VictoryScreen.tsx    # Pantalla de victoria con glosario
│   │   └── minigames/           # Componentes de cada minijuego interactivo
│   │       ├── CanoaGame.tsx    # Minijuego 1: Canoa recolectora en el río
│   │       ├── ClasificaGame.tsx# Minijuego 2: Contenedores orgánico/reciclable
│   │       ├── SiembraGame.tsx  # Minijuego 3: Plantación ecológica
│   │       ├── RescateGame.tsx  # Minijuego 4: Rescate de fauna nativa
│   │       ├── MemoriaGame.tsx  # Minijuego 5: Cartas y glifos mayas
│   │       ├── ConstruyeGame.tsx# Minijuego 6: Letras y vocabulario
│   │       ├── MercadoGame.tsx  # Minijuego 7: Comercio sustentable
│   │       └── TemploGame.tsx   # Minijuego 8: Desafío final del templo
│   ├── data/
│   │   └── levels.ts            # Datos de niveles, vocabulario y misiones
│   ├── services/
│   │   └── sound.ts             # Efectos de sonido arcade generados por Web Audio API
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── App.tsx                  # Enrutador principal de pantallas
│   ├── index.css                # Estilos Tailwind CSS y animaciones retro
│   └── main.tsx                 # Entrada React 19
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración TypeScript
└── vite.config.ts               # Servidor de desarrollo Vite
```
