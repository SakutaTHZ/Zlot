import React from 'react'
import './App.css'
import SlotMachine from './components/SlotMachine'

function App() {
  const checkData = () =>{
    !localStorage.getItem("money")&&localStorage.setItem("money",10000)
    console.log(localStorage.getItem("money"))
  }

  checkData()
  
  return (
    <section className='w-screen h-screen flex justify-center items-center'>
      <SlotMachine/>
    </section>
  )
}

export default App
