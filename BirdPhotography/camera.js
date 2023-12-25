class Ray {
  /**
   * Saves the origin and direction of the ray.
   * @param {vec3} origin.
   * @param {vec3} direction.
   */
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = vec3.normalize(vec3.create(), direction);
  }

  /**
   * Evaluates a point along the ray.
   * @param {Number} t
   * @returns {vec3} point = origin + t * direction
   */
  evaluate(t) {
    return vec3.scaleAndAdd(vec3.create(), this.origin, this.direction, t);
  }
}

class Triangle {
  /**
   * Saves the 3 vertices and outward normal of the triangle.
   * Transforms the vertices and normal of the triangle (for Part 3).
   * @param {vec3} a first vertex.
   * @param {vec3} b second vertex.
   * @param {vec3} c third vertex.
   */
  constructor(a, b, c, n) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = n;

    // Rotate the bird
    let theta = -Math.PI / 8;
    let center = vec3.fromValues(-0.038654111325740814, 3.4428632259368896, 0.6172986626625061)
    let T = mat4.fromTranslation(mat4.create(), center);
    let Tinv = mat4.invert(mat4.create(), T);
    let R = mat4.fromZRotation(mat4.create(), theta);
    let M = mat4.multiply(mat4.create(), R, Tinv);
    let MInv = mat4.invert(mat4.create(), M);

    this.a = vec3.transformMat4(vec3.create(), a, MInv);
    this.b = vec3.transformMat4(vec3.create(), b, MInv);
    this.c = vec3.transformMat4(vec3.create(), c, MInv);
    this.n = vec3.transformMat4(vec3.create(), n, mat4.transpose(mat4.create(), MInv));
  }

  /**
   * The following "intersect" function is already implemented in utils.min.js.
   * The documentation is provided here so you know what it returns.
   *
   * intersect(ray, tmin, tmax)
   *
   * Determines if there is an intersection between this triangle and a ray.
   * @param {Ray} ray with origin and direction.
   * @returns {Object} with minimum t value {Number},
   *                   surface point ({vec3} p),
   *                   unit normal vector ({vec3} n),
   *                   km ({vec3}) diffuse reflection coefficient
   */

}

class Camera {
  /**
   * Saves view parameters and objects to render.
   * @param {String} canvasId id of the <canvas> element.
   * @param {Number} fov vertical field-of-view.
   * @param {vec3} eye - location of camera
   */
  constructor(canvasId, fov, eye) {
    this.canvas = document.getElementById(canvasId);
    this.fov = fov;
    this.eye = eye;
  }

  /** 
   * Takes a picture of (renders) the scene and displays it in the saved HTML canvas.
   * @param{Model} bird with a center and color.
   * @param{Lake} lake - a large sphere representing the lake.
  */
  takePicture(bird, lake) {
    // get the canvas drawing context and set up the image
    let context = this.canvas.getContext("2d");
    const nx = this.canvas.width;
    const ny = this.canvas.height;
    let image = context.createImageData(nx, ny);

    // Please feel free to remove the following two console.log messages.
    // They are just here so you can inspect the properties of the scene,
    // specifically: bird.center, bird.color and lake.color.
    // Also notice that if you expand the __proto__ section, you should
    // see that both objects have an "intersect" function.

    // dimensions of image plane
    const d = vec3.distance(this.eye, bird.center);
    const height = 2.0 * d * Math.tan(0.5 * this.fov);
    const aspectRatio = nx / ny;
    const width = aspectRatio * height;



    const g = vec3.subtract(vec3.create(), bird.center, this.eye);
    const up = vec3.fromValues(0, 1, 0);
    const w = vec3.negate(vec3.create(), vec3.normalize(vec3.create(), g));
    const u = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), g, up));
    const v = vec3.cross(vec3.create(), w, u);

    // for each pixel
    const startTime = new Date();
    for (let j = 0; j < ny; ++j) {
      for (let i = 0; i < nx; ++i) {
        // Define coords w/ respect to camera
        const x = -width / 2 + width * (i + 0.5) / nx;
        const y = -height / 2 + height * (ny - 0.5 - j) / ny;
        const z = -d;

        const xCu = vec3.scale(vec3.create(), u, x);
        const yCv = vec3.scale(vec3.create(), v, y);
        const zCw = vec3.scale(vec3.create(), w, z);

        const firstAdd = vec3.add(vec3.create(), xCu, yCv);
        const secondAdd = vec3.add(vec3.create(), firstAdd, zCw);

        // Calculate q
        const q = vec3.add(vec3.create(), this.eye, secondAdd);
        const rayDirection = vec3.subtract(vec3.create(), q, this.eye);
        let ray = new Ray(this.eye, rayDirection);

        let ixnB = bird.intersect(ray);

        // Normalize light direction
        const l = vec3.normalize(vec3.create(), vec3.fromValues(-1, 1, 1));

        // Calculating diffuse term
        let cl = vec3.fromValues(0.7529, 0.7529, 1);
        let ca = vec3.fromValues(1, 0.4000, 0.4000);

        let ixnL = lake.intersect(ray);

        let birdColor = vec3.create();
        let color = lake.color;

        // Found an intersection with bird
        if (ixnB) {
          const lDirection = vec3.normalize(vec3.create(), vec3.subtract(vec3.create(), vec3.fromValues(-1, 1, 1), ixnB.p));
          // Calculate diffuse and ambient terms for bird
          const nDotL = vec3.dot(ixnB.n, l);
          const diffusion = Math.max(0.0, nDotL);
          const Id = vec3.multiply(vec3.create(), ixnB.km, vec3.scale(vec3.create(), cl, diffusion));
          const Ia = vec3.multiply(vec3.create(), ixnB.km, ca);
          let newColor = vec3.add(vec3.create(), Ia, Id);
          birdColor = newColor;
          color = newColor;
        }

        // Found an intersection with lake
        if (ixnL) {
          // Get the reflection direction
          const rDotN = vec3.dot(rayDirection, ixnL.n);
          const rDotNMult = vec3.scale(vec3.create(), ixnL.n, rDotN * 2.0);
          const u = vec3.subtract(vec3.create(), rayDirection, rDotNMult);

          let reflectionRay = new Ray(ixnL.p, u);
          // If reflectionRay intersects bird, set new color for bird and lake
          let reflectionRayIxn = bird.intersect(reflectionRay);
          if (reflectionRayIxn) {
            // Get new diffuse and ambient terms 
            const nDotL = vec3.dot(reflectionRayIxn.n, u);
            const diffusion = Math.max(0.0, nDotL);
            const Id = vec3.multiply(vec3.create(), reflectionRayIxn.km, vec3.scale(vec3.create(), cl, diffusion));
            const Ia = vec3.multiply(vec3.create(), reflectionRayIxn.km, ca);
            let newColor = vec3.add(vec3.create(), Ia, Id);
            let newBirdColor = vec3.scale(vec3.create(), newColor, 0.9);
            let newLakeColor = vec3.scale(vec3.create(), lake.color, 0.5);
            color = vec3.add(vec3.create(), newBirdColor, newLakeColor);
          }
        }

        setPixel(image, i, j, color[0], color[1], color[2]); // defined in utils.min.js
      }
    }
    context.putImageData(image, 0, 0);
    const endTime = new Date();
    console.log(`rendered in ${endTime - startTime} ms`);
  }
}
