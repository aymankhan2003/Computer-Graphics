/**
 * Interpolates two values (a and b) using some interpolation variable t.
 * @param {Number} a
 * @param {Number} b
 * @param {Number} t
 */
let interpolate = function(a, b, t) {
  //return a + (b - a) * t;
  return a + (b - a) * Math.pow(t, 3) * (6 * Math.pow(t, 2) - 15 * t + 10)
};

/**
 * @returns a random 2d vector.
 */
let randomGradient = function() {
  const randomAngle = 2.0 * Math.PI * Math.random();
  let v = vec2.fromValues(Math.cos(randomAngle), Math.sin(randomAngle));
  return v;
};

/**
 * Calculates the dot product of the grid gradient with the offset from the pixel to the grid coordinates.
 * @param {Array} grid array containing gradient values on the background grid.
 * @param {Number} gx index of the grid cell along the width [0, nx - 1].
 * @param {Number} gy index of the grid cell along the height [0, ny - 1].
 * @param {Number} x coordinate of the pixel along the width (in the grid system).
 * @param {Number} y coordinate of the pixel along the height (in the grid system).
 */
const dotGridGradient = function(grid, gx, gy, x, y) {
  // calculate offset vector (delta) from g = (gx, gy) to p = (x, y), i.e. delta = p - g.
  const delta = vec2.fromValues(x - gx, y - gy);
  // retrieve gradient at (gx, gy) -> gradient = grid[some index calculated from gx, gy grid.nx and/or grid.ny]
  const gradient = grid[gy * (grid.nx + 1) + gx];

  // return dot product between delta and gradient using vec2.dot function
  return vec2.dot(gradient, delta);
};

/**
 * Computes the Perlin weight for pixel (x, y) given a background grid.
 * @param {Array} grid array containing gradient values (vec2) on the background grid.
 * @param {Number} x coordinate of pixel along the width (in grid system).
 * @param {Number} y coordinate of pixel along the height (in grid system).
 */
const getPerlinWeight = function(grid, x, y) {
  // determine which cell we are in
  const ax = Math.floor(x);
  const ay = Math.floor(y);

  const bx = ax + 1;
  const by = ay;

  const cx = ax;
  const cy = ay + 1;

  const dx = ax + 1;
  const dy = ay + 1;

  const da = dotGridGradient(grid, ax, ay, x, y);
  const db = dotGridGradient(grid, bx, by, x, y);
  const dc = dotGridGradient(grid, cx, cy, x, y);
  const dd = dotGridGradient(grid, dx, dy, x, y);

  const wab = interpolate(da, db, x - ax);
  const wcd = interpolate(dc, dd, x - ax);
  //const weight = interpolate(wab, wcd, y - ay);

  return interpolate(wab, wcd, y - ay);
};

/**
 * Sets the color at a pixel.
 * @param {ImageData} image represents the pixel data in a canvas.
 * @param {Number} i index of pixel along the width.
 * @param {Number} j index of pixel along the height.
 * @param {Number} r red component of color to set in [0, 1].
 * @param {Number} g green component of color to set in [0, 1].
 * @param {Number} b blue component of color to set in [0, 1].
 */
const setPixel = function(image, i, j, r, g, b) {
  const offset = (image.width * j + i) * 4;
  image.data[offset + 0] = 255 * Math.min(r, 1.0);
  image.data[offset + 1] = 255 * Math.min(g, 1.0);
  image.data[offset + 2] = 255 * Math.min(b, 1.0);
  image.data[offset + 3] = 255; // alpha: transparent [0 - 255] opaque
};

/**
 * Creates a grid (as an array) of random gradients (each a vec2).
 * @param {Number} nx number of cells in the grid along the width.
 * @param {Number} ny number of cells in the grid along the height.
 * @returns {Array} array of random gradients with length (nx + 1) * (ny + 1).
 */
const createGrid = function(nx, ny) {
  console.log("creating ", nx, " x ", ny, " grid");
  let grid = new Array((nx + 1) * (ny + 1));
  for (let k = 0; k < grid.length; ++k) {
    grid[k] = randomGradient();
  }
  grid.nx = nx;
  grid.ny = ny;
  return grid;
}

class PerlinNoise {
  /**
   * Initializes the background grid of random gradients.
   * @param {String} canvasId id of the <canvas> element.
   * @param {Number} nx number of cells in the grid along the width.
   * @param {Number} ny number of cells in the grid along the height.
   */
  constructor(canvasId, nx, ny) {
    this.canvas = document.getElementById(canvasId);
    this.grids = [];
    // creates the number of grids based on the input given and grids are pushed into the grids array
    for (let i = 0; i < nx.length; ++i) {
      this.grids.push(createGrid(nx[i].nx, ny[i].ny));

    }
  }

  /**
   * Renders Perlin noise to the canvas using the stored background grid(s).
   */
  draw() {
    // get width and height (# pixels) of the canvas
    const w = this.canvas.width;
    const h = this.canvas.height;

    const blue = vec3.fromValues(0.1, 0.43, 0.78);
    const white = vec3.fromValues(1, 1, 1);


    // get the canvas drawing context
    let context = this.canvas.getContext("2d");
    let image = context.createImageData(w, h);


    // set the color of each pixel
    for (let j = 0; j < h; ++j) {
      for (let i = 0; i < w; ++i) {
        let amplitude = 1;
        let totalWeight = 0;
        for (let k = 0; k < nx.length; ++k) {
          const lx = w / this.grids[k].nx;
          const ly = h / this.grids[k].ny;
          const x = (i + 0.5)/lx;
          const y = (j + 0.5)/ly;
          const weight = getPerlinWeight(this.grids[k], x, y);
          totalWeight += weight*amplitude;
          amplitude *= 0.5;
        }
        let color = vec3.create();
        vec3.lerp(color, blue, white, totalWeight);
      


        setPixel(image, i, j, color[0], color[1], color[2]);
      }
    }
    context.putImageData(image, 0, 0);
  }
}




