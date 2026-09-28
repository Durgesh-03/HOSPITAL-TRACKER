# Hospital OPD API

The API uses MongoDB through Mongoose. It creates the `users`, `appointments`, `beds`, `queueentries`, `notifications`, and `dashboardsnapshots` collections. Demo records are inserted only when each collection is empty.

## Start locally

1. Run MongoDB locally, or use a MongoDB Atlas connection string.
2. Copy `.env.example` to `.env`; set `MONGODB_URI` and a private `JWT_SECRET`.
3. Run `npm install` once, then `npm run dev` from this folder.
4. Start the React client in `../client`. Its default API URL is `http://localhost:5000/api`.

Check `http://localhost:5000/api/health` for API and database status. Demo accounts are `patient@hospital.com` / `Patient@123`, `doctor@hospital.com` / `Doctor@123`, `admin@hospital.com` / `Admin@123`, and `staff@hospital.com` / `Staff@123`.

Demo passwords are hashed before storage. Public sign-up creates patient accounts only; doctor, staff, and administrator accounts should be provisioned by an administrator in a production deployment.# Hospital OPD API

The API uses MongoDB through Mongoose. It creates the `users`, `appointments`, `beds`, `queueentries`, `notifications`, and `dashboards` collections. Demo records are inserted only when each collection is empty.

## Start locally

1. Run MongoDB locally, or use a MongoDB Atlas connection string.
2. Copy `.env.example` to `.env`; set `MONGODB_URI` and a private `JWT_SECRET`.
3. Run `npm install` once, then `npm run dev` from this folder.
4. Start the React client in `../client`. Its default API URL is `http://localhost:5000/api`.

Check `http://localhost:5000/api/health` for API and database status. Demo accounts are `patient@hospital.com` / `Patient@123`, `doctor@hospital.com` / `Doctor@123`, `admin@hospital.com` / `Admin@123`, and `staff@hospital.com` / `Staff@123`.

Demo passwords are hashed before storage. Public sign-up creates patient accounts only; doctor, staff, and administrator accounts should be provisioned by an administrator in a production deployment.