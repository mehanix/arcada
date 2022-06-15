import { useEffect, useRef } from "react";
import { useStore } from "../stores/EditorStore";
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { FloorPlan } from "../editor/editor/objects/FloorPlan";
import { Furniture } from "../editor/editor/objects/Furniture";
import { endpoint } from "../api/api-client";
import { Scene } from "three";
import { METER } from "../editor/editor/constants";

export function ThreeDRoot() {
    const state = useStore();

        return <ThreeDView />
    
};

export function ThreeDView() { 
    const ref = useRef<HTMLDivElement>(null);
    const {activeTool} = useStore()
    useEffect(() => {
        console.log("salut!")
        var scene = new THREE.Scene();
        scene.add(new THREE.AxesHelper(5))
        const materialsLoader = new MTLLoader();
        {
            const skyColor = 0xB1E1FF;  // light blue
            const groundColor = 0xB97A20;  // brownish orange
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
        }

        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(5, 10, 2);
            scene.add(light);
            scene.add(light.target);
        }
        var camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 5000);
        var renderer = new THREE.WebGLRenderer();
        ref.current!.appendChild(renderer.domElement);
        renderer.setSize(800, 600);
        camera.position.set(0.8, 1.4, 1.0)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.target.set(0, 1, 0)


        var geo = new THREE.PlaneBufferGeometry(10000, 10000, 8, 8);
        var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        var plane = new THREE.Mesh(geo, mat);
        plane.rotateX( - Math.PI / 2);
        scene.add(plane);

        let furnitureId = FloorPlan.Instance.furnitureId;
        let furniture = FloorPlan.Instance.getFurniture();
        for (let fur of furniture) {
            addFurniture(fur[1], materialsLoader, scene);

        }
  
        camera.position.z = 500;
        var animate = function () {
            requestAnimationFrame(animate);
            controls.update()
            renderer.render(scene, camera);
        };
        animate();

    }, [activeTool]);

    function addFurniture(furniture: Furniture, materialsLoader: MTLLoader, scene: Scene) {
        materialsLoader.loadAsync(`${endpoint}3d/${furniture.resourcePath}.mtl`)
            .then((mtl) => {
                let loader = new OBJLoader();
                loader.setMaterials(mtl);
                return loader;
            })
            .then(loader => {
                loader.loadAsync(`${endpoint}3d/${furniture.resourcePath}.obj`)
                    .then(object => {
                      
                        scene.add(object)
                        object.traverse( function ( child ) {
                            if ( child instanceof THREE.Object3D  ) {
                               
                                console.log(child)
                            }
                        } );
                        console.log(furniture.name, object.scale.x, object.scale.y, object.scale.z)
                        object.scale.set(furniture.width , object.scale.y, furniture.height)
                        var bbox = new THREE.Box3().setFromObject(object);
                        let bboxDimensions = new THREE.Vector3(bbox.max.x - bbox.min.x, 0, bbox.max.z - bbox.min.z)
                        object.position.set(furniture.x + furniture.width , 0, furniture.y +furniture.height);
                        object.rotateY(-furniture.rotation);
                        console.log(furniture.name, object.scale.x, object.scale.y, object.scale.z, object.position)

                    })
                }).catch(err => console.log(err))
                // materialsLoader.setPath(`${endpoint}3d/${furniture.resourcePath}.mtl`)
                // materialsLoader.load('', function (materialsCreator) {

                //     // https://threejs.org/docs/#examples/en/loaders/OBJLoader.setMaterials
                //     let loader = new OBJLoader();
                //     loader.setMaterials(materialsCreator);
                //     loader.setPath(`${endpoint}3d/${furniture.resourcePath}.obj`)
                //     loader.load('', object => {
                //         scene.add(object)
                //         console.log(object.scale)
                //         object.position.set(furniture.x / METER, 0, furniture.y / METER);
                //         object.scale.set(furniture.width / METER, object.scale.y, -furniture.height / METER)
                //         console.log(object.scale)

                //         console.log(object.position)
                //     }, undefined, function (error) {

                //         console.error(error);

                //     });
                // }
                // )
            }

    return <div ref={ref} />;
    }