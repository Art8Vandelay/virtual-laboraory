let containner;
let camera;
let renderer;
let scene;
let generator;

function init() {
	containner = document.querySelector(".scene");

	scene = new THREE.Scene();

	const fov = 25;
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
	loader.load("./3d/current_generator/impulse_current.gltf", function (gltf) {
		scene.add(gltf.scene);
		animate();
	});
}
init();

const radius = 2;  
const detail = 2; 
const geometry = new THREE.DodecahedronBufferGeometry(radius, detail);
var material = new THREE.MeshPhongMaterial({color: 0x5a412b});
var sphere = new THREE.Mesh(geometry,material);
sphere.position.x =0.5;
sphere.position.y =22;
sphere.position.z=19;
scene.add(sphere);


var sphere2 = new THREE.Mesh(geometry,material);
sphere2.position.x =0.5;
sphere2.position.y =16;
sphere2.position.z=19;
scene.add(sphere2);

var pause = false;

function loop(){
	if(pause) return;
	requestAnimationFrame(loop);
	sphere.position.y -=0.015;
	sphere2.position.y +=0.015;
				
}

function pauses(){
	pause = true;
}

var pause2 = false;
function loop2(){
	if(pause2) return;
	requestAnimationFrame(loop2);
	sphere.position.y +=0.015;
	sphere2.position.y -=0.015;
}

function pauses2(){
	pause2 = true;
}

function lightning(){
	let objloader = new THREE.OBJLoader();
objloader.load("./3d/current_generator/tinker.obj",function(object){
	object.position.x = 1.5;
	object.position.y = 27.5;
	object.position.z = 19;
	object.scale.set(0.2,0.2,0.2);
	//object.rotateZ(45);
	object.rotateZ(180);
	object.rotateZ(90);
	//object.rotateZ(10);
	scene.add(object);
	setTimeout(function remove_lightning(){
		scene.remove(object);
	},500)
	});
}

function progressbar(){
	var bar = new ProgressBar.Line(containerr_current, {
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
			  top: '12px',
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

function enablecapacitor(){
	document.getElementById("capacitor").disabled=false;
	var x = document.getElementById("capacitor");
	x.style.backgroundColor = "#e8491d";
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
}

function lockranges(){
	document.getElementById("v0_current").disabled=true;
	document.getElementById("textbox1").disabled=true;
	document.getElementById("c_current").disabled=true;
	document.getElementById("textbox2").disabled=true;
	document.getElementById("rf_current").disabled=true;
	document.getElementById("textbox4").disabled=true;
	// document.getElementById("r1_current").disabled=true;
	// document.getElementById("textbox5").disabled=true;
	document.getElementById("lf_current").disabled=true;
	document.getElementById("textbox6").disabled=true;
	// document.getElementById("l1_current").disabled=true;
	// document.getElementById("textbox7").disabled=true;
	document.getElementById("time_current").disabled=true;
	document.getElementById("textbox9").disabled=true;
}

function disablebutton(){
	document.getElementById("trig").disabled=true;
}

function disablebutton2(){
	document.getElementById("capacitor").disabled=true;
}
