// how many pixels is a meter
export const METER = 100;
export const WALL_THICKNESS = 0.2*METER;
export const INTERIOR_WALL_THICKNESS = 0.16*METER;

export const LABEL_OFFSET = 10;

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
    C,
    Horizontal,
    Vertical
};

export enum LabelAxis {
    Horizontal,
    Vertical
}

export enum ToolMode {
    WallMode,
    FurnitureMode,
    ViewMode
};


export enum Tool {
    WallAdd,
    FurnitureAdd,
    Edit,
    Remove,
    Measure,
    FurnitureAddWindow,
    FurnitureAddDoor,
    View
};
