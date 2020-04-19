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

        this.itemImage = scene.add.image(640, 360, 'screwdriver-far');
        this.add(this.itemImage);

        this.itemImage.setInteractive();

        this.inputText = new InputText(scene, 'Enter: ', input => {
            if (input === 'puzzl3z') {
                this.itemImage.setTexture('screwdriver-loosey');
                this.scene.progress.add('screwdriver-admin');
            } else {
                this.scene.showDialogue(["I guess that wasn't it..."]);
            }
        });
        this.add(this.inputText);

        // this.itemImage.setInteractive(true);
        this.itemImage.on(Phaser.Input.Events.POINTER_DOWN, (a, x, y, event) => {
            if (this.itemImage.texture.key === 'screwdriver-far') {
                this.itemImage.setTexture('screwdriver-close');
            } else if (this.itemImage.texture.key === 'screwdriver-close') {
                this.itemImage.setTexture('screwdriver-tighty');
            } else if (this.itemImage.texture.key === 'screwdriver-tighty' || this.itemImage.texture.key === ('screwdriver-enter-password')) {
                this.itemImage.setTexture('screwdriver-enter-password');
                this.inputText.inputStr = '';
                this.inputText.setVisible(true);
            }
        });
    }
}




export const items = {
    'screwdriver': {
        id: 'screwdriver',
        small: 'inv-screwdriver',
        inspect: {
            init: scene => new Screwdriver(scene)
        }
    },
    'good-snake': {
        id: 'good-snake',
        small: 'inv-good-snake',
        inspect: {
            init: scene => scene.add.image(640, 360, 'good-snake')
        }
    },
    'bad-snake': {
        id: 'bad-snake',
        small: 'inv-bad-snake',
        inspect: {
            init: scene => scene.add.image(640, 360, 'bad-snake')
        }
    },
    'key': {
        id: 'key',
        small: 'inv-key',
        inspect: {
            init: scene => scene.add.image(640, 360, 'key')
        }
    },
    'flag-1': {
        id: 'flag-1',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'flag')
        }
    },
    'flag-2': {
        id: 'flag-2',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'flag')
        }
    },
    'flag-3': {
        id: 'flag-3',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'flag')
        }
    },
    'flag-4': {
        id: 'flag-4',
        small: 'inv-flag',
        inspect: {
            init: scene => scene.add.image(640, 360, 'flag')
        }
    },
    'glasses': {
        id: 'glasses',
        small: 'inv-glasses',
        inspect: {
            init: scene => scene.add.rectangle(640, 360, 1280, 720, 0x00ff00, 0.2)
        }
    },
    'paper': {
        id: 'paper',
        small: 'inv-paper',
        inspect: {
            init: scene => scene.add.image(640, 360, 'paper')
        }
    }
}