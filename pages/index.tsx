import styles from "../styles/HomePage.module.scss";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <h1>The home page</h1>
      <ul>
        <li>
          <Link href="/todo">Todo</Link>
        </li>
        <li>
          <Link href="/todo/completed">Completed</Link>
        </li>
        <li>
          <Link href="/todo/pending">Pending</Link>
        </li>
        <li>
          <Link href="/todo/1">Id</Link>
        </li>
      </ul>
    </div>
  );
}
