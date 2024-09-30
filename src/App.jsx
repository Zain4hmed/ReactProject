import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length , setLength]               = useState(8);
  const [numAllowed , setNumAllowed]       = useState(false);
  const [spCharAllowed , setSpCharAllowed] = useState(false);
  const [password , setPassword]           = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (spCharAllowed) str += "!@#$%^&*()_+{}";

    for(let i = 0 ; i < length ; i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  },[length,numAllowed,spCharAllowed,setPassword]);


  useEffect(() => {
    passwordGenerator()
  },[length,numAllowed,spCharAllowed,passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto  shadow-md rounded-lg  px-4 my-8 text-orange-800 bg-gray-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3' type='text' value={password} placeholder='Password' readOnly>
          </input>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={numAllowed}
            id = "numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev)
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={spCharAllowed}
            id = "spCharInput"
            onChange={() => {
              setSpCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor='numberInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
