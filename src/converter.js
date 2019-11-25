let obj = {}

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
  const NFATable = createNFATable(categorizedTransitions, obj.transitions);
  console.log('nfa table............. ', NFATable)
  const DFATable = getAFDInitialState(NFATable);
  const DFATransitions = DFATransitionsArray(DFATable)
  console.log('DFAWithInitialState.......... ',DFATable )
  console.log('dfa transitions............ ', DFATransitions)
  getNextDFAState(DFATransitions, NFATable, obj.alphabet.split(' ').join(''))
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

export const DFATransitionsArray = (DFAStates) => {
  const DFATransitionsWithDuplicates = Object.keys(DFAStates).map(state => { 
    return DFAStates[state].map(transitionObj => {
      if(transitionObj.state !== "Y") {
        return transitionObj.state
      }
    });
  }).flat();
  return Array.from(new Set(DFATransitionsWithDuplicates)) ;
}

export function createNFATable(categorizedTransitionsObj, rawTransitions) {
  const clonedCategorizedTransitionsObj = JSON.parse(JSON.stringify(categorizedTransitionsObj));
  for (let i = 0; i < rawTransitions.length; i++) {
    const [transition, inAlphabet, state = 'Y'] = rawTransitions[i].split(' ');
    clonedCategorizedTransitionsObj[inAlphabet].push({transition, state});
  }
  return clonedCategorizedTransitionsObj;
}

function getAFDInitialState(categorizedAFN) {
  const categorizedAFD = JSON.parse(JSON.stringify(categorizedAFN));
  Object.keys(categorizedAFN).map(state => {
    categorizedAFD[state] = [categorizedAFD[state].shift()];
  })
  return categorizedAFD;
}

function searchAFDState(statesToCheckFor, NFATable, alphabetSymbol) {
    return NFATable[alphabetSymbol].filter(transitionObj => {
      if(statesToCheckFor.includes(transitionObj.transition)) {
        return transitionObj
      }
    })
}

function getNextDFAState(DFATransitions, NFATable, DFAalphabet) {
  const newTransitionObject = {
    transition: '',
    state: ''
  };

  let statesToCheckFor;
  const foundStates = []

  const lastRegisteredTransition = DFATransitions[DFATransitions.length - 1];
  newTransitionObject.transition = lastRegisteredTransition;

/*    check if next DFA transition has more than one 
   state to check for in the NFA table, "x, x1", as an example */

  if(lastRegisteredTransition.includes(',')) {
    statesToCheckFor = lastRegisteredTransition.split(',')
  } else {
    statesToCheckFor = [lastRegisteredTransition]
  }

  for(const alphabetSymbol of DFAalphabet) {
    foundStates.push({ for: alphabetSymbol, transitions: searchAFDState(statesToCheckFor, NFATable, alphabetSymbol)})
  }
  
}