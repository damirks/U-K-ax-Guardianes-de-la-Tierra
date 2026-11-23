# Minijuego «Cada gota cuenta: Guardianes del agua»

Integración de una nueva experiencia jugable interactiva de observación, diagnóstico y toma de decisiones ambientales en el hogar, mostrando una vivienda en corte transversal con 8 desafíos distribuidos entre cocina, baño, patio, área de lavado y tuberías, con retroalimentación formativa y cálculo de agua conservada.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas con el usuario en Fase 1:**
> - **Ubicación en el mapa**: Se integra como un nuevo santuario jugable en el mapa de selección de escenarios (`La Na' Ecoahorradora` / `Cada gota cuenta`), con su propio ícono pixel art proporcionado por el usuario (`Insignia_Pixel_de_Casa_Ecoahorradora_bcd27be2.png`).
> - **Mecánica de descubrimiento**: Exploración libre e interactiva haciendo clic directamente en las habitaciones y tuberías de la vivienda en corte transversal.
> - **Compatibilidad total**: Se preserva la navegación existente (HUD, logros, perfiles de jugador, guía NPC maya y pantalla final de victoria solo al completar la totalidad de santuarios).

---

## 1. Overview & Core Concept

- **Qué hace**: Permite al jugador interactuar con una vivienda completa ilustrada en vista de corte frontal/transversal. El jugador inspecciona las habitaciones (Cocina, Baño, Patio, Lavado, Tuberías subterráneas), identifica anomalías o descuidos hídricos activos (marcardos con alertas visuales y gotas animadas), abre un panel de análisis donde elige entre 3 alternativas de solución, y recibe explicaciones pedagógicas sobre el impacto de su decisión.
- **Público objetivo**: Jugadores y estudiantes que aprenden sobre preservación ecológica y la cultura maya de respeto por el agua (*Ja'*), fomentando hábitos concretos aplicables en su vida diaria.
- **Valor formativo**: Supera los cuestionarios estáticos al convertir la detección de fugas y el aprovechamiento de lluvia en una simulación visual viva y gratificante, cuantificando la cantidad estimada de agua potable protegida (en litros educativos) y otorgando un nuevo logro sagrado de Guardián.

---

## 2. User Experience & Visual Design

### Flujo de Experiencia del Usuario
1. **Acceso**: El jugador selecciona el santuario en el mapa con la insignia pixel-art de la casa ecoahorradora.
2. **Modal de Introducción**: Guía maya explica la misión: *"El agua (Ja') es sagrada. Recorre cada rincón de este hogar y conviértete en un Guardián del Agua antes de que pasen los 60 segundos."*
3. **Escenario Principal (Corte Transversal)**:
   - Vista frontal ilustrada de dos niveles más patio y cimientos de tuberías.
   - Habitaciones iluminadas con estética pixel/vector maya:
     - **Cocina**: Fregadero con grifo abierto, lavado de vegetales en tazón vs chorro continuo.
     - **Baño**: Ducha que gotea, inodoro con depósito descalibrado, cepillado de dientes con vaso.
     - **Área de Lavado**: Lavadora con carga incompleta, reutilización de agua jabonosa para pisos.
     - **Patio exterior**: Captación pluvial en cisterna/tambos, riego de plantas al mediodía vs atardecer.
     - **Sistema de Tuberías**: Fuga oculta subterránea que humedece los cimientos.
4. **Ciclo de Desafío en 3 Etapas**:
   - *Etapa 1 (Identificación)*: Pulso visual o gota titilante sobre el elemento. El jugador pulsa sobre el espacio afectado.
   - *Etapa 2 (Decisión)*: Panel modal elegante con la ilustración del problema, descripción clara y 3 opciones táctiles.
   - *Etapa 3 (Retroalimentación)*: Si acierta, animación positiva de agua limpia, suma puntos (+100 pts), suma litros conservados (+15L a +50L educativos) y el problema en la casa queda visualmente reparado. Si falla, se explica con claridad por qué la opción no ahorra agua y se descuenta 1 oportunidad (de 3).
5. **Pantalla de Resultados del Nivel**: Muestra puntuación final, desafíos resueltos (ej. 8/8), total de agua conservada estimada (ej. *240 Litros Educativos Salva-Cenotes*), y mensaje del Guía Ancestral.

### Sistema Visual y Paleta (60-30-10)
- **60% Lienzo y Estructura**: Fondos de corte de vivienda en tonos cálidos de arcilla y madera maya (`#1c1917`, `#292524`), paredes interiores pastel suaves con textura de piedra tallada.
- **30% Paneles y Superficies**: Cajas de diálogo en slate profundo (`#0f172a`), bordes de oro viejo (`#f59e0b`, `#d97706`) acordes con la identidad de U K'áax.
- **10% Acentos Focalizados**: Azul cenote cristalino (`#0ea5e9`, `#38bdf8`) para el agua conservada y gotas vivas; verde esmeralda (`#10b981`) para éxitos; ámbar/coral (`#f59e0b`, `#ef4444`) para advertencias y pérdidas de vidas.
- **Tipografía**: Títulos en display font pixel/heading de U K'áax (`font-pixel`), números tabulares (`font-mono tabular-nums`), y textos pedagógicos claros y legibles (`font-body`).

---

## 3. Key Product Decisions & Trade-Offs

- **Perspectiva de Corte Transversal vs. Avatar caminante**:
  - *Decisión*: Se utiliza un plano arquitectónico transversal interactivo (estilo casa de muñecas / blueprint ilustrado) donde el jugador hace clic directo en las zonas problemáticas.
  - *Razón*: Cumple estrictamente la indicación de no usar un NPC que camina, agilizando el ritmo de juego y permitiendo una visión panorámica de toda la red hidráulica del hogar.
- **Unidad de Agua Conservada**:
  - *Decisión*: Mostrar *«Litros Educativos de Ja'»* con equivalencias contextuales comprensibles (ej. "Equivale a 12 garrafones de agua para la comunidad").
  - *Razón*: Respeta el requerimiento de que sean estimaciones pedagógicas claras y no métricas de laboratorio confusas.
- **8 Situaciones Únicas y Variadas**:
  - 1. Grifo de cocina goteando mientras no se usa.
  - 2. Lavado de frutas y verduras (chorro directo vs recipiente hondo reutilizable).
  - 3. Ducha de 15 minutos vs baño de 5 minutos cerrando la llave al enjabonarse.
  - 4. Inodoro con fuga continua en el sapito/válvula de descarga.
  - 5. Cepillado dental (dejar correr el agua vs usar un vaso con agua).
  - 6. Ciclo de lavadora con solo 2 prendas vs carga completa eficiente.
  - 7. Riego de plantas bajo el sol del mediodía vs riego al atardecer para evitar evaporación.
  - 8. Captación pluvial en el tejado guiada a cisterna filtrada vs drenaje desperdiciado.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    App.tsx (Main Controller)                 │
│  - Level registry: 9 Levels (incluyendo 'gotas' / Eco-hogar) │
│  - Active level, attemptsUsed, completed, achievements       │
└──────────────┬───────────────────────────────┬───────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│     MapSelectScreen.tsx      │ │       GameHUD.tsx            │
│  - Santuario La Na' Ahorro   │ │  - Vidas: 3 / 3              │
│  - Insignia pixel-art nueva  │ │  - Timer: 60s regresivo      │
│  - Acceso directo a logros   │ │  - Progreso: 8 desafíos      │
└──────────────┬───────────────┘ └─────────────┬────────────────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
┌──────────────────────────────────────────────────────────────┐
│             CadaGotaCuentaGame.tsx (Nuevo Componente)        │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ HouseCrossSectionView:                                   │ │
│ │ - SVG/CSS Cross-section layout (Cocina, Baño, Patio, etc)│ │
│ │ - Animated dripping particles & interactive hotspot pins │ │
│ └────────────────────────────┬─────────────────────────────┘ │
│                              ▼                               │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ WaterChallengeModal (3-Etapas):                          │ │
│ │ 1. Diagnóstico del problema con ilustración              │ │
│ │ 2. Selección de 3 soluciones interactivas                │ │
│ │ 3. Retroalimentación formativa y cálculo de litros       │ │
│ └────────────────────────────┬─────────────────────────────┘ │
│                              ▼                               │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ WaterSummaryModal:                                       │ │
│ │ - Litros educativos conservados                          │ │
│ │ - Desafíos completados (8/8)                             │ │
│ │ - Desbloqueo del logro «Guardián del Agua Sagrada»       │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Entidades y Estados del Minijuego
- `WaterSituation`:
  ```ts
  interface WaterSituation {
    id: string;
    room: 'cocina' | 'bano' | 'lavado' | 'patio' | 'tuberias';
    roomTitle: string;
    title: string;
    problemDesc: string;
    icon: string;
    coordinates: { x: number; y: number }; // Posición relativa % en la casa
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
      waterSavedLiters: number;
    }[];
    solved: boolean;
  }
  ```
- **Integración con Vocabulario Maya**: Se vinculan términos sagrados: *Ja'* (agua), *Otoch* (casa/hogar), *Ch'a' ja'* (lluvia/recolectar agua), *Utsil* (bueno/correcto).
- **Nuevo Logro de Guardián**: `guardian_del_agua` (*Yáax Ja'* - "Guardián de Cada Gota").

---

## Plan de Verificación

1. **Pruebas de Componente**:
   - Verificar la interacción por clic en las 5 zonas de la casa (Cocina, Baño, Lavado, Patio, Tuberías).
   - Comprobar que las 8 situaciones responden con la animación de gota, despliegan el modal educativo y validan respuestas correctas e incorrectas con retroalimentación explícita.
2. **Pruebas de Temporizador y Vidas**:
   - Verificar que el temporizador de 60 segundos descuente fluidamente y detenga la partida si llega a 0.
   - Probar que respuestas incorrectas descuenten 1 vida y muestren la razón pedagógica.
3. **Pruebas de Integración y Persistencia**:
   - Verificar la presencia de la nueva tarjeta con el ícono pixel art en `MapSelectScreen.tsx`.
   - Comprobar que al completar el nivel se guarde en `localStorage` y actualice el contador de logros (`9/9` o según la lista de santuarios).
   - Validar que el final de victoria sólo ocurra al concluir el templo con todos los santuarios completados.
4. **Validación Técnica**:
   - Ejecutar `compile_applet` y `lint_applet` sin errores de compilación ni de sintaxis.
   - Probar respuesta en escritorio (1440px) y móviles (<640px).
