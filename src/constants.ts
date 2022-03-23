// how many pixels is a meter
export const METER = 100;
export const WALL_THICKNESS = 0.15*METER;
export enum Modes {
    Idle,
    Dragging,
    Editing
};

export enum Coord {
    NE,
    E,
    SE,
    S,
    C
};

export enum ToolMode {
    WallMode,
    FurnitureMode,
    ViewMode
};

export enum Tool {
    WallAdd,
    WallEdit,
    WallRemove,
    FurnitureAdd,
    FurnitureEdit,
    FurnitureRemove,
    View
};