import { ItemDefinition } from "./items";
import { MainScene } from "./main";
import { InventoryItem } from "./inventory";


export const rooms = {
    '1-north': {
        bg: progress => progress.has('door-1') ? '1-1_2' : '1-1',
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
                bounds: new Phaser.Geom.Rectangle(210, 100, 200, 230),
                goTo: '1-west-tv'
            },
            {
                bounds: new Phaser.Geom.Rectangle(885, 495, 150, 170),
                goTo: '1-east-plant'
            }
        ],
        interaction: {
            enabled: progress => !progress.has('door-1'),
            bounds: new Phaser.Geom.Rectangle(472, 216, 185, 390),
            init: (scene: MainScene) => ({
                onClick: (x, y, holding) => {
                    if (holding && holding.item.id === 'key') {
                        scene.progress.add('door-1');
                        scene.inventory.destroyHeldItem();
                    }
                }
            })
        }
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
            },
            {
                bounds: new Phaser.Geom.Rectangle(100, 550, 200, 150),
                goTo: '1-east-plant'
            },
            {
                bounds: new Phaser.Geom.Rectangle(622, 240, 490, 215),
                goTo: '1-east-shelf'
            }
        ]
    },
    '1-east-plant': {
        bg: progress => progress.has('screwdriver') ? '1-11_2' : '1-11',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-east',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: new Phaser.Geom.Rectangle(650, 200, 150, 350),
                get: 'screwdriver'
            }
        ]
    },
    '1-east-shelf': {
        bg: () => '1-5',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-east',
                cursor: 'cursor-back'
            },
            {
                bounds: new Phaser.Geom.Rectangle(130, 315, 250, 230),
                goTo: '1-east-shelf-books'
            },
            {
                bounds: new Phaser.Geom.Rectangle(460, 400, 290, 150),
                goTo: '1-east-shelf-minesweeper'
            }
        ]
    },
    '1-east-shelf-books': {
        bg: progress => progress.has('good-snake') ? '1-5_5' : '1-5_4',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-east',
                cursor: 'cursor-back'
            },
            {
                bounds: new Phaser.Geom.Rectangle(460, 400, 290, 150),
                goTo: '1-east-shelf-minesweeper'
            }
        ],
        items: [
            {
                bounds: new Phaser.Geom.Rectangle(200, 440, 150, 110),
                get: 'good-snake'
            }
        ]
    },
    '1-east-shelf-minesweeper': {
        bg: progress => progress.has('key') ? '1-6_4' : 
            progress.has('minesweeper') ? '1-6_3' : '1-6_2',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 120),
                goTo: '1-east-shelf',
                cursor: 'cursor-back'
            },
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 120),
                goTo: '1-east-shelf'
            }
            
        ],
        items: [
            {
                bounds: new Phaser.Geom.Rectangle(580, 310, 120, 120),
                get: 'key'
            }
        ],
        interaction: {
            enabled: progress => !progress.has('minesweeper'),
            bounds: new Phaser.Geom.Rectangle(440, 160, 400, 400),
            init: scene => new Minesweeper(scene)
        }
    },
    '1-south': {
        bg: progress => progress.has('flag-1') ? '1-3_2' : '1-3',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 100, 620),
                goTo: '1-east'
            },
            {
                bounds: new Phaser.Geom.Rectangle(1180, 0, 100, 620),
                goTo: '1-west'
            },
            {
                bounds: new Phaser.Geom.Rectangle(473, 480, 300, 240),
                goTo: '1-south-table'
            },
            {
                bounds: new Phaser.Geom.Rectangle(800, 430, 380, 280),
                goTo: '1-west-couch'
            },
            {
                bounds: new Phaser.Geom.Rectangle(320, 200, 250, 170),
                goTo: '1-south-letters'
            }
        ]
    },
    '1-south-letters': {
        bg: () => '1-14',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-south',
                cursor: 'cursor-back'
            }
        ]
    },
    '1-south-table': {
        bg: progress => {
            if (progress.has('flag-1') && progress.has('bad-snake')) {
                return '1-7_2';
            }
            if (progress.has('flag-1')) return '1-7_4';
            if (progress.has('bad-snake')) return '1-7_3';
            return '1-7';
        },
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(400, 470, 700, 200),
                goTo: '1-south-table-under'
            },
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-south',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: new Phaser.Geom.Rectangle(600, 370, 100, 100),
                get: 'flag-1',
                prereq: 'unscrew'
            },
            {
                bounds: new Phaser.Geom.Rectangle(590, 210, 200, 110),
                get: 'bad-snake'
            }
        ]
    },
    '1-south-table-under': {
        bg: progress => progress.has('unscrew') ? '1-8_2' : '1-8',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-south-table',
                cursor: 'cursor-back'
            },
        ],
        interaction: {
            enabled: progress => !progress.has('unscrew'),
            bounds: new Phaser.Geom.Rectangle(590, 300, 100, 100),
            init: (scene: MainScene) => ({
                onClick: (x, y, holding) => {
                    if (holding && holding.item.id === 'screwdriver') {
                        if (scene.progress.has('screwdriver-admin')) {
                            scene.progress.add('unscrew');
                            console.log('yay');
                        } else {
                            scene.showDialogue(["That's weird, it's only getting tighter."]);
                        }
                    }
                }
            })
        }
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
                bounds: new Phaser.Geom.Rectangle(100, 400, 550, 300),
                goTo: '1-west-couch'
            },
            {
                bounds: new Phaser.Geom.Rectangle(970, 45, 215, 255),
                goTo: '1-west-tv'
            },
        ],
    },
    '1-west-tv': {
        bg: () => '1-9',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 620),
                goTo: '1-west',
                cursor: 'cursor-back'
            }
        ],
        interaction: {
            enabled: () => true,
            bounds: new Phaser.Geom.Rectangle(0, 0, 0, 0),
            init: scene => new MasterTV(scene, [
                "If you can escape this box...",
                "Then I will not call the cops."
            ])
        }
    },
    '1-west-couch': {
        bg: () => '1-12',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-west',
                cursor: 'cursor-back'
            },
            {
                bounds: new Phaser.Geom.Rectangle(50, 250, 200, 400),
                goTo: '1-west-couch-side'
            },
            {
                bounds: new Phaser.Geom.Rectangle(600, 290, 440, 260),
                goTo: '1-west-couch-cushion'
            }
        ]
    },
    '1-west-couch-cushion': {
        bg: progress => progress.has('flag-2') ? '1-12_4' : '1-12_2',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-west',
                cursor: 'cursor-back'
            },
            {
                bounds: new Phaser.Geom.Rectangle(50, 250, 200, 400),
                goTo: '1-west-couch-side'
            }
        ],
        items: [
            {
                bounds: new Phaser.Geom.Rectangle(770, 400, 100, 100),
                get: 'flag-2'
            }
        ]
    },
    '1-west-couch-side': {
        bg: progress => progress.has('flag-3') ? '1-13_2' : '1-13',
        viewAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 1280, 200),
                goTo: '1-west-couch',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: new Phaser.Geom.Rectangle(600, 340, 100, 100),
                get: 'flag-3'
            }
        ]
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
    
}


export class MasterTV extends Phaser.GameObjects.Container {

    master: Phaser.GameObjects.Sprite;
    scene: MainScene;

    constructor(scene: Phaser.Scene, dialogue: string[]) {
        super(scene);

        this.master = scene.add.sprite(640, 360, 'master-idle1');
        this.add(this.master);
        this.add(scene.add.image(640, 360, '1-9'));
        this.master.anims.play('master-talk1');

        this.scene.showDialogue(dialogue, () => {
            this.master.anims.play('master-talk1');
        }, () => {
            this.master.anims.play('master-idle1');
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
                image: this.scene.add.image(590, 410, 'inv-flag')
            }
        };
        this.add(this.flaggedSpaces[9].image);
    }

    onClick(x: number, y: number, holding: InventoryItem) {
        if (holding && holding.item.id.startsWith('flag'))  {
            let col = Math.floor((x - 390)/100);
            let row = Math.floor((y - 110)/100);
            let cy = 210 + 100*row;
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
            let row = Math.floor((y - 160)/100);
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