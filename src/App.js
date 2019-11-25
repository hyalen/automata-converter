import React, { useEffect, useState } from 'react' 
import Graph from './components/Graph'

import { createNFAObject, getNFAAlphabet, categorizeTransitionByState, createNFATable } from './converter'

// assets
import './App.css'

let fileReader

function App () {
  const [values, setValues] = useState(null)

  useEffect(() => {
    values !== null && createNFAObject(values)
  }, [values])

  function handleFileRead () {
    const content = fileReader.result
    setValues(content)
  }

  function handleChange(file) {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <div className='app'>
      <div className='app-header'>
      <Graph />
        <form>
          <label htmlFor='file-upload'>Upload NFA</label>
          <input onChange={evt => handleChange(evt.target.files[0])} type='file' id='file-upload' />
        </form>
        {values !== null && <p style={{ maxWidth: '200px' }}>{values}</p>}
      </div>
    </div>
  )
}

export default App
