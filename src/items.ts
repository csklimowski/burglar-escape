import { MainScene } from "./main";

export interface ItemDefinition {
    id: string;
    small: string;
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
    onSubmit: Function;

    constructor(scene: Phaser.Scene, label, onSubmit) {
        super(scene);
        scene.add.existing(this);

        this.text = scene.add.bitmapText(100, 200, 'console', label + '_');
        this.instructions = scene.add.bitmapText(100, 300, 'console', 'Press ENTER to submit.')
        this.add(this.text);
        this.add(this.instructions);
        this.setVisible(false);

        this.onSubmit = onSubmit;
        
        this.labelStr = label;
        this.inputStr = '';

        this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.letterTyped, this);
    }

    letterTyped(event) {
        if (!this.visible) return;

        if (event.key === 'Enter') {
            this.onSubmit(this.inputStr);
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

        this.inputText = new InputText(scene, 'Admin password: ', input => {
            if (input === 'puzzl3z') {
                this.itemImage.setTint(0xff0000);
            } else {
                this.scene.showDialogue(['Incorrect password.']);
            }
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
        small: 'inv-monkey',
        inspect: {
            init: scene => new Screwdriver(scene)
        }
    },
    'flag-1': {
        id: 'flag-1',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'inv-flag')
        }
    },
    'flag-2': {
        id: 'flag-2',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'inv-flag')
        }
    },
    'flag-3': {
        id: 'flag-3',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'inv-flag')
        }
    },
    'flag-4': {
        id: 'flag-4',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'inv-flag')
        }
    },
}