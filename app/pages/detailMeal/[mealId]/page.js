"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { use } from "react" // Pastikan Anda mengimpor use

const MealDetail = ({ params }) => {
  // Meng-unwrap params menggunakan React.use
  const unwrappedParams = use(params)
  const { mealId } = unwrappedParams // Akses mealId dari params
  const [meal, setMeal] = useState(null) // State untuk menyimpan detail makanan
  const [loading, setLoading] = useState(true) // State untuk loading
  const [error, setError] = useState(null) // State untuk error handling

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        setMeal(response.data.meals[0]) // Set detail makanan
      } catch (error) {
        setError(error.message) // Set error
      } finally {
        setLoading(false) // Set loading ke false
      }
    }

    fetchMealDetail() // Panggil fungsi fetchMealDetail
  }, [mealId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-80 object-cover rounded-md mb-4" />
      <p>{meal.strInstructions}</p>
    </div>
  )
}

export default MealDetail
