/**
 * Find the given key in the object
 * @param {Object} obj 
 * @param {string} key 
 * @returns object, object.prop has the string of the path, object.value has the value of the given key.
 */
function extractValuesForKey(obj, key) {

  let valuesOfSearchedKey = [];
  let currentSearchPath = []; // save the current searching node path
  let pathsOfSearchedKey = [];

  function _findVal(obj, key) {

    // Only return the props, which match the key
    return Object.keys(obj).filter(function _inner(k) {
      currentSearchPath.push(k); // add the node in the search path

      // If the prop is an object, continue searching key in it
      if (typeof obj[k] === "object") {
        let arrTemp = _findVal(obj[k], key);
        currentSearchPath.pop(); // remove the node in the search path
        return arrTemp.length !== 0;
      }

      // The prop has a primitive value, check if it is matched.
      let isKeyMatched = key === k;
      currentSearchPath.pop(); // remove the node in the search path
      if (isKeyMatched) {
        valuesOfSearchedKey.push(obj[k]); // by matching, save the value

        let tempArray = JSON.parse(JSON.stringify(currentSearchPath)); // deep clone
        pathsOfSearchedKey.push(tempArray); // save the matched path
      }
      return isKeyMatched;
    });
  }
  _findVal(obj, key);
  return createMapObject(pathsOfSearchedKey, valuesOfSearchedKey);
}

// format the map object
function createMapObject(paths, values) {
  let mapObj = Object.create({});
  paths.forEach((element, index) => {
    mapObj[element.join("/")] = values[index];
  });
  return mapObj;
}

module.exports = extractValuesForKey;
