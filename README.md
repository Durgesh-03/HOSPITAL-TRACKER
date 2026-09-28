# HOSPITAL-TRACKER

## Hospital OPD Queuing & Bed Availability Tracker

React/Vite client and Express/Mongoose API for hospital queue, appointment, and bed tracking.

## Local development

- Start MongoDB locally.
- Configure `server/.env` from `server/.env.example`.
- Run `npm install` from the repository root once.
- Run `npm run dev:server` and `npm run dev:client` from the repository root.

## Vercel deployment

Import this repository into Vercel with the repository root as the project root. The npm workspaces install both client and API dependencies; the included `vercel.json` builds the Vite client and routes `/api/*` to the Express serverless function.

Set these Vercel environment variables before deploying:

- `MONGODB_URI`: MongoDB Atlas connection string. Allow Vercel's outbound connections in Atlas network access.
- `JWT_SECRET`: a long, random secret that is not committed to Git.
- `CLIENT_ORIGIN`: optional; set to the deployed site origin if using cross-origin requests.

The Vercel function does not seed demo accounts. Create an admin account through a protected provisioning path before production use; public signup only creates patient accounts.
