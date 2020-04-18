

export const rooms = {
    '1-north': {
        bg: () => '1-1',
        clickAreas: [
            {
                bounds: new Phaser.Geom.Rectangle(0, 0, 100, 620),
                goTo: '1-west'
            },
            {
                bounds: new Phaser.Geom.Rectangle(1180, 0, 100, 620),
                goTo: '1-east'
            }
        ]
    },
    '1-east': {
        bg: () => '1-2',
        clickAreas: [
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
        clickAreas: [
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
        clickAreas: [
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
        clickAreas: [
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