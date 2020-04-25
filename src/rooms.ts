import { MainScene } from "./main";
import {
    Minesweeper, Unfold, Safe,
    Computer, MasterTV1, MasterTV2
} from './interactibles';


export const rooms = {
    '1-north': {
        bg: progress => progress.has('door-1') ? '1-1_2' : '1-1',
        viewAreas: [
            {
                bounds: [0, 0, 100, 620],
                goTo: '1-west'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '1-east'
            },
            {
                bounds: [210, 100, 200, 230],
                goTo: '1-west-tv'
            },
            {
                bounds: [885, 495, 150, 170],
                goTo: '1-east-plant'
            },
            {
                bounds: [472, 216, 185, 390],
                goTo: '2-north',
                cursor: 'cursor-click'
            }
        ],
        interaction: {
            enabled: progress => !progress.has('door-1'),
            bounds: [472, 216, 185, 390],
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
                bounds: [0, 0, 100, 620],
                goTo: '1-north'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '1-south'
            },
            {
                bounds: [100, 550, 200, 150],
                goTo: '1-east-plant'
            },
            {
                bounds: [622, 240, 490, 215],
                goTo: '1-east-shelf'
            }
        ]
    },
    '1-east-plant': {
        bg: progress => progress.has('screwdriver') ? '1-11_2' : '1-11',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-east',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: [650, 200, 150, 350],
                get: 'screwdriver'
            }
        ]
    },
    '1-east-shelf': {
        bg: () => '1-5',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-east',
                cursor: 'cursor-back'
            },
            {
                bounds: [130, 315, 250, 230],
                goTo: '1-east-shelf-books'
            },
            {
                bounds: [460, 400, 290, 150],
                goTo: '1-east-shelf-minesweeper'
            },
            {
                bounds: [883, 190, 216, 326],
                goTo: '1-east-shelf-bottles'
            }
        ]
    },
    '1-east-shelf-books': {
        bg: progress => progress.has('good-snake') ? '1-5_5' : '1-5_4',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-east',
                cursor: 'cursor-back'
            },
            {
                bounds: [460, 400, 290, 150],
                goTo: '1-east-shelf-minesweeper'
            }
        ],
        items: [
            {
                bounds: [200, 440, 150, 110],
                get: 'good-snake'
            }
        ]
    },
    '1-east-shelf-minesweeper': {
        bg: progress => progress.has('key') ? '1-6_5' :
            progress.has('minesweeper') ? '1-6_4' : '1-6_3',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 120],
                goTo: '1-east-shelf',
                cursor: 'cursor-back'
            },
            {
                bounds: [0, 0, 1280, 120],
                goTo: '1-east-shelf'
            }
            
        ],
        items: [
            {
                bounds: [580, 310, 120, 120],
                get: 'key'
            }
        ],
        interaction: {
            enabled: progress => !progress.has('minesweeper'),
            bounds: [440, 160, 400, 400],
            init: scene => new Minesweeper(scene)
        }
    },
    '1-east-shelf-bottles': {
        bg: () => '1-15',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 640],
                goTo: '1-east-shelf',
                cursor: 'cursor-back'
            }
        ]
    },
    '1-south': {
        bg: () => '1-3',
        viewAreas: [
            {
                bounds: [0, 0, 100, 620],
                goTo: '1-east'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '1-west'
            },
            {
                bounds: [473, 480, 300, 240],
                goTo: '1-south-table'
            },
            {
                bounds: [800, 430, 380, 280],
                goTo: '1-west-couch'
            },
            {
                bounds: [320, 200, 250, 170],
                goTo: '1-south-letters'
            }
        ]
    },
    '1-south-letters': {
        bg: () => '1-14',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
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
                bounds: [400, 470, 700, 200],
                goTo: '1-south-table-under'
            },
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-south',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: [600, 370, 100, 100],
                get: 'flag-1',
                prereq: 'unscrew'
            },
            {
                bounds: [590, 210, 200, 110],
                get: 'bad-snake'
            }
        ]
    },
    '1-south-table-under': {
        bg: progress => progress.has('unscrew') ? '1-8_2' : '1-8',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-south-table',
                cursor: 'cursor-back'
            },
        ],
        interaction: {
            enabled: progress => !progress.has('unscrew'),
            bounds: [590, 300, 100, 100],
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
                bounds: [0, 0, 100, 620],
                goTo: '1-south'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '1-north'
            },
            {
                bounds: [100, 400, 550, 300],
                goTo: '1-west-couch'
            },
            {
                bounds: [970, 45, 215, 255],
                goTo: '1-west-tv'
            },
        ],
    },
    '1-west-tv': {
        bg: () => '1-9',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 620],
                goTo: '1-west',
                cursor: 'cursor-back'
            }
        ],
        interaction: {
            enabled: () => true,
            bounds: [0, 0, 0, 0],
            init: scene => new MasterTV1(scene)
        }
    },
    '1-west-couch': {
        bg: () => '1-12',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-west',
                cursor: 'cursor-back'
            },
            {
                bounds: [50, 250, 200, 400],
                goTo: '1-west-couch-side'
            },
            {
                bounds: [600, 290, 440, 260],
                goTo: '1-west-couch-cushion',
                cursor: 'cursor-click'
            }
        ]
    },
    '1-west-couch-cushion': {
        bg: progress => progress.has('flag-2') ? '1-12_3' : '1-12_2',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-west',
                cursor: 'cursor-back'
            },
            {
                bounds: [50, 250, 200, 400],
                goTo: '1-west-couch-side'
            }
        ],
        items: [
            {
                bounds: [770, 400, 100, 100],
                get: 'flag-2'
            }
        ]
    },
    '1-west-couch-side': {
        bg: progress => progress.has('flag-3') ? '1-13_2' : '1-13',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '1-west-couch',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: [600, 340, 100, 100],
                get: 'flag-3'
            }
        ]
    },
    '1-west-drawer': {
        bg: progress => progress.has('monkey') ? '1-4b' : '1-4a',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 120],
                goTo: '1-west',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: [460, 200, 440, 350],
                get: 'monkey'
            }
        ]
    },
    '2-west': {
        bg: progress => progress.has('door-2') ? '2-3_2' : '2-3',
        viewAreas: [
            {
                bounds: [0, 0, 100, 620],
                goTo: '2-south'
            },
            {
                bounds: [100, 0, 1080, 100],
                goTo: '2-ceiling'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '2-north'
            },
            {
                bounds: [300, 400, 200, 200],
                goTo: '2-west-computer'
            },
            {
                bounds: [100, 100, 200, 200],
                goTo: '2-west-tv'
            }
        ],
        interaction: {
            enabled: progress => !progress.has('door-2'),
            bounds: [530, 300, 210, 400],
            init: (scene: MainScene) => ({
                onClick: (x, y, holding) => {
                    // scene.progress.add('door-1');
                    // scene.inventory.destroyHeldItem();
                }
            })
        }
    },
    '2-west-computer': {
        bg: () => '2-9',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 150],
                goTo: '2-west',
                cursor: 'cursor-back'
            }
        ],
        interaction: {
            enabled: () => true,
            bounds: [370, 220, 480, 465],
            init: (scene: MainScene) => new Computer(scene)
        }
    },
    '2-west-tv': {
        bg: () => '2-10',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 620],
                goTo: '2-west',
                cursor: 'cursor-back'
            }
        ],
        interaction: {
            enabled: () => true,
            bounds: [0, 0, 0, 0],
            init: scene => new MasterTV2(scene)
        }
    },
    '2-ceiling': {
        bg: () => '2-7',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 520],
                goTo: '2-south',
                cursor: 'cursor-back'
            }
        ]
    },
    '2-south': {
        bg: () => '2-4',
        viewAreas: [
            {
                bounds: [100, 0, 650, 100],
                goTo: '2-ceiling'
            },
            {
                bounds: [0, 0, 100, 620],
                goTo: '2-east'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '2-west'
            },
            {
                bounds: [445, 200, 175, 330],
                goTo: '1-south'
            },
            {
                bounds: [650, 230, 100, 130],
                goTo: '2-south-safe'
            },
            {
                bounds: [830, 0, 170, 190],
                goTo: '2-west-tv'
            },
            {
                bounds: [720, 510, 140, 70],
                goTo: '2-south-floor'
            }
        ]
    },
    '2-south-floor': {
        bg: () => '2-11',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 150],
                goTo: '2-south',
                cursor: 'cursor-back'
            },
            {
                bounds: [315, 360, 520, 300],
                goTo: '2-south-floor-uncovered',
                cursor: 'cursor-click'
            }
        ]
    },
    '2-south-floor-uncovered': {
        bg: () => '2-11_2',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 150],
                goTo: '2-south',
                cursor: 'cursor-back'
            }
        ]
    },
    '2-south-safe': {
        bg: progress =>  progress.has('glasses') ? '2-6_3' : progress.has('safe') ? '2-6_2' : '2-6',
        viewAreas: [    
            {
                bounds: [0, 0, 1280, 150],
                goTo: '2-south',
                cursor: 'cursor-back'
            }
        ],
        items: [
            {
                bounds: [430, 465, 315, 140],
                get: 'glasses',
                prereq: 'safe'
            }
        ],
        interaction: {
            enabled: () => progress => !progress.has('safe'),
            bounds: [0, 0, 0, 0],
            init: scene => new Safe(scene)
        }
    },
    '2-north': {
        bg: () => '2-2',
        viewAreas: [
            {
                bounds: [100, 0, 1080, 100],
                goTo: '2-ceiling'
            },
            {
                bounds: [0, 0, 100, 620],
                goTo: '2-west'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '2-east'
            },
            {
                bounds: [440, 250, 390, 210],
                goTo: '2-north-panel'
            }
        ]
    },
    '2-north-panel': {
        bg: progress => progress.has('paper') ? '2-8_4' : progress.has('unfold') ? '2-8_3' : '2-8',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 200],
                goTo: '2-north',
                cursor: 'cursor-back'
            }
        ],
        interaction: {
            enabled: progress => !progress.has('unfold'),
            bounds: [0, 0, 0, 0],
            init: scene => new Unfold(scene)
        },
        items: [
            {
                bounds: [465, 260, 425, 200],
                get: 'paper',
                prereq: 'unfold'
            }
        ],
    },
    '2-east': {
        bg: () => '2-1',
        viewAreas: [
            {
                bounds: [100, 0, 1080, 100],
                goTo: '2-ceiling'
            },
            {
                bounds: [0, 0, 100, 620],
                goTo: '2-north'
            },
            {
                bounds: [1180, 0, 100, 620],
                goTo: '2-south'
            },
            {
                bounds: [450, 200, 375, 320],
                goTo: '2-east-frame'
            }
        ]
    },
    '2-east-frame': {
        bg: () => '2-5',
        viewAreas: [
            {
                bounds: [0, 0, 1280, 620],
                goTo: '2-east',
                cursor: 'cursor-back'
            }
        ]
    },
}