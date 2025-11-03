# Next.js Prisma CRUD Application

This project is a Next.js application that demonstrates how to implement a simple CRUD (Create, Read, Update, Delete) functionality using Prisma for database integration. The application allows users to manage posts, including creating new posts, viewing a list of posts, editing existing posts, and deleting posts.

## Project Structure

```
next-prisma-crud
├── prisma
│   └── schema.prisma        # Defines the database schema for Prisma
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── posts
│   │   │   │   └── route.ts # API routes for handling CRUD operations
│   │   │   └── posts
│   │   │       └── [id]
│   │   │           └── route.ts # API route for handling specific post operations
│   │   ├── layout.tsx       # Layout component for the application
│   │   ├── page.tsx         # Main entry point for the application
│   │   └── posts
│   │       ├── page.tsx     # Displays a list of posts
│   │       ├── new
│   │       │   └── page.tsx # Form for creating a new post
│   │       └── [id]
│   │           ├── page.tsx # Displays details of a specific post
│   │           └── edit
│   │               └── page.tsx # Form for editing an existing post
│   ├── lib
│   │   └── prisma.ts        # Initializes the Prisma client
│   ├── components
│   │   ├── PostForm.tsx     # Component for rendering a form to create/edit posts
│   │   └── PostList.tsx     # Component for displaying a list of posts
│   └── styles
│       └── globals.css      # Global CSS styles
├── .env                      # Environment variables
├── next.config.js           # Configuration settings for Next.js
├── tsconfig.json            # TypeScript configuration
├── package.json             # npm configuration
└── README.md                # Project documentation
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd next-prisma-crud
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Update the `.env` file with your database connection string.
   - Run the following command to generate the Prisma client and migrate the database:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## Features

- Create new posts
- View a list of all posts
- Edit existing posts
- Delete posts
- Responsive design

## License

This project is licensed under the ISC License.