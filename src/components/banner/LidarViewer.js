import * as THREE from 'three'
import OrbitControlls from 'three-orbitcontrols'
import PlyLoader from 'three-ply-loader'
PlyLoader(THREE)

const container = document.getElementById('lidar-viewer')

export default !container ? f=>f : (onLoad) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight , 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer()

  container.appendChild(renderer.domElement)
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.position.set(0, 0, 20)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor('#ffffff')     


  const ambientLight = new THREE.AmbientLight('#EEEEEE')
  const controls = new OrbitControlls(camera, container)
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 300;
  controls.maxPolarAngle = Math.PI / 2;
  scene.add(ambientLight)
  
  const loader = new THREE.PLYLoader()

  const loadModel = () => {    

    // const geometry = JSON.parse(require('./model.json').data).data

    loader.load(('./models/model.ply'), (geometry) => {
      let attr = geometry.attributes,
          ob = new THREE.Object3D(),
          _el = attr.position.array,
          opacitys = [],
          sizes = [],
          hasColor = !!attr.color,
          _colors = hasColor ? attr.color.array : [],
          _x, _y, _z,
          MaxY = -Infinity, MaxX = -Infinity, MaxZ = -Infinity, MinZ = Infinity,
          _sizePoint = 0.2;

        for (let i = 0, l = _el.length; i < l; i += 3) {

          _x = parseFloat(_el[i]);
          _y = parseFloat(_el[i + 1]);
          _z = parseFloat(_el[i + 2]);

          MaxX = Math.max(MaxX, _x);
          MaxY = Math.max(MaxY, _y);
          MaxZ = Math.max(MaxZ, _z);
          MinZ = Math.min(MinZ, _z);

        }

        MaxZ -= MinZ;

        for (let i = 0; i < _el.length; i += 3) {
          opacitys.push(1);
          sizes.push(_sizePoint);
          if (!hasColor) {
              _colors.push(((_el[i + 2] - MinZ) / MaxZ), (1 - ((_el[i + 2] - MinZ) / MaxZ)) * 0.8, 1 - ((_el[i + 2] - MinZ) / MaxZ));
          }
        }

        let vertices = new Float32Array(_el);
        let colors = new Float32Array(_colors);
        opacitys = new Float32Array(opacitys);
        sizes = new Float32Array(sizes);
        let bufGeometry = new THREE.BufferGeometry();


        bufGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        bufGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        bufGeometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
        bufGeometry.addAttribute('opacity', new THREE.BufferAttribute(opacitys, 1));
        bufGeometry.noNeedToCompute = true;
        let starsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: {type: 'f', value: 1.0}
            },
            vertexShader: `
            attribute float size;
            attribute float opacity;
            attribute vec3 color;
            varying vec3 vColor;
            varying float vOpacity;
            
            #include <clipping_planes_pars_vertex>
            
            void main() {
              #include <begin_vertex>
          
              vColor = color;
              vOpacity = opacity;
              vec4 mv_Position = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (500.0 / length(mv_Position.xyz));
              gl_Position = projectionMatrix * mv_Position;
        
              #include <project_vertex>
              #include <clipping_planes_vertex>
            }`,
            fragmentShader: `
              uniform float time;
              varying vec3 vColor;
              varying float vOpacity;
              
              #include <clipping_planes_pars_fragment>
              void main() {
                #include <clipping_planes_fragment>
                gl_FragColor = vec4(vColor, vOpacity);
            } `,
            clipping: true,
            clippingPlanes: []
        });

        let model = new THREE.Points(bufGeometry, starsMaterial);
        
        ob.add(model)

        scene.add(ob)
        ob.rotation.x = Math.PI * -0.5  
        ob.position.y = -20

        setTimeout(onLoad, 500);
    })
  }
  

  
  const onResize = () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( container.offsetWidth, container.offsetHeight );
  }
  
  const render = () => {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, camera)
  }
  
  loadModel()

  render()
  window.addEventListener('resize', onResize)

}