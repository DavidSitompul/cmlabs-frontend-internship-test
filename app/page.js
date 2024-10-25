import Category from "@/components/category"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10 mb-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Selamat Datang di Aplikasi Makanan</h1>
        <p className="text-center text-gray-600 mb-6">Temukan beragam resep dan makanan lezat untuk memuaskan selera Anda.</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-green-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 14H5.5A2.5 2.5 0 003 16.5V18a1 1 0 001 1h12a1 1 0 001-1v-1.5A2.5 2.5 0 0012.5 14H9zM5.5 14h3m-3 0V6.5A2.5 2.5 0 0111 4h3a2.5 2.5 0 012.5 2.5V14m3 0V6.5A2.5 2.5 0 0017 4h-3a2.5 2.5 0 00-2.5 2.5V14"
              />
            </svg>
            <h2 className="text-lg font-semibold">Masakan</h2>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-red-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
            <h2 className="text-lg font-semibold">Buah Segar</h2>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16m-7 6h7M3 18h18" />
            </svg>
            <h2 className="text-lg font-semibold">Makanan Laut</h2>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-yellow-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l9 21-9-6-9 6 9-21z" />
            </svg>
            <h2 className="text-lg font-semibold">Pizza</h2>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-pink-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h6M12 6h6M12 18h6m-12 0H6m6-12H6m0 12a6 6 0 11-6-6 6 6 0 016 6z" />
            </svg>
            <h2 className="text-lg font-semibold">Es Krim</h2>
          </div>
        </div>
      </div>
      <Category />
    </>
  )
}
