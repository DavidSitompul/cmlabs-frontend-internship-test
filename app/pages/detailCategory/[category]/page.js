"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation" // Import useRouter untuk navigasi

const DetailCategory = ({ params }) => {
  const [category, setCategory] = useState("") // State to store the category
  const [meals, setMeals] = useState([]) // State to store meals
  const [loading, setLoading] = useState(true) // State for loading
  const [error, setError] = useState(null) // State for error handling
  const router = useRouter() // Inisialisasi useRouter untuk navigasi

  useEffect(() => {
    // Unwrap params with React.use
    const fetchCategory = async () => {
      const unwrappedParams = await params // Wait for params to resolve
      setCategory(unwrappedParams.category) // Set the category state
    }

    fetchCategory() // Call the fetch function
  }, [params])

  useEffect(() => {
    const fetchMeals = async () => {
      if (category) {
        // Only fetch meals if category is defined
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
          if (response.data.meals) {
            setMeals(response.data.meals) // Update meals state
          } else {
            setMeals([]) // Handle case where no meals are found
          }
        } catch (error) {
          setError(error.message) // Update error state
        } finally {
          setLoading(false) // Stop loading
        }
      }
    }

    fetchMeals() // Call the fetch function
  }, [category])

  if (loading) return <p className="text-center text-xl">Loading...</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>

  const handleMealClick = (mealId) => {
    router.push(`/pages/detailMeal/${mealId}`) // Redirect ke halaman detailMeal berdasarkan mealId
  }

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
        <ol className="flex items-center space-x-4">
          <li>
            <a href="/" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200">
              Home
            </a>
          </li>
          <li>
            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8M8 12h8m-4 6h4" />
            </svg>
          </li>
          <li>
            <a href="/food" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200">
              Food
            </a>
          </li>
          <li>
            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8M8 12h8m-4 6h4" />
            </svg>
          </li>
          <li className="text-gray-600 font-semibold">{category}</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-center mb-6">Meals in {category}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              onClick={() => handleMealClick(meal.idMeal)}
              className="relative w-72 h-52 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
              style={{
                backgroundImage: `url(${meal.strMealThumb})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold">{meal.strMeal}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No meals found for this category.</p>
        )}
      </div>
    </div>
  )
}

export default DetailCategory
