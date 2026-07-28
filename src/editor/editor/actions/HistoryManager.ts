import { FloorPlan } from "../objects/FloorPlan";
import { AddWallManager } from "./AddWallManager";

/**
 * Snapshot-based undo/redo for the floor plan.
 *
 * The editor serializes the whole plan through FloorPlan.save() /
 * FloorPlan.load(). Instead of giving every Action its own undo()/redo(), 
 * this records a JSON snapshot at the end of each interaction and reloads 
 * a previous/next one to undo/redo.
 */
export class HistoryManager {
    private static instance: HistoryManager;

    private undoStack: string[] = [];
    private redoStack: string[] = [];
    private restoring = false;
    private debounceTimer: ReturnType<typeof setTimeout> | null = null;
    private initialized = false;
    private readonly LIMIT = 120;

    private constructor() { }

    public static get Instance(): HistoryManager {
        return this.instance || (this.instance = new this());
    }

    /** Records the baseline snapshot and starts listening for changes. */
    public init() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.commit(); // baseline = empty (or loaded) plan
        // A document-level pointerup fires regardless of Pixi event bubbling /
        // stopPropagation, so it reliably catches the end of every draw, drag,
        // resize, rotate and delete interaction.
        document.addEventListener("pointerup", this.onPointerUp);
    }

    private onPointerUp = () => {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => this.commit(), 300);
    };

    /** Pushes the current plan onto the undo stack if it changed. */
    public commit() {
        if (this.restoring) {
            return;
        }
        // Don't snapshot mid wall-draw. The wall tool's first click leaves a lone
        // node (no wall yet) until the next click connects it. Recording that
        // transient state would make undo step back to the orphan node instead of
        // removing the wall cleanly. AddWallManager.previousNode is set while a
        // chain is open and cleared when it ends (double-click) or the tool
        // changes (resetTools), so the finished chain is captured on that pointerup.
        if (AddWallManager.Instance.previousNode !== undefined) {
            return;
        }
        let snapshot: string;
        try {
            snapshot = FloorPlan.Instance.save();
        } catch {
            return;
        }
        if (snapshot === this.undoStack[this.undoStack.length - 1]) {
            return; // nothing changed
        }
        this.undoStack.push(snapshot);
        if (this.undoStack.length > this.LIMIT) {
            this.undoStack.shift();
        }
        this.redoStack = [];
    }

    public canUndo(): boolean {
        return this.undoStack.length > 1;
    }

    public canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    public undo() {
        if (!this.canUndo()) {
            return;
        }
        const current = this.undoStack.pop() as string;
        this.redoStack.push(current);
        this.restore(this.undoStack[this.undoStack.length - 1]);
    }

    public redo() {
        if (!this.canRedo()) {
            return;
        }
        const snapshot = this.redoStack.pop() as string;
        this.undoStack.push(snapshot);
        this.restore(snapshot);
    }

    private restore(snapshot: string) {
        this.restoring = true;
        try {
            FloorPlan.Instance.load(snapshot);
        } catch {
            /* malformed snapshot — ignore */
        }
        setTimeout(() => {
            this.restoring = false;
        }, 80);
    }
}
