
class Render {

    constructor() {
        this.canvas = document.getElementById("renderCanvas"); // Get the canvas element 
        this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine

        // Create the scene space
        this.scene = new BABYLON.Scene(this.engine);

        // Add a camera to the scene and attach it to the canvas
        // Creates, angles, distances and targets the camera
        this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), this.scene);
        this.zoom = 7;

        // This positions the camera
        this.camera.setPosition(new BABYLON.Vector3(10, 8, 10));

        // This attaches the camera to the canvas
        this.camera.attachControl(this.canvas, true);

        // Camera settings
        this.camera.mode = BABYLON.Camera.orthographic_camera;
        this.calcOrthoCameraBoundaries(this.canvas, this.camera);

        this.camera.angularSensibilityY = Infinity;
        this.camera.panningSensibility = 0;

        this.camera.useFramingBehavior = true;

        // Add lights to the scene
        let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
        let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);

        // Add and manipulate meshes in the scene
        let box = BABYLON.MeshBuilder.CreateBox("box", {}, this.scene);

        let cthis = this;

        this.engine.runRenderLoop(this.getRenderLoop());

        window.addEventListener("resize", this.getWindowResizeListener());
    }

    getRenderLoop() {
        let render = this;
        return function() {
            render.scene.render();
        };
    }
    
    getWindowResizeListener() {
        let render = this;
        return function() {
            render.calcOrthoCameraBoundaries();
            threnderis.engine.resize();
        };
    }

    calcOrthoCameraBoundaries() {
        let ratio = this.canvas.clientWidth / this.canvas.clientHeight ;
        this.camera.orthoTop = Math.abs(this.zoom);
        let newWidth = this.zoom * ratio;
        this.camera.orthoLeft = -Math.abs(newWidth);
        this.camera.orthoRight = newWidth;
        this.camera.orthoBottom = -Math.abs(this.zoom);
    }

}

document.addEventListener("DOMContentLoaded", function(evtDCL){
    window.render = new Render();
});


