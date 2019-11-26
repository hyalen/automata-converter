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
      parseNFAGraphNodes(NFATable)

    }
  }, [values])

  useEffect(() => {
    parseNFAGraphEdges(NFATable, NFANodes)
  }, [NFANodes])

  function handleFileRead () {
    const content = fileReader.result
    setValues(content)
  }

  function parseNFAGraphNodes(NFATable) {
    const nodes = NFATable[0].map(({transition}) => {
      return {
        id: transition,
        label: transition,
        color: "#000",
        size: 10
      }
    })
    setNFANodes(nodes)
  }

  function parseNFAGraphEdges(NFATable, NFANodes) {
    const NFAEdges = Object.keys(NFATable).map(alphabet => {
      return NFATable[alphabet].map(transitionObj => {
        return {
          id: `${transitionObj.transition} ${alphabet}`,
          source: transitionObj.transition,
          target: transitionObj.state !== 'Y' ? transitionObj.state : '',
          label: `${transitionObj.transition} ${alphabet}`
        }
      })
    }).flat()
    setNFAEdges(NFAEdges)
  }

  function handleChange(file) {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <div className='app'>
      <div className='app-header'>
      {NFANodes.length > 0 && NFAEdges.length > 0 && <Graph nodes={NFANodes} edges={NFAEdges}/> }
      {/*  <Graph />*/}
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
