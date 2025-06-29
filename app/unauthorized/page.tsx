export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-6 text-center">
        <div className="space-y-1">
          <h1 className="text-9xl font-bold">403</h1>
          <h2 className="text-3xl font-bold">Forbidden</h2>
        </div>
        <p className="text-sm text-gray-500">
          Access to this resource on the server is denied!
        </p>
      </div>
    </main>
  );
}
