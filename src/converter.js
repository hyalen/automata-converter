// initial file data
let nfaAlphabet = []
let initialNode = null
let finalNode = null
let nodes
let dfaNodes = []

// nfa data
let nfaObj = {}

//dfa data
let dfaObj = {}

export const init = (file) => {
  const fileData = file.split('\n')
  nfaAlphabet = fileData[0].split(' ')
  initialNode = fileData[1]
  finalNode = fileData[2]
  let rawTransitions = fileData.filter((item, index) => index >= 3)
  
  createNFAObject(rawTransitions)
  nodes = createNodes(rawTransitions)
  createInitialDFA()
}

export const nfa = nfaObj

function createInitialObj(nodes) {
  return nodes.reduce((node, key) => ({ ...node, [key]: {} }), {})
}

function createNFAObject(rawTransitions) {
  // initially, the object will contain only null values for each node key
  nfaObj = createInitialObj(nodes)

  // now we can populate each key, with its own connected transitions
  rawTransitions.forEach((transition, index) => {
    const parsedTransitions = transition.split(' ')
    const parsedTransitionInitialState = parsedTransitions[0]
    const hasNextState = parsedTransitions.length === 3
    Object.keys(nfaObj).forEach(NFAInitialState => {
      if (parsedTransitionInitialState === NFAInitialState) {
        const transitionValue =  hasNextState ? parsedTransitions[parsedTransitions.length - 1] : null
        nfaObj[transition][nfaAlphabet[index % nfaAlphabet.length]] = transitionValue
      }
    })
  })
  console.log('nfa obj................... ', nfaObj)
}

function createNodes(rawTransitions) {
  const alphabetLength = nfaAlphabet.length
  // creates an array with all of the nodes listed in the file.
  // This will be useful in addition to create unique objects for each node
  return rawTransitions.map((item, index) => {
    if (index % alphabetLength === 0) {
      const line = item.split(' ')
      return line
    }
  })
}

// this function assigns the first node from NFA to the DFA,
// and then it checks for a non-mapped node. Example: {x,x1}
function createInitialDFA() {
  let firstNfaNode = nfaObj[Object.keys(nfaObj)[0]]
  dfaObj[Object.keys(nfaObj)[0]] = firstNfaNode

  let newDfaNode = newNodeWasFound(dfaObj)
  createDFAObject(newDfaNode)
}

function createDFAObject(newDfaNode) {
  newDfaNode = newDfaNode.split(',')
  let tempObj = {}
  let tempArray = []
  
  Object.keys(nfaObj).forEach(key => {
    if (newDfaNode.includes(key)) {
      tempObj[key] = nfaObj[key]
    }
  })

  for(let i = 0; i < nfaAlphabet.length; i++) {
    let word = ''
    Object.keys(tempObj).forEach(key => {
      const item = tempObj[key][nfaAlphabet[i]]
      if (item !== null) {
        word += item + ','
      } else {
        word += ''
      }
    })
    tempArray.push(word.substr(0, word.length -1))
  }

  dfaObj[newDfaNode] = nfaAlphabet.reduce((node, key) => ({ ...node, [key]: '' }), {})
  let pos = 0
  Object.keys(dfaObj[newDfaNode]).forEach(key => {
    dfaObj[newDfaNode][key] = tempArray[pos]
    pos++;
  })

  for (let i = 0; i < tempArray.length; i++) {
    if (!dfaNodes.includes(tempArray[i]) && !nodes.includes(tempArray[i])) {
      dfaNodes.push(tempArray[i])
      createDFAObject(tempArray[i])
    }
  }
}

function newNodeWasFound(dfaNode) {
  let newNode = null

  Object.keys(dfaNode).forEach(key => {
    for (let i = 0; i < nfaAlphabet.length; i++) {
      const transitionItem = dfaNode[key][nfaAlphabet[i]]
      if (transitionItem !== null && !nodes.includes(transitionItem)) {
        dfaNodes.push(transitionItem)
        newNode = transitionItem
      }
    }
  })

  return newNode
}
