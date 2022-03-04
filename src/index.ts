import { IViewportOptions } from 'pixi-viewport';
import { Application } from 'pixi.js'
import { Main } from './scenes/Main'; // This is the import statement

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0xebebeb,
    width: Math.max(document.documentElement.clientHeight, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
});
//  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
// const viewport = new Viewport({
//     worldWidth: 2000,
//     worldHeight: 2000,

//     interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
// })

// pass in the screen size to avoid "asking up"
const viewportSettings:IViewportOptions = {
    screenWidth:app.screen.width,
    screenHeight:app.screen.height,
    worldWidth:2000,
    worldHeight:2000,
    interaction:app.renderer.plugins.interaction
}
const main: Main = new Main(viewportSettings);

app.stage.addChild(main)