import { IViewportOptions } from 'pixi-viewport';
import { Application } from 'pixi.js'
import { Tool, ToolMode } from './constants';
import { Main } from './scenes/Main'; // This is the import statement
import { ToolManager } from './Tools/ToolManager';

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0xebebeb,
    antialias:true,
    width: Math.max(document.documentElement.clientHeight, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
});

app.view.oncontextmenu = (e) => {
    e.preventDefault();
}

const viewportSettings:IViewportOptions = {
    screenWidth:app.screen.width,
    screenHeight:app.screen.height,
    worldWidth:2000,
    worldHeight:2000,
    interaction:app.renderer.plugins.interaction
}
const main: Main = new Main(viewportSettings);

app.stage.addChild(main)

// temp controls until we get React :)
const toolManager = ToolManager.Instance;
function set(mode:ToolMode, tool:Tool){
    toolManager.setMode(mode);
    toolManager.setTool(tool);
} 

document.getElementById("add-wall").onclick = () => {set(ToolMode.WallMode, Tool.WallAdd);toolManager.getState()}
document.getElementById("edit-wall").onclick = () => {set(ToolMode.WallMode, Tool.WallEdit);toolManager.getState()}
document.getElementById("remove-wall").onclick = () => {set(ToolMode.WallMode, Tool.WallRemove); toolManager.getState()}
document.getElementById("add-furniture").onclick = () => {set(ToolMode.FurnitureMode, Tool.FurnitureAdd); toolManager.getState()}
document.getElementById("edit-furniture").onclick = () => {set(ToolMode.FurnitureMode, Tool.FurnitureEdit);toolManager.getState()}
document.getElementById("remove-furniture").onclick = () => {set(ToolMode.FurnitureMode, Tool.FurnitureRemove);toolManager.getState()}
