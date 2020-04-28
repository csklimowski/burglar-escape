
import {rooms} from './rooms';
import { Dialogue } from './dialogue';
import { Inventory, InventoryItem } from './inventory';

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
    sfx: any;

    create() {
        this.progress = new Set();
        this.room = rooms['1-west-tv'];

        this.sfx = {
            toggle: this.sound.add('toggle', {volume: 0.5}),
            door: this.sound.add('door'),
            correct: this.sound.add('pass-correct', {volume: 0.5}),
            incorrect: this.sound.add('pass-incorrect'),
            pickUp: this.sound.add('pick-up', {volume: 0.5}),
            placeFlag: this.sound.add('place-flag', {volume: 0.5}),
            slide: this.sound.add('slide'),
            solved: this.sound.add('solved', {volume: 0.5}),
        };

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
        this.updateCursor();
        this.activateInteractibles();
        
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
                        // this.activateInteractibles();
                        return;
                    }
                }
            }
        }

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
                    this.activateInteractibles();
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

    activateInteractibles() {
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
    }

    inBounds(x: number, y: number, bounds: number[]) {
        return x > bounds[0] && x < bounds[0] + bounds[2] &&
            y > bounds[1] && y < bounds[1] + bounds[3];
    }

    showDialogue(lines: string[], onStart?: Function, onFinish?: Function, character?: string) {
        this.inDialogue = true;
        this.dialogue.display(lines, onStart, onFinish, character);
    }
}
