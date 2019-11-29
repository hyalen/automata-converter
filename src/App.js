import React, { useEffect, useState } from 'react'
import Graph from './components/Graph'

import { init, shallowClonedNFA, DFA } from './converter'

// assets
import './App.css'

let fileReader
let verify = null
function App() {
  const [values, setValues] = useState(null)
  const [NFATable, setNFATable] = useState({})
  const [DFATable, setDFATable] = useState({})

  const [NFANodes, setNFANodes] = useState([])
  const [NFAEdges, setNFAEdges] = useState([])
  const [DFANodes, setDFAEdges] = useState([])

  useEffect(() => {
    if (values !== null) {
      init(values)
      setNFATable(shallowClonedNFA)
      setDFATable(DFA)
    }
    /*     if(verify !== null) { 
      const {NFATable, categorizedTransitions, obj} = init(values)
      setNFATable(NFATable)
      setCategorizedTransitions(categorizedTransitions)
      setParsedNFAObject(obj)
      parseNFAGraphNodes(NFATable)

    } */
  }, [values])

  useEffect(() => {
    parseNFAGraphNodes(NFATable)
    parseAutomataGraphEdges(NFATable)
  }, [NFATable])

  function handleFileRead() {
    const content = fileReader.result
    setValues(content)
  }

  function parseNFAGraphNodes(NFATable) {
    const NFANodes = Object.keys(NFATable).map(initialState => ({
      id: initialState,
      label: initialState,
      color: '#000',
      size: 10,
      x: Math.random(),
      y: Math.random(),
      size: 9,
      color: '#000000',
      borderColor: '#FF3333'
    }))
    setNFANodes(NFANodes)
  }

  function parseAutomataGraphEdges(NFATable, NFANodes) {
    console.log('NFA TABLE............... ', JSON.stringify(NFATable))
    let NFAEdges = []
    /* debugger
    NFAEdges = Object.keys(NFATable).map((alphabet) => {
      return NFATable[alphabet].map((transitionObj, i) => {
        let obj = {}
        if(!transitionObj.state.includes(',')) {
          // The SIgma JS library "target" attribute is required in the edges
          // so, in the lambda functions, it can't be removed, so the node will target
          // itself, but the arrow will be invisible
          obj = {
            id: Math.random(),
            source: transitionObj.transition,
            target: transitionObj.state === "Y" ? transitionObj.transition : transitionObj.state,
            color: transitionObj.state === "Y" ? "#fff" : "#ff0000",
            type: "curvedArrow"
          }
          return obj
        } else {
          const state = transitionObj.state.split(',')
            return state.map((state, i) => {
              return { id:  Math.random(),
              source: transitionObj.transition,
              target: state,
              color: "#ff0000",
              type: "curvedArrow"
            }
          })
        }
      })
    }).flat(3)

    console.log(JSON.stringify(NFAEdges))

    console.log(JSON.stringify(NFANodes))

    setNFAEdges(NFAEdges) */
  }

  function handleChange(file) {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }
  // {NFANodes.length > 0 && NFAEdges.length > 0 && <Graph nodes={NFANodes} edges={NFAEdges}/>}
  return (
    <div className="app">
      <div className="app-header">
        {/*  <Graph />*/}
        <form>
          <div className="app-form">
            <label htmlFor="file-upload">Upload NFA</label>
            <input
              className="app-file-upload-button"
              onChange={evt => handleChange(evt.target.files[0])}
              type="file"
              id="file-upload"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
