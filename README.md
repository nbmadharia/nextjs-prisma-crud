Windows Setup -> https://docs.google.com/document/d/1UeEt78puKG3qTKmFAgIfnIekBwU4zTm3JgmIlYGW8XM/edit?usp=sharing


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


======================================== STEPS. =========================



1. Scaffold Next app (TypeScript, app router)

# create project
npx create-next-app@latest next-prisma-crud --ts --use-npm --app
cd next-prisma-crud

2. Install Prisma + runtime

npm install @prisma/client dotenv
npm install -D prisma


3. Initialize Prisma

npx prisma init
# this creates prisma/schema.prisma and .env


4. Edit .env — set your Postgres URL (replace user/pass/db/host/port)

# open .env and set:
# DATABASE_URL="postgresql://myuser:password@localhost:5432/mydatabase"


5. Update schema.prisma 

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}



6. Create the DB (if it doesn't exist) and run migrations

# create DB (mac) - replace db name
createdb mydatabase
# run generate + migrate
npx prisma generate
npx prisma migrate dev --name init
# alternative: npx prisma db push (if you don't want a migration)


7. Add a Prisma client wrapper for Next dev-hot reload

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
export default prisma;


8. Create API routes (app router example) — minimal posts route

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const post = await prisma.post.create({ data });
  return NextResponse.json(post, { status: 201 });
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const post = await prisma.post.findUnique({ where: { id } });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await req.json();
  const post = await prisma.post.update({ where: { id }, data });
  return NextResponse.json(post);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}


9. Add client components (PostForm / PostList). Mark with "use client". Use fetch to call the API. (You already have working PostForm in src/components.)
10.  Add global CSS and import it from src/app/layout.tsx:

import '../styles/globals.css';
export default function RootLayout({ children }: any) { ... }

11. Ensure tsconfig path alias (optional) — to use '@/...' imports

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    ...
  }
}

12. {}package.json scripts (should already exist from create-next-app)

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}

13. Run dev 

# regenerate (if you changed schema)
npx prisma generate

# start dev
npm run dev

# open http://localhost:3000
