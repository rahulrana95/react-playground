// This was a system design. I was asked to design a Restaurant
// listing aplication where user can make orders and customize their
// orders by adding additional stuffs like toppings, salads etc.I was
//  lucky here because I work at one of the largest food delivery company
//   in the world and own a very active microfrontend.This was a breeze for me.

const RestaurantListing = () => {
  return <div>Restuare</div>;
};

export default RestaurantListing;

const arr = [
  [true, true, true, true, true],
  [true, false, false, false, true],
  [false, false, false, false, true],
  [true, true, true, true, true],
];

function getLargestIsland(arr: any) {
  if (!arr) {
    return 0;
  }

  const rows = arr.length;
  const col = arr[0].length;

  let visited: any = {};
  // find and update water which enclosed by land
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      const key = `${i}:${j}`;
      if (!visited[key] && arr[i][j] === false) {
        dfsWater(arr, i, j, rows, col, visited);
      }
    }
  }

  visited = {};

  let max = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      const key = `${i}:${j}`;
      if (!visited[key] && arr[i][j]) {
        const size = dfs(arr, i, j, rows, col, visited);

        max = Math.max(size, max);
      }
    }
  }

  return max;
}

function dfs(
  arr: { [x: string]: { [x: string]: boolean } },
  i: number,
  j: number,
  rows: number,
  col: number,
  visited: { [x: string]: boolean }
): number {
  const key = `${i}:${j}`;

  if (
    i >= rows ||
    i < 0 ||
    j >= col ||
    j < 0 ||
    visited[key] ||
    arr[i][j] === false
  ) {
    return 0;
  }

  visited[key] = true;

  return (
    1 +
    dfs(arr, i - 1, j, rows, col, visited) +
    dfs(arr, i, j + 1, rows, col, visited) +
    dfs(arr, i + 1, j, rows, col, visited) +
    dfs(arr, i, j - 1, rows, col, visited)
  );
}

function dfsWater(
  arr: { [x: string]: { [x: string]: boolean } },
  i: number,
  j: number,
  rows: number,
  col: number,
  visited: { [x: string]: boolean }
) {
  const key = `${i}:${j}`;

  // no water at this edge
  if (i >= rows || i < 0 || j >= col || j < 0) {
    return false;
  }

  // land at this edge
  if (arr[i][j] === true) {
    return true;
  }

  visited[key] = true;

  if (
    dfsWater(arr, i - 1, j, rows, col, visited) &&
    dfsWater(arr, i - 1, j + 1, rows, col, visited) &&
    dfsWater(arr, i, j + 1, rows, col, visited) &&
    dfsWater(arr, i + 1, j + 1, rows, col, visited) &&
    dfsWater(arr, i + 1, j, rows, col, visited) &&
    dfsWater(arr, i + 1, j - 1, rows, col, visited) &&
    dfsWater(arr, i, j - 1, rows, col, visited) &&
    dfsWater(arr, i - 1, j - 1, rows, col, visited)
  ) {
    arr[i][j] = true;
    return true;
  } else {
    return false;
  }
}
