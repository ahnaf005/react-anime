# React Anime

A React app for discovering and exploring anime, powered by the [Jikan API](https://jikan.moe/) (MyAnimeList unofficial API).

**Live demo:** [https://react-anime-shows.vercel.app/](https://react-anime-shows.vercel.app/)

---

## Features

- **Top Anime** — Browse the highest-ranked anime on MyAnimeList on the home page
- **Search** — Search through thousands of anime titles with debounced input to avoid excessive API calls
- **Anime Detail Page** — Click any card to open a dedicated detail page showing:
  - Title, score, type, episode count, year, and airing status
  - Genre tags and studio info
  - Full synopsis
- **Image Gallery** — Browse official anime artwork and screenshots on the detail page
- **Lightbox Slideshow** — Click any gallery image to open a full-screen slideshow with:
  - Left / right navigation arrows
  - Keyboard support (`←` `→` to navigate, `Esc` to close)
  - Image counter (e.g. 3 / 12)
  - Click outside to close
- **Characters** — View main and supporting characters with their images on the detail page

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Jikan REST API v4](https://docs.api.jikan.moe/)

## Getting Started

```bash
npm install
npm run dev
```
