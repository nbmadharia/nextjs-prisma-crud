import './globals.css';

export const metadata = {
  title: 'Next Prisma CRUD',
  description: 'A simple CRUD application using Next.js and Prisma',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Next Prisma CRUD</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/posts">Posts</a></li>
              <li><a href="/posts/new">Create Post</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Next Prisma CRUD</p>
        </footer>
      </body>
    </html>
  );
}