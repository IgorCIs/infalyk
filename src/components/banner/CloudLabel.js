import * as THREE from 'three'


export default class CloudLabel {
  constructor(element1) {
    this.element1 = element1
    this.element2 = document.createElement('div')

    this.element2.classList.add('home-banner-point')
    this.element2.appendChild(document.createElement('div'))
    
    this.point1 = new THREE.Object3D();
    this.point2 = new THREE.Object3D();
    this.point3 = new THREE.Object3D();

    this.lineGeometry = new THREE.Geometry();
    
    this.lineGeometry.vertices.push( new THREE.Vector3() );
    this.lineGeometry.vertices.push( new THREE.Vector3() );
    this.lineGeometry.vertices.push( new THREE.Vector3() );

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x313B4F,
    });

    lineMaterial.opacity = 0.6

    this.line = new THREE.Line( this.lineGeometry, lineMaterial );
    this.updateLine();
  }

  updateLine() {
      this.lineGeometry.vertices[ 0 ].copy( this.point1.position );
      this.lineGeometry.vertices[ 1 ].copy( this.point3.position );
      this.lineGeometry.vertices[ 2 ].copy( this.point2.position );
      this.lineGeometry.verticesNeedUpdate = true;
  };

  updatePoint3Position({ x, y, z }) {
    this.point3.position.set( x, y + 250, z)     
  }

  updatePoint2Position({ x, y, z }) {
    this.point2.position.set( x, y, z )
  }   

  updatePoint1Position({ x, y, z }) {
    this.point1.position.set( x, y + 250, z + 50) 
  }   

  updateElement1Position({ x, y, z }) {
    this.element1.style.left = x  + 'px'
    this.element1.style.top = y - 20 + 'px'
  }   

  updateElement2Position({ x, y, z }) {
    this.element2.style.left = x - 20 + 'px'
    this.element2.style.top = y - 20 + 'px'
  }   

}

export function getDomPosition( camera, container, point ) {
    const vector = new THREE.Vector3();

    const vector3_projection = new THREE.Vector2( 
        container.clientWidth, 
        container.clientHeight 
    );

    const widthHalf = 0.5 * vector3_projection.x;
    const heightHalf = 0.5 * vector3_projection.y;

    point.updateMatrixWorld();
    vector.setFromMatrixPosition( point.matrixWorld );
    vector.project(camera);

    const crossPositionVector = vector.clone();

    const finalVector = new THREE.Vector2(
        ( crossPositionVector.x * widthHalf ) + widthHalf,
        - ( crossPositionVector.y * heightHalf ) + heightHalf
    );

    return finalVector;
}