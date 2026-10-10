import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-4xl">We couldn’t find that page</h1>
      <p className="body-copy mx-auto mt-3 max-w-md">It may have moved. Start again from the Hostel Application Guide or the homepage.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-ghost">Homepage</Link>
        <Link href="/hostel" className="btn-primary">Hostel Application Guide</Link>
      </div>
    </div>
  );
}
