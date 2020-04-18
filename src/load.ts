export class LoadScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'load'
        });
    }

    preload() {
        this.add.text(20, 20, 'Loading...');
        // this.load.audio('gasp', 'sfx/gasp!.ogg');
        // this.load.audio('music', 'songs/music.mp3');
        
        // this.load.bitmapFont('normal', 'font/font.png', 'font/font.fnt');
        // this.load.bitmapFont('outline', 'font/font-outline.png', 'font/font-outline.fnt');

        // this.load.image('submit', 'img/submit.png');
        // this.load.spritesheet('speak-button', 'img/speak-button.png', {
        //     frameWidth: 144,
        //     frameHeight: 100
        // });
    }

    create() {
        // this.anims.create({
        //     key: 'clerk-talk',
        //     frames: [
        //         {
        //             frame: null,
        //             key: 'clerk-talk0001',
        //         },
        //         {
        //             frame: null,
        //             key: 'clerk-talk0002',
        //         },
        //         {
        //             frame: null,
        //             key: 'clerk-talk0003',
        //         },
        //         {
        //             frame: null,
        //             key: 'clerk-talk0004',
        //         }
        //     ],
        //     frameRate: 10,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'clerk-idle',
        //     frames: [
        //         {
        //             frame: null,
        //             key: 'clerk-talk0004'
        //         }
        //     ]
        // });
        this.scene.start('main');
    }
}