"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation" // Gunakan useRouter dari App Router

const Category = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter() // Inisialisasi useRouter

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setData(response.data.categories)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const handleCategoryClick = (categoryName) => {
    router.push(`pages/detailCategory/${categoryName}`) // Redirect ke halaman detail kategori
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {data.map((category) => (
        <div
          key={category.idCategory}
          onClick={() => handleCategoryClick(category.strCategory)} // Panggil fungsi navigasi saat diklik
          className="relative w-64 h-40 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 bg-cover bg-center cursor-pointer"
          style={{
            backgroundImage: `url(${category.strCategoryThumb})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-xl font-bold">{category.strCategory}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category
