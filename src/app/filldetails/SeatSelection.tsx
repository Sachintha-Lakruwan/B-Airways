import React, { Dispatch, SetStateAction } from "react";

interface Seat {
  [key: string]: boolean;
}

type SeatRow = Seat[];

interface SeatSelectionProps {
  setPickedSeat: Dispatch<SetStateAction<string>>;
  seats: SeatRow[];
  pickedSeat: string;
}

export default function SeatSelection({
  seats,
  setPickedSeat,
  pickedSeat,
}: SeatSelectionProps) {
  const handleSeatClick = (seatId: string, isAvailable: boolean) => {
    if (isAvailable) {
      setPickedSeat(seatId);
      console.log(seatId);
    }
  };

  return (
    <div className="w-full max-h-[50dvh] overflow-scroll">
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2 mb-4 justify-center">
          {row.map((seat) => {
            const [seatId, isAvailable] = Object.entries(seat)[0];
            return (
              <button
                key={crypto.randomUUID()}
                onClick={() => handleSeatClick(seatId, isAvailable)}
                className={`px-4 py-2 border rounded cursor-pointer font-bold ${
                  isAvailable
                    ? "bg-sky-100 text-sky-950"
                    : "bg-red-400 text-sky-50"
                } ${
                  pickedSeat == seatId
                    ? "bg-sky-900 text-sky-100 scale-110"
                    : " "
                }`}
                disabled={!isAvailable}
              >
                {seatId}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
