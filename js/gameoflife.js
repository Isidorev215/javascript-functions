function seed(...args) {
  return [...args];
}

function same([x, y], [j, k]) {
  let cell_1 =  [x, y];
  let cell_2 = [j, k];
  return cell_1.every((item, index) => {
    return item === cell_2[index];
  });
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some(item => {
    return same(cell, item);
  });
}

const printCell = (cell, state) => {
  const boolean = contains.call(state, cell);
  return boolean ? '\u25A3' : '\u25A2';
};

const corners = (state = []) => {
  if(state.length === 0){
    return {
      topRight: [0, 0],
      bottomLeft: [0, 0]
    }
  }

  const x_values = state.map(([x, y]) => {
    return x;
  });
  const y_values = state.map(([x, y]) => {
    return y;
  });
  return {
    topRight: [Math.max(...x_values), Math.max(...y_values)],
    bottomLeft: [Math.min(...x_values), Math.min(...y_values)]
  }
};

const printCells = (state) => {
  const { bottomLeft, topRight } = corners(state);
  let accumulator = "";
  for (let y = topRight[1]; y >= bottomLeft[1]; y--) {
    let row = [];
    for(let x = bottomLeft[0]; x <= topRight[0]; x++){
      row.push(printCell([x,y], state));
    }
    accumulator += row.join(" ") + "\n";
  }
  return accumulator;
};

const getNeighborsOf = ([x, y]) => [
  [x-1, y+1], [x, y+1], [x+1, y+1],
  [x-1, y],             [x+1, y],
  [x-1, y-1], [x, y-1], [x+1, y-1] 
];

const getLivingNeighbors = (cell, state) => {
  return getNeighborsOf(cell).filter(oneNeighbor => contains.bind(state)(oneNeighbor));
  // return getNeighborsOf(cell).filter(oneNeighbor => contains.call(state, oneNeighbor)); // call still does the same as bind
};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;