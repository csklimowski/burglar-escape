import { ItemDefinition } from "./items";
import { MainScene } from "./main";
import { InventoryItem } from "./inventory";


export const rooms = {
    '1-north': {
        bg: () => '1-1',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 100, 620),
                goTo: '1-west'
            },
            {
                bounds: new Phaser.Geom.Rectangle(1180, 0, 100, 620),
                goTo: '1-east'
            },
            {
                bounds: new Phaser.Geom.Rectangle(540, 260, 200, 200),
                goTo: '1-north-minesweeper'
            }
        ]
    },
    '1-east': {
        bg: () => '1-2',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 100, 620),
                goTo: '1-north'
            },
            {
                bounds: new Phaser.Geom.Rectangle(1180, 0, 100, 620),
                goTo: '1-south'
            }
        ]
    },
    '1-south': {
        bg: () => '1-3',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 100, 620),
                goTo: '1-east'
            },
            {
                bounds: new Phaser.Geom.Rectangle(1180, 0, 100, 620),
                goTo: '1-west'
            }
        ]
    },
    '1-west': {
        bg: () => '1-4',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 100, 620),
                goTo: '1-south'
            },
            {
                bounds: new Phaser.Geom.Rectangle(1180, 0, 100, 620),
                goTo: '1-north'
            },
            {
                bounds: new Phaser.Geom.Rectangle(440, 360, 400,  260),
                goTo: '1-west-drawer'
            },
        ],
        
    },
    '1-west-drawer': {
        bg: progress => progress.has('monkey') ? '1-4b' : '1-4a',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 120),
                goTo: '1-west',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: new Phaser.Geom.Rectangle(460, 200, 440, 350),
                get: 'monkey'
            }
        ]
    },
    '1-north-minesweeper': {
        bg: () => '1-1a',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 120),
                goTo: '1-north',
                cursor: 'cursor-back'
            }
        ],
        interaction: {
            bounds: new Phaser.Geom.Rectangle(440, 160, 400, 400),
            init: scene => new Minesweeper(scene)
        }
    }
}

export class Minesweeper extends Phaser.GameObjects.Container {

    flaggedSpaces: any;
    scene: MainScene;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.scene.interactiveObjects.add(this);

        this.flaggedSpaces = {};
    }

    onClick(x: number, y: number, holding: InventoryItem) {

        let col = Math.floor((x - 440)/100);
        let row = Math.floor((y - 160)/100);
        let cy = 210 + 100*row;
        let cx = 490 + 100*col;
        let space = col + 4*row;

        if (space !== 1 && space !== 7 && space !== 9 && space !== 14) {

            if (holding && holding.item.id.startsWith('flag') && !this.flaggedSpaces[space]) {
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
                    this.scene.showDialogue(['I did it!']);
                }
            }

            if (!holding && this.flaggedSpaces[space]) {
                this.scene.inventory.addItem(this.flaggedSpaces[space].item);
                this.flaggedSpaces[space].image.destroy();
                this.flaggedSpaces[space] = null;
                //this.flaggedSpaces[space] = 
            }
        }
    }
}