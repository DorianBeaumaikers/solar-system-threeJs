import * as THREE from "three";
import Experience from "../Experience";

export default class Planet {
    constructor(mass, radius, density, gravity, lengthOfDay, perihelion, aphelion, semiMajorAxis, semiMinorAxis, distanceFromOrbitCenterToSun, orbitalPeriod, orbitalVelocity, orbitalEccentricity, orbitalInclination, planetaryTilt) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;

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

        // Setup
        this.setGeometry();
        this.setTextures();
        this.setMaterials();
        this.setMesh();
        this.createOrbitPath()
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(this.diameter, 64);
    }

    setTextures() {
        this.textures = {};
    }

    setMaterials() {
        this.material = new THREE.MeshStandardMaterial({});
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    createOrbitPath() {
        const curve = new THREE.EllipseCurve(
            0, this.distanceFromOrbitCenterToSun,
            this.semiMajorAxis, this.semiMinorAxis,
            0, 2 * Math.PI,
            false,
            0
        );
        
        const points = curve.getPoints( 5000 );

        points.forEach(p => {
            p.z = p.y;
            p.y = 0;
        })

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        this.ellipse = new THREE.Line( geometry, material );
    
        this.ellipse.position.y = - (this.distanceFromOrbitCenterToSun * Math.tan(this.orbitalInclination * (Math.PI/180)));
        
        this.ellipse.rotation.x = -this.orbitalInclination * (Math.PI/180);
        
        this.scene.add(this.ellipse);
        
    }

    update() {
        const currentAngle = this.time.elapsed * (this.orbitalVelocity / 1000);

        this.mesh.position.x = Math.cos(currentAngle) * this.semiMajorAxis;
        this.mesh.position.z = (Math.sin(currentAngle) * this.semiMinorAxis) + this.distanceFromOrbitCenterToSun;
        this.mesh.position.y = (Math.sin(currentAngle) * ((this.semiMinorAxis) * Math.tan(this.orbitalInclination * (Math.PI/180))));
    }
}