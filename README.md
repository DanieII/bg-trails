# Bulgaria Trails
A MERN stack web application for exploring Bulgaria's hiking trails.


![bg-trails-home](https://github.com/user-attachments/assets/9a44b1c9-660e-47ff-a41a-01630234fad6)


## Features
- ⛰️ Fill database with hiking trails from OpenStreetMap API
- 🌍 See recommended trails based on user location
- 🔎 Search trails based on name and filter by location
- 🔒 User Authentication
- 🎨 Modern UI with DaisyUI and Tailwind CSS
- 📱 Responsive Design
- 🌓 Light/Dark Mode Support


## Tech Stack
- React
- Node.js
- Express.js
- MongoDB


## Running locally with Docker
1. Clone the repository.
2. In project root directory run:
```
docker compose up -d

docker compose exec bg-trail-backend npm run save-trails
```
This will start the app, fetch trails from OSM and add them to the database.
For simplicity and faster demo the script fetches trails in/around Sofia. For all trails in Bulgaria change the request body in `getOSMTrailsData` function in the script file to use `queryBulgaria` instead of `querySofia`.
