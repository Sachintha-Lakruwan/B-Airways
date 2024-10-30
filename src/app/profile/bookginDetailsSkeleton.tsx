export default function BookingDetailsSkeletonCard() {
    return (
      <div className="bg-white/30 p-6 rounded-lg shadow-md animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 rounded-full w-1/4"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    )
  }