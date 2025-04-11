# Flavor Exchange – A React Recipe Sharing App

**RecipeBook** is a modern, responsive web application built with **React**, **Material UI**, and **localStorage** that allows users to explore, add, favorite, and manage recipes with ease. Users can filter recipes by category, and authenticate with a mock login system.

---

## Features

### Core Features

-  **Home Page** – Explore all available recipes in a grid layout
-  **Recipe Details** – View full recipe info including ingredients, steps, and cook time
-  **Add New Recipe** – Users can submit recipes with a title, image URL, and cooking steps
-  **Edit/Delete Recipes** – Users can manage their own recipes from the "My Recipes" section
-  **Favorites** – Save recipes to a personal favorite list
-  **Login / Signup** – Mock authentication using `localStorage`
-  **Search + Category Filter** – Quickly find recipes by keyword or category
-  **Image Preview + Viewer** – Add image URLs and view them in a modal

---

##  Tech Stack

- **React** (Hooks + Router)
- **Material UI (MUI)**
- **Context API** (for state management)
- **LocalStorage** (for persistence)
- **Modular Folder Structure**

---

## Getting Started

### In the project directory, You can run the application using:
#### npm start

Run Mock API:
json-server --watch src\infrastructure\mock_api\db.json --port 3001

BASE_URL = (mock API) http://localhost:3001

### Endpoints in Json Server
GET /users: Get a list of users. POST /users: Create a new user (for registration, you might use this or a separate /registrations endpoint). GET /users/:id: Get a specific user. PUT /users/:id, PATCH /users/:id, DELETE /users/:id
