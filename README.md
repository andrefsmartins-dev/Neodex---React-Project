# NeoDex - The Interactive Pokédex, TCG Explorer & Team Builder

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Node%20%26%20Express-339933?logo=node.js&logoColor=white)

A full-featured Pokémon web application combining a dynamic Pokédex, Trading Card Game (TCG) explorer, competitive Team Builder with real-time stats analysis, and location-based Pokémon GO weather boosts.

---

## Key Features

- **Interactive Pokédex** - Search and filter Pokémon by name, type and generation with detailed base stats, abilities, and evolution data.
- **Team Builder & Randomizer** - Assemble a Pokémon team, inspect type coverage and weaknesses or generate random teams, and share your team with your friends and challenge them to a battle against your team.
- **TCG Card Explorer** - Browse and filter Pokémon Trading Card Game sets and cards directly linked to each Pokémon. Available in 4 diferent languages - English, Japanese, Portuguese and Chinese.
- **Pokémon GO Weather Boosts** - Uses browser Geolocation to detect real-time local weather and highlight boosted Pokémon types in Pokemon Go.
- **User Authentication & Cloud Persistence** - Google OAuth & Email/Password login via **Firebase Auth**, saving user favorites and custom teams in **Cloud Firestore**.

---

## Tech Stack & Architecture Decisions

- **Front-end (`my-app/`)** - React 19, React Router DOM, Vite 8, CSS3, and Firebase SDK (`firebase`).
- **Database Seeding Script (`server_pokeapi/`)** - Node.js, Express, CORS, `node-fetch`, and Firebase Admin SDK (`firebase-admin`).
- **State Management via Modular Contexts** - Separated global state into `AuthContext`, `PokemonContext`, and `EquipaContext` to prevent unnecessary re-renders across heavy grid views.
- **API Caching Layer** - Built a local seeding script (`server_pokeapi`) to fetch and normalize data from PokeAPI into Firestore, avoiding client-side rate limits and reducing initial load times. In the future, I intend to automate this to run locally on a weekly schedule, seeding the data into my own custom database as i'm leraning PHP and SQL.
- **Static Data Optimization** - Because the external weather-boost API always returns the exact same static mapping array, I migrated the lookup to a local JSON file (`src/data/weatherBoosts.json`). This prevents exceeding third-party API rate limits, eliminates redundant network calls, and avoids exposing API keys on the client side.

---

### System Architecture Diagram

<p align="left">
  <img src="./docs/architecture-diagram.png" alt="NeoDex System Architecture" width="700" />
</p>

---

## Run Locally

Both `my-app` and `server_pokeapi` include their own `package.json`, so `npm install` will automatically install all required dependencies. Follow these steps in order:

### 1. Clone the repository
```bash
git clone [https://github.com/andrefsmartins-dev/neodex.git](https://github.com/andrefsmartins-dev/neodex.git)
cd neodex
```

### 2. Configure Front-end environment variables
Navigate to `my-app/`, install dependencies (`react`, `react-dom`, `react-router-dom`, `firebase`), and duplicate `.env.example` as `.env`:
```bash
cd my-app
npm install
cp .env.example .env
```

Fill in your **Firebase** project credentials (Authentication with Google/Email enabled + Firestore Database):
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_id
```

### 3. Seed the Firestore Database (Required)
> **Important:** Because the front-end reads Pokémon data directly from Cloud Firestore (to prevent exhausting external PokeAPI rate limits), **you must run the local seeding script once** so your database has the Pokémon data stored.

1. Go to your **Firebase Console > Project Settings > Service Accounts** and click **Generate new private key**.
2. Rename the downloaded file to `serviceAccountKey.json` and place it inside `server_pokeapi/` (see `server_pokeapi/serviceAccountKey.example.json` for reference - the real key is ignored by Git).
3. Install dependencies (`express`, `cors`, `firebase-admin`, `node-fetch`) and run the script on-demand from `server_pokeapi/`:
```bash
cd ../server_pokeapi
npm install
node server.js
```
*(Wait until the script finishes populating Firestore. Once the data is saved in your database, you do not need to keep this server running).*

### 4. Start the Front-end application
Return to `my-app/` and start the development server:
```bash
cd ../my-app
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Contact

- **Portfolio:** [andrefsmartins.com](https://andrefsmartins.com)
- **Email:** [hello@andrefsmartins.com](mailto:hello@andrefsmartins.com)
- **GitHub:** [@andrefsmartins-dev](https://github.com/andrefsmartins-dev)

---

*Disclaimer: This is a non-commercial fan project created for educational and portfolio purposes. Pokémon and all related assets are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc.*