import { categories } from '../data/categories'

export default function Form() {
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className='font-bold'>Categoria:</label>

            <select id="category" className="border border-slate-300 rounded-lg w-full bg-white p-2 text-slate-700">
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="activity" className='font-bold'>Actividad:</label>
            <input 
                type="text" 
                id="activity" 
                className="border border-slate-300 rounded-lg p-2 text-slate-700"
                placeholder='Ej: Comida, Jugo de naranja, Correr 5km'
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className='font-bold'>Calorías:</label>
            <input 
                type="number" 
                id="calories" 
                className="border border-slate-300 rounded-lg p-2 text-slate-700"
                placeholder='Ej: 100, 200, 300'
            />
        </div>

        <input type="submit" className="bg-lime-500 hover:bg-lime-600 w-full font-bold uppercase text-white px-5 py-2 rounded-lg cursor-pointer" value="Guardar Comida o Guardar Ejercicio" />
    </form>
  )
}
