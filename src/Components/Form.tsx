import { useState, type ChangeEvent } from 'react'
import { categories } from '../data/categories'
import type { Activity } from '../types'

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 2,
    name: '',
    calories: 0
  })

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    console.log(name, calories)
    console.log(name.trim() !== '' && calories > 0)
    return name.trim() !== '' && calories > 0
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className='font-bold'>Categoria:</label>

            <select 
                id="category" 
                className="border border-slate-300 rounded-lg w-full bg-white p-2 text-slate-700"
                value={activity.category}
                onChange={handleChange}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className='font-bold'>Actividad:</label>
            <input 
                type="text" 
                id="name" 
                className="border border-slate-300 rounded-lg p-2 text-slate-700"
                placeholder='Ej: Comida, Jugo de naranja, Correr 5km'
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className='font-bold'>Calorías:</label>
            <input 
                type="number" 
                id="calories" 
                className="border border-slate-300 rounded-lg p-2 text-slate-700"
                placeholder='Ej: 100, 200, 300'
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
          type="submit" 
          className="bg-lime-500 hover:bg-lime-600 w-full font-bold uppercase text-white px-5 py-2 rounded-lg cursor-pointer disabled:opacity-50 transition-all" 
          value="Guardar Comida o Guardar Ejercicio"
          disabled={!isValidActivity()}
        />
    </form>
  )
}
