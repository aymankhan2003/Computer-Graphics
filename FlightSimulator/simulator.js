const vertexShaderSource = `
attribute vec3 a_Position;
attribute vec3 a_Normal;

// declare attribute for vertex color
attribute vec3 ver_Color;
// [add code here]

uniform float u_y;

// make these uniforms
uniform mat4 u_ProjectionMatrix;
uniform mat4 u_ViewMatrix ;

varying vec3 v_Position;

// declare varying to pass normal
uniform mat4 u_normalMatrix;
varying vec3 v_Normal;


// declare varying to pass color
// [add code here]
varying vec3 v_Color;


void main(void) {
	gl_Position = u_ProjectionMatrix * u_ViewMatrix * vec4(a_Position, 1.0);
  v_Position = (u_ViewMatrix * vec4(a_Position, 1.0)).xyz;
  
  // use uniforms to transform normals (incoming normal is a_Normal)
  v_Normal= mat3(u_normalMatrix) * a_Normal;

  // set color varying
   v_Color = ver_Color;
}`;

const fragmentShaderSource = `

precision highp float;
varying vec3 v_Position;
varying vec3 v_Color;

// add varying for normal vector
varying vec3 v_Normal;

void main(void) {
  // use incoming color for km varying (requires declaring this varying first)
  vec3 km = v_Color;

  vec3 Ia = vec3(0.1, 0.1, 0.1);
	vec3 n = normalize(v_Normal); // PART 2E - change this to use a varying for the normal
  vec3 l = -normalize(v_Position);
	float diffusion = max(dot(n, l), 0.0);
	gl_FragColor = vec4(Ia + km * diffusion, 1.0);
}`;

class FlightSimulator {
  /** 
   * Initializes the flight simulator by placing and orienting the airplane,
   * saving the WebGLRenderingContext and initializing the WebGLShaderProgram.
   * Attributes are also enabled in the program here.
   * @param {String} canvasId of the HTML canvas to render the scene.
   */
  constructor(canvasId) {
    // initialize the canvas, the WebGL context and objects to render
    this.canvas = document.getElementById(canvasId);
    let gl = this.canvas.getContext("webgl");
    
    // create the shader program
    let program = compileProgram(gl, vertexShaderSource, fragmentShaderSource);
    this.gl = gl;
    this.program = program;

    // enable vertex position attribute
    program.a_Position = gl.getAttribLocation(program, "a_Position");
    gl.enableVertexAttribArray(program.a_Position);

    // enable vertex normal attribute
    program.a_Normal = gl.getAttribLocation(program, "a_Normal");
    gl.enableVertexAttribArray(program.a_Normal);

    // enable vertex color attribute
    program.ver_Color = gl.getAttribLocation(program, "ver_Color");
    gl.enableVertexAttribArray(program.ver_Color);


    // initialize the mesh objects to render
    this.objects = {};

    // initialize the airplane position and orientation
    this.position = vec3.fromValues(10, 0, 2); // position of airplane
    this.gaze = vec3.fromValues(0, 1, 0); // forward direction & gaze of airplane
    this.up = vec3.fromValues(0, 0, 1); // initial up direction

    this.start = new Date().getTime();
    this.time = this.start;
    this.speed = 0.5;
    this.pitchAngularVelocity = 0;
    this.rollAngularVelocity = 0;

    // add controls for pressing a key
    let simulator = this;
    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      const key = event.key;
      if (key === "ArrowUp") simulator.pitchAngularVelocity = -0.3;
      if (key === "ArrowDown") simulator.pitchAngularVelocity = 0.3;
      if (key === "ArrowLeft") simulator.rollAngularVelocity = -0.3;
      if (key === "ArrowRight") simulator.rollAngularVelocity = 0.3;
      if (key === "-") simulator.speed -= 0.01;
      if (key === "+") simulator.speed += 0.01;
    });

    // add controls for releasing a key
    window.addEventListener("keyup", (event) => {
      event.preventDefault();
      const key = event.key;
      if (key === "ArrowUp" || key === "ArrowDown")
        simulator.pitchAngularVelocity = 0;
      if (key === "ArrowRight" || key === "ArrowLeft")
        simulator.rollAngularVelocity = 0;
    });
  }

  /** 
   * Adds the terrain mesh to the simulation (this.objects["terrain"]).
   * @param {String} type of terrain (either Vermont or Himalayas).
   */
  addTerrain(type) {
    // add the terrain
    const typeToGrids = {
      Vermont: 6,
      Himalayas: 4,
    };
    let terrain = new Terrain(64, 64, 20, 20, 2.0, typeToGrids[type]);

    // calculate color based on height of vertex
    terrain.colors = new Array();
    for (let k = 0; k < terrain.vertices.length / 3; k++) {
      const h = terrain.vertices[3 * k + 2];
      if (h > 0.8) {
        terrain.colors.push(1, 1, 1);

      }
      else if (h > 0) {
        terrain.colors.push(0.5, 0.5, 0.5);
      }

      else {
        terrain.colors.push(0.2, 0.5, 0.2)
      }

      // push color (r, g, b) to terrain.colors
    }
    this.write("terrain", terrain);
  }

  /** 
   * Adds the Mike Wazowski mesh to the simulation (this.objects["wazowski"]).
   * @param {Terrain} terrain object for finding where to place the model.
   */
  addWazowski(terrain) {
    let wazowski = preprocessWazowski(terrain);

    // calculate color for each vertex of Mike Wazowski mesh
    wazowski.colors = new Array();
    for (let k = 0; k < wazowski.vertices.length / 3; k++) {
      wazowski.colors.push(0.5, 0.7, 0.5);
      // push color (r, g, b) to wazowski.colors
    }
    this.write("wazowski", wazowski);
  }

  /** 
   * Writes a mesh to the GPU and saves it in this.objects.
   * The mesh will have additional fields after this function,
   * specifically for the positionBuffer, triangleBuffer, normalBuffer, and colorBuffer.
   * @param {String} name for the object in this.objects.
   * @param {Object} with incoming vertices, triangles and normals.
   */
  write(name, mesh) {
    let gl = this.gl;

    // create vertex position buffer
    mesh.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(mesh.vertices),
      gl.STATIC_DRAW
    );

    // create triangle index buffer
    mesh.triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.triangleBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(mesh.triangles),
      gl.STATIC_DRAW
    );

    // create vertex normal buffer
    mesh.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(mesh.normals),
      gl.STATIC_DRAW
    );

    //buffer the color data

    mesh.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(mesh.colors),
      gl.STATIC_DRAW
    );

    // add the mesh to the simulator
    this.objects[name] = mesh;
  }

  /** 
   * Pauses, or resumes the simulation, updating the text of the "pause" button.
   */
  pause() {
    if (!this.requestId) {
      document.getElementById("pause").innerHTML = "pause";
      this.time = new Date().getTime();
      this.start = this.time;
      this.animate();
      return;
    }
    window.cancelAnimationFrame(this.requestId);
    document.getElementById("pause").innerHTML = "resume";
    this.requestId = undefined;
  }


  checkTerrainCollision(terrain) {
    const airplanePosition = simulator.position;
    const terrainHeight = terrain.vertices[2];
    const distanceToTerrain = airplanePosition[2] - terrainHeight;
    const threshold = 1.0;

    if (distanceToTerrain < threshold) {
      return true;
    }
    return false;
  }
  
  /** 
   * Draws the scene and updates the position, gaze and up, vectors of the airplane.
   */
  animate() {
    // setup the animation frame request
    let simulator = this;
    this.requestId = requestAnimationFrame(() => {
      simulator.animate();
    });

    // draw the scene
    try {
      this.draw();
    } catch (err) {
      window.cancelAnimationFrame(this.requestId);
    }

    // current time
    let now = new Date().getTime();

    // delta - time (dt) in seconds
    const delta = (now - this.time) / 1000.0;

    
    // move forward
    const dx = this.speed * delta;
    this.position = vec3.scaleAndAdd(vec3.create(), this.position, this.gaze, dx);

    // calculate how much pitch and roll change (delta-roll, delta-pitch)
    const droll = delta * this.rollAngularVelocity;
    const dpitch = delta * this.pitchAngularVelocity;

    // calculate how much yaw changes based on the current orientation (delta-yaw)
    let wing = vec3.normalize(
      vec3.create(),
      vec3.cross(vec3.create(), this.gaze, vec3.fromValues(0, 0, 1))
    );
    let yawAngularVelocity = this.speed * vec3.dot(wing, this.up);
    let dyaw = -delta * yawAngularVelocity;

    // yaw according to roll: update gaze vector
    let rotation = mat4.create();
    mat4.rotate(rotation, rotation, dyaw, this.up);
    this.gaze = vec3.transformMat4(vec3.create(), this.gaze, rotation);

    // calculate pitch: update up and gaze vectors
    let right = vec3.cross(vec3.create(), this.gaze, this.up);
    mat4.identity(rotation);
    mat4.rotate(rotation, rotation, dpitch, right);
    this.up = vec3.transformMat4(vec3.create(), this.up, rotation);
    this.gaze = vec3.transformMat4(vec3.create(), this.gaze, rotation);
    vec3.normalize(this.gaze, this.gaze);

    // calculate roll: update up vector
    mat4.identity(rotation);
    mat4.rotate(rotation, rotation, droll, this.gaze);
    this.up = vec3.transformMat4(vec3.create(), this.up, rotation);
    vec3.normalize(this.up, this.up);

    // Check if collisions happen
    if(this.checkTerrainCollision(this.objects["terrain"])){
      const messageContainer = document.getElementById("message-container");
      messageContainer.textContent = "Terrain too close! Pitch the airplane upwards.";
      messageContainer.style.display = "block"; 
    } else {
      // Clear the message if there's no collision
      const messageContainer = document.getElementById("message-container");
      messageContainer.textContent = "";
      messageContainer.style.display = "none";
    }
    
    // save the current time
    this.time = now;
  }

  /*
   * Draws the scene at each time step.
   */
  draw() {
    // dereference the context and shader program
    let gl = this.gl;
    let program = this.program;
    gl.useProgram(program);

    // set globals
    gl.clearColor(0.1, 0.63, 0.88, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // pass the current y-position to the program
    const u_y = gl.getUniformLocation(program, "u_y");
    gl.uniform1f(u_y, this.position[1]);
    const ar = this.canvas.width / this.canvas.height
    // calculate view and projection matrices and pass to program
    let view = mat4.create()
    let lookAt_matrix = vec3.add(vec3.create(), this.position, this.gaze)

    mat4.lookAt(view, this.position, lookAt_matrix, this.up)

    let u_ViewMatrix = gl.getUniformLocation(program, "u_ViewMatrix");
    gl.uniformMatrix4fv(u_ViewMatrix, false, view);

    let projectionMatrix = mat4.create();
    const fov = Math.PI / 4;

    const nearPlane = 0.001;
    const farPlane = 1000;
    mat4.perspective(projectionMatrix, fov, ar, nearPlane, farPlane);

    let u_ProjectionMatrix = gl.getUniformLocation(program, "u_ProjectionMatrix");
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMatrix);



    // calculate normal matrix and pass to program
    let normalMatrix = mat4.clone(view)
    const u_normalMatrix = gl.getUniformLocation(program, "u_normalMatrix");
    gl.uniformMatrix4fv(u_normalMatrix, false, normalMatrix);

    // draw the triangles in each model
    for (let name in this.objects) {
      const mesh = this.objects[name];

      // associate the mesh position buffer to the position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.positionBuffer);
      gl.vertexAttribPointer(program.a_Position, 3, gl.FLOAT, false, 0, 0);

      // associate the mesh normal buffer to the normal attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
      gl.vertexAttribPointer(program.a_Normal, 3, gl.FLOAT, false, 0, 0);

      // associate the mesh color buffer to the color attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer);
      gl.vertexAttribPointer(program.ver_Color, 3, gl.FLOAT, false, 0, 0);


      // draw the triangles in the model
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.triangleBuffer);
      gl.drawElements(
        gl.TRIANGLES,
        mesh.triangles.length,
        gl.UNSIGNED_SHORT,
        0
      );
    }

    // option to overlay the controls
    let controlsCanvas = document.getElementById("controls-canvas");
    let ctx = controlsCanvas.getContext("2d");
    if (this.showControls) {
      let img = document.getElementById("controls");
      ctx.drawImage(img, 0, 0, controlsCanvas.width, controlsCanvas.height);
    } else {
      ctx.clearRect(0, 0, controlsCanvas.width, controlsCanvas.height);
    }
  }
}
