import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <p className="text-sm font-semibold text-gray-900">Page not found</p>
      <Link href="/" className="text-sm font-semibold text-gray-900 underline">
        Back to home
      </Link>
    </div>
  );
}
