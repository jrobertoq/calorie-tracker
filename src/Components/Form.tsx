import { useState, type ChangeEvent, type Dispatch, type FormEvent } from 'react'
import { categories } from '../data/categories'
import type { Activity } from '../types'
import type { ActivityActions } from '../reducers/activity-reducer'

type FormProps = {
  state: any
  dispatch: Dispatch<ActivityActions>
}

const initialState = {
  category: 1,
  name: '',
  calories: 0
}

export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState)

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

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    dispatch({
      type: 'save-activity',
      payload: { newActivity: activity }
    })

    setActivity(initialState)
  }

  return (
    <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
      >
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
          value={activity.category === 1 ? 'Agregar Comida' : 'Agregar Ejercicio'}
          disabled={!isValidActivity()}
        />
    </form>
  )
}
