export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ceptar-red mx-auto"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading properties...</p>
      </div>
    </div>
  )
}
