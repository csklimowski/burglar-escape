import { MainScene } from "./main";

export class Dialogue extends Phaser.GameObjects.BitmapText {

    scene: MainScene;
    lineQueue: string[] = [];
    finalText: string = '';
    charIndex: number = 0;
    done: boolean = true;
    character: string;
    sfx: any;

    onFinish: Function;
    onStart: Function;

    constructor(scene: Phaser.Scene) {
        super(scene, 200, 100, 'outlined', '', 50);
        scene.add.existing(this);

        scene.time.addEvent({
            callback: this.updateText,
            callbackScope: this,
            loop: true,
            delay: 50
        });
        

        this.sfx = {
            master: scene.sound.add('master-voice'),
            burglar: scene.sound.add('burglar-voice')
        }
    }

    clear() {
        this.setText('');
        this.done = true;
    }

    display(lines: string[], onStart?: Function, onFinish?: Function, character?: string) {
        this.setText('');
        this.onStart = onStart;
        this.onFinish = onFinish;
        this.lineQueue = lines;
        this.finalText = this.lineQueue.shift();
        this.charIndex = 0;
        this.done = false;
        this.character = character || 'master';
        if (character === 'master') this.setTint(0xffff00);
    }

    nextLine() {
        if (this.done) {
            this.finalText = this.lineQueue.shift();
            this.charIndex = 0;
            this.done = false;
            if (this.onStart) this.onStart();
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
                this.sfx[this.character].play();
            }
        } else {
            this.done = true;
            if (this.onFinish) this.onFinish();
        }
    }
}