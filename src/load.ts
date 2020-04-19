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
        
        this.load.bitmapFont('normal', 'font/font.png', 'font/font.fnt');
        this.load.bitmapFont('console', 'font/console.png', 'font/console.fnt');
        // this.load.bitmapFont('outline', 'font/font-outline.png', 'font/font-outline.fnt');


        // CURSORS
        this.load.image('cursor-click', 'assets/cursors/click.png');
        this.load.image('cursor-look', 'assets/cursors/look.png');
        this.load.image('cursor-back', 'assets/cursors/back.png');

        // ROOMS
        // this.load.image('1-1', 'assets/test room/1.jpg');
        // this.load.image('1-2', 'assets/test room/2.jpg');
        // this.load.image('1-3', 'assets/test room/3.jpg');
        // this.load.image('1-4', 'assets/test room/4.jpg');

        // this.load.image('1-1a', 'assets/minesweeper-test.png');

        // this.load.image('1-4a', 'assets/test room/close up monkey.jpg');
        // this.load.image('1-4b', 'assets/test room/monkeygone.jpg');


        this.load.image('1-1', 'assets/preview/room1/1.png');
        this.load.image('1-1_2', 'assets/preview/room1/1_2.png');
        this.load.image('1-2', 'assets/preview/room1/2.png');
        this.load.image('1-3', 'assets/preview/room1/3.png');
        this.load.image('1-3_2', 'assets/preview/room1/3_2.png');
        this.load.image('1-4', 'assets/preview/room1/4.png');
        this.load.image('1-5', 'assets/preview/room1/5.png');
        this.load.image('1-5_2', 'assets/preview/room1/5_2.png');
        this.load.image('1-5_3', 'assets/preview/room1/5_3.png');
        this.load.image('1-5_4', 'assets/preview/room1/5_4.png');
        this.load.image('1-5_5', 'assets/preview/room1/5_5.png');
        this.load.image('1-6', 'assets/preview/room1/6.png');
        this.load.image('1-6_2', 'assets/preview/room1/6_2.png');
        this.load.image('1-6_3', 'assets/preview/room1/6_3.png');
        this.load.image('1-6_4', 'assets/preview/room1/6_4.png');
        this.load.image('1-7', 'assets/preview/room1/7.png');
        this.load.image('1-7_2', 'assets/preview/room1/7_2.png');
        this.load.image('1-7_3', 'assets/preview/room1/7_3.png');
        this.load.image('1-7_4', 'assets/preview/room1/7_4.png');
        this.load.image('1-8', 'assets/preview/room1/8.png');
        this.load.image('1-8_2', 'assets/preview/room1/8_2.png');
        this.load.image('1-9', 'assets/preview/room1/9.png');
        this.load.image('1-10', 'assets/preview/room1/10.png');
        this.load.image('1-11', 'assets/preview/room1/11.png');
        this.load.image('1-11_2', 'assets/preview/room1/11_2.png');
        this.load.image('1-12', 'assets/preview/room1/12.png');
        this.load.image('1-12_2', 'assets/preview/room1/12_2.png');
        this.load.image('1-12_3', 'assets/preview/room1/12_3.png');
        this.load.image('1-12_4', 'assets/preview/room1/12_4.png');
        this.load.image('1-13', 'assets/preview/room1/13.png');
        this.load.image('1-13_2', 'assets/preview/room1/13_2.png');
        this.load.image('1-14', 'assets/preview/room1/14.png');
        /*
            
        */

        // INVENTORY
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

        // ITEMS
        this.load.image('screwdriver-far', 'assets/preview/props/screwdriver/screwdriver_far.png');
        this.load.image('screwdriver-close', 'assets/preview/props/screwdriver/screwdriver_close.png');
        this.load.image('screwdriver-enter-password', 'assets/preview/props/screwdriver/screwdriver_enteradminpassword_on.png');
        this.load.image('screwdriver-loosey', 'assets/preview/props/screwdriver/screwdriver_openloose.png');
        this.load.image('screwdriver-tighty', 'assets/preview/props/screwdriver/screwdriver_opentight.png');
        this.load.image('inv-screwdriver', 'assets/preview/props/screwdriver/inv-screwdriver.png')

        this.load.image('good-snake', 'assets/snakes/snake-good.png');
        this.load.image('bad-snake', 'assets/snakes/snake-bad.png');
        this.load.image('inv-good-snake', 'assets/snakes/inv-snake-good.png');
        this.load.image('inv-bad-snake', 'assets/snakes/inv-snake-bad.png');
        this.load.image('snake-1', 'assets/snakes/snake-1.png');
        this.load.image('snake-2', 'assets/snakes/snake-2.png');
        this.load.image('snake-3', 'assets/snakes/snake-3.png');
        this.load.image('snake-4', 'assets/snakes/snake-4.png');
        // this.load.image('inv-monkey', 'assets/test room/monkeyinventory.png');


        this.load.image('flag', 'assets/preview/props/flag/flag.png');
        this.load.image('inv-flag', 'assets/preview/props/flag/inv-flag.png');


        this.load.image('key', 'assets/preview/props/key/key.png');
        this.load.image('inv-key', 'assets/preview/props/key/inv-key.png');

        // MASTER
        this.load.image('master-talk1-1', 'assets/master/room1/talk 1 new/talk10000.png');
        this.load.image('master-talk1-2', 'assets/master/room1/talk 1 new/talk10001.png');
        this.load.image('master-talk1-3', 'assets/master/room1/talk 1 new/talk10002.png');
        this.load.image('master-talk1-4', 'assets/master/room1/talk 1 new/talk10003.png');
        this.load.image('master-idle1', 'assets/master/room1/default.png');


        this.load.image('master-talk2-1', 'assets/master/room1/talk 1/talk20001.png');
        this.load.image('master-talk2-2', 'assets/master/room1/talk 1/talk20002.png');
        this.load.image('master-talk2-3', 'assets/master/room1/talk 1/talk20003.png');
        this.load.image('master-talk2-4', 'assets/master/room1/talk 1/talk20004.png');
        this.load.image('master-idle2', 'assets/master/room1/default.png');

        // this.load.spritesheet('speak-button', 'img/speak-button.png', {
        //     frameWidth: 144,
        //     frameHeight: 100
        // });
    }

    create() {
        this.anims.create({
            key: 'master-talk1',
            frames: [
                {
                    frame: null,
                    key: 'master-talk1-1',
                },
                {
                    frame: null,
                    key: 'master-talk1-2',
                },
                {
                    frame: null,
                    key: 'master-talk1-3',
                },
                {
                    frame: null,
                    key: 'master-talk1-4',
                }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'master-idle1',
            frames: [
                {
                    frame: null,
                    key: 'master-idle1'
                }
            ]
        });

        this.scene.start('main');
    }
}