/** 
 * Draws a straight line between two points using the "2d" context.
 * @param {vec2} p, world space coordinates of first point.
 * @param {vec2} q, world space coordinates of second point.
 */
const drawLine = (p, q) => {
  // compute screen coordinates
  const ps = vec2.transformMat3(vec2.create(), p, transformation);
  const qs = vec2.transformMat3(vec2.create(), q, transformation);

  // draw the line
  context.beginPath();
  context.moveTo(ps[0], ps[1]);
  context.lineTo(qs[0], qs[1]);
  context.stroke();
};

/** 
 * Draws a circle using the "2d" context.
 * @param {vec2} point, world space coordinates of point.
 * @param {Number} radius of the circle.
 * @param {String} color, fill color.
 */
const drawPoint = (p, radius, color) => {
  // compute screen coordinates
  const ps = vec2.transformMat3(vec2.create(), p, transformation);

  // draw a filled circle
  context.beginPath();
  context.strokeStyle = "#000000";
  context.fillStyle = color;
  context.arc(ps[0], ps[1], radius, 0, 2.0 * Math.PI, true);
  context.fill();
  context.stroke();
};

/** 
 * Draws a cubic Bezier curve using the "2d" context.
 * @param {Array[vec2]} points, array of control points in world space.
 */
const drawBezier = (points) => {
  // transform all points to screen space.
  let q = new Array(points.length);
  for (let i = 0; i < points.length; i++)
    q[i] = vec2.transformMat3(vec2.create(), points[i], transformation);
  context.beginPath();
  context.moveTo(q[0][0], q[0][1]);
  context.bezierCurveTo(q[1][0], q[1][1], q[2][0], q[2][1], q[3][0], q[3][1]);
  context.stroke();
};

class Animation {
  /** 
   * Initializes the animation, loading the Pixar ball image and setting up the curves.
   * The transformation (and inverse transformation) from screen space to world space
   * is also set up which is needed to modify the control points when clicking and dragging.
   */
  constructor() {
    // initialize the canvas and load the pixar ball image
    this.canvas = document.getElementById(canvasId);
    this.ball = document.createElement("img");
    this.ball.src = "pixarball.png";

    // create the first curve to represent the downwards ball motion (0 <= time <= 0.5)
    this.curves = new Array(2);
    this.curves[0] = new BezierCurve([
      vec2.fromValues(0, 1),
      vec2.fromValues(0.125, 0.25),
      vec2.fromValues(0.375, 0.625),
      vec2.fromValues(0.5, 0),
    ]);

    // create second curve to represent the upwards ball motion (0.5 <= time <= 1)
    this.curves[1] = new BezierCurve([
      vec2.fromValues(0.5, 0),
      vec2.fromValues(0.625, 0.625),
      vec2.fromValues(0.875, 0.25),
      vec2.fromValues(1, 1),
    ]);

    // transformation from world space to canvas space: reflect, scale, translate
    transformation = mat3.create();
    transformation[4] = -1; // reflect the y-axis
    const f = 0.8; // fraction of the canvas taken up by bezier curves
    const offset = vec2.fromValues(
      0.5 * (1.0 - f) * this.canvas.width,
      0.5 * (1.0 - f) * this.canvas.height
    );
    mat3.scale(transformation, transformation, vec2.fromValues(f * this.canvas.width, f * this.canvas.height));
    let translation = mat3.create();
    mat3.fromTranslation(translation, vec2.fromValues(offset[0], f * this.canvas.height + offset[1]));
    mat3.multiply(transformation, translation, transformation);
    this.inverseTransformation = mat3.invert(mat3.create(), transformation);

    // initialize parameters
    this.time = 0.0;
    this.dt = 0.01; // change this to control the animation speed

    // set the canvas callbacks
    this.dragging = false;
    let animation = this;
    this.canvas.onmousedown = () => {
      animation.dragging = true;
    };

    this.canvas.onmousemove = (event) => {
      // get the pixel coordinates of the mouse
      const rect = animation.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const mouse = vec2.fromValues(x, y);

      // get the closest control point
      let point = undefined;
      let index = undefined;
      for (let i = 0; i < animation.curves.length; i++) {
        for (let j = 1; j < animation.curves[i].points.length - 1; j++) {
          let p = vec2.transformMat3(
            vec2.create(),
            animation.curves[i].points[j],
            transformation
          );
          let d = vec2.distance(p, mouse);
          if (d < 20) {
            point = animation.curves[i].points[j];
            index = [i, j];
          }
        }
      }

      if (!animation.dragging) return;
      if (point == undefined) return;

      // set the world space coordinates of the re-located point
      point = vec2.transformMat3(vec2.create(), [x, y], animation.inverseTransformation);
      animation.curves[index[0]].points[index[1]] = point;
      animation.draw();
    };

    this.canvas.onmouseup = function(event) {
      animation.dragging = false;
    };
  }

  /** 
   * Draws the Bezier curves.
   */
  draw() {
    // draw the curves using the recursive depth specified by the HTML input
    const depth = document.getElementById("input-render-depth").value;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.curves.length; i++)
      this.curves[i].draw(depth);
  }

  /** 
   * Runs the animation 
   */
  run() {
    // draw the scene
    this.draw();

    // update to the current time
    this.time += this.dt;

    // determine which curve we are on (downwards or upwards?)
    let curve = this.curves[0];
    if (this.time > 0.5) curve = this.curves[1];

    // evaluate the curve at the appropriate parameter value (t)
    const t = (this.time - curve.points[0][0]) / (curve.points[3][0] - curve.points[0][0]);
    const p = curve.evaluate(t);

    // draw the red tracer along the curve
    const ball = vec2.fromValues(0.5, p[1]);
    const q = vec2.transformMat3(vec2.create(), ball, transformation);
    drawPoint(p, 10, "red");

    // draw the pixar ball image with some desired width (w) and height (h)
    let w = 50;
    let h = 50;
    if (document.getElementById("input-squash-stretch").checked) {
     
      let curveh0 = new BezierCurve([
        vec2.fromValues(0, 50),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(0.5, 10),
      ]);

      let curveh1 = new BezierCurve([
        vec2.fromValues(0.5, 10),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(1, 50),
      ]);
      if (this.time > 0.5) {
        let point = curveh1.evaluate(t);
        h = point[1];
      }
      else {
        let point = curveh0.evaluate(t);
        h = point[1];
      }


      let curvew0 = new BezierCurve([
        vec2.fromValues(0, 50),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(0.5, 75),
      ]);

      let curvew1 = new BezierCurve([
        vec2.fromValues(0.5, 75),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(0.5, 50),
        vec2.fromValues(1, 50),
      ]);

      if (this.time > 0.5) {
        let point = curvew1.evaluate(t);
        w = point[1];
      }
      else {
        let point = curvew0.evaluate(t);
        w = point[1];
      }

    }
    context.drawImage(this.ball, 0, 0, this.ball.width, this.ball.height, q[0] - 0.5 * w, q[1] - 0.5 * h, w, h);

    if (this.time >= 1) this.time = 0;
    let animation = this;
    this.requestId = requestAnimationFrame(() => {
      animation.run();
    });
  }
}

class BezierCurve {
  /**
   * Constructs a BezierCurve object from 4 points.
   * @param {Array[vec2]} points, array (of length 4) of control points (vec2).
   */
  constructor(points) {
    console.assert(points.length == 4);
    this.points = points;
  }

  /** 
   * Draws all Bezier curve information, including the curve, control points,
   * as well as dashed lines between internal control points and the endpoints.
   * @param {Number} depth, depth of the recursion when calling "render" below.
   */
  draw(depth) {
    // draw the curve
    this.render(depth);

    // draw the control points
    for (let i = 0; i < this.points.length; i++) {
      let color;
      if (i == 0 || i == this.points.length - 1)
        color = "#000000"; // black for endpoints
      else color = "#E5989B"; // pink for internal points
      drawPoint(this.points[i], 10, color);
    }

    // draw the dashed lines controlling the derivatives at the endpoints
    context.setLineDash([2, 3]);
    drawLine(this.points[0], this.points[1]);
    drawLine(this.points[2], this.points[3]);
    context.setLineDash([]); // re-set to solid lines
  }

  /** 
   * Evaluates a Bezier curve at some parameter value.
   * @param {Number} parameter t, 0 <= t <= 1.
   * @return {vec2} point on the curve
   */
  evaluate(t) {
    // the following does linear interpolation between the curve endpoints
    // this is not what we want!!
    // set this to false once you have PART 1 working
    if (false)
      return vec2.lerp(vec2.create(), this.points[0], this.points[3], t);

    // control points using the same notation we had in class & notes
    const q0 = this.points[0];
    const q1 = this.points[1];
    const q2 = this.points[2];
    const q3 = this.points[3];

    // PART 1
    let b0 = vec2.scale(vec2.create(), q0, Math.pow((1 - t), 3));
    let b1 = vec2.scale(vec2.create(), q1, (3 * t * Math.pow((1 - t), 2)));
    let b2 = vec2.scale(vec2.create(), q2, 3 * Math.pow(t, 2) * (1 - t));
    let b3 = vec2.scale(vec2.create(), q3, Math.pow(t, 3));

    let pt = vec2.add(vec2.create(), vec2.add(vec2.create(), b0, b1), vec2.add(vec2.create(), b2, b3));

    return pt;

  }

  /** 
   * Renders a Bezier curve using de Casteljau's algorithm.
   * @param {Number} depth, current depth of the recursion.
   *                 At depth == 0, lines should be drawn between the control points.
   */
  render(depth) {
    // use the context functions to draw a bezier curve
    // this is not what we want!!
    // set this to false once you have PART 2 working
    if (false) {
      drawBezier(this.points);
      return;
    }
    // control points using the same notation we had in class & notes
    const q0 = this.points[0];
    const q1 = this.points[1];
    const q2 = this.points[2];
    const q3 = this.points[3];

    if (depth == 0) {
      drawLine(q0, q1);
      drawLine(q1, q2);
      drawLine(q2, q3);
    } else {
      let m0 = vec2.lerp(vec2.create(), q0, q1, 0.5);
      let m1 = vec2.lerp(vec2.create(), q1, q2, 0.5);
      let m2 = vec2.lerp(vec2.create(), q2, q3, 0.5);

      let r0 = vec2.lerp(vec2.create(), m0, m1, 0.5);
      let r1 = vec2.lerp(vec2.create(), m1, m2, 0.5);

      let pt = vec2.lerp(vec2.create(), r0, r1, 0.5);

      let curve0 = new BezierCurve([q0, m0, r0, pt]);
      let curve1 = new BezierCurve([pt, r1, m2, q3]);

      curve0.render(depth - 1);
      curve1.render(depth - 1);
    }
  }
}

// initialize the animation and global variables
const canvasId = "animation-canvas";
let context = document.getElementById(canvasId).getContext("2d");
let transformation;
let animation = new Animation();
animation.draw();

/** 
 * Starts or pauses the animation when the animate/pause button is pressed.
 */
const animateBall = () => {
  let button = document.getElementById("button-animate");
  if (animation.requestId) {
    cancelAnimationFrame(animation.requestId);
    animation.requestId = undefined;
    button.innerHTML = "animate";
  } else {
    animation.run();
    button.innerHTML = "pause";
  }
};
