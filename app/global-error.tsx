"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold text-gray-900">Something went wrong</p>
          <p className="mt-2 text-sm text-gray-600">
            {process.env.NODE_ENV === "development" ? error.message : "Try again in a moment."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-4 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
