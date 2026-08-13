import React from 'react'
import './App.css'
import 'remixicon/fonts/remixicon.css'

function App() {

  return(
    <div className='h-screen bg-gray-800 p-5'>
      <div className='w-9/12 p-12 bg-white rounded-xl mx-auto'>
        <div className='w-full flex justify-between'>
          <h1 className='text-4xl font-bold'>Private Contact</h1>
          <button className='bg-blue-600 text-white p-3 pl-4 pr-4 rounded-lg cursor-pointer'>Add Contact</button>
        </div>
        <table className='w-full text-white font-bold mt-10'>
          <thead className='bg-pink-600'>
            <tr>
              <td className='p-4'>SN</td>
              <td>Person</td>
              <td>Mobile</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className='text-gray-700 font-normal text-xl'>
            <tr>
              <td className='pl-5 pt-5'>1</td>
              <td>Jashjeet</td>
              <td>ksjkjksnk-3298</td>
              <td className=''>
                <i className="ri-eye-line"></i>
              </td>
            </tr>
            <tr>
              <td className='pl-5 pt-5'>1</td>
              <td>Jashjeet</td>
              <td>ksjkjksnk-3298</td>
              <td className=''>
                <i className="ri-eye-line"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;