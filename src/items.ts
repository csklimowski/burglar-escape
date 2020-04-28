import { MainScene } from "./main";
import { InputText } from './interactibles';

export interface ItemDefinition {
    id: string;
    small: string;
    inspect?: {
        init: Function,
        object?: any;
    };
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
                this.scene.sfx.correct.play();
            } else {
                this.scene.showDialogue(["I guess that wasn't it..."], null, null, 'burglar');
                this.scene.sfx.incorrect.play();
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
                this.inputText.text.setText('Enter: ');
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
        small: 'flag-flat',
        inspect: {
            init: scene => scene.add.image(640, 360, 'flag')
        }
    },
    'flag-2': {
        id: 'flag-2',
        small: 'flag-flat',
        inspect: {
            init: scene => scene.add.image(640, 360, 'flag')
        }
    },
    'flag-3': {
        id: 'flag-3',
        small: 'flag-flat',
        inspect: {
            init: scene => scene.add.image(640, 360, 'flag')
        }
    },
    'flag-4': {
        id: 'flag-4',
        small: 'flag-flat',
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