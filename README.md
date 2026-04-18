# Personal Portfolio Web Application

A modern, responsive, and interactive personal portfolio website built with a **decoupled architecture**. It features a **Laravel REST API** backend paired with a **Vanilla JavaScript** frontend, styled with a distinct **neo-brutalist** design system.

![Website Preview](1)
![Website Preview](2)

## 🚀 Features

- **Decoupled Architecture**: Clear separation of concerns between backend (API) and frontend (UI).
- **Neo-Brutalist Design**: Bold typography, high-contrast colors, harsh borders, and distinct shadows.
- **Dark Mode**: Fully functional dual-theme system (Light/Dark) with `localStorage` persistence and system preference detection.
- **Dynamic Content**: Project data is fetched dynamically from the Laravel API.
- **Scroll Animations**: Smooth reveal animations using the Intersection Observer API.
- **Fully Responsive**: Mobile-first design that adapts seamlessly to all screen sizes.
- **Zero Frontend Frameworks**: Built entirely with pure HTML, CSS, and Vanilla JavaScript (ES Modules).

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (Custom Properties for Theming)
- Vanilla JavaScript (ES Modules)

**Backend:**
- PHP
- Laravel 11 (API Only)
- MySQL

## 🏗️ Architecture

```text
┌─────────────────────────────┐      HTTP (JSON)      ┌──────────────────────────────┐
│         BACKEND             │ ◄──────────────────► │          FRONTEND            │
│         Laravel              │    GET /api/projects   │    Vanilla JavaScript        │
│         (Port 8000)          │                        │    (Port 3000)               │
│                              │                        │                              │
│  ┌────────────┐              │                        │  ┌──────────┐                │
│  │  MySQL DB   │              │                        │  │  api.js   │  ← fetch()    │
│  │ (projects)  │              │                        │  │  main.js  │  ← logic      │
│  └────────────┘              │                        │  │  render.js│  ← DOM        │
│                              │                        │  │ components│  ← cards       │
└─────────────────────────────┘                        └──────────────────────────────┘
```

## 💻 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js (optional, for running a local server)
- MySQL / MariaDB (e.g., via XAMPP, Herd, or Docker)

---

### 1. Backend Setup (Laravel API)

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your database in `.env` (make sure your MySQL server is running):
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio_rifqi # Or your preferred database name
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Generate the application key:
   ```bash
   php artisan key:generate
   ```

6. Run the database migrations and seed the initial project data:
   ```bash
   php artisan migrate:fresh --seed
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   *The backend API will be available at `http://localhost:8000`.*

---

### 2. Frontend Setup (Vanilla JS)

1. Open a **new** terminal prompt and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start a local web server. You can use PHP's built-in server:
   ```bash
   php -S localhost:3000
   ```
   *Alternatively, you can use the Live Server extension in VS Code or Python's `http.server`.*

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🌐 API Reference

#### Get All Projects
```http
  GET /api/projects
```
Returns a list of all projects stored in the database.

Example JSON output:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Personal Portfolio Website",
      "description": "A personal portfolio website built from scratch...",
      "tech_stack": "Laravel, MySQL, JavaScript, HTML, CSS",
      "github_link": "https://github.com/rifqilutfi/portfolio-rifqi",
      "created_at": "2026-04-17T23:14:38.000000Z"
    }
  ]
}
```

## ✒️ Author

**Muhammad Rifqi Lutfi**
- [GitHub](https://github.com/rifqilutfi)

## 📄 License

This project is open-source and available under the MIT License.
