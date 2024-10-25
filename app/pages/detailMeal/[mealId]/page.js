"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { use } from "react" // Pastikan Anda mengimpor use
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import Image from "next/image"

const MealDetail = ({ params }) => {
  // Meng-unwrap params menggunakan React.use
  const unwrappedParams = use(params)
  const { mealId } = unwrappedParams // Akses mealId dari params
  const [meal, setMeal] = useState(null) // State untuk menyimpan detail makanan
  const [loading, setLoading] = useState(true) // State untuk loading
  const [error, setError] = useState(null) // State untuk error handling
  const [category, setCategory] = useState("") // State untuk kategori

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

  useEffect(() => {
    // Capture category from URL parameters
    const queryParams = new URLSearchParams(window.location.search)
    setCategory(queryParams.get("category") || "") // Set kategori jika ada
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    if (ingredient) {
      ingredients.push(ingredient)
    }
  }
  const groupedIngredients = []
  for (let i = 0; i < ingredients.length; i += 5) {
    groupedIngredients.push(ingredients.slice(i, i + 5))
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* breadcrumb */}
        <nav className="flex mb-4 p-4 rounded-lg shadow" aria-label="Breadcrumb">
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
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link href={`/pages/detailCategory/${category}`} className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">
                  {category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{meal.strMeal}</span>
              </div>
            </li>
          </ol>
        </nav>
        {/*  */}

        <h1 className="text-2xl font-bold mb-4">{meal.strMeal}</h1>

        <div className="bg-red-500 p-10">
          <div className="flex flex-wrap md:flex-nowrap justify-between space-y-4 md:space-y-0 md:space-x-4">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full md:w-1/2 h-[300px] md:h-[500px] object-cover rounded-md mb-4" />
            <div className="w-full md:w-1/2">
              <h1 className="font-semibold text-2xl mb-4">Instructions</h1>
              <p>{meal.strInstructions}</p>
              <h1 className="font-semibold text-2xl my-4">Recipes</h1>
              <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-8">
                {groupedIngredients.map((group, index) => (
                  <ul key={index} className="list-disc list-inside w-full md:w-1/3 mb-4">
                    {group.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          {meal.strYoutube && (
            <div className="mt-10">
              <h2 className="text-[34px] font-bold">Tutorials</h2>
              <div className="aspect-w-16 aspect-h-9 flex justify-center">
                <iframe
                  width="80%"
                  className="rounded-xl h-[200px] md:h-[300px] lg:h-[350px]"
                  src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MealDetail
