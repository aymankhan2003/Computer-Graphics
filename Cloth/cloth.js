/** 
 * Transform a point from world space to screen space.
 * @param {vec3} p, point
 * @param {mat4} transformation from world space to screen space.
 */
const transformToScreen = (p, m) => {
  const ph = vec4.fromValues(p[0], p[1], p[2], 1);
  const q = vec4.transformMat4(vec4.create(), ph, m);
  return vec3.fromValues(q[0] / q[3], q[1] / q[3], q[2] / q[3]);
};

class Point {
  /** 
   * Saves the mass and initial position of the cloth particle.
   * @param {vec3} x, initial position
   * @param {Number} mass
   */
  constructor(x, mass) {
    this.current = x.slice(); // vec3
    this.previous = x.slice(); // vec3
    this.mass = mass; // mass at this point
    this.inverseMass = 1 / mass;
  }

  /**
   * Moves the point according to the external forces.
   * the formula is: p^{k+1} = 2 * p^k - p^{k-1} + fext * dt^2 / m
   * where:
   *       p^k     = this.current (vec3)
   *       p^{k-1} = this.previous (vec3)
   *       m       = this.mass (scalar), or you can you this.inverseMass for 1/m
   */
  move() {
    const dt = 5e-3; // time step
    let r = Math.random();
    let fext = vec3.fromValues(0.0, -9.81 * this.mass, -0.5 + r); // external force (gravity)
    let invMassForce = vec3.scale(vec3.create(), fext, this.inverseMass * dt * dt);
    let currMinPrev = vec3.subtract(vec3.create(), vec3.scale(vec3.create(), this.current, 2), this.previous);
    // Update both previous and current points
    this.previous = this.current.slice();
    this.current = vec3.add(vec3.create(), currMinPrev, invMassForce);
  }

  /** 
   * Draws the point using the 2d context.
   * @param {CanvasRenderingContext2D} context, 2d rendering context.
   * @param {mat4} transformation from world space to screen space.
   */
  draw(context, transformation) {
    const radius = 5;
    const twopi = Math.PI * 2.0;
    context.beginPath();
    const q = transformToScreen(this.current, transformation);
    context.arc(q[0], q[1], radius, twopi, false);
    context.fill();
  }
}

class Constraint {
  /** 
   * Saves the two Point objects defining this constraint.
   * The initial spring length (restLength) is calculated as ||p - q||.
   * @param {Point} p, first endpoint
   * @param {Point} q, second endpoint
   */
  constructor(p, q) {
    this.p = p;
    this.q = q;
    this.restLength = vec3.distance(p.current, q.current); // initial spring length
  }

  /**
   * Attempts to satisfy the constraints on this edge by restoring the spring to its restLength.
   * Edge endpoint coordinates (this.p.current and this.q.current should be updated).
   * Notation in the notes:
   *    L0 = this.restLength (scalar)
   *    p = this.p.current (vec3)
   *    q = this.q.current (vec3)
   *    mp = this.p.mass (or 1/mp = this.p.inverseMass)
   *    mq = this.q.mass (or 1/mq = this.q.inverseMass)
   */
  satisfy() {
    // Compute normalized deflection
    let l = vec3.length(vec3.subtract(vec3.create(), this.q.current, this.p.current));
    let normDeflect = (l - this.restLength) / l;
    // Update spring endpoint vertex
    let alphaP = (this.q.mass * normDeflect) / (this.p.mass + this.q.mass);
    let alphaQ = (this.p.mass * normDeflect) / (this.p.mass + this.q.mass);

    let pNew = vec3.add(vec3.create(), this.p.current, vec3.scale(vec3.create(), vec3.subtract(vec3.create(), this.q.current, this.p.current), alphaP));

    let qNew = vec3.subtract(vec3.create(), this.q.current, vec3.scale(vec3.create(), vec3.subtract(vec3.create(), this.q.current, this.p.current), alphaQ));

    // Set new p and q positions of spring vertices
    this.p.current = pNew;
    this.q.current = qNew;
  }

  /** 
   * Draws the constraint as a line using the 2d context.
   * @param {CanvasRenderingContext2D} context, 2d rendering context.
   * @param {mat4} transformation from world space to screen space.
   */
  draw(context, transformation) {
    context.beginPath();
    let q = transformToScreen(this.p.current, transformation);
    context.lineTo(q[0], q[1]);
    q = transformToScreen(this.q.current, transformation);
    context.lineTo(q[0], q[1]);
    context.stroke();
  }
}

class ClothAnimation {
  /** 
   * Sets up the point and constraints in the cloth animation.
   * The points and constraints are defined by a grid with nx points
   * in the horizontal direction and ny points in the vertical direction.
   * @param {String} canvasId, id of the HTML canvas
   * @param {Number} nx, number of points in the horizontal direction
   * @param {Number} ny, number of points in the vertical direction
   */
  constructor(canvasId, nx, ny) {
    // save the canvas and incoming parameters
    this.canvas = document.getElementById(canvasId);
    this.nx = nx;
    this.ny = ny;

    // initialize the array of point and constraints
    this.points = [];
    this.constraints = [];
    //Code for cylindrical approach
    let dx = 1.0 / (this.nx - 1.0);
    let dy = 1.0 / (this.ny - 1.0);
    for (let j = 0; j < this.ny; j++) 
      for (let i = 0; i < this.nx; i++) {
        
        let x = vec3.fromValues(i * dx, j * dy, 0);
        x = 0.5 + 0.1 * Math.cos(i*(2*Math.PI/this.nx));
        let y = j/this.ny;
        let z = 0.5 + 0.1 * Math.sin(i*(2*Math.PI/this.nx));
        let point = new Point(vec3.fromValues(x, y, z), 0.05); // mass = 0.05
        this.points.push(point);
        }
    
      // let dx = 1.0 / (this.nx - 1.0);
      // let dy = 1.0 / (this.ny - 1.0);
      // for (let j = 0; j < this.ny; j++)
      //   for (let i = 0; i < this.nx; i++) {
      //     let x = vec3.fromValues(i * dx, j * dy, 0);
      //     let point = new Point(x, 0.05); // mass = 0.05
      //     this.points.push(point);
      //   }

    // vertical constraints
    for (let j = 0; j < this.ny - 1; j++)
      for (let i = 0; i < this.nx; i++) {
        const p = j * this.nx + i;
        const q = (j + 1) * this.nx + i;
        this.constraints.push(new Constraint(this.points[p], this.points[q]));
      }

    // horizontal constraints
    for (let j = 0; j < this.ny; j++)
      for (let i = 0; i < this.nx - 1; i++) {
        const p = j * this.nx + i;
        const q = j * this.nx + i + 1;
        this.constraints.push(new Constraint(this.points[p], this.points[q]));
      }

    // any points listed here will be fixed
    const fixed = [
    ];
    for (let i = 0; i < this.nx; i++) {
      fixed.push(this.nx * (this.ny - 1) + i);
    }

    // set fixed points to have an infinite mass (inverse mass of zero)
    for (let i = 0; i < fixed.length; i++) {
      this.points[fixed[i]].mass = 1e20;
      this.points[fixed[i]].inverseMass = 0.0;
    }

    this.initialize(); // initialize the rendering context and view
  }

  /** 
   * Initialize the rendering context and set up the view.
   * The rendering context will be this.context after this function is called,
   * which will either be the "2d" or "webgl" context.
   * The transformation matrices from world space to screen space are also set up,
   * (this.viewMatrix, this.projectionMatrix, this.screenMatrix).
   * The total transformation from world space to screen space is this.transformation.
   *
   * If the WebGL context is to be used, the initGL() function is called which should
   * set up the buffers holding the static data throughout the animation.
   */
  initialize() {
    // initialize the context
    const button = document.getElementById("button-context");
    this.context = this.canvas.getContext(button.innerHTML);
    this.useWebGL = button.innerHTML == "webgl";

    // view matrix
    this.eye = vec3.fromValues(0.5, 0.5, 2);
    this.center = vec3.fromValues(0.5, 0.5, 0);
    const up = vec3.fromValues(0, 1, 0);
    this.viewMatrix = mat4.lookAt(mat4.create(), this.eye, this.center, up);

    // projection matrix
    const aspectRatio = this.canvas.width / this.canvas.height;
    const fov = Math.PI / 4.0;
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.projectionMatrix, fov, aspectRatio, 1e-3, 1000);

    // screen (viewport) matrix
    const w = this.canvas.width;
    const h = this.canvas.height;
    // prettier-ignore
    this.screenMatrix = mat4.fromValues(
      w / 2, 0, 0, 0,
      0, -h / 2, 0, 0,
      0, 0, 1, 0,
      w / 2, h / 2, 0, 1
    );
    this.transformation = mat4.multiply(
      mat4.create(),
      this.screenMatrix,
      mat4.multiply(mat4.create(), this.projectionMatrix, this.viewMatrix)
    );

    if (this.useWebGL) this.initGL();
  }

  /** 
   * Upadates and draws a frame in the cloth animation.
   */
  update() {
    let numIter = 2;
    for (let iter = 0; iter < numIter; iter++) {
      // move each point according to external forces
      for (let i = 0; i < this.points.length; i++) this.points[i].move();

      // move points to satisfy the constraints (spring forces) on the edges
      for (let i = 0; i < this.constraints.length; i++)
        this.constraints[i].satisfy();
    }

    // draw the cloth
    this.draw();
  }

  /** 
   * Draw the cloth, using either the 2d context (points + lines) or the WebGL context (triangles).
   */
  draw() {
    if (this.useWebGL) {
      // draw with webgl 
      this.drawGL();
      return;
    }

    // draw to the HTML canvas
    this.context.fillStyle = "rgba(0, 0, 255, 0.4)";
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fill();

    // draw the constraints
    this.context.fillStyle = "black";
    for (let i = 0; i < this.constraints.length; i++)
      this.constraints[i].draw(this.context, this.transformation);

    // draw the points
    for (let i = 0; i < this.points.length; i++)
      this.points[i].draw(this.context, this.transformation);
  }

  /** 
   * Initialize the WebGL buffers for the static data during the animation,
   * as well as the shader program and textures.
  */
  initGL() {
    let gl = this.context;

    const vertexShaderSource = `
      precision mediump float;
      attribute vec3 a_Position;
      attribute vec3 a_Normal;
      attribute vec2 a_TexCoord;
      uniform mat4 u_NormalMatrix;
      uniform mat4 u_ModelViewProjectionMatrix;
      uniform mat4 u_ModelViewMatrix;
      varying vec3 v_Normal;
      varying vec3 v_Position;
      varying vec2 v_TexCoord;

      void main() {
        gl_Position = u_ModelViewProjectionMatrix * vec4(a_Position, 1.0);
        v_Normal = mat3(u_NormalMatrix) * a_Normal;
        v_Position = (u_ModelViewMatrix * vec4(a_Position, 1.0)).xyz;
        v_TexCoord = a_TexCoord;
      }`;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_TexCoord;
      varying vec3 v_Normal;
      varying vec3 v_Position;

      uniform sampler2D u_Sampler;

      void main() {
        vec3 point = v_Position;
        vec3 normal = normalize(v_Normal);

        // Choose some values for ca, cl, km, ks, p, cc, cw
        vec3 ca = vec3(0.3, 0.15, 0.15);
        vec3 cl = vec3(0.5, 0.5, 0.5);
        vec3 km = vec3(0.5, 0.0, 1.0);
        vec3 ks = vec3(1.0, 1.0, 1.0);
        float p = 32.0;
        vec3 cc = vec3(0.4, 0.4, 0.7);
        vec3 cw = vec3(0.8, 0.6, 0.6);

        // light direction from surface point
        vec3 l = vec3(0.0, 0.0, 0.0) - point;
        l = normalize(l);

        // Calculate the ambient term
        vec3 Ia = km * ca;

        // Caculate the diffuse term
        float n_dot_l = dot(normal, l);
        float n_dot_scaled = 2.0 * n_dot_l;
        vec3 Id = km * cl * abs(n_dot_scaled); // Diffusion term

        // Calculate the specular term
        vec3 reflectionDirection = -l + (n_dot_scaled * normal);
        float v_dot_r = dot(l, reflectionDirection);
        vec3 Is = (ks * cl) * pow(max(0.0, v_dot_r), p);

        gl_FragColor = vec4((Ia + Id + Is), 1);
      }`;

    // create the shader program
    this.program = compileProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(this.program);

    
    // the triangles array remains constant during the animation
    this.triangles = [];
    for (let j = 0; j < this.ny - 1; j++) {
      for (let i = 0; i < this.nx - 1; i++) {
        const k = j * this.nx + i; // lower left corner
        const l = (j + 1) * this.nx + i; // upper left corner
        const m = j * this.nx + (i + 1); // lower right 
        const n = (j + 1) * this.nx + (i + 1); // upper right
        
        // Pushes two triangles
        this.triangles.push(k, m, n);
        this.triangles.push(l, k, n);
      }
    }

    // Create triangle buffer and load data
    this.triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.triangles), gl.STATIC_DRAW);
    this.nTriangles = this.triangles.length / 3;
  }




  /** 
   * Draws the cloth using the WebGL rendering context.
   */
  drawGL() {
    let gl = this.context;
    let program = this.program;
    gl.clearColor(0, 0, 1, 0.4);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    gl.useProgram(program);
    // gl.disable(gl.DEPTH_TEST);

    // Create the MVP matrix
    let mvp = mat4.multiply(mat4.create(), this.projectionMatrix, this.viewMatrix);

    // Create normal matrix
    let n = mat4.transpose(mat4.create(), mat4.invert(mat4.create(), this.viewMatrix));

    // Set uniforms for matrices
    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "u_ModelViewMatrix"),
      false,
      this.viewMatrix
    )
    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "u_ModelViewProjectionMatrix"),
      false,
      mvp
    )
    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "u_NormalMatrix"),
      false,
      n
    )

    // extract cloth particle positions to write to the GPU
    let position = new Float32Array(3 * this.points.length);
    for (let i = 0; i < this.points.length; i++) {
     
      position[3 * i] = this.points[i].current[0];
      position[3 * i + 1] = this.points[i].current[1];
      position[3 * i + 2] = this.points[i].current[2];
    }

    // Write current cloth positions to the GPU  
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

    // calculate normals at each point
    let normals = computeNormals(position, this.triangles);

    // Create normal buffer
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    // enable the position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    const aPosition = gl.getAttribLocation(this.program, "a_Position");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // enable the normal attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    const aNormal = gl.getAttribLocation(this.program, "a_Normal");
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aNormal);

    
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    // const aTexCoord = gl.getAttribLocation(program, 'a_TexCoord');
    // gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aTexCoord);

    const uSampler = gl.getUniformLocation(program, 'u_Sampler');
    gl.uniform1i(uSampler, 0);

    // Draw the triangles
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
    gl.drawElements(gl.TRIANGLES, this.nTriangles * 3, gl.UNSIGNED_SHORT, 0);
  }
}