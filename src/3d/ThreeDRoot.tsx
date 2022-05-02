import { useEffect, useRef } from "react";
import { useStore, ViewMode } from "../stores/ToolStore";
import * as THREE from "three";


export function ThreeDRoot() {
    const state = useStore();

    if (state.viewMode === ViewMode.ThreeD) {
        return <ThreeDView/>
    }
    return <></>  
};


export function ThreeDView() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("salut!")
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, 800/600, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        ref.current!.appendChild( renderer.domElement );
        renderer.setSize( 800, 600 );
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
      var animate = function () {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
        };
        animate();
        // On first render create our application
        return () => {
            // // On unload completely destroy the application and all of it's children
            // app.destroy(true, true);
        };
    }, []);

    return <div ref={ref} />;
}