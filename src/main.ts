
import {rooms} from './rooms';
import { Dialogue } from './dialogue';
import { Inventory, InventoryItem } from './inventory';


export class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'intro'
        });
    }

    index: number = 0;
    panels: string[] = [
        'gn-1',
        'gn-2',
        'gn-3',
        'gn-4',
        'gn-5',
        'gn-6'
    ];
    image: Phaser.GameObjects.Image;

    create() {
        this.image = this.add.image(640, 360, 'gn-1');

        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.index += 1;
            if (this.index > 5) {
                this.scene.start('main')
            } else {
                this.image.setTexture(this.panels[this.index]);
            }
        }, this);
    }
}

export class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'end'
        });
    }

    index: number = 0;
    panels: string[] = [
        'gn-end1',
        'gn-end2',
        'gn-end3',
        'gn-end4',
        'gn-end5',
        'gn-end1',
        'gn-end6'
    ];
    image: Phaser.GameObjects.Image;

    create() {
        
        this.input.setDefaultCursor('auto');
        this.image = this.add.image(640, 360, 'gn-end1');

        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.index += 1;
            if (this.index > 6) {
                this.add.rectangle(640, 360, 1280, 720, 0x000000);
                this.add.bitmapText(300, 300, 'normal', 'Thanks for playing!');
            } else {
                this.image.setTexture(this.panels[this.index]);
            }
        }, this);
    }
}

export class MainScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });
    }
    

    room: any;
    progress: Set<string>;
    bg: Phaser.GameObjects.Image;
    cursor: Phaser.GameObjects.Image;
    inventory: Inventory;
    dialogue: Dialogue;
    inDialogue: boolean = false;
    holding: InventoryItem = null;
    inspectedObjects: Phaser.GameObjects.Container;
    interactiveObjects: Phaser.GameObjects.Container;
    invBg: Phaser.GameObjects.Container;

    create() {
        this.progress = new Set();
        this.input.setDefaultCursor('none');
        this.room = rooms['1-west-tv'];

        this.bg = this.add.image(640, 360, this.room.bg(this.progress));
        this.invBg = this.add.container(0, 0);
        this.interactiveObjects = this.add.container(0, 0);
        this.inspectedObjects = this.add.container(0, 0);
        this.inventory = new Inventory(this);
        this.dialogue = new Dialogue(this);

        this.cursor = this.add.image(
            this.input.activePointer.worldX, this.input.activePointer.worldY,
            'cursor-click'
        );
        this.cursor.setOrigin(0, 0);

        if (this.room.interactibles) {
            for (let interactible of this.room.interactibles) {
                if (!interactible.object) {
                    interactible.object = interactible.init(this);
                    if (interactible.object.setVisible) {
                        this.interactiveObjects.add(interactible.object);
                    }
                }
            }
        }
        

        this.inventory.addItem('key');

        this.input.on(Phaser.Input.Events.POINTER_DOWN, this.onClick, this);
        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.updateCursor, this);
    }

    onClick() {

        let x = this.input.activePointer.worldX;
        let y = this.input.activePointer.worldY

        if (this.inDialogue) {
            if (this.dialogue.done && this.dialogue.lineQueue.length === 0) {
                this.inDialogue = false;
                this.dialogue.clear();
            } else {
                this.dialogue.nextLine();
            }
            this.updateCursor();
            return;
        }

        if (this.inventory.inspecting) {
            this.updateCursor();
            return;
        }


        if (this.room.interactibles) {
            for (let interactible of this.room.interactibles) {
                if (interactible.enabled(this.progress)) {
                    if (this.inBounds(x, y, interactible.bounds)) {
                        if (interactible.object.onClick) {
                            interactible.object.onClick(x, y, this.holding);
                        }
                        this.bg.setTexture(this.room.bg(this.progress));
                        this.updateCursor();
                        return;
                    }
                }
            }
        }

        // if (this.room.interaction && this.room.interaction.enabled(this.progress)) {
        //     if (this.inBounds(x, y, this.room.interaction.bounds)) {
        //         if (this.room.interaction.object.onClick) {
        //             this.room.interaction.object.onClick(x, y, this.holding);
        //         }
        //         this.bg.setTexture(this.room.bg(this.progress));
        //         return;
        //     }
        // }

        if (this.holding) {
            this.inventory.returnItem(this.holding);
            this.updateCursor();
            return;
        }

        
        if (this.room.viewAreas) {
            for (let area of this.room.viewAreas) {
                if (this.inBounds(x, y, area.bounds)) {
                    if (this.room.interactibles) {
                        for (let interactible of this.room.interactibles) {
                            if (interactible.object.setVisible) {
                                interactible.object.setVisible(false);
                            }
                        }
                    }
                    this.room = rooms[area.goTo];
                    this.bg.setTexture(this.room.bg(this.progress));
                    if (this.room.interactibles) {
                        for (let interactible of this.room.interactibles) {
                            if (!interactible.object) {
                                interactible.object = interactible.init(this);
                                if (interactible.object.setVisible) {
                                    this.interactiveObjects.add(interactible.object);
                                }
                            }
                            if (interactible.enabled(this.progress)) {   
                                if (interactible.object.setVisible) {
                                    interactible.object.setVisible(true);
                                }
                            } else {
                                if (interactible.object.setVisible) {
                                    interactible.object.setVisible(false);
                                }
                            }
                        }
                    }
                    this.updateCursor();
                    return;
                }
            }
        }

        if (this.room.items) {
            for (let item of this.room.items) {
                if (!this.progress.has(item.get) && this.inBounds(x, y, item.bounds)) {
                    if (item.prereq && !this.progress.has(item.prereq)) {
                        return;
                    }
                    this.progress.add(item.get);
                    this.inventory.addItem(item.get);
                    this.bg.setTexture(this.room.bg(this.progress));
                    this.updateCursor();
                    return;
                }
            }
        }        
    }

    updateCursor() {
        let x = this.input.activePointer.worldX;
        let y = this.input.activePointer.worldY;
        // console.log(this.input.activePointer.worldX, this.input.activePointer.worldY)
        this.cursor.setPosition(x, y);

        if (!this.holding && !this.inventory.inspecting && !this.inDialogue) {
            this.cursor.setTexture('cursor-click');
            if (this.room.viewAreas) {
                for (let area of this.room.viewAreas) {
                    if (this.inBounds(x, y, area.bounds)) {
                        this.cursor.setTexture(area.cursor || 'cursor-look');
                        break;
                    }
                }
            }
        }
        
    }

    inBounds(x: number, y: number, bounds: number[]) {
        return x > bounds[0] && x < bounds[0] + bounds[2] &&
            y > bounds[1] && y < bounds[1] + bounds[3];
    }

    showDialogue(lines: string[], onStart?: Function, onFinish?: Function, character?: string) {
        this.inDialogue = true;
        this.dialogue.display(lines, onStart, onFinish, character);
    }

    update(time: number, delta: number) {
        // if (this.fadeIn) {
        //     this.curtain.setAlpha(this.curtain.alpha - 0.0005*delta)
        //     if (this.curtain.alpha <= 0) {
        //         this.fadeIn = false;
        //         this.charSprite.play(this.sequence[0].anim);
        //         this.dialogue.display(createDialogueData(currentLevel[this.levelIndex].start[0]));
        //     }
        // } else if (this.fadeOut) {
        //     this.curtain.setAlpha(this.curtain.alpha + 0.0005*delta)
        //     if (this.curtain.alpha >= 1) {
        //         if (currentLevel === part1) {
        //             currentLevel = part2;
        //             this.fadeOut = false;
        //             this.scene.restart();
        //         }
        //     }
        // }

        // if (this.charSprite.anims.currentAnim) {
        //     if (this.charSprite.anims.currentAnim.key.charAt(0) === 'r') {
        //         this.charSprite.setY(360 + 10*Math.sin(time/500));
        //     } else {
        //         this.charSprite.setY(360);
        //     }
        // }

        // this.charSprite.update(time, delta);
        // this.editor.update(time, delta);
        // this.dialogue.update(time, delta);
    }
}


// function createDialogueData(object): DialogueData {

//     let words: WordData[] = [];

//     for (let text of object.text.split(' ')) {
//         words.push({
//             text,
//             emphasis: 0,
//             fontSize: FONT_REG,
//             oy: 0
//         });
//     }

//     return {
//         words,
//         color: object.color || 0xffffff,
//         x: 650 - (object.text.length*12),
//         y: 50
//     };
// }