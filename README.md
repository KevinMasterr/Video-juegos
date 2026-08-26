# 🎮 Video-juegos

Colección de proyectos para aprender creando: scripts y experiencias web para jugar, probar y seguir mejorando.

## ✨ Novedades

- Repositorio reorganizado en un único proyecto: `sorteo-equipos-96`.
- El sorteo de equipos ahora cuenta con dos versiones claramente separadas: una para terminal en Python y otra visual para navegador.
- Se integró la interfaz web retro de **Sorteo 96**, con menú interactivo, efectos CRT y estilos inspirados en ISS/SNES.
- Se eliminó la copia duplicada del script de Python para mantener un solo archivo fuente.

## 📂 Estructura

```text
Video-juegos/
├── README.md
└── sorteo-equipos-96/
    ├── script-python/
    │   └── Random96.py
    └── js-visual/
        ├── index.html
        ├── style.css
        └── script.js
```

## ⚽ Sorteo de equipos 96

El proyecto permite armar sorteos de equipos de fútbol colombiano e internacional en modalidades como FPC, selecciones, ISSS, Mundial de Clubes y Total Random.

### Versión Python

Ejecuta el sorteo desde una terminal:

```bash
python sorteo-equipos-96/script-python/Random96.py
```

### Versión visual (HTML, CSS y JavaScript)

Abre `sorteo-equipos-96/js-visual/index.html` directamente en tu navegador. También puedes abrir la carpeta con VS Code y usar la extensión **Live Server**.

> La versión visual usa Tailwind CSS desde CDN; por eso necesita conexión a internet al abrirse.

¡Que empiece la partida! 🕹️
