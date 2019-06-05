THREE.Cache.enabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight * 1.5, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( {alpha: true } );
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enablePan = false;

let scenes = [];
let cameras = [];
let renderers = [];
let spinning = 99;

animate = () => {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

onWindowResize = () => {
		renderer.setSize( window.innerWidth * .75, window.innerHeight * .5 );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
		controls.update();
}

let loader = new THREE.STLLoader();

renderModel = (model, onFinish) => {
	renderer.setSize( window.innerWidth * .75, window.innerHeight * .5 );
	renderer.setClearColor( 0x000000, 0 );

	document.getElementById(model).appendChild(renderer.domElement);

	let name = model;

	scenes.push(scene);
	cameras.push(camera);
	renderers.push(renderer);

	model = "models/" + model + ".stl";

	loader.load(model, (geometry) => {
		if (scene.children.length > 1){
			scene.remove(scene.children[1]);
		}
		geometry.computeBoundingSphere();
		camera.position.z = 1.75 * geometry.boundingSphere.radius;

		controls.update();

		geometry.rotateX(-1.5708);
		geometry.rotateY(-1.5708);
		const material = new THREE.MeshBasicMaterial({color: 0xDB7093})
		const mesh = new THREE.Mesh(geometry, material);
		mesh.x -= 10;

		const geo = new THREE.EdgesGeometry( mesh.geometry );
		const mat = new THREE.LineBasicMaterial( { color: 0x333333, linewidth: 2 } );
		const wireframe = new THREE.LineSegments( geo, mat );
		mesh.add(wireframe);

		scene.add(mesh);

		onFinish();
	});
}

window.addEventListener( 'resize', onWindowResize, false );

animate();
