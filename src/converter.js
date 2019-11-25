let obj = {}
let NFATable = {}
export const createNFAObject = (file) => {
  const fileData = file.split('\n')

  let transitions = fileData.filter((item, index) => {
    return index >= 3
  })

  obj.type = 'NFA'
  obj.alphabet = fileData[0]
  obj.initialState = fileData[1]
  obj.finalState = fileData[2]
  obj.transitions = transitions
  const categorizedTransitions = categorizeTransitionByState(obj.alphabet);
  NFATable = createNFATable(categorizedTransitions, obj.transitions);
  const initialDFATable = getDFAInitialState(NFATable);
  const DFATable = createDFATable(initialDFATable, NFATable)
  // const DFATransitions = DFATransitionsArray(DFATable)
  // getNextDFAState(DFATransitions, NFATable, obj.alphabet.split(' ').join(''))
}

function createDFATable(initialDFATable, NFATable) {
  let transitionArray = [initialDFATable[0][0].transition]
  Object.keys(initialDFATable).forEach(key => {
    initialDFATable[key].map(transitionItem => {
      if (foundItemInsideArray(transitionArray, initialDFATable[key], 'state').length === 0) {
        transitionArray.push(transitionItem.state)
        insertNewDFAItem(initialDFATable, transitionItem.state)
      }
    })
    //console.log(initialDFATable)
  })

}

// checks if the new transition from DFA is already inside the array
function foundItemInsideArray(transitionArray, DFATableArray, type) {
  if (type === 'state') {
    return DFATableArray.filter(element => transitionArray.includes(element.state));
  } else if (type === 'transition') {
    return DFATableArray.filter(element => transitionArray.includes(element.transition));
  }
}

function insertNewDFAItem (initialDFATable, itemToBeInserted) {
  let state = itemToBeInserted.split(',')
  let newState = []
  Object.keys(NFATable).forEach(key => {
    if (foundItemInsideArray(state, NFATable[key], 'transition').length > 0) {
      let stringifiedTransition = ''
      let newStateCopy = foundItemInsideArray(state, NFATable[key], 'transition').map((item, index) => {
        Object.keys(item).forEach(key => {
          if (key === 'state') {
            stringifiedTransition += item[key] + ','
          }
        })
      })
      newState.push(stringifiedTransition.substr(0, stringifiedTransition.length - 1))
    }
  })

  Object.keys(initialDFATable).map(key => {
    initialDFATable[key].push({
      transition: itemToBeInserted,
      state: newState[key]
    })
  })

  console.log(initialDFATable)
}

export function categorizeTransitionByState(alphabet) {
  const alphabetElements = alphabet.split(' ');
  const categorizedTransitions = alphabetElements.reduce((categorizedTransitionState, state) =>
    ({...categorizedTransitionState, [state]: []}), {});

/*    format {
      '0': [],
      '1': []
    }
 */
  return categorizedTransitions;
}

export function createNFATable(categorizedTransitionsObj, rawTransitions) {
  const clonedCategorizedTransitionsObj = JSON.parse(JSON.stringify(categorizedTransitionsObj));
  for (let i = 0; i < rawTransitions.length; i++) {
    const [transition, inAlphabet, state = 'Y'] = rawTransitions[i].split(' ');
    clonedCategorizedTransitionsObj[inAlphabet].push({transition, state});
  }
  return clonedCategorizedTransitionsObj;
}

function getDFAInitialState(categorizedAFN) {
  const categorizedDFA = JSON.parse(JSON.stringify(categorizedAFN));
  Object.keys(categorizedAFN).map(state => {
    categorizedDFA[state] = [categorizedDFA[state].shift()];
  })
  return categorizedDFA;
}

function searchDFAState(statesToCheckFor, NFATable, alphabetSymbol) {
    return NFATable[alphabetSymbol].filter(transitionObj => {
      if(statesToCheckFor.includes(transitionObj.transition)) {
        return transitionObj
      }
    })
}

function getNextDFAState(DFATransitions, NFATable, DFAalphabet) {
  
  //transition created to represent next DFA states for each state symbol. If I have an "01"
  // alphabet, then I'll have two objects with DFA states and transitions when "0" and "1"
  const newTransitionObject = {
    transition: '',
    state: ''
  };

  let statesToCheckFor;
  const foundStates = []

  const lastRegisteredTransition = DFATransitions[DFATransitions.length - 1];
  newTransitionObject.transition = lastRegisteredTransition;

  /* check if next DFA transition has more than one 
   state to check for in the NFA table, "x, x1", as an example */
  if(lastRegisteredTransition.includes(',')) {
    statesToCheckFor = lastRegisteredTransition.split(',')
  } else {
    statesToCheckFor = [lastRegisteredTransition]
  }

  /* 
    Remove this comment, if necessary.
    The "foundStates" will contain an array with the next DFA state object
    for each DFA alphabet symbol, in  gieven transitions.
    For example: In my "newTransition" object I have a transition in
    "X" and the alphabet "01"
    Given "X", the "foundStates" will return an array with composed the "X" state objects for "0" and "1":
    X in NFA when O -> X
    X in NFA when 1 -> X,11
  */
  for(const alphabetSymbol of DFAalphabet) {
    foundStates.push({ for: alphabetSymbol, transitions: searchDFAState(statesToCheckFor, NFATable, alphabetSymbol)})
  }
  
}