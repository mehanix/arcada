import { ToolMode, Tool } from "../constants";
import { TransformLayer } from "../objects/TransformControls/TransformLayer";

export class ToolManager {
    public mode:ToolMode;
    public activeTool:Tool;
    private static instance:ToolManager;

    private constructor() {
        this.mode = ToolMode.ViewMode;
        this.activeTool = Tool.View;
    }

    public static get Instance()
    {
        return this.instance || (this.instance = new this()); // TODO obfuscate
    }

    public setMode(st:ToolMode) {
        this.mode = st;
    }

    public setTool(t:Tool) {
        this.resetTools();
        this.activeTool = t;
    }

    public resetTools() {
        // Edit Furniture tool
        TransformLayer.Instance.deselect();
    }
    
    public getState() {
        console.log(ToolMode[this.mode], Tool[this.activeTool])
    }
    
    public getTool() {
        return this.activeTool;
    }
}