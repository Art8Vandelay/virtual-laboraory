let containner;
let camera;
let renderer;
let scene;
let generator;

function init() {
	containner = document.querySelector(".scene");

	scene = new THREE.Scene();

	const fov = 45;
	const aspect = containner.clientWidth / containner.clientHeight;
	const near = 0.1;
	const far = 500;

	camera = new THREE.PerspectiveCamera(
		fov,
		containner.clientWidth / containner.clientHeight,
		near,
		far
	);
	ambient = new THREE.AmbientLight(0x404040, 2);
	scene.add(ambient);

	const light = new THREE.DirectionalLight(0xffffff, 2);
	light.position.set(10, 10, 100);
	scene.add(light);

	camera.position.set(0, 190, 250);
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	renderer.setSize(containner.clientWidth, containner.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	containner.appendChild(renderer.domElement);
	function animate() {
		requestAnimationFrame(animate);
		controls.screenSpacePanning = true;
		controls.enableDamping = true;
		controls.autoRotate = false;
		controls.zoomSpeed = 0.5;
		controls.rotateSpeed = 0.3;
		controls.panSpeed = 0.5;
		controls.update();
		renderer.render(scene, camera);
	}
	let loader = new THREE.GLTFLoader();
	loader.load("./3d/voltage_generator/impulse_voltage_generator.gltf", function (gltf) {
		scene.add(gltf.scene);
		animate();
	});

}
init();

const radius = 2.2;  
const detail = 2; 
const geometry = new THREE.DodecahedronBufferGeometry(radius, detail);
var material = new THREE.MeshPhongMaterial({color: 0x5a412b});
var sphere = new THREE.Mesh(geometry,material);
sphere.position.x =-37;
sphere.position.y =22;
sphere.position.z=53;
scene.add(sphere);


var sphere2 = new THREE.Mesh(geometry,material);
sphere2.position.x =-37;
sphere2.position.y =41;
sphere2.position.z=53;
scene.add(sphere2);

var sphere3 = new THREE.Mesh(geometry,material);
sphere3.position.x =-37;
sphere3.position.y =58;
sphere3.position.z=53;
scene.add(sphere3);


var sphere4 = new THREE.Mesh(geometry,material);
sphere4.position.x =-37;
sphere4.position.y =76;
sphere4.position.z=53;
scene.add(sphere4);

var sphere5 = new THREE.Mesh(geometry,material);
sphere5.position.x =-37;
sphere5.position.y =92;
sphere5.position.z=53;
scene.add(sphere5);

var sphere6 = new THREE.Mesh(geometry,material);
sphere6.position.x =-37;
sphere6.position.y =110;
sphere6.position.z=53;
scene.add(sphere6);

var pause = false;

function loop(){
	if(pause) return;
	requestAnimationFrame(loop);
	sphere.position.x +=0.05;
	sphere2.position.x +=0.05;
	sphere3.position.x +=0.05;
	sphere4.position.x +=0.05;
	sphere5.position.x +=0.05;
	sphere6.position.x +=0.05;
				
}

function pauses(){
	pause = true;
}

var pause2 = false;
function loop2(){
	if(pause2) return;
	requestAnimationFrame(loop2);
	sphere.position.x -=0.05;
	sphere2.position.x -=0.05;
	sphere3.position.x -=0.05;
	sphere4.position.x -=0.05;
	sphere5.position.x -=0.05;
	sphere6.position.x -=0.05;
}

function pauses2(){
	pause2 = true;
}

function disablebutton(btn){
	document.getElementById(btn.id).disabled=true;
}

function lightning(){
	let objloader = new THREE.OBJLoader();
	objloader.load("./3d/voltage_generator/tinker.obj",function(object){
		object.position.z = 53;
		object.position.y = 28;
		object.position.x = -43;
		object.scale.set(0.3,0.3,0.3);
		object.rotateZ(45);
		scene.add(object);
		setTimeout(function remove6(){
			scene.remove(object);
		},500);
	});
	let objloader2 = new THREE.OBJLoader();
	objloader2.load("./3d/voltage_generator/tinker.obj",function(object2){
		object2.position.z = 53;
		object2.position.y = 47;
		object2.position.x = -43;
		object2.scale.set(0.3,0.3,0.3);
		object2.rotateZ(45);
		scene.add(object2);
		setTimeout(function remove6(){
			scene.remove(object2);
		},500);
	});
	let objloader3 = new THREE.OBJLoader();
	objloader3.load("./3d/voltage_generator/tinker.obj",function(object3){
		object3.position.z = 53;
		object3.position.y = 64;
		object3.position.x = -43;
		object3.scale.set(0.3,0.3,0.3);
		object3.rotateZ(45);
		scene.add(object3);
		setTimeout(function remove6(){
			scene.remove(object3);
		},500);
	});
	let objloader4 = new THREE.OBJLoader();
	objloader4.load("./3d/voltage_generator/tinker.obj",function(object4){
		object4.position.z = 53;
		object4.position.y = 82;
		object4.position.x = -43;
		object4.scale.set(0.3,0.3,0.3);
		object4.rotateZ(45);
		scene.add(object4);
		setTimeout(function remove6(){
			scene.remove(object4);
		},500);
	});
	let objloader5 = new THREE.OBJLoader();
	objloader5.load("./3d/voltage_generator/tinker.obj",function(object5){
		object5.position.z = 53;
		object5.position.y = 98;
		object5.position.x = -43;
		object5.scale.set(0.3,0.3,0.3);
		object5.rotateZ(45);
		scene.add(object5);
		setTimeout(function remove6(){
			scene.remove(object5);
		},500);
	});
	let objloader6 = new THREE.OBJLoader();
	objloader6.load("./3d/voltage_generator/tinker.obj",function(object6){
		object6.position.z = 53;
		object6.position.y = 116;
		object6.position.x = -43;
		object6.scale.set(0.3,0.3,0.3);
		object6.rotateZ(45);
		scene.add(object6);
		setTimeout(function remove6(){
			scene.remove(object6);
		},500);	
	});	
}

function progressbar(){
	var bar = new ProgressBar.Line(containerr, {
		strokeWidth: 4,
		easing: 'easeInOut',
		duration: 3000,
		color: '#e8491d',
		trailColor: '#eee',
		trailWidth: 1,
		svgStyle: {width: '100%', height: '100%'},
		text: {
			style: {
			  // Text color.
			  // Default: same as stroke color (options.color)
			  color: '#999',
			  position: 'absolute',
			  right: '0',
			  top: '-8px',
			  padding: 0,
			  margin: 0,
			  transform: null
			},
			autoStyleContainer: false
		  },
		  from: {color: '#FFEA82'},
		  to: {color: '#ED6A5A'},
		  step: (state, bar) => {
			bar.setText(Math.round(bar.value() * 100) + ' %');
		  }
	  });
	  
	  bar.animate(1.0);  // Number from 0.0 to 1.0
}

function disablebuttons(){
	document.getElementById("capacitor").disabled=true;
	document.getElementById("trig").disabled=true;
}

disablebuttons();

function disablebutton2(){
	document.getElementById("capacitor").disabled=true;
}

function enablecapacitor(){
	document.getElementById("capacitor").disabled=false;
}

function enabletrig(){
	document.getElementById("trig").disabled=false;
	var x = document.getElementById("trig");
	x.style.backgroundColor = "#e8491d";
}


function playy(){
	var sound = new Howl({
		src: ['./audio.mp3']
	});
	sound.play();
}

function change_button_name(){
	document.querySelector('#startbtn').innerHTML="Restart"
	document.querySelector('#startbtn').onclick= function(){
		location.reload(true);
	};
	var x = document.getElementById("capacitor");
	x.style.backgroundColor = "#e8491d";
}

function lockranges(){
	document.getElementById("textbox1").disabled=true;
	document.getElementById("textbox2").disabled=true;
	document.getElementById("textbox3").disabled=true;
	document.getElementById("textbox4").disabled=true;
	document.getElementById("textbox5").disabled=true;
	document.getElementById("textbox6").disabled=true;
	document.getElementById("v0").disabled=true;
	document.getElementById("c1").disabled=true;
	document.getElementById("c2").disabled=true;
	document.getElementById("r1").disabled=true;
	document.getElementById("r2").disabled=true;
	document.getElementById("time").disabled=true;
}