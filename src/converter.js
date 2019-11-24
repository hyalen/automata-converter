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

function getNextDFAState(DFATransitions, NFATable, DFATable) {
  const newTransitionObject = {
    transition: '',
    state: ''
  };
  
  const lastRegisteredTransitions = DFATransitions[DFATransitions.length - 1];

}