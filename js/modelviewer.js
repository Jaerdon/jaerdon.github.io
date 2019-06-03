THREE.Cache.enabled = true;
let scenes = [];
let cameras = [];
let renderers = [];
let spinning = 99;

setAlive = (scene) => {
	spinning = scene;
}

kill = () => {
	spinning = 99;
}

animate = () => {
	let i = 0;
	while (scenes.length > i) {
		if (scenes[i].children.length > 1 && i == spinning) {
    		scenes[i].children[1].rotation.y += 0.025;
		}
		renderers[i].render( scenes[i], cameras[i] );
		i++;
	}
	requestAnimationFrame(animate);
}

let loader = new THREE.STLLoader();

renderModel = (model, rotate) => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, 320 / 300, 0.1, 1000 );
	const renderer = new THREE.WebGLRenderer( {alpha: true } );
	const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

	renderer.setSize( 250, 250 );
	renderer.setClearColor( 0x000000, 0 );

	scene.add(light);
	camera.rotation.x = -0.78;

	document.getElementById(model).appendChild(renderer.domElement);

	scenes.push(scene);
	cameras.push(camera);
	renderers.push(renderer);

	model = "models/" + model + ".stl";

	loader.load(model, function ( geometry ) {
		if (scene.children.length > 1){
			scene.remove(scene.children[1]);
		}
		geometry.computeBoundingSphere();
		camera.position.z = geometry.boundingSphere.radius + geometry.boundingSphere.radius / 5;
		camera.position.y = geometry.boundingSphere.radius + geometry.boundingSphere.radius / 1.5;
		light.position.y = geometry.boundingSphere + 10;
		if (rotate) geometry.rotateX(-1.5708);

		const mesh = new THREE.Mesh(geometry);

		const geo = new THREE.EdgesGeometry( mesh.geometry );
		const mat = new THREE.LineBasicMaterial( { color: 0x333333, linewidth: 2 } );
		const wireframe = new THREE.LineSegments( geo, mat );
		mesh.add(wireframe);

		scene.add(mesh);
	});
}

animate();
