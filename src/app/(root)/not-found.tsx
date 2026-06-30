import Link from "next/link";
export default function NotFound(){return <main className="not-found"><p className="eyebrow">404</p><h1>Page not found</h1><p>The requested page does not exist or may have moved.</p><Link className="button" href="/en/">Return home</Link></main>}
