import * as THREE from "three";
import Experience from "../Experience";

export default class Planet {
    constructor(name, mass, radius, density, gravity, lengthOfDay, perihelion, aphelion, semiMajorAxis, semiMinorAxis, distanceFromOrbitCenterToSun, orbitalPeriod, orbitalVelocity, orbitalEccentricity, orbitalInclination, planetaryTilt, planetaryRotationSpeed, texture) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;

        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.density = density;
        this.gravity = gravity;
        this.lengthOfDay = lengthOfDay;
        this.perihelion = perihelion;
        this.aphelion = aphelion;
        this.semiMajorAxis = semiMajorAxis;
        this.semiMinorAxis = semiMinorAxis;
        this.distanceFromOrbitCenterToSun = distanceFromOrbitCenterToSun;
        this.orbitalPeriod = orbitalPeriod;
        this.orbitalVelocity = orbitalVelocity;
        this.orbitalEccentricity = orbitalEccentricity;
        this.orbitalInclination = orbitalInclination;
        this.planetaryTilt = planetaryTilt;
        this.planetaryRotationSpeed = planetaryRotationSpeed;
        this.texture = texture;

        // Setup
        this.setGeometry();
        this.setTextures();
        this.setMaterials();
        this.setMesh();
        this.setDecoy();
        this.setPlanetaryTilt();
        this.createOrbitPath();
        this.setListeners();
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(this.diameter, 64);
    }

    setTextures() {
        this.textures = {};

        this.textures.color = this.texture;
        this.textures.color.encoding = THREE.sRGBEncoding
    }

    setMaterials() {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color
        });
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    setDecoy() {
        const decoyGeometry = new THREE.SphereGeometry(1, 64);
        const decoyMaterial = new THREE.MeshStandardMaterial({});
        this.decoy = new THREE.Mesh(decoyGeometry, decoyGeometry);
        this.scene.add(this.decoy);
    }

    setPlanetaryTilt() {
        this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -this.planetaryTilt * (Math.PI/180));
    }

    createOrbitPath() {

        const curve = new THREE.EllipseCurve(
            0, 0,
            this.semiMajorAxis, this.semiMinorAxis,
            0, 2 * Math.PI,
            false,
            0
        );
        
        const points = curve.getPoints( 50000 );

        points.forEach(p => {
            p.z = p.y;
            p.y = 0;
        })

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { 
            color: 0x101010,
         } );
        
        this.ellipse = new THREE.Line( geometry, material );

        this.ellipse.position.x = this.distanceFromOrbitCenterToSun * Math.cos(this.orbitalInclination * (Math.PI/180))
    
        this.ellipse.position.y = - (this.distanceFromOrbitCenterToSun * Math.sin(this.orbitalInclination * (Math.PI/180)));
        
        this.ellipse.rotation.z = - this.orbitalInclination * (Math.PI/180);
        
        this.scene.add(this.ellipse);
        
    }

    setListeners() {
        document.querySelector("#" + this.name + "Locate").addEventListener("click", (e) => {
            this.experience.camera.changeCenter(this.decoy);

            let infos = document.querySelector("#infos");

            infos.querySelector("#name").innerHTML = this.name[0].toUpperCase() + this.name.slice(1).toLowerCase();
            infos.querySelector("#mass").innerHTML = this.mass + " x 10e24 kg";
            infos.querySelector("#diameter").innerHTML = (this.diameter * 10000) + " km";
            infos.querySelector("#density").innerHTML = this.density + " kg/m3";
            infos.querySelector("#gravity").innerHTML = this.gravity + " m/s2";
            infos.querySelector("#lengthOfDay").innerHTML = this.lengthOfDay + " hours";

            infos.style.visibility = "visible";
        })
    }

    update() {
        const currentAngle = this.time.elapsed * (this.orbitalVelocity / 100) ;

        this.mesh.position.x = (Math.cos(currentAngle * (Math.PI/180)) * (this.semiMajorAxis * Math.cos(this.orbitalInclination * (Math.PI/180)))) + (this.distanceFromOrbitCenterToSun * Math.cos(this.orbitalInclination * (Math.PI/180)));
        this.mesh.position.z = (Math.sin(currentAngle * (Math.PI/180)) * this.semiMinorAxis);
        this.mesh.position.y = -((Math.sin((currentAngle + 90) * (Math.PI/180)) * ((this.semiMajorAxis) * Math.sin(this.orbitalInclination * (Math.PI/180))))) - (this.distanceFromOrbitCenterToSun * Math.sin(this.orbitalInclination * (Math.PI/180)));

        this.mesh.rotateY(0.1 / this.lengthOfDay);

        this.decoy.position.x = (Math.cos(currentAngle * (Math.PI/180)) * (this.semiMajorAxis * Math.cos(this.orbitalInclination * (Math.PI/180)))) + (this.distanceFromOrbitCenterToSun * Math.cos(this.orbitalInclination * (Math.PI/180)));
        this.decoy.position.z = (Math.sin(currentAngle * (Math.PI/180)) * this.semiMinorAxis);
        this.decoy.position.y = -((Math.sin((currentAngle + 90) * (Math.PI/180)) * ((this.semiMajorAxis) * Math.sin(this.orbitalInclination * (Math.PI/180))))) - (this.distanceFromOrbitCenterToSun * Math.sin(this.orbitalInclination * (Math.PI/180)));

    }
}