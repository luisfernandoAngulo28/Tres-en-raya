# Mejoras realizadas en el proyecto "3 en raya"

## 1. Botón de reinicio de partida
- Se agregó un botón "Reiniciar" en la parte superior de la pantalla de juego.
- Permite comenzar una nueva partida sin recargar la app.
- Código relevante:

```tsx
<Button title="Reiniciar" onPress={reiniciarJuego} color="#22c55e" />
```

## 2. Animación al marcar una casilla
- Al marcar una celda, se realiza una animación de escala (crece y vuelve a su tamaño normal).
- Mejora la experiencia visual y la interacción del usuario.
- Código relevante:

```tsx
Animated.sequence([
  Animated.timing(animaciones[index], { toValue: 1.2, duration: 120, useNativeDriver: true }),
  Animated.timing(animaciones[index], { toValue: 1, duration: 120, useNativeDriver: true })
]).start();
```

## 3. Colores personalizados para X y O
- La X ahora es celeste y la O es rosa, ambos con sombra para mayor visibilidad.
- Código relevante:

```tsx
xText: { color: '#22d3ee', textShadowColor: '#0ea5e9', ... },
oText: { color: '#f472b6', textShadowColor: '#be185d', ... }
```

## 4. Capturas de pantalla sugeridas
- Pantalla inicial del juego.
- Tablero durante una partida.
- Mensaje de ganador o empate.
- Botón de reinicio visible.

---

Puedes copiar este contenido a Word y agregar las capturas de pantalla para tu entrega final.
