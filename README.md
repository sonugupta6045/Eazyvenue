# EazyVenue Booking Dashboard

A modern, full-stack web application for venue owners and users to manage, browse, and book venues with ease.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Vite, Axios
- **UI Libraries:** React DatePicker, React Calendar

---

## ✨ Features

### Core Functionality
- **Venue Owners/Admins:**
  - Add new venues with details (name, location, description, price, capacity, amenities, image)
  - Manage (edit) venue details
  - Block/unblock dates for offline or unavailable bookings
  - View analytics dashboard (total venues, venues by location)
- **Users:**
  - Browse all available venues
  - Search venues by name or location
  - View venue details, amenities, and images
  - Book a venue for available dates (blocked/booked dates are disabled)
- **Calendar View:**
  - Visual calendar showing blocked/unavailable dates for each venue

### Advanced/Ideation Features
- **User Search Logging:** All user search queries are logged for analytics
- **Admin Analytics Dashboard:** Shows total venues and venues by location
- **Calendar View:** Owners and users see a calendar with blocked dates highlighted
- **Authentication (Ideation):** Demo users are used for owner/user flows; can be extended to full auth

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/sonugupta6045/Eazyvenue.git
cd EazyVenue
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# MONGO_URL=mongodb://localhost:27017/eazyvenue
node app.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Demo Users
- The app uses demo user IDs for owner and user roles. You can create users in your MongoDB `users` collection and update the IDs in `frontend/src/App.jsx`.

---

## 📚 API Endpoints

- `GET    /api/venues` — Fetch all venues
- `POST   /api/venues` — Add a new venue
- `PATCH  /api/venues/:id/availability` — Block/unblock dates
- `PATCH  /api/venues/:id` — Edit venue details
- `GET    /api/venues/:id/availability` — Get venue availability
- `POST   /api/bookings` — Book a venue
- `POST   /api/search` — Log user search
- `GET    /api/analytics/venues-summary` — Analytics dashboard data

---

## 🖥️ UI Overview

- **Role Toggle:** Switch between user and owner/admin roles
- **Venue List:** See all venues with details, images, and amenities
- **Venue Form:** Owners can add new venues
- **Manage Venue:** Owners can edit venue details and block/unblock dates (with calendar)
- **Booking:** Users can book available dates (blocked/booked dates are disabled in the picker)
- **Search:** Filter venues by name/location; all searches are logged
- **Analytics Dashboard:** Owners/admins see venue stats and breakdown by location
- **Calendar View:** Visual calendar for venue availability

---

## 💡 Future Enhancements (Ideation)
- **Authentication:** Add registration/login, JWT, and role-based access
- **Advanced Analytics:** More charts, revenue stats, booking trends
- **Calendar Enhancements:** Show booked vs blocked dates, drag-to-block, etc.
- **Image Uploads:** Allow uploading venue images instead of URLs
- **User Profiles:** Booking history, favorites, etc.

---

## 📝 Notes
- Make sure MongoDB is running locally or update the connection string for Atlas.
- Demo user IDs must exist in your database for full functionality.
- The UI is fully responsive and themed with a modern, light pink palette.

---

**Enjoy using EazyVenue!** 