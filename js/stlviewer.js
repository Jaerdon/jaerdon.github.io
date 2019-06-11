THREE.Cache.enabled = true;

document.getElementById('fileIn').addEventListener('change', handleFileSelect, false);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer( {alpha: true } );
let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

scene.add(light);
camera.rotation.x = -0.78;

function animate() {
	if (scene.children.length > 1) {
    	scene.children[1].rotation.y += 0.01;
	}
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

function handleFileSelect(evt) {
	console.log(evt);
	let loader = new THREE.STLLoader();
	let file = evt.target.files[0];
	let reader = new FileReader();

	loader.load(file.name, function ( geometry ) {
		if (scene.children.length > 1){
    		scene.remove(scene.children[1]);
		}
		geometry.computeBoundingSphere();
		camera.position.z = geometry.boundingSphere.radius + 5;
		camera.position.y = geometry.boundingSphere.radius + 5;
		light.position.y = geometry.boundingSphere + 10;
		geometry.rotateX(-1.5708);
		scene.add( new THREE.Mesh( geometry ) );
		scene.children[1].castShadow = true;
		scene.children[1].receiveShadow = true;
	});
}
