/** handling current tool state, mainly */
import create from 'zustand'
import { ToolStateManager } from '../editor/editor/actions/ToolStateManager';


export enum ToolMode {
    FurnitureMode,
    WallMode,
    ViewMode
};

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
    activeTool:Tool,
    setMode: (mode:ToolMode) => void,
    setTool: (tool: Tool) => void
}


export const useStore = create<ToolStore>(set => ({
  mode: ToolMode.FurnitureMode,
  activeTool: Tool.FurnitureEdit,
  setMode: (mode: ToolMode) => {
    set(() => ({
      mode: mode
    }));    
  },
  setTool: (tool: Tool) => {
    set(() => ({
      activeTool: tool
    })); 
    ToolStateManager.Instance.resetTools()
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