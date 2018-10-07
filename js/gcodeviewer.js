var inputElement = document.getElementById("input");
inputElement.addEventListener("change", updateLines, false);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth - 1, window.innerHeight - 30 );
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

var scene = new THREE.Scene();
var material = new THREE.LineBasicMaterial( { color: 0xffff00 } );

function updateLines() {
	var file = inputElement.files[0];
	console.log(file);

	if (file) {
		var reader = new FileReader();
		var geometry = new THREE.Geometry();
		
		reader.onload = function (evt) {
            fileText = evt.target.result;
            fileText = fileText.split("\n");

            for (var i = fileText.length - 1; i >= 0; i--) {
        		var x = 0;
        		var y = 0;
        		var z = 0;
            	if (fileText[i].startsWith("G0") || fileText[i].startsWith("G1")) {
            		args = fileText[i].split(" ");
            		var newZ = 0;
            		for (var a = 0; a < args.length; i++) {
            			if (args[a].startsWith("X")) x = int(args[a]);
            			else if (args[a].startsWith("Y")) y = int(args[a]);
            			else if (args[a].startsWith("Z")) newZ = int(args[a]);
            		}
            		if (newZ != z) {
            			var line = new THREE.Line(geometry, material);
						scene.add(line);
            			z = newZ;
            			geometry = new THREE.Geometry();
            			geometry.vertices.push(new THREE.Vector3(x, y, z));
            		} else {
            			geometry.vertices.push(new THREE.Vector3(x, y, z));	
            		}
            		console.log("x" + x + ", y " + y + ", z " + z);
            	}
            }
        };

        reader.readAsText(file, "UTF-8");
	}


	renderer.render( scene, camera );
}