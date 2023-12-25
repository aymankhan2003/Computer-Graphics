class Ray {
  /** 
  Saves the origin and direction of the ray.
  @param {vec3} origin.
  @param {vec3} direction.
  */
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = vec3.normalize(vec3.create(), direction);
  }
}

class Sphere {
  /**
   * Saves the center and radius of the sphere.
   * @param {vec3} center.
   * @param {Number} radius.
   */
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  /**
   * Determines the ray parameter value (t) if there
   * is an intersection between this sphere and a ray.
   * @param {Ray} ray with origin and direction.
   * @returns closest ray intersection value (t) or undefined if no intersection.
   */
  intersect(ray) {
    let u = vec3.create();
    vec3.subtract(u, ray.origin, this.center);
    let B = vec3.dot(ray.direction, u);
    let C = vec3.dot(u, u) - this.radius * this.radius;
    let disc = B * B - C;

    // no intersection
    if (disc < 0) {
      return undefined;
    }
    let tmin = -B - Math.sqrt(disc);
    return tmin;
  }
}

class Triangle {
  /**
   * Saves the 3 vertices of the triangle.
   * @param {vec3} a first vertex.
   * @param {vec3} b second vertex.
   * @param {vec3} c third vertex.
   */
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /**
   * Determines the ray parameter value (t) if there
   * is an intersection between this triangle and a ray.
   * @param {Ray} ray with origin and direction.
   * @returns closest ray intersection value (t) or undefined if no intersection.
   */
  intersect(ray) {
    let M = mat3.create();

    // note column-major order
    M[0] = this.a[0] - this.c[0];
    M[1] = this.a[1] - this.c[1];
    M[2] = this.a[2] - this.c[2];
    M[3] = this.b[0] - this.c[0];
    M[4] = this.b[1] - this.c[1];
    M[5] = this.b[2] - this.c[2];
    M[6] = -ray.direction[0];
    M[7] = -ray.direction[1];
    M[8] = -ray.direction[2];

    // b
    let b = vec3.create()
    vec3.subtract(b, ray.origin, this.c);

    // A ^ -1
    let Minverse = mat3.create();
    mat3.invert(Minverse, M);

    // A ^ -1 b
    let result = mat3.create();
    vec3.transformMat3(result, b, Minverse);

    let [u, v, t] = result;

    if (u >= 0 && u <= 1 &&
      v >= 0 && v <= 1 &&
      (1 - u - v) >= 0 && (1 - u - v) <= 1 &&
      t >= 0) {
      return t;
    }
    return undefined;
  }
}

class SunsetRenderer {
  /**
   * Saves view parameters and objects to render.
   * @param {String} canvasId id of the <canvas> element.
   * @param {Number} fov vertical field-of-view.
   * @param {Sphere} sphere representing the sun.
   * @param {Array[Triangle]} mountains 3 triangles representing the mountains.
   */
  constructor(canvasId, fov, sun, mountains) {
    this.canvas = document.getElementById(canvasId);
    this.fov = fov;
    this.sun = sun;
    this.mountains = mountains;
  }
}

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
  image.data[offset + 3] = 255;
};

/**
 * Renders the scene and displays it in the saved HTML canvas.
 */
SunsetRenderer.prototype.render = function() {
  // get the canvas drawing context and set up the image
  let context = this.canvas.getContext("2d");
  const nx = this.canvas.width;
  const ny = this.canvas.height;
  let image = context.createImageData(nx, ny);

  // position of the camera
  const eye = vec3.fromValues(0, 0, 0);
  const aspectRatio = nx / ny;

  // define colors
  const skyBlue = vec3.fromValues(0.678, 0.847, 0.902);
  const skyPink = vec3.fromValues(1.0, 0.714, 0.757);
  const cSun = vec3.fromValues(1.0, 0.894, 0.71);
  const cMtn1 = vec3.fromValues(0, 0.196, 0.125); // first and third mountains
  const cMtn2 = vec3.fromValues(0, 0.1411, 0.098); // second mountain

  // width and height of the image sphere
  const d = 1;
  const h = 2.0 * d * Math.tan(fov / 2);
  const w = aspectRatio * h;

  // determine the color of each pixel
  const startTime = new Date();
  for (let j = 0; j < ny; ++j) {
    for (let i = 0; i < nx; ++i) {
      // sky color which depends on which row of pixels (j) is being processed
      let cSky = vec3.create();
      vec3.lerp(cSky, skyPink, skyBlue, Math.sqrt(j / ny));

      const spp = 1;

      let finalColor = vec3.create();

      // for every sample of this pixel
      for (let sample = 0; sample < spp; sample++) {
        // initialize to the sky color (which should be used if no intersection is found)
        let color = cSky;

        // compute the pixel coordinates and ray direction (part 1)
        const x = -w / 2 + (w * (i + Math.random())) / nx;
        const y = -h / 2 + (h * (ny - Math.random() - j)) / ny;
        const z = -d;
        const ray = new Ray(eye, vec3.fromValues(x, y, z));

        // find the closest intersection point (parts 2 & 3)

        // sun?
        if (sun.intersect(ray)) {
          color = cSun;
        }

        // 1st mountain
        if (this.mountains[0].intersect(ray)) {
          color = cMtn1;
        }

        // 2nd mountain
        if (this.mountains[1].intersect(ray)) {
          color = cMtn2;
        }

        // 3rd mountain
        if (this.mountains[0].intersect(ray)) {
          color = cMtn1;
        }


        vec3.add(finalColor, finalColor, color);
      }

      // divide by spp
      // https://glmatrix.net/docs/vec3.js.html#line236
      vec3.scale(finalColor, finalColor, 1 / spp);

      // set the pixel color
      setPixel(
        image, i, j,
        finalColor[0], finalColor[1], finalColor[2]
      );
    }
  }
  context.putImageData(image, 0, 0);
  const endTime = new Date();
  const elapsed = endTime - startTime;
  console.log(`rendered in ${elapsed} ms`);
};
