import React, { useEffect, useState } from 'react' 
import Graph from './components/Graph'

import { createNFAObject, createNFATable, categorizeTransitionByState } from './converter'

// assets
import './App.css'

let fileReader

function App () {
  const [values, setValues] = useState(null)
  const [NFATable, setNFATable] = useState({})
  const [categorizedTransitions, setCategorizedTransitions] = useState({})
  const [parsedNFAObject, setParsedNFAObject] = useState({})

  const [NFANodes, setNFANodes] = useState([])
  const [NFAEdges, setNFAEdges] = useState([])


  useEffect(() => {
    if(values !== null) { 
      const {NFATable, categorizedTransitions, obj} = createNFAObject(values)
      setNFATable(NFATable)
      setCategorizedTransitions(categorizedTransitions)
      setParsedNFAObject(obj)
      parseNFAGraphNodes(obj)
    }
  }, [values])

/*   useEffect(() => {
    if(parsedNFAObject !== undefined) {
      parseNFAGraphNodes(parsedNFAObject)
    }
  }, [NFANodes]) */

  function handleFileRead () {
    const content = fileReader.result
    setValues(content)
  }

  function parseNFAGraphNodes(parsedNFAObject) {
    const nodes = parsedNFAObject.transitions.map(transition => {
      return {
        id: transition,
        label: transition,
        color: "#000",
        size: 10
      }
    })
    setNFANodes(nodes)
  }


  console.log('nfa nodes.......... ', NFANodes)

  //function parseNFAGraphEdges()

  function handleChange(file) {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <div className='app'>
      <div className='app-header'>
      <Graph />
      <Graph />
        <form>
          <div className='app-form'>
            <label htmlFor='file-upload'>Upload NFA</label>
            <input className='app-file-upload-button' onChange={evt => handleChange(evt.target.files[0])} type='file' id='file-upload' />
          </div>
        </form>
        {values !== null && <p style={{ maxWidth: '200px' }}>{values}</p>}
      </div>
    </div>
  )
}

export default App
