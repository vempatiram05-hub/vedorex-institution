# strapi-plugin-courses-showcase

A Strapi v4 plugin that exposes a public REST API for all your courses and includes a
beautiful single-page visitor interface with **live search**.

---

## Features

- 📚 **Course content type** — title, slug, description, level, category, instructor, duration, thumbnail, tags
- 🔍 **Live search** — searches across title, description, category, and instructor
- 🌐 **Public API** — no authentication required for visitors
- 🎨 **Beautiful visitor page** — `public/courses.html` (editorial/magazine aesthetic)
- 🔒 **Admin managed** — create/edit courses through the Strapi admin panel

---

## Installation

### 1. Copy the plugin into your Strapi project

```bash
cp -r strapi-plugin-courses-showcase ./src/plugins/courses-showcase
```

### 2. Register the plugin in `config/plugins.js`

```js
module.exports = {
  'courses-showcase': {
    enabled: true,
    resolve: './src/plugins/courses-showcase',
  },
};
```

### 3. Rebuild and restart Strapi

```bash
npm run build
npm run develop
```

---

## API Endpoints

Both endpoints are **public** — no auth token needed.

### List / Search Courses

```
GET /api/courses-showcase/courses
```

| Query Param | Type   | Description                                     |
|-------------|--------|-------------------------------------------------|
| `search`    | string | Full-text search across title, desc, category   |
| `page`      | number | Page number (default: 1)                        |
| `pageSize`  | number | Results per page (default: 50, max: 100)        |

**Example:**
```
GET /api/courses-showcase/courses?search=javascript&page=1&pageSize=20
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "JavaScript for Beginners",
      "slug": "javascript-for-beginners",
      "description": "...",
      "level": "Beginner",
      "category": "Programming",
      "instructor": "Jane Doe",
      "duration": "6 hours",
      "thumbnail": { "url": "/uploads/thumb.jpg" },
      "tags": ["js", "web", "frontend"]
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "pageSize": 20,
    "search": "javascript"
  }
}
```

### Single Course by Slug

```
GET /api/courses-showcase/courses/:slug
```

---

## Visitor Page

Open `public/courses.html` in a browser (or serve it from any static host).

**Before opening**, edit the `API_BASE` constant at the top of the `<script>` block:

```js
// public/courses.html — line ~190
const API_BASE = 'http://localhost:1337/api/courses-showcase';
//                ^^^ Change this to your deployed Strapi URL
```

The page will:
- Load all published courses on page open
- Filter results live as the visitor types in the search box
- Show skeleton loading cards while fetching
- Show a friendly empty state when no results match

---

## Course Fields

| Field        | Type        | Notes                              |
|--------------|-------------|------------------------------------|
| `title`      | String      | Required                           |
| `slug`       | UID         | Auto-generated from title          |
| `description`| Text        |                                    |
| `level`      | Enum        | Beginner / Intermediate / Advanced |
| `category`   | String      |                                    |
| `instructor` | String      |                                    |
| `duration`   | String      | e.g. "4 hours", "2 weeks"          |
| `thumbnail`  | Media       | Single image                       |
| `tags`       | JSON        | Array of strings                   |
| `isPublic`   | Boolean     | Default: true (controls visibility)|

---

## CORS (for production)

Add your visitor page domain to Strapi's allowed origins in `config/middlewares.js`:

```js
{
  name: 'strapi::cors',
  config: {
    origin: ['https://your-courses-site.com'],
  },
}
```
