import Image from "next/image";
import img from "@/public/pexels-hson-5071155.jpg";

export default function Loyalty() {
    return (
      <>
        <div className="bg-sky-400 w-full h-full absolute z-0">
          <Image
            src={img}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={true}
            alt="hero image"
          ></Image>
        </div>
        <div className="relative z-0 p-[150px] overflow-scroll">
        <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-8 text-center">Loyalty Program</h1>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-gradient-to-br from-gray-100 to-gray-300 border border-gray-400 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-800">Frequent Flyer</h2>
              <p className="text-gray-600">For our regular travelers</p>
            </div>
            <div className="px-6 py-6">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>5% discount on all flights</li>
                <li>30kg base baggage weight</li>
                <li>Only 20$ per additional kilo</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 border border-yellow-400 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-6 py-4">
              <h2 className="text-2xl font-bold text-yellow-800">Gold Member</h2>
              <p className="text-yellow-700">For our most valued customers</p>
            </div>
            <div className="px-6 py-6">
              <ul className="list-disc list-inside space-y-2 text-yellow-800">
                <li>9% discount on all flights</li>
                <li>40kg base baggage weight</li>
                <li>Only 10$ per additional kilo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}