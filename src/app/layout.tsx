import '../styles/globals.css'

export const metadata = {
  title: 'Next Prisma CRUD',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Traning CRUD Ops</h1>
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
          <p>&copy; 2025 NamanMadharia</p>
        </footer>
      </body>
    </html>
  );
}