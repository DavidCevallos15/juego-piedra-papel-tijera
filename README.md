# Piedra, Papel o Tijera – Bootstrap + Animaciones

Juego web de Piedra, Papel o Tijera con Bootstrap 5.3, diseño centrado y responsive, modo oscuro, animaciones divertidas, luz que sigue al cursor/tacto, sonidos y confirmación inline para volver a jugar.

## Características
- Bootstrap 5.3 (layout, utilidades y responsividad)
- Botón de modo oscuro
- Botones animados con gradientes y efecto de luz que sigue el cursor/dedo
- Fondo con gradiente y overlay de luz suave
- Resultado con animación “pop”, colores según ganar/empatar/perder e íconos grandes
- Efectos de sonido para clic, victoria, derrota y empate
- Confirmación inline “¿Jugar de nuevo?” dentro del resultado tras ~3 segundos (sin modales)
- Compatible con dispositivos táctiles y respeta `prefers-reduced-motion`

## Estructura del proyecto
```
html/
  index.html
js/
  logic.js
  sounds.js
styles/
  styles.css
```

## Uso
1) Abre `html/index.html` en tu navegador.
2) Elige tu jugada (Piedra, Papel o Tijera).
3) Observa el resultado animado; después de ~3s podrás elegir “Jugar de nuevo” o cerrar el resultado.
4) Prueba el botón “Modo oscuro” para cambiar el tema.

## Personalización rápida
- Colores/gradientes y animaciones: `styles/styles.css`
- Lógica del juego y tiempos (por ejemplo, el retraso de ~3s): `js/logic.js`
- Sonidos (URLs y tipos): `js/sounds.js`

## Tecnologías
- HTML5, CSS3, JavaScript
- Bootstrap 5.3 (CSS y bundle JS desde CDN)

## Notas
- No requiere compilación ni servidor: es estático. Puedes usar Live Server en VS Code para recargar más cómodo.
- En móviles, los botones se redistribuyen de forma responsiva y la luz sigue el dedo.
>>>>>>> f07ed8a (feat: juego piedra-papel-tijera con Bootstrap, animaciones y sonidos)
