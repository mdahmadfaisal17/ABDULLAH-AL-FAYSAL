# Abdullah Al Faysal Website

A modern portfolio and business website built with `React`, `Vite`, and an `Express + MongoDB` backend. The project includes a public-facing website, an admin dashboard, blog and portfolio management, subscriber handling, and project inquiry flows.

## Features

- Public pages for home, about, services, blog, portfolio, pricing, privacy, and terms
- Admin login and protected dashboard
- Blog management from the admin panel
- Portfolio item management from the admin panel
- Project request and subscriber collection APIs
- MongoDB-backed data layer with initial seed data
- Optional email notifications with Resend
- Optional media upload support with Cloudinary

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Media: Cloudinary
- Email: Resend

## Project Structure

```text
.
|-- src/                 # Frontend app
|-- public/              # Static assets
|-- server/              # Express API
|   |-- src/
|   |-- package.json
|   `-- .env.example
|-- package.json         # Frontend/root scripts
`-- README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
npm --prefix server install
```

### 2. Create your environment file

Copy `.env.example` to `.env`.

If you prefer keeping backend variables inside the server folder, you can also use `server/.env.example` as a starting point for `server/.env`.

Example root `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/modern-website
CLIENT_URL=http://localhost:5173
WEBSITE_BASE_URL=http://localhost:5173
ADMIN_LOGIN_EMAIL=admin@example.com
ADMIN_LOGIN_PASSWORD_HASH=replace-with-scrypt-hash
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Modern Website <onboarding@resend.dev>
ADMIN_EMAIL=your-email@example.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 3. Start the app

```bash
npm run dev
```

This starts:

- Vite frontend on `http://localhost:5173`
- Express API on `http://localhost:5000`

The Vite dev server proxies `/api` requests to the backend automatically.

## Available Scripts

From the root folder:

- `npm run dev` - start frontend and backend together
- `npm run dev:client` - start only the Vite frontend
- `npm run build` - build the frontend for production
- `npm run server:dev` - start the backend in watch mode
- `npm run server:start` - start the backend normally

From the `server/` folder:

- `npm run dev` - start Express with nodemon
- `npm run start` - start Express with Node.js

## Environment Variables

### Frontend

- `VITE_API_BASE_URL` - base URL for API requests, for example `http://localhost:5000/api`

### Backend

- `PORT` - API server port
- `MONGO_URI` - MongoDB connection string
- `CLIENT_URL` - allowed frontend origin for CORS
- `WEBSITE_BASE_URL` - website URL used in emails and CORS
- `ADMIN_LOGIN_EMAIL` - admin login email
- `ADMIN_LOGIN_PASSWORD_HASH` - hashed admin password
- `ADMIN_SESSION_SECRET` - secret used for admin sessions
- `RESEND_API_KEY` - Resend API key for email sending
- `RESEND_FROM_EMAIL` - sender email for outgoing messages
- `ADMIN_EMAIL` - optional inbox for contact and project notifications
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## Notes

- The backend seeds initial data from `server/src/data/database.json` when the database is empty.
- `.env`, `node_modules`, build output, logs, and temporary files are already ignored by Git.
- For production deployment, update CORS-related URLs and all secret values before going live.

## Repository

GitHub: [mdahmadfaisal17/ABDULLAH-AL-FAYSAL](https://github.com/mdahmadfaisal17/ABDULLAH-AL-FAYSAL)
