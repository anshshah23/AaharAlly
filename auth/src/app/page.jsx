import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/protected">protected Route</Link>
      <h1>Home Page</h1>
    </>
  );
}
