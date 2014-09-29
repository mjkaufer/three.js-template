function clearScene(){
	scene.children = [];//removes all elements in the scene from the scene
	renderer.setClearColor(new THREE.Color, 0);//clears existing bg color
}


function demo1(size, dispersion, particleSize, color){//makes a 3D box, size is the length in particles of the box, dispersion is how spaced they are, particleSize is how big, color is color, as a THREE.Color
	var period = 100;
	clearScene();
	size = size || 7;
	dispersion = dispersion || 20;
	particleSize = particleSize || 5;
	color = color || new THREE.Color();
	var group = new THREE.Object3D();


	//center should be 0, so offset should be -1 * dispersion * (size / 2.0)
	var o = -1 * dispersion * (size / 2.0) + dispersion / 2.0;//I don't know why I need the last thing, but oh well...
	var offsetVector = new THREE.Vector3(o, o, o);
	for(var x = 0; x < size; x++)
	for(var y = 0; y < size; y++)
		for(var z = 0; z < size; z++){
			var particle = new THREE.Particle(particleMaterial.clone());//clone so we can modify color
			particle.position = new THREE.Vector3(dispersion * x, dispersion * y, dispersion * z).add(offsetVector);
			particle.scale.x = particle.scale.y = particleSize;
			particle.material.color =  new THREE.Color().setHSL(Math.random(), 0.5, 0.5);
			group.add(particle);
		}

	scene.add(group);
	var rX = Math.random() / 30;
	var rY = Math.random() / 30;
	var rZ = Math.random() / 30;
	variableFunction = function(){
		// group.rotation.x += rX;
		// group.rotation.y += rY;
		// group.rotation.z += rZ;
		for(var i in group.children){
			var p = group.children[i];
			p.material.color.offsetHSL(1 / count, 0, 0);
			// hsl.h += 1 / period;
			// hsl.h %= 1;
			// p.material.color = hsl;
		}
	}
	return group;
}

function demo2(size){//size of grid
	clearScene();
	size = size || 5;
	var freq = 125;
	var matrix = new Array(size);
	var dispersion = 20;
	var particleSize = 5;
	var o = -1 * dispersion * (size / 2.0) + dispersion / 2.0;
	var offsetVector = new THREE.Vector3(o, o, o);
	var modelParticle = new THREE.Particle(particleMaterial);
	var group = new THREE.Object3D();
	modelParticle.scale.x = modelParticle.scale.y = particleSize;

	for(var x = 0; x < matrix.length; x++){
		matrix[x] = new Array(size);
		for(var y = 0; y < matrix[0].length; y++){
			matrix[x][y] = modelParticle.clone();
			matrix[x][y].position = new THREE.Vector3(dispersion * x, 0, dispersion * y).add(offsetVector);
			matrix[x][y].vars = {x:x, y:y};

			matrix[x][y].zFunc = function(){
				this.position.y = size * Math.sin(count * Math.PI * 2 / freq + this.vars.x * Math.PI * 2 / size + this.vars.y * Math.PI * 2 / size)
			}
			group.add(matrix[x][y]);
		}
	}
	scene.add(group);

	variableFunction = function(){
		for(var i in group.children)
			group.children[i].zFunc();

		var h = Math.sin(count/freq * Math.PI * 2 / 20) / 2 + .5;
		var h2 = (h + .5) % 1;
		var c1 = new THREE.Color().setHSL(h, 0.5, 0.5);
		var c2 = new THREE.Color().setHSL(h2, 0.5, 0.5);
		renderer.setClearColor(c1, 1);
		particleMaterial.color.set(c2);

	}

	return group;
}
