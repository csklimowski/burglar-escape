import { InventoryItem } from "./inventory";
import { MainScene } from "./main";


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

export class MasterTV1 extends Phaser.GameObjects.Container {

    master: Phaser.GameObjects.Sprite;
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.scene.cursor.setTexture('cursor-click');

        this.master = scene.add.sprite(640, 360, 'master-idle1');
        this.add(this.master);
        this.add(scene.add.image(640, 360, '1-9'));
        this.master.anims.play('master-talk1');

        this.scene.showDialogue( [
            "If you can escape this box...",
            "Then I will not call the cops."
        ], () => {
            this.master.anims.play('master-talk1');
        }, () => {
            this.master.anims.play('master-idle1');
        })
    }
}

export class MasterTV2 extends Phaser.GameObjects.Container {

    master: Phaser.GameObjects.Sprite;
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.scene.cursor.setTexture('cursor-click');

        this.master = scene.add.sprite(640, 360, 'master-idle1');
        this.add(this.master);
        this.add(scene.add.image(640, 360, '2-10'));
        this.master.anims.play('master-talk2');

        this.scene.showDialogue([
            "You thought you'd escaped...",
            "But the riddles aren't done!",
            "When it comes to surprises, I am number one."
        ], () => {
            this.master.anims.play('master-talk2');
        }, () => {
            this.master.anims.play('master-idle2');
        })
    }
}


export class Minesweeper extends Phaser.GameObjects.Container {

    flaggedSpaces: any;
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.scene.interactiveObjects.add(this);

        this.flaggedSpaces = {
            9: {
                item: 'flag-4',
                image: this.scene.add.image(590, 460, 'inv-flag')
            }
        };
        this.add(this.flaggedSpaces[9].image);
    }

    onClick(x: number, y: number, holding: InventoryItem) {
        if (holding && holding.item.id.startsWith('flag'))  {
            let col = Math.floor((x - 390)/100);
            let row = Math.floor((y - 150)/100);
            let cy = 250 + 100*row;
            let cx = 490 + 100*col;
            let space = col + 4*row;

            if (!this.flaggedSpaces[space] && (space !== 1 && space !== 7 && space !== 9 && space !== 14)) {
                this.flaggedSpaces[space] = {
                    item: holding.item.id,
                    image: this.scene.add.image(cx, cy, holding.item.small)
                };
                this.add(this.flaggedSpaces[space].image);
                this.scene.inventory.destroyHeldItem();

                if (this.flaggedSpaces[3] &&
                    this.flaggedSpaces[6] &&
                    this.flaggedSpaces[8] &&
                    this.flaggedSpaces[12]) {

                    this.scene.progress.add('minesweeper');

                    for (let space in this.flaggedSpaces) {
                        if (this.flaggedSpaces[space]) {
                            this.flaggedSpaces[space].image.destroy();
                        }
                    }
                }
            }
        }

        if (!holding) {
            let col = Math.floor((x - 440)/100);
            let row = Math.floor((y - 200)/100);
            let space = col + 4*row;
            if (this.flaggedSpaces[space]) {
                this.scene.inventory.addItem(this.flaggedSpaces[space].item);
                this.flaggedSpaces[space].image.destroy();
                this.flaggedSpaces[space] = null;
            }
            //this.flaggedSpaces[space] = 
        }
    }
}

export class NumberCycle extends Phaser.GameObjects.BitmapText {
    constructor(scene, x, y) {
        super(scene, x, y, 'norma', '0');
        scene.add.existing(this);

        this.setInteractive();
        this.on(Phaser.Input.Events.POINTER_DOWN, () => {

        });
    }
}


export class Unfold extends Phaser.GameObjects.Container {
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);
        scene.add.existing(this);

        let numbers = [
            {
                box: scene.add.rectangle(370, 380, 100, 100),
                text: scene.add.bitmapText(350, 330, 'normal', '0', 80),
                number: 0
            },
            {
                box: scene.add.rectangle(700, 520, 100, 100),
                text: scene.add.bitmapText(690, 470, 'normal', '0', 80),
                number: 0
            },
            {
                box: scene.add.rectangle(890, 380, 100, 100),
                text: scene.add.bitmapText(870, 330, 'normal', '0', 80),
                number: 0
            },
            {
                box: scene.add.rectangle(700, 380, 100, 100),
                text: scene.add.bitmapText(690, 330, 'normal', '0', 80),
                number: 0
            }
        ];

        let clickNumber = num => {
            numbers[num].number = (numbers[num].number + 1) % 10;
            numbers[num].text.setText('' + numbers[num].number);

            if (numbers[0].number === 7 &&
                numbers[1].number === 1 &&
                numbers[2].number === 4 &&
                numbers[3].number === 8) {
                
                this.scene.progress.add('unfold');
                this.scene.bg.setTexture('2-8_3');
                numbers[0].box.destroy();
                numbers[1].box.destroy();
                numbers[2].box.destroy();
                numbers[3].box.destroy();
                numbers[0].text.destroy();
                numbers[1].text.destroy();
                numbers[2].text.destroy();
                numbers[3].text.destroy();
            } 
        }

        numbers[0].box.setInteractive();
        numbers[1].box.setInteractive();
        numbers[2].box.setInteractive();
        numbers[3].box.setInteractive();

        this.add(numbers[0].box);
        this.add(numbers[1].box);
        this.add(numbers[2].box);
        this.add(numbers[3].box);

        this.add(numbers[0].text);
        this.add(numbers[1].text);
        this.add(numbers[2].text);
        this.add(numbers[3].text);

        numbers[0].box.on(Phaser.Input.Events.POINTER_DOWN, () => clickNumber(0));
        numbers[1].box.on(Phaser.Input.Events.POINTER_DOWN, () => clickNumber(1));
        numbers[2].box.on(Phaser.Input.Events.POINTER_DOWN, () => clickNumber(2));
        numbers[3].box.on(Phaser.Input.Events.POINTER_DOWN, () => clickNumber(3));
    }
}


export class Safe extends Phaser.GameObjects.Container {
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);
        scene.add.existing(this);

        let symbolCycle = [
            'button-heart',
            'button-pac',
            'button-rupee',
            'button-hash'
        ];

        let symbols = [
            {
                index: 0,
                image: scene.add.image(430, 255, 'button-heart')
            },
            {
                index: 0,
                image: scene.add.image(430, 330, 'button-heart')
            },
            {
                index: 0,
                image: scene.add.image(430, 410, 'button-heart')
            },
            {
                index: 0,
                image: scene.add.image(430, 490, 'button-heart')
            }
        ];

        let clickSymbol = num => {
            symbols[num].index = (symbols[num].index + 1) % 4;
            symbols[num].image.setTexture(symbolCycle[symbols[num].index]);

            if (symbols[0].index === 1 && symbols[1].index === 0 && symbols[2].index === 2 && symbols[3].index === 3 &&
                colors[0].index === 2 && colors[1].index === 1 && colors[2].index === 0 && colors[3].index === 3) {

                this.scene.progress.add('safe');
                this.scene.bg.setTexture('2-6_2');

                for (let i = 0; i < 4; i++) {
                    symbols[i].image.destroy();
                    colors[i].image.destroy();
                }
            }
        }

        let colorCycle = [
            'button-green',
            'button-purple',
            'button-red',
            'button-yellow'
        ];

        let colors = [
            {
                index: 0,
                image: scene.add.image(750, 215, 'button-green')
            },
            {
                index: 0,
                image: scene.add.image(750, 295, 'button-green')
            },
            {
                index: 0,
                image: scene.add.image(750, 365, 'button-green')
            },
            {
                index: 0,
                image: scene.add.image(750, 445, 'button-green')
            }
        ];

        let clickColor = num => {
            colors[num].index = (colors[num].index + 1) % 4;
            colors[num].image.setTexture(colorCycle[colors[num].index]);
        }

        for (let i = 0; i < 4; i++) {
            this.add(symbols[i].image);
            symbols[i].image.setInteractive();
            symbols[i].image.on(Phaser.Input.Events.POINTER_DOWN, () => clickSymbol(i));
            symbols[i].image.setScale(0.6);
            symbols[i].image.setTint(0x000000);

            this.add(colors[i].image);
            colors[i].image.setInteractive();
            colors[i].image.on(Phaser.Input.Events.POINTER_DOWN, () => clickColor(i));
            colors[i].image.setScale(0.5);
        }
    }
}


export class Computer extends Phaser.GameObjects.Container {

    inputText: InputText;
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);
        scene.add.existing(this);

        this.inputText = new InputText(scene, 'Enter password: ', input => {
            if (input.toLowerCase() === 'lessonlearned') {
                this.scene.progress.add('computer');
                this.scene.scene.start('end');
            } else {
                this.scene.showDialogue(["Wrong!"]);
            }
        });
        this.add(this.inputText);
    }

    onClick(x, y, holding) {
        this.inputText.setVisible(true);
    } 
}
