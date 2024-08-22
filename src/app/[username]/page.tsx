export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div className="flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl mb-4">Hello {params.username}!</h1>
      <p className="mb-8">
        This is your own personalized page, where you can do whatever you want.
      </p>
    </div>
  );
}
