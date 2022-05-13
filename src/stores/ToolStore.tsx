/** handling current tool state, mainly */
import create from 'zustand'
import { AddWallManager } from '../editor/editor/actions/AddWallManager';


export enum ToolMode {
    FurnitureMode,
    WallMode,
    ViewMode
};

export enum ViewMode {
  TwoD,
  ThreeD
}

export enum Tool {
    WallAdd,
    WallEdit,
    WallRemove,
    FurnitureAdd,
    FurnitureEdit,
    FurnitureRemove,
    FurnitureAddWindow,
    View
};

export interface ToolStore {
    mode:ToolMode,
    viewMode:ViewMode,
    activeTool:Tool,
    setMode: (mode:ToolMode) => void,
    setTool: (tool: Tool) => void,
    setViewMode: (mode:ViewMode) => void
}


export const useStore = create<ToolStore>(set => ({
  mode: ToolMode.FurnitureMode,
  activeTool: Tool.FurnitureEdit,
  viewMode: ViewMode.TwoD,
  setMode: (mode: ToolMode) => {
    set(() => ({
      mode: mode
    }));    
  },
  setViewMode: (mode: ViewMode) => {
    set(() => ({
      viewMode: mode
    }));    
  },
  setTool: (tool: Tool) => {
    set(() => ({
      activeTool: tool
    })); 
    AddWallManager.Instance.resetTools()
  }
}))


// const GlobalStateContext = createContext({
//     state: {} as Partial<GlobalStateInterface>,
//     setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
//   });

// const GlobalStateProvider = ({
//     children,
//     value = {"mode":ToolMode.FurnitureMode, "activeTool":Tool.FurnitureEdit} as GlobalStateInterface,
//   }: {
//     children: React.ReactNode;
//     value?: Partial<GlobalStateInterface>;
//   }) => {
//     const [state, setState] = useState(value);
//     return (
//       <GlobalStateContext.Provider value={{ state, setState }}>
//         {children}
//       </GlobalStateContext.Provider>
//     );
//   };

//   const useGlobalState = () => {
//     const context = useContext(GlobalStateContext);
//     if (!context) {
//       throw new Error("useGlobalState must be used within a GlobalStateContext");
//     }
//     return context;
//   };

//   export { GlobalStateProvider, useGlobalState };