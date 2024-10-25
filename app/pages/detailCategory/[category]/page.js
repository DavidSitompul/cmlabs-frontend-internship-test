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
    router.push(`/pages/detailMeal/${mealId}?category=${category}`) // Redirect ke halaman detailMeal berdasarkan mealId
  }

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-4 p-4 bg-gray-100 rounded-lg shadow" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
              <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <a href="#" className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">
                Food
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{category}</span>
            </div>
          </li>
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
