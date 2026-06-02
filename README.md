# Meteo API Demo

A full-stack weather test app that fetches real-time temperature data using the [Open-Meteo](https://open-meteo.com/) API. Search any city to get the current temperature.

An exercise in containerization and GitHub Actions usage

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Backend | Node.js + Express 5 |
| API | Open-Meteo (geocoding + forecast) |
| Containerization | Docker + Docker Compose |

## Project structure

```
Meteo-API-demo/
├── .github/
│   └── workflows/
│       └── hello.yml          # GitHub Actions -harjoitustyönkulku
├── front/                     # React-frontend (Vite)
│   ├── src/
│   │   └── App.jsx
│   ├── Dockerfile             # Multi-stage build: Node builder → Nginx
│   ├── dev.Dockerfile         # Development image with Vite hot reload
│   └── nginx.conf
├── server/                    # Express-backend
│   ├── server.js
│   ├── Dockerfile             # Node.js-palvelin, slim-image, ei-root-käyttäjä
│   └── dev.Dockerfile         # Development image for backend hot reload
├── docker-compose.yml         # Production-style compose: frontend, backend, nginx reverse proxy
└── docker-compose.dev.yml     # Development compose: hot-reload front + backend
```

## Harjoittelun kuvaus

Projektin pääpaino on kontituksen ja GitHub Actionsin harjoittelussa.

### GitHub Actions — `.github/workflows/hello.yml`

Yksinkertainen workflow, joka käynnistyy jokaisella `push`-tapahtumalla `master`-haaraan ja tulostaa "Hello, World!". Tarkoituksena oli oppia:

- miten GitHub Actions -tiedosto rakennetaan (`name`, `on`, `jobs`, `steps`)
- miten workflow sidotaan tiettyyn haaraan (`branches: [master]`)
- miten ajuympäristö valitaan (`runs-on: ubuntu-latest`)
- miten shell-komentoja ajetaan suoraan workflowssa (`run: echo ...`)

### Frontend Dockerfile — `front/Dockerfile`

Multi-stage build -rakenne kahdessa vaiheessa:

1. **Builder-vaihe** (`node:24`): asennetaan riippuvuudet `npm ci`:llä ja ajetaan `npm run build`, jolloin Vite tuottaa optimoidun staattisen buildin `dist/`-kansioon.
2. **Production-vaihe** (`nginx:alpine`): kopioidaan vain `dist/`-kansio kevyeen Nginx-imageen — Node.js ei ole enää mukana lopullisessa imagessa.

Opitut asiat:
- multi-stage build pitää imagen kevyenä (ei node_modules tuotannossa)
- `nginx:alpine` on huomattavasti pienempi kuin `node`-image
- `nginx.conf` tarvitaan, jotta SPA-reititys toimii oikein (kaikki reitit → `index.html`)

### Backend Dockerfile — `server/Dockerfile`

Node.js-palvelin kontitettuna tietoturva- ja tehokkuusperiaatteilla:

- `node:24-slim` — kevyempi base-image kuin täysi `node:24`
- `npm ci --omit=dev` — asennetaan vain tuotantoriippuvuudet, ei dev-työkaluja
- `COPY --chown=node:node` + `USER node` — sovellus ei pyöri root-käyttäjänä tietoturvasyistä
- `ENV NODE_ENV=production` — kertoo Expressille, että kyseessä on tuotantoympäristö

### Docker Compose — `docker-compose.yml` ja `docker-compose.dev.yml`

Tässä projektissa on kaksi eri Docker Compose -kokoonpanoa:

- `docker-compose.yml` — tuotantotyylinen kokoonpano, joka rakentaa frontendin, backendin ja nginx-reverse proxyn. Sovellus ajetaan yhdestä komennosta ja käyttäjälle tarjotaan yksi portti `http://localhost:8080`.
- `docker-compose.dev.yml` — kehityskokoonpano, jossa frontend ja backend ajetaan hot-reload-tilassa. Frontend käyttää `front/dev.Dockerfile`-tiedostoa ja backend `server/dev.Dockerfile`-tiedostoa.

Molemmat kokevat Docker Composen perusrakenteen: palveluiden nimet (`app`, `server`, `nginx`), build-kontekstit, porttimappaukset ja palveluiden välinen verkko.

`docker-compose.yml` sisältää myös nginx-palvelun, joka toimii reverse-proxyna ja ohjaa liikenteen frontendille ja backendille.

`docker-compose.dev.yml` puolestaan tarjoaa kehityskäyttöön:

- volumet lähdekoodille ja `node_modules`-kansiolle
- suoran Vite-kehityspalvelimen portissa `5173`
- backendin portissa `3001`
- ympäristömuuttujan `BACKEND_URL=http://server:3001`, jotta frontendiä ajettaessa Docker-verkossa backend löytyy palvelunimen `server` kautta

## How it works

1. The user types a city name in the frontend.
2. The frontend calls `GET /api/weather?city=<name>` on the Express backend (port 3001).
3. The backend resolves the city to coordinates using the Open-Meteo Geocoding API.
4. It then fetches the current temperature from the Open-Meteo Forecast API.
5. The result (`city`, `country`, `temperature`) is returned to the frontend.

## Running locally

### Backend

```bash
cd server
npm install
npm start        # runs on http://localhost:3001
```

### Frontend

```bash
cd front
npm install
npm run dev      # runs on http://localhost:5173
```

### With Docker

This repo includes two Docker Compose configurations:

- `docker-compose.yml` — production-style setup with frontend, backend and nginx reverse proxy
- `docker-compose.dev.yml` — development setup with hot-reload for the frontend and backend

#### Production-style Docker Compose

Run from the repository root:

```bash
docker compose -f docker-compose.yml up --build
```

Then open:

- `http://localhost:8080` — app served through nginx reverse proxy

#### Development Docker Compose

Run from the repository root:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Then open:

- `http://localhost:5173` — Vite frontend
- `http://localhost:3001` — backend API

## API endpoint

```
GET /api/weather?city={city}
```

**Response**

```json
{
  "city": "Helsinki",
  "country": "Finland",
  "temperature": 18.4
}
```
