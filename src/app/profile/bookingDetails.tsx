import { BookingDetails } from "../api/booking/user/route"

export default function BookingDetailsCard({ bookingDetails }: { bookingDetails: BookingDetails }) {
    return (
      <div className="glass p-6 rounded-lg shadow-md m-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            {bookingDetails.departure} to {bookingDetails.arrival}
          </h2>
          <span className="text-sm font-medium bg-sky-100 text-sky-800 py-1 px-2 rounded-full">
            {bookingDetails.ref}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-sm">
            <span className="font-medium text-gray-600">Date: </span>
            <span>{bookingDetails.departure_date}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">Time: </span>
            <span>{bookingDetails.departure_time}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">Class: </span>
            <span className="capitalize">{bookingDetails.seat_class}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">Seat: </span>
            <span>{bookingDetails.seat_number}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            bookingDetails.status === 'On Time' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}>
            {bookingDetails.status}
          </span>
        </div>
      </div>
    )
  }