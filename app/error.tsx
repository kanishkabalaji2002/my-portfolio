"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-md flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <p className="text-sm font-semibold text-gray-900">Something went wrong</p>
      <p className="text-sm text-gray-600">
        {process.env.NODE_ENV === "development" ? error.message : "Try again in a moment."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
