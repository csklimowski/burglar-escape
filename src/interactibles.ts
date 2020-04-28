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

        this.text = scene.add.bitmapText(430, 230, 'console', label + '_');
        this.instructions = scene.add.bitmapText(430, 300, 'console', 'Press ENTER to submit.')
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
        }, 'master');
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
        }, 'master')
    }
}


export class Minesweeper extends Phaser.GameObjects.Container {

    flaggedSpaces: any;
    lights: any;
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.scene.interactiveObjects.add(this);

        this.flaggedSpaces = {
            10: {
                item: 'flag-4',
                image: this.scene.add.image(520+80*2, 190+80*2, 'flag-flat')
            }
        };
        
        this.add(this.flaggedSpaces[10].image);
    }

    onClick(x: number, y: number, holding: InventoryItem) {
        
        
        if (holding && holding.item.id.startsWith('flag'))  {
            let col = Math.floor((x - 440)/80);
            let row = Math.floor((y - 110)/80);
            let space = col + 4*row;
            let cy = 190 + 80*row;
            let cx = 520 + 80*col;

            if (col < 0 || col > 3 || row < 0 || row > 3) return;

            if (!this.flaggedSpaces[space] && (space !== 1 && space !== 7 && space !== 9 && space !== 14)) {
                this.flaggedSpaces[space] = {
                    item: holding.item.id,
                    image: this.scene.add.image(cx, cy, 'flag-flat')
                };
                this.add(this.flaggedSpaces[space].image);
                this.scene.inventory.destroyHeldItem();

                if (this.flaggedSpaces[3] &&
                    this.flaggedSpaces[6] &&
                    this.flaggedSpaces[8] &&
                    this.flaggedSpaces[12]) {

                    this.scene.progress.add('minesweeper');
                    this.scene.sfx.solved.play();

                    for (let space in this.flaggedSpaces) {
                        if (this.flaggedSpaces[space]) {
                            this.flaggedSpaces[space].image.destroy();
                        }
                    }
                }
            }
        }

        if (!holding) {
            let col = Math.floor((x - 480)/80);
            let row = Math.floor((y - 150)/80);
            let space = col + 4*row;

            if (this.flaggedSpaces[space]) {
                this.scene.inventory.addItem(this.flaggedSpaces[space].item);
                this.flaggedSpaces[space].image.destroy();
                this.flaggedSpaces[space] = null;
            }
        }
    }
}


export class Unfold extends Phaser.GameObjects.Container {
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);
        scene.add.existing(this);

        let numbers = [
            {
                box: scene.add.rectangle(380, 380, 100, 100),
                text: scene.add.bitmapText(370, 330, 'normal', '0', 80),
                number: 0
            },
            {
                box: scene.add.rectangle(700, 520, 100, 100),
                text: scene.add.bitmapText(690, 470, 'normal', '0', 80),
                number: 0
            },
            {
                box: scene.add.rectangle(865, 380, 100, 100),
                text: scene.add.bitmapText(855, 330, 'normal', '0', 80),
                number: 0
            },
            {
                box: scene.add.rectangle(700, 380, 100, 100),
                text: scene.add.bitmapText(690, 330, 'normal', '0', 80),
                number: 0
            }
        ];

        let clickNumber = num => {
            this.scene.sfx.toggle.play();
            numbers[num].number = (numbers[num].number + 1) % 10;
            numbers[num].text.setText('' + numbers[num].number);

            if (numbers[0].number === 7 &&
                numbers[1].number === 1 &&
                numbers[2].number === 4 &&
                numbers[3].number === 8) {
                
                this.scene.progress.add('unfold');
                this.scene.bg.setTexture('2-8_2');
                this.scene.sfx.slide.play();
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

        for (let i = 0; i < 4; i++) {
            numbers[i].box.setInteractive();
            numbers[i].text.setTint(0x000000);
            this.add(numbers[i].box);
            this.add(numbers[i].text);
            numbers[i].box.on(Phaser.Input.Events.POINTER_DOWN, () => clickNumber(i));
        }
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
                image: scene.add.image(680, 148, 'button-heart')
            },
            {
                index: 0,
                image: scene.add.image(680, 254, 'button-heart')
            },
            {
                index: 0,
                image: scene.add.image(680, 362, 'button-heart')
            },
            {
                index: 0,
                image: scene.add.image(680, 468, 'button-heart')
            }
        ];

        let clickSymbol = num => {
            this.scene.sfx.toggle.play();
            symbols[num].index = (symbols[num].index + 1) % 4;
            symbols[num].image.setTexture(symbolCycle[symbols[num].index]);

            if (symbols[0].index === 1 && symbols[1].index === 0 && symbols[2].index === 2 && symbols[3].index === 3 &&
                colors[0].index === 2 && colors[1].index === 1 && colors[2].index === 0 && colors[3].index === 3) {

                this.scene.progress.add('safe');
                this.scene.bg.setTexture('2-6_2');
                this.scene.sfx.door.play();

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
                image: scene.add.image(448, 210, 'button-green')
            },
            {
                index: 0,
                image: scene.add.image(448, 316, 'button-green')
            },
            {
                index: 0,
                image: scene.add.image(448, 423, 'button-green')
            },
            {
                index: 0,
                image: scene.add.image(448, 530, 'button-green')
            }
        ];

        let clickColor = num => {
            this.scene.sfx.toggle.play();
            colors[num].index = (colors[num].index + 1) % 4;
            colors[num].image.setTexture(colorCycle[colors[num].index]);

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
                this.scene.sfx.door.play();
                this.scene.scene.start('end');
            } else {
                this.scene.showDialogue(["Wrong!"], null, null, 'master');
            }
        });
        this.add(this.inputText);
    }

    onClick(x, y, holding) {
        this.inputText.setVisible(true);
    } 
}


export class Snakes extends Phaser.GameObjects.Container {

    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);
        scene.add.existing(this);

        let cards = [
            {
                side: 0,
                x: 304,
                image: scene.add.image(304, 345, 'snake-4')
            },
            {
                side: 0,
                x: 400,
                image: scene.add.image(400, 338, 'snake-2')
            },
            {
                side: 0,
                x: 507,
                image: scene.add.image(507, 349, 'snake-3')
            },
            {
                side: 0,
                x: 300,
                image: scene.add.image(300, 495, 'snake-1')
            },
            {
                side: 1,
                x: 405,
                image: scene.add.image(905, 497, 'snake-5')
            },
            {
                side: 1,
                x: 496,
                image: scene.add.image(1000, 491, 'snake-6')
            }
        ];

        let clickCard = i => {
            this.scene.sfx.toggle.play();
            cards[i].side = (cards[i].side + 1) % 2;
            cards[i].image.setX(cards[i].x + cards[i].side*500);

            if (cards[0].side === 0 && cards[1].side === 1 &&
                    cards[2].side === 0 && cards[3].side === 1 &&
                    cards[4].side === 0 && cards[5].side === 1) {
                this.scene.progress.add('snakes');
                this.scene.bg.setTexture('2-8_3');
                this.scene.sfx.slide.play();

                for (let i = 0; i < 6; i++) {
                    cards[i].image.destroy();
                }
            }
        }

        for (let i = 0; i < 6; i++) {
            this.add(cards[i].image);
            cards[i].image.setInteractive();
            cards[i].image.on(Phaser.Input.Events.POINTER_DOWN, () => clickCard(i));
        }
    }
}