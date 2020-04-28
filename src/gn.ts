export class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'intro'
        });
    }

    panels: any[];
    index: number = 0;
    cursor: Phaser.GameObjects.Image;
    clickable: boolean = true;
    music: Phaser.Sound.BaseSound;

    create() {
        this.input.setDefaultCursor('none');
        this.panels = [
            {
                image: this.add.image(640, 360, 'title-1'),
                music: 'music-ending'
            },
            {
                transition: 'fade',
                image: this.add.image(1920, 360, 'title-2')
            },
            {
                transition: 'slide',
                image: this.add.image(1920, 360, 'gn-1'),
                music: 'music-beginning'
            },
            {
                transition: 'slide',
                image: this.add.image(1920, 360, 'gn-2')
            },
            {
                transition: 'slide',
                image: this.add.image(1920, 360, 'gn-3')
            },
            {
                transition: 'slide',
                image: this.add.image(1920, 360, 'gn-4')
            },
            {
                transition: 'slide',
                image: this.add.image(1920, 360, 'gn-5')
            },
            {
                transition: 'slide',
                image: this.add.image(1920, 360, 'gn-6'),
                music: 'sting'
            },
            {
                transition: 'fade',
                image: this.add.rectangle(1920, 360, 1280, 720, 0x000000)
            }
        ];
        
        this.cursor = this.add.image(
            this.input.activePointer.worldX,
            this.input.activePointer.worldY,
            'cursor-click'
        );
        this.cursor.setOrigin(0, 0);
        this.updateCursor();

        this.music = this.sound.add('music-ending', {volume: 0.8});
        this.afterTransition();

        
        this.input.on(Phaser.Input.Events.POINTER_DOWN, this.onClick, this);
        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.updateCursor, this);
    }

    advance() {
        this.index += 1;
        if (this.index >= this.panels.length) {
            this.scene.start('main');
            return;
        }

        this.clickable = false;
        this.cursor.setTexture('cursor-click');

        if (this.panels[this.index].transition === 'slide') {
            this.tweens.add({
                targets: this.panels[this.index].image,
                duration: 600,
                x: 640,
                onComplete: this.afterTransition,
                onCompleteScope: this
            });
            this.tweens.add({
                targets: this.panels[this.index-1].image,
                duration: 600,
                x: -640
            });
        } else {
            this.panels[this.index].image.setPosition(640, 360);
            this.panels[this.index].image.setAlpha(0);
            this.clickable = false;
            this.tweens.add({
                targets: this.panels[this.index].image,
                duration: 1000,
                alpha: 1,
                onComplete: this.afterTransition,
                onCompleteScope: this
            });
        }
    }

    afterTransition() {
        if (this.panels[this.index].music) {
            this.music.destroy();
            this.music = this.sound.add(this.panels[this.index].music);
            this.music.play();
        }
        if (this.index < this.panels.length-1 &&
            this.panels[this.index+1].transition === 'slide') {
            this.clickable = true;
            this.cursor.setTexture('cursor-right');
        } else {
            this.time.addEvent({
                delay: 1000,
                callback: this.advance,
                callbackScope: this
            });
        }
    }

    onClick() {
        if (this.clickable) {
            this.advance();
        }
    }

    updateCursor() {
        let x = this.input.activePointer.worldX;
        let y = this.input.activePointer.worldY;
        this.cursor.setPosition(x, y);
    }
}


export class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'end'
        });
    }

    panels: any[];
    index: number = 0;
    cursor: Phaser.GameObjects.Image;

    create() {
        this.input.setDefaultCursor('none');
        this.panels = [
            this.add.image(640, 360, 'gn-end0'),
            this.add.image(1920, 360, 'gn-end1'),
            this.add.image(1920, 360, 'gn-end2'),
            this.add.image(1920, 360, 'gn-end3'),
            this.add.image(1920, 360, 'gn-end4'),
            this.add.image(1920, 360, 'gn-end3'),
            this.add.image(1920, 360, 'gn-end5'),
            this.add.image(1920, 360, 'gn-end1'),
            this.add.image(1920, 360, 'gn-end6'),
            this.add.rectangle(1920, 360, 1280, 720, 0x000000),
            this.add.image(1920, 360, 'credits'),
        ];
        
        this.cursor = this.add.image(
            this.input.activePointer.worldX,
            this.input.activePointer.worldY,
            'cursor-click'
        );
        this.cursor.setOrigin(0, 0);
        this.updateCursor();

        this.sound.add('music-ending', {volume: 0.8}).play();
        this.afterTransition();

        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.updateCursor, this);
    }

    advance() {
        this.index += 1;
        if (this.index >= this.panels.length) {
            return;
        }

        this.panels[this.index].setPosition(640, 360);
        this.panels[this.index].setAlpha(0);
        this.tweens.add({
            targets: this.panels[this.index],
            duration: 700,
            alpha: 1,
            onComplete: this.afterTransition,
            onCompleteScope: this
        });
    }

    afterTransition() {
        this.time.addEvent({
            delay: 1000,
            callback: this.advance,
            callbackScope: this
        });
    }

    updateCursor() {
        let x = this.input.activePointer.worldX;
        let y = this.input.activePointer.worldY;
        this.cursor.setPosition(x, y);
    }
}