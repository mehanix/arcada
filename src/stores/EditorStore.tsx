/** handling current tool state, mainly */
import create from 'zustand'
import { AddWallManager } from '../editor/editor/actions/AddWallManager';
import { Tool } from '../editor/editor/constants';


export enum ToolMode {
    FurnitureMode,
    WallMode,
    ViewMode
};

export interface EditorStore {
    mode:ToolMode,
    floor:number,
    activeTool:Tool,
    snap:boolean,
    setMode: (mode:ToolMode) => void,
    setTool: (tool: Tool) => void,
    setFloor: (floor:number) => void,
    setSnap: (snap:boolean) => void
}


export const useStore = create<EditorStore>(set => ({
  mode: ToolMode.FurnitureMode,
  activeTool: Tool.View,
  floor: 0,
  snap: true,
  setMode: (mode: ToolMode) => {
    set(() => ({
      mode: mode
    }));    
  },
  setFloor: (floor:number) => {
    set(() => ({
      floor: floor
    }));    
  },
  setTool: (tool: Tool) => {
    set(() => ({
      activeTool: tool
    })); 
    AddWallManager.Instance.resetTools()
  },
  setSnap: (snap:boolean) => {
    set(() => ({
      snap: snap
    }));    
  }
}))
