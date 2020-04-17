export const allToDos = function(state) {
    // let theKeys = Object.keys(state);
    // let themappedKeys = theKeys.map((id)=>{theKeys.id})
  return Object.keys(state["todos"]).map(id => state.id)
    // console.log("the state:", state)
    // console.log("the Keys:", theKeys);
    // console.log("the mapped Keys:", themappedKeys);
    // return themappedKeys;
}