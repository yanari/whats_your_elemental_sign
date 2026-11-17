# What's Your Elemental Sign?

A fun and mystical Nuxt 3 app that reveals the dominant elemental forces in your natal chart — based on your birth date and city of birth. Whether you're ruled by Fire, Earth, Air, or Water, this app gives you visual insights and personalized descriptions of your elemental identity.

## ✨ Features

- 🔥 Calculates your **dominant element** using birth date and location
- 📊 Displays your **elemental distribution** in a beautiful chart
- 🧙‍♀️ Offers **personalized descriptions** based on your chart
- 🌍 City search powered by the free **Open-Meteo Geocoding API** (no API key needed), with the birth time converted using the city's own timezone
- 📅 Uses **v-calendar** for intuitive date picking
- 📣 Built-in **social share support** (OpenGraph & SEO optimized)
- 💾 Results persisted in `localStorage` with **Pinia + pinia-plugin-persistedstate**, so refreshing the result page keeps your chart
- 🌈 Stylish UI with **TailwindCSS + Nuxt UI**
- 📱 Fully responsive design

## 🧪 Stack

- **Nuxt 3**
- **Vue 3**
- **Pinia**
- **TailwindCSS**
- **Chart.js** (via vue-chartjs)
- **Open-Meteo Geocoding API**
- **v-calendar**
- **date-fns**
- **Nuxt UI + Social Share + SEO Meta Tags**

## 🧠 Behind the Scenes

This project was born out of a curiosity to bring astrological self-discovery into a modern, beautiful, and shareable experience. Instead of offering full chart readings like traditional astrology tools, it focuses on **your elemental balance** — a powerful but often overlooked aspect of your birth chart.

Using chart.js and a combination of astrological logic, the app interprets your dominant element and provides a snapshot of what it says about you.

## 🔮 Future Plans

- 🪄 Support for rising and moon signs in context with elements
- 📬 Email-based PDF reports
- 🏹 Integration with other metaphysical tools (modalities, triplicities)
- 🛠 Admin panel for managing descriptions/content
- 🌐 i18n (multilingual support)

## 🏗 Architecture

- **Frontend (this repo):** Nuxt 3, deployed on Vercel. The Nitro routes `server/api/submit.ts` and `server/api/meta.ts` proxy the backend and build the share metadata.
- **Backend:** [astrology-api](https://github.com/yanari/astrology-api), an Express + Swiss Ephemeris service deployed on Google Cloud Run. It calculates the planet positions and the element points.

## ⚙️ Environment Variables

| Variable | Description |
| --- | --- |
| `NUXT_BACKEND_URL` | Base URL of the astrology-api (e.g. `https://astrology-api-xxxx.us-central1.run.app`) |

Create a `.env` file in the project root. To use a local backend, start it on another port (`PORT=3001 npm start` inside `astrology-api`), since Nuxt already uses 3000:

```bash
NUXT_BACKEND_URL=http://localhost:3001
```

## 🚀 Run Locally

```bash
yarn install
yarn dev
```

Build for production:

```bash
yarn build
node .output/server/index.mjs
```
