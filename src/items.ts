import { MainScene } from "./main";

export interface ItemDefinition {
    id: string;
    small: Function;
    inspect?: {
        init: Function,
        object?: any;
    };
}


export class InputText extends Phaser.GameObjects.Container {

    text: Phaser.GameObjects.BitmapText;
    instructions: Phaser.GameObjects.BitmapText;
    labelStr: string;
    inputStr: string;
    correctStr: string;
    onCorrect: Function;
    onWrong: Function;

    constructor(scene: Phaser.Scene, label, correctStr, onCorrect, onWrong) {
        super(scene);
        scene.add.existing(this);

        this.text = scene.add.bitmapText(100, 200, 'console', label + '_');
        this.instructions = scene.add.bitmapText(100, 300, 'console', 'Press ENTER to submit.')
        this.add(this.text);
        this.add(this.instructions);
        this.setVisible(false);

        this.onCorrect = onCorrect;
        this.onWrong = onWrong;
        
        this.labelStr = label;
        this.correctStr = correctStr;
        this.inputStr = '';

        this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.letterTyped, this);
    }

    letterTyped(event) {
        if (!this.visible) return;

        if (event.key === 'Enter') {
            if (this.inputStr === this.correctStr) {
                this.onCorrect();
            } else {
                this.onWrong();
            }
            this.setVisible(false);
        }

        if (event.key === 'Backspace') {
            event.preventDefault();
            this.inputStr = this.inputStr.substr(0, this.inputStr.length-1);
        }
            
        if (/^[\w ]$/.test(event.key)) {
            this.inputStr += event.key;
        }
        this.text.setText(this.labelStr + this.inputStr + '_');
    }
}

export class Screwdriver extends Phaser.GameObjects.Container {

    itemImage: Phaser.GameObjects.Image;
    inputText: InputText;
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);
        scene.add.existing(this);

        this.itemImage = scene.add.image(640, 360, 'inv-monkey');
        this.add(this.itemImage);

        this.itemImage.setInteractive();

        this.inputText = new InputText(scene, 'Admin password: ', 'puzzl3z', () => {
            this.itemImage.setTint(0xff0000);
        }, () => {
            this.scene.showDialogue(['Incorrect password.']);
        });
        this.add(this.inputText);

        // this.itemImage.setInteractive(true);
        this.itemImage.on(Phaser.Input.Events.POINTER_DOWN, (a, x, y, event) => {
            event.stopPropagation();
            console.log('what');
            this.inputText.setVisible(true);
        });
    }
}

export const items = {
    'monkey': {
        id: 'monkey',
        small: () => 'inv-monkey',
        inspect: {
            init: scene => new Screwdriver(scene),
            object: null
        }
    }
}