import { useRef, useEffect } from "react";
import { Application } from "pixi.js";
import { Main } from "./editor/Main";
import { IViewportOptions } from 'pixi-viewport';
import { useStore } from "../stores/EditorStore";
import { createStyles } from "@mantine/core";
import { METER } from "./editor/constants";

const useStyles = createStyles(() => ({
    inactive:{
        display:'none'
    }

}));
export let main: Main;

export function EditorRoot() {
    const ref = useRef<HTMLDivElement>(null);
    const state = useStore();
    const {classes} = useStyles();
    useEffect(() => {
        
        // On first render create our application
        const app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0xebebeb,
            antialias: true,
            resizeTo: window
        });

    
        app.view.oncontextmenu = (e) => {
            e.preventDefault();
        }

        const viewportSettings: IViewportOptions = {
            screenWidth: app.screen.width,
            screenHeight: app.screen.height,
            worldWidth: 50 * METER,
            worldHeight: 50 * METER,
            interaction: app.renderer.plugins.interaction,
            
        }
        main = new Main(viewportSettings);
         

        // Add app to DOM
        ref.current!.appendChild(app.view);
        // Start the PixiJS app
        app.start();
        app.stage.addChild(main)

        return () => {
            // On unload completely destroy the application and all of its children
            app.destroy(true, true);
        };
    }, []);

    return <div ref={ref} />;
}