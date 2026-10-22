import { createStyles } from "@mantine/core";
import { IViewportOptions } from 'pixi-viewport';
import { Application } from "pixi.js";
import { useEffect, useRef } from "react";
import { METER } from "./editor/constants";
import { Main } from "./editor/Main";

const useStyles = createStyles(() => ({
    labelInput: {
        zIndex: 1000,
        pointerEvents: "none",
        position: "absolute",
        height: 20,
        fontSize: 16,
        fieldSizing: 'content',
        transformOrigin: 'left top',
        scale: 'var(--viewport-zoom)',
        color: "transparent",
        backgroundColor: "transparent",
        caretColor: "black",
        paddingInline: 0.5,
        marginTop: -1.5,
        border: "none",
        outline: "none",
        appearance: "none",
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
        '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
        },
        
    },
}));

export let main: Main;

export function EditorRoot() {
    const ref = useRef<HTMLDivElement>(null);
    const labelInputRef = useRef<HTMLInputElement>(null);
    const { classes } = useStyles();
    
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

    const handleLabelInputBlur = () => {
      labelInputRef.current.style.pointerEvents = "none";
    };
    const handleLabelPressEnter = (event) => {
      if (event.key === "Enter") {
        labelInputRef.current.blur(); // update wall length
      }
    };

    return (
      <div ref={ref}>
        <input
          id="label-input"
          ref={labelInputRef}
          type="number"
          step={0.10}
          min={0}
          className={classes.labelInput}
          onBlur={handleLabelInputBlur}
          onKeyDown={handleLabelPressEnter}
        />
      </div>
    );
}