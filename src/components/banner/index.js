import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import TrackBall from 'three-trackballcontrols'

let container = document.getElementById('home-banner');

// const sphere = new THREE.Mesh( new THREE.SphereGeometry( 5, 32, 32 ), new THREE.MeshBasicMaterial( {color: 0x000000 } ) );
let controls, controls2

export default !container ? f=>f : () => {
  let SEPARATION = 50, AMOUNTX = 100, AMOUNTY = 100;
  let count = 0;
  let mouseX = 0, mouseY = 0;
  
  let windowHalfX = container.offsetWidth / 2;
  let windowHalfY = container.offsetHeight / 2;


  let camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 1, 10000 );
  
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  // controls = new TrackBall(camera, renderer.domElement)
  // controls2 = new OrbitControls(camera, renderer.domElement)

  camera.position.x = -2315.6468128168212;
  camera.position.y = 802.6070010631422;
  camera.position.z  = 1121.3402231101422;

  
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 1.2;
  // controls.panSpeed = 0.8;
  // controls.noZoom = false;
  // controls.noPan = false;
  // controls.staticMoving = true;
  // controls.dynamicDampingFactor = 0.3;
  // controls.keys = [ 65, 83, 68 ];

  let particles;
  let xSpace = 1, ySpace = 1;
  
  const init = () => {
    let numParticles = AMOUNTX * AMOUNTY;
    let positions = new Float32Array( numParticles * 3 );
    let scales = new Float32Array( numParticles );
    let i = 0, j = 0;
    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
        positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) * xSpace ); // x
        positions[ i + 1 ] = 0; // y
        positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) * ySpace ); // z
        positions[ i ] += AMOUNTX * 0.5 * xSpace * SEPARATION; 
        positions[ i + 2 ] +=  AMOUNTY * 0.5 * ySpace * SEPARATION;
        scales[ j ] = 1;
        i += 3;
        j ++;
      }
    }

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

    let material = new THREE.ShaderMaterial( {
      uniforms: {
        color: { value: new THREE.Color( 0xA0A5B1 ) },
      },
      vertexShader: `

        attribute float scale;
        varying float distanceToCamera;

        float distanceBetweenVec3( vec3 v1, vec3 v2 ){  
          float dx = v1.x - v2.x;
          float dy = v1.y - v2.y;
          float dz = v1.z - v2.z;
          float result = sqrt( dx * dx + dy * dy + dz * dz );
          return result;
        }

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          vec4 pixelPosition = modelMatrix * vec4( position, 1.0 );
          distanceToCamera = distanceBetweenVec3( pixelPosition.xyz, cameraPosition.xyz );
          gl_Position = projectionMatrix * mvPosition;


          float transparency = 1.0;
          float clearDistance = 1500.;

          if( distanceToCamera > clearDistance ){
            transparency = 1. - atan( (distanceToCamera - clearDistance) / clearDistance) / 1.6;
            gl_PointSize = (1. + 18.0 * ( 130.0 / - mvPosition.z )) * transparency;
          } else { 
            gl_PointSize = 1. + 18.0 * ( 130.0 / - mvPosition.z );
          }
          
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float distanceToCamera;

        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

          float transparency = 1.0;
          float clearDistance = 1700.;

          if( distanceToCamera > clearDistance ){
            transparency = 1. - atan( (distanceToCamera - clearDistance) / clearDistance) / 1.6;
          }

          gl_FragColor = vec4( color, transparency );
        }
      `
    });
    //
    particles = new THREE.Points( geometry, material );
    
    scene.add( particles );
    // scene.add( sphere );
    //
    renderer.setPixelRatio( container.devicePixelRatio );
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    container.appendChild( renderer.domElement );
    
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //
    container.addEventListener( 'resize', onWindowResize, false );
  }
  
  const onWindowResize = () => {
    windowHalfX = container.offsetWidth / 2;
    windowHalfY = container.offsetHeight / 2;
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.offsetWidth, container.offsetHeight );
  }

  const onDocumentMouseMove = event => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  const animate = () => {
    requestAnimationFrame( animate );
    render();
  }

  const render = () => {
    camera.lookAt( scene.position );
    
    let positions = particles.geometry.attributes.position.array;
    let scales = particles.geometry.attributes.scale.array;
    let i = 0, j = 0, ph = 30;
    let timeM = 0.2, timeN = 0.4;

    let spherePosition

    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
        positions[ i + 1 ] = ( Math.sin( ( ix + count ) *  timeM ) * ph ) +
                ( Math.sin( ( iy + count ) * timeN ) * ph );
        scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
                ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 8;

                // if(positions[i] > 400 && positions[i] < 1000 && positions[i + 2 ] > 760 && positions[i + 2 ] < 751  ) {
                //   positions[i +1] = 70;

                  
                // }
        i += 3;
        j ++;
      }

    }   

    // for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
    //   for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
    //     positions[ i + 1 ] = ( Math.sin( ( positions[ i ] + count ) *  timeM ) * ph ) +
    //             ( Math.sin( ( positions[ i + 2 ] + count ) * timeN ) * ph );
    //     scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
    //             ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 8;
    //     i += 3;
    //     j ++;
    //   }
    // }

    // sphere.position.y = ( Math.sin( ( sphere.position.x + count ) * timeM ) * ph ) + ( Math.sin( ( sphere.position.z + count ) * timeN ) * ph );
    
    
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;
    count += 0.1;
    renderer.render( scene, camera );
    // controls.update()
  }

  
  init();
  animate();
}