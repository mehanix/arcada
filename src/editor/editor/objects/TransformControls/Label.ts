import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Point } from "../../../../helpers/Point";
import { METER, Tool, WALL_THICKNESS } from "../../constants";
import { useStore } from "../../../../stores/EditorStore";
import { Wall } from "../Walls/Wall";

export class Label extends Container {
    text:Text;
    textStyle:TextStyle = new TextStyle({fontFamily : 'Arial', fontSize: 16, fill : 0x000000, align : 'center'});
    textBkg :Sprite = new Sprite(Texture.WHITE); 
    labelInput: HTMLInputElement;
    constructor(sizeInPixels?: number) {
        super();
        if (!sizeInPixels) {
            sizeInPixels = 0;
        }
        this.text = new Text("", this.textStyle);
        this.update(sizeInPixels);

        this.addChild(this.textBkg);
        this.addChild(this.text);
        this.pivot.set(this.width / 2, this.height / 2);
        this.zIndex = 1001;

        this.on("toggleLabel", this.toggleLabel);
        this.toggleLabel({});

        this.cursor = "text";
        this.labelInput = document.getElementById("label-input") as HTMLInputElement;
        this.interactive = true;
        this.on("pointerdown", ev => ev.stopPropagation()); // prevent the event to propagate to the parent
        this.labelInput && this.on("click", this.onClick);
    }

    private onClick(ev) {
      if (useStore.getState().activeTool !== Tool.Edit) return; // only for edit mode
      ev.stopPropagation();

      const labelBoundingRect = this.getBounds();
      this.labelInput.style.cssText = `pointer-events: auto; top: ${labelBoundingRect.top}px; left: ${labelBoundingRect.left}px;`;

      this.labelInput.value = this.text.text.replace("m", "");

      this.labelInput.focus(); // focus the input

      //listen events
      this.labelInput.addEventListener("input", this._handleChangeInput);
      this.labelInput.addEventListener("blur", this._handleBlurInput);
    }

    private _handleChangeInput = (ev) => {
      this.text.text = `${ev.target.value}m`;
      this.textBkg.width = this.text.width;
      this.textBkg.height = this.text.height;
    };
    private _handleBlurInput = (ev) => {
      (this.parent as Wall).updateWallLength?.(ev.target.value * METER + WALL_THICKNESS); // update wall length
      //remove connected events
      this.labelInput.removeEventListener("input", this._handleChangeInput);
      this.labelInput.removeEventListener("blur", this._handleBlurInput);
    };

    private toggleLabel(ev:any) {
    }
    public update(sizeInPixels:number) {

        this.text.text = this.toMeter(sizeInPixels);
        this.textBkg.width = this.text.width;
        this.textBkg.height = this.text.height;


    }

    public updatePos(pos:Point, sizeInPixels:number) {
        this.position.set(pos.x, pos.y)
        this.update(sizeInPixels)
    }

    private toMeter(size:number) {
        size = Math.abs(size) / METER;

        // truncating to the 2nd decimal
        const sizeLabel = (Math.round((size) * 100) / 100).toFixed(2)

        return sizeLabel + "m"
    }    
}
