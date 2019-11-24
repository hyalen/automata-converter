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

  createNFATable(obj.transitions)
}

function createNFATable(transitions) {
  console.log(transitions)
}