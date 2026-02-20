# 🔴 Pokédex — Live Pokémon Explorer

> A fast, responsive Pokédex built with React and powered by the public PokéAPI. Browse 124 Pokémon, search by name in real-time, and explore their stats — all without a single page reload.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![API](https://img.shields.io/badge/PokéAPI-v2-EF5350?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🧠 What Problem Does This Solve?

Most Pokédex-style apps either:
- Hit a single endpoint and get minimum data (just names/IDs)
- Or load **way** too much at once, making the UI sluggish

The real challenge here was: **PokéAPI v2 doesn't return detailed stats in the list endpoint.** You get back names and individual URLs — nothing else. So fetching 124 Pokémon with their full details requires 124 separate API calls.

I solved this by using **`Promise.all()`** to fire all 124 fetch requests concurrently instead of sequentially. This means the entire dataset loads in roughly the same time it takes to fetch 1-2 Pokémon one by one. No waterfalls, no janky loading.

---

## ✨ Special Features

| Feature | Details |
|---|---|
| ⚡ Parallel API Fetching | All 124 Pokémon loaded concurrently via `Promise.all()` |
| 🔍 Real-Time Search | Debounce-free instant filter on Pokémon names (case-insensitive) |
| 📊 Rich Stats per Card | Type, Height, Weight, Speed, Attack, Base XP, Abilities |
| 🖼️ Dream World Sprites | Uses high-quality SVG artwork from PokéAPI's `dream_world` set |
| 📱 Fully Responsive | Grid adapts from 4 columns (desktop) → 2 (tablet) → 1 (mobile) |
| ⚠️ Graceful Error Handling | Separate loading and error states with user-friendly feedback |

---

## 🛠️ Tech Stack

- **React 19** — Component-based UI with hooks (`useState`, `useEffect`)
- **Vite 6** — Blazing-fast dev environment and build tool
- **PokéAPI v2** — Free, open REST API for all Pokémon data
- **Vanilla CSS** — Custom responsive grid, cards, and search bar (no UI library needed)

---

## 🏗️ How I Built It — The Approach

### The Data Problem
PokéAPI's list endpoint (`/pokemon?limit=124`) only gives you names and individual URLs — no stats, no images. To get the full data for each Pokémon, you need to fetch each URL separately.

### Naive Approach (What I Avoided)
```js
// ❌ Sequential — slow, causes waterfall
for (const p of results) {
  const data = await fetch(p.url);
}
```

### My Approach — Concurrent Fetching
```js
// ✅ Concurrent — all 124 requests fired at once
const pokeurl = data.results.map(async (curPokemon) => {
  const res = await fetch(curPokemon.url);
  return res.json();
});
const allPokemon = await Promise.all(pokeurl);
```

This pattern maps each Pokémon into a Promise, then resolves them all in parallel. It's the difference between loading in **~200ms vs 5+ seconds**.

### Real-Time Search
The search filter runs on the already-fetched data in memory — no extra API calls:
```js
const searchData = pokemon.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);
```

---

## 📁 Project Structure

```
poki/
├── src/
│   ├── Pokemon.jsx        # Main component — fetching, state, search logic
│   ├── PokemonCards.jsx   # Individual card UI — stats, sprite, type badge
│   ├── index.css          # All styles — responsive grid, cards, search bar
│   └── App.jsx            # Root entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/pokidex.git

# 2. Move into the project
cd pokidex

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📸 Preview

> **124 Pokémon** loaded with full stats — searchable, responsive, and fast.

Cards display:
- 🖼️ Dream World sprite (high-res SVG)
- 🏷️ Type badge (e.g., Fire, Water, Grass)
- 📏 Height & Weight
- ⚡ Speed stat
- ⚔️ Attack stat
- 🌟 Base Experience
- 🔮 Primary Ability

---

## 💡 Key Learnings & Engineering Decisions

1. **`Promise.all()` over sequential async loops** — Critical for performance when making many parallel HTTP requests.
2. **Controlled input for search** — React's `useState` + `Array.filter()` gives instant, zero-latency search over in-memory data.
3. **Component separation** — `Pokemon.jsx` handles all data logic; `PokemonCards.jsx` is a pure presentational component. Clean separation of concerns.
4. **CSS Grid with breakpoints** — No external UI library. The responsive layout is achieved with CSS Grid and `@media` queries, keeping the bundle lean.

---





<p align="center">Built with ❤️ and a love for Pokémon</p>
