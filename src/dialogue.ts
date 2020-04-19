import { MainScene } from "./main";

export class Dialogue extends Phaser.GameObjects.BitmapText {

    scene: MainScene;
    lineQueue: string[] = [];
    finalText: string = '';
    charIndex: number = 0;
    done: boolean = true;

    onFinish: Function;

    constructor(scene: Phaser.Scene) {
        super(scene, 200, 100, 'normal', '', 50);
        scene.add.existing(this);

        scene.time.addEvent({
            callback: this.updateText,
            callbackScope: this,
            loop: true,
            delay: 50
        });
    }

    clear() {
        this.setText('');
        this.done = true;
    }

    display(lines: string[], onFinish?: Function,) {
        this.setText('');
        this.onFinish = onFinish;
        this.lineQueue = lines;
        this.finalText = this.lineQueue.shift();
        this.charIndex = 0;
        this.done = false;
    }

    nextLine() {
        if (this.done) {
            this.finalText = this.lineQueue.shift();
            this.charIndex = 0;
            this.done = false;
        } else {
            this.charIndex = this.finalText.length-1;
        }
    }

    updateText() {
        if (this.done) return;
        
        let ci = this.charIndex;

        if (ci < this.finalText.length) {
            this.setText(this.finalText.substring(0, this.charIndex+1));
            this.charIndex += 1;
            if (ci % 2 == 0 && this.finalText[ci] !== '.') {
                // play SFX
            }
        } else {
            this.done = true;
            if (this.onFinish) this.onFinish();
        }
    }
}