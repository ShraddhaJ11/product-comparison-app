const loader = (state=false,action) => {
  switch(action.type){
    case 'START': 
      return state = true;
    case 'END':
      return state = false;
    default:
      return state;
  }
}

export default loader;