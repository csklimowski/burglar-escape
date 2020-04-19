
import {rooms} from './rooms';
import { Dialogue } from './dialogue';
import { Inventory, InventoryItem } from './inventory';
import { InputText } from './items';

export class MainScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });
    }
    

    room: any;
    progress: any;
    bg: Phaser.GameObjects.Image;
    cursor: Phaser.GameObjects.Image;
    inventory: Inventory;
    dialogue: Dialogue;
    inDialogue: boolean = false;
    holding: InventoryItem = null;

    create() {
        
        this.input.setDefaultCursor('none');
        this.room = rooms['1-north'];
        this.progress = new Set();
        this.bg = this.add.image(640, 360, this.room.bg(this.progress));
    

        this.inventory = new Inventory(this);
        
        this.cursor = this.add.image(
            this.input.activePointer.worldX, this.input.activePointer.worldY,
            'cursor-click'
        );
        this.cursor.setOrigin(0, 0);

        this.input.on(Phaser.Input.Events.POINTER_DOWN, this.onClick, this);
        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.onMouseMove, this);

        this.dialogue = new Dialogue(this);

        // @ts-ignore
        this.inputText = new InputText(this, 'Test', 'hi');
        // if (currentLevel === part1) {
        //     this.add.image(640, 360, 'store');
        // }
        // if (currentLevel === part2) {
        //     this.add.image(640, 360, 'house');
        //     this.music = this.sound.add('music', {
        //         volume: 0.1,
        //         loop: true
        //     });
        //     this.music.play();
        // }
        // this.charSprite = this.add.sprite(640, 360, 'blank');

        // this.dialogue = new Dialogue(this, this.onDialogueFinish, 100);
        // this.editor = new Editor(this, this.onSubmit);

        // this.curtain = this.add.image(640, 360, 'curtain');
        // this.fadeIn = true;
        
        // this.levelIndex = 0;
        // this.sequence = currentLevel[this.levelIndex].start;
        // this.sequenceIndex = 1;
    }

    onClick() {

        if (this.inDialogue) {
            if (this.dialogue.done && this.dialogue.lineQueue.length === 0) {
                this.inDialogue = false;
                this.dialogue.clear();
            } else {
                this.dialogue.nextLine();
            }
            return;
        }

        if (this.inventory.inspecting) {
            return;
        }

        if (this.holding) {
            this.inventory.returnItem(this.holding);
            return;
        }

        
        if (this.room.clickAreas) {
            for (let area of this.room.clickAreas) {
                if (Phaser.Geom.Rectangle.Contains(
                    area.bounds, this.input.activePointer.worldX, this.input.activePointer.worldY)
                ) {
                    this.room = rooms[area.goTo];
                    this.bg.setTexture(this.room.bg(this.progress));
                    return;
                }
                this.input.activePointer.worldX;
            }
        }

        if (this.room.items) {
            for (let item of this.room.items) {
                if (!this.progress.has(item.get) && Phaser.Geom.Rectangle.Contains(
                    item.bounds, this.input.activePointer.worldX, this.input.activePointer.worldY)
                ) {
                    this.progress.add(item.get);
                    this.inventory.addItem(item.get);
                    this.bg.setTexture(this.room.bg(this.progress));
                    return;
                }
            }
        }
    }

    onMouseMove() {
        // console.log(this.input.activePointer.worldX, this.input.activePointer.worldY)
        this.cursor.setPosition(
            this.input.activePointer.worldX, this.input.activePointer.worldY
        );



        if (!this.holding && !this.inventory.inspecting && !this.inDialogue) {
            this.cursor.setTexture('cursor-click');
            if (this.room.clickAreas) {
                for (let area of this.room.clickAreas) {
                    if (Phaser.Geom.Rectangle.Contains(
                        area.bounds, this.input.activePointer.worldX, this.input.activePointer.worldY)
                    ) {
                        this.cursor.setTexture(area.cursor || 'cursor-look');
                        break;
                    }
                }
            }
        }
        
    }

    getItem(id: string) {

    }

    showDialogue(lines: string[], onFinish?: Function) {
        this.inDialogue = true;
        this.dialogue.display(lines, onFinish);
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