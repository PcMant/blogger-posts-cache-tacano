# 📦 Blogger Cache con GitHub Actions

Este proyecto cachea los posts de mi blog de **Blogger** en un archivo JSON, usando [GitHub Actions](https://docs.github.com/en/actions).  
De esta forma no tengo que consultar la API de Google cada vez que quiera mostrar artículos en otros proyectos (soy tacaño con las requests 🤓).

---

## 🚀 ¿Cómo funciona?

1. Cada día a las **03:00 UTC** se ejecuta un workflow en GitHub Actions.
2. El workflow:
   - Llama a la API de Blogger con mi **API Key** (guardada como `secret`).
   - Procesa la respuesta para extraer solo los campos que me interesan:
     - `id`
     - `title`
     - `published`
     - `url`
     - `categories` (labels en Blogger)
     - `thumbnail` (la primera imagen del post)
   - Guarda todo en `data/blog-posts.json`.
3. Si hay cambios, hace commit automático al repo.

---

## 📂 Ejemplo de salida (`data/blog-posts.json`)

```json
[
  {
    "id": "1234567890123456789",
    "title": "Mi primer post",
    "published": "2025-09-20T10:00:00+00:00",
    "url": "https://midominio.blogspot.com/2025/09/mi-primer-post.html",
    "categories": ["noticias", "personal"],
    "thumbnail": "https://1.bp.blogspot.com/-imagen.jpg"
  }
]
```

---

## 🔧 Tecnologías usadas

- [GitHub Actions](https://docs.github.com/en/actions) → para automatizar la tarea.
- [Node.js](https://nodejs.org/) → para procesar la respuesta de la API.
- [Blogger API v3](https://developers.google.com/blogger) → para obtener los posts.

---

## 🤓 Motivación

- Evitar llamadas innecesarias a la API de Google.  
- Tener un **JSON público** que sirva como mini-API para otros proyectos.  
- Hacer un showcase de cómo usar GitHub Actions como un **cron barato**.

---

## 📡 Uso del JSON

Puedes consumir el archivo directamente desde GitHub Raw:

```
https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/data/blog-posts.json
```

Ejemplo en JavaScript:

```js
async function getPosts() {
  const res = await fetch(
    "https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/data/blog-posts.json"
  );
  const posts = await res.json();
  console.log(posts);
}
```

---

## ✨ Nota final

Esto es básicamente un **ETL minimalista** montado con Actions.  
Un cron gratuito cortesía de GitHub, porque **la tacañería también es una forma de innovación** 😎.
