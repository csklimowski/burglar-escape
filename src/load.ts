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

        this.load.image('1-1', 'assets/test room/1.jpg');
        this.load.image('1-2', 'assets/test room/2.jpg');
        this.load.image('1-3', 'assets/test room/3.jpg');
        this.load.image('1-4', 'assets/test room/4.jpg');

        this.load.image('1-4a', 'assets/test room/close up monkey.jpg');
        this.load.image('1-4b', 'assets/test room/monkeygone.jpg');


        this.load.image('inv-bar', 'assets/inv-bar.png');
        this.load.image('inv-bg', 'assets/inv-bg.png');
        this.load.spritesheet('inv-inspect', 'assets/inv-inspect.png', {
            frameWidth: 500,
            frameHeight: 80
        });
        this.load.spritesheet('inv-put-away', 'assets/inv-put-away.png', {
            frameWidth: 500,
            frameHeight: 80
        });
        this.load.image('inv-monkey', 'assets/test room/monkeyinventory.png');

        this.load.image('cursor-click', 'assets/cursors/click.png');
        this.load.image('cursor-look', 'assets/cursors/look.png');
        this.load.image('cursor-back', 'assets/cursors/back.png');

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