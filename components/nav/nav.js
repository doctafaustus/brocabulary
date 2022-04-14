import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/all-words">
            <a>All Words</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}