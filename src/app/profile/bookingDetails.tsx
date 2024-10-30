import { MdDateRange } from "react-icons/md"
import { BookingDetails } from "../api/booking/user/route"
import { FaRegClock } from "react-icons/fa"
import { FaClipboard, FaClipboardCheck } from "react-icons/fa"
import { useState } from "react"

export default function BookingDetailsCard({ bookingDetails } : { bookingDetails : BookingDetails }) {
    const [isCopied, setIsCopied] = useState(false)
    const copyToClipboard = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(bookingDetails.ref)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }
    return (
      <div className="w-[100%] flex justify-evenly text-sm pt-2">
        <div className=" flex items-center gap-2 bg-white drop-shadow-xl p-1 rounded-full px-3 w-[25%]">
          <MdDateRange />
          {bookingDetails.departure_date}
        </div>
        <div className=" flex items-center gap-2 bg-white drop-shadow-xl p-1 rounded-full px-3 w-[25%]">
          <FaRegClock />
          {bookingDetails.departure_time}
        </div>
        <div className=" flex items-center gap-2 bg-white drop-shadow-xl p-1 rounded-full px-3 w-[40%]">
          {bookingDetails.ref}
          {!isCopied ? (
            <button className="ml-auto" onClick={copyToClipboard}>
              <FaClipboard></FaClipboard>
            </button>
          ) : (
            <div className="ml-auto">
            <FaClipboardCheck />
          </div>
          )}
        </div>
      </div>
    )
  }