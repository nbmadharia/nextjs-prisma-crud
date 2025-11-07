import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the CICD ProSystems!!</h1>
      <nav>
        <ul>
          <li>
            <Link href="/posts">View Posts</Link>
          </li>
          <li>
            <Link href="/posts/new">Create New Post</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}