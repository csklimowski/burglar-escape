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


        this.load.image('1-1', 'assets/rooms final/room1/1.png');
        this.load.image('1-1_2', 'assets/rooms final/room1/1_2.png');
        this.load.image('1-2', 'assets/rooms final/room1/2.png');
        this.load.image('1-3', 'assets/rooms final/room1/3.png');
        this.load.image('1-3_2', 'assets/rooms final/room1/3_2.png');
        this.load.image('1-4', 'assets/rooms final/room1/4.png');
        this.load.image('1-5', 'assets/rooms final/room1/5.png');
        this.load.image('1-5_2', 'assets/rooms final/room1/5_2.png');
        this.load.image('1-5_3', 'assets/rooms final/room1/5_3.png');
        this.load.image('1-5_4', 'assets/rooms final/room1/5_4.png');
        this.load.image('1-5_5', 'assets/rooms final/room1/5_5.png');
        this.load.image('1-6', 'assets/rooms final/room1/6.png');
        this.load.image('1-6_2', 'assets/rooms final/room1/6_2.png');
        this.load.image('1-6_3', 'assets/rooms final/room1/6_3.png');
        this.load.image('1-6_4', 'assets/rooms final/room1/6_4.png');
        this.load.image('1-6_5', 'assets/rooms final/room1/6_5.png');
        this.load.image('1-7', 'assets/rooms final/room1/7.png');
        this.load.image('1-7_2', 'assets/rooms final/room1/7_2.png');
        this.load.image('1-7_3', 'assets/rooms final/room1/7_3.png');
        this.load.image('1-7_4', 'assets/rooms final/room1/7_4.png');
        this.load.image('1-8', 'assets/rooms final/room1/8.png');
        this.load.image('1-8_2', 'assets/rooms final/room1/8_2.png');
        this.load.image('1-9', 'assets/rooms final/room1/9.png');
        this.load.image('1-10', 'assets/rooms final/room1/10.png');
        this.load.image('1-11', 'assets/rooms final/room1/11.png');
        this.load.image('1-11_2', 'assets/rooms final/room1/11_2.png');
        this.load.image('1-12', 'assets/rooms final/room1/12.png');
        this.load.image('1-12_2', 'assets/rooms final/room1/12_2.png');
        this.load.image('1-12_3', 'assets/rooms final/room1/12_3.png');
        this.load.image('1-12_4', 'assets/rooms final/room1/12_4.png');
        this.load.image('1-13', 'assets/rooms final/room1/13.png');
        this.load.image('1-13_2', 'assets/rooms final/room1/13_2.png');
        this.load.image('1-14', 'assets/rooms final/room1/14.png');
        this.load.image('1-15', 'assets/rooms final/room1/15.png');

        this.load.image('2-1', 'assets/rooms final/room2/1.png');
        this.load.image('2-2', 'assets/rooms final/room2/2.png');
        this.load.image('2-3', 'assets/rooms final/room2/3.png');
        this.load.image('2-3_2', 'assets/rooms final/room2/3_2.png');
        this.load.image('2-4', 'assets/rooms final/room2/4.png');
        this.load.image('2-5', 'assets/rooms final/room2/5.png');
        this.load.image('2-6', 'assets/rooms final/room2/6.png');
        this.load.image('2-6_2', 'assets/rooms final/room2/6_2.png');
        this.load.image('2-6_3', 'assets/rooms final/room2/6_3.png');
        this.load.image('2-7', 'assets/rooms final/room2/7.png');
        this.load.image('2-7_2', 'assets/rooms final/room2/7_2.png');
        this.load.image('2-8', 'assets/rooms final/room2/8.png');
        this.load.image('2-8_2', 'assets/rooms final/room2/8_2.png');
        this.load.image('2-8_3', 'assets/rooms final/room2/8_3.png');
        this.load.image('2-8_4', 'assets/rooms final/room2/8_4.png');
        this.load.image('2-9', 'assets/rooms final/room2/9.png');
        this.load.image('2-10', 'assets/rooms final/room2/10.png');
        this.load.image('2-11', 'assets/rooms final/room2/11.png');
        this.load.image('2-11_2', 'assets/rooms final/room2/11_2.png');

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
        this.load.image('screwdriver-far', 'assets/items final/screwdriver/inspect.png');
        this.load.image('screwdriver-close', 'assets/items final/screwdriver/closed.png');
        this.load.image('screwdriver-enter-password', 'assets/items final/screwdriver/open_enterpassword.png');
        this.load.image('screwdriver-loosey', 'assets/items final/screwdriver/open_loosey.png');
        this.load.image('screwdriver-tighty', 'assets/items final/screwdriver/open_tighty.png');
        this.load.image('inv-screwdriver', 'assets/items final/screwdriver/icon.png');

        this.load.image('good-snake', 'assets/items final/snakes/snake good inspect.png');
        this.load.image('bad-snake', 'assets/items final/snakes/snake bad inspect.png');
        this.load.image('inv-good-snake', 'assets/snakes/inv-snake-good.png');
        this.load.image('inv-bad-snake', 'assets/snakes/inv-snake-bad.png');
        this.load.image('snake-1', 'assets/snakes/snake-1.png');
        this.load.image('snake-2', 'assets/snakes/snake-2.png');
        this.load.image('snake-3', 'assets/snakes/snake-3.png');
        this.load.image('snake-4', 'assets/snakes/snake-4.png');
        this.load.image('snake-5', 'assets/snakes/snake-5.png');
        this.load.image('snake-6', 'assets/snakes/snake-6.png');
        // this.load.image('inv-monkey', 'assets/test room/monkeyinventory.png');

        this.load.image('flag', 'assets/items final/flag/inspect.png');
        this.load.image('flag-flat', 'assets/items final/flag/game_piece.png')
        this.load.image('inv-flag', 'assets/items final/flag/icon.png');

        this.load.image('key', 'assets/items final/key/inspect.png');
        this.load.image('inv-key', 'assets/items final/key/icon.png');

        this.load.image('inv-glasses', 'assets/items final/glasses/icon.png');

        this.load.image('paper', 'assets/items final/paper/inspect.png');
        this.load.image('inv-paper', 'assets/items final/paper/icon.png');

        // MASTER
        this.load.image('master-talk1-1', 'assets/master/room1/talk 1 new/talk10000.png');
        this.load.image('master-talk1-2', 'assets/master/room1/talk 1 new/talk10001.png');
        this.load.image('master-talk1-3', 'assets/master/room1/talk 1 new/talk10002.png');
        this.load.image('master-talk1-4', 'assets/master/room1/talk 1 new/talk10003.png');
        this.load.image('master-idle1', 'assets/master/room1/default.png');


        this.load.image('master-talk2-1', 'assets/master/room2/talk 2/talk20021.png');
        this.load.image('master-talk2-2', 'assets/master/room2/talk 2/talk20022.png');
        this.load.image('master-talk2-3', 'assets/master/room2/talk 2/talk20023.png');
        this.load.image('master-talk2-4', 'assets/master/room2/talk 2/talk20024.png');
        this.load.image('master-idle2', 'assets/master/room2/default.png');

        // this.load.spritesheet('speak-button', 'img/speak-button.png', {
        //     frameWidth: 144,
        //     frameHeight: 100
        // });

        // INTERACTIVE STUFF
        this.load.image('button-green', 'assets/buttons/green.png');
        this.load.image('button-purple', 'assets/buttons/purple.png');
        this.load.image('button-red', 'assets/buttons/red.png');
        this.load.image('button-yellow', 'assets/buttons/yellow.png');

        this.load.image('button-hash', 'assets/buttons/hash.png');
        this.load.image('button-pac', 'assets/buttons/pac.png');
        this.load.image('button-rupee', 'assets/buttons/arrow.png');
        this.load.image('button-heart', 'assets/buttons/heart.png');



        // GRAPHIC NOVEL

        this.load.image('gn-1', 'assets/graphic novel/1.png');
        this.load.image('gn-2', 'assets/graphic novel/2.png');
        this.load.image('gn-3', 'assets/graphic novel/3.png');
        this.load.image('gn-4', 'assets/graphic novel/4.png');
        this.load.image('gn-5', 'assets/graphic novel/5.png');
        this.load.image('gn-6', 'assets/graphic novel/6.png');

        this.load.image('gn-end1', 'assets/graphic novel/end_1.png');
        this.load.image('gn-end2', 'assets/graphic novel/end_2.png');
        this.load.image('gn-end3', 'assets/graphic novel/end_3.png');
        this.load.image('gn-end4', 'assets/graphic novel/end_4.png');
        this.load.image('gn-end5', 'assets/graphic novel/end_5.png');
        this.load.image('gn-end6', 'assets/graphic novel/end_6.png');
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

        this.anims.create({
            key: 'master-talk2',
            frames: [
                {
                    frame: null,
                    key: 'master-talk2-1',
                },
                {
                    frame: null,
                    key: 'master-talk2-2',
                },
                {
                    frame: null,
                    key: 'master-talk2-3',
                },
                {
                    frame: null,
                    key: 'master-talk2-4',
                }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'master-idle2',
            frames: [
                {
                    frame: null,
                    key: 'master-idle2'
                }
            ]
        });

        this.scene.start('main');
    }
}