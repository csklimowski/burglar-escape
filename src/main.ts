
export class MainScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });
    }

    create() {
        // if (currentLevel === part1) {
        //     this.add.image(640, 360, 'store');
        // }
        // if (currentLevel === part2) {
        //     this.add.image(640, 360, 'house');
        //     this.music = this.sound.add('music', {
        //         volume: 0.1,
        //         loop: true
        //     });
        //     this.music.play();
        // }
        // this.charSprite = this.add.sprite(640, 360, 'blank');

        // this.dialogue = new Dialogue(this, this.onDialogueFinish, 100);
        // this.editor = new Editor(this, this.onSubmit);

        // this.curtain = this.add.image(640, 360, 'curtain');
        // this.fadeIn = true;
        
        // this.levelIndex = 0;
        // this.sequence = currentLevel[this.levelIndex].start;
        // this.sequenceIndex = 1;
    }

    update(time: number, delta: number) {
        // if (this.fadeIn) {
        //     this.curtain.setAlpha(this.curtain.alpha - 0.0005*delta)
        //     if (this.curtain.alpha <= 0) {
        //         this.fadeIn = false;
        //         this.charSprite.play(this.sequence[0].anim);
        //         this.dialogue.display(createDialogueData(currentLevel[this.levelIndex].start[0]));
        //     }
        // } else if (this.fadeOut) {
        //     this.curtain.setAlpha(this.curtain.alpha + 0.0005*delta)
        //     if (this.curtain.alpha >= 1) {
        //         if (currentLevel === part1) {
        //             currentLevel = part2;
        //             this.fadeOut = false;
        //             this.scene.restart();
        //         }
        //     }
        // }

        // if (this.charSprite.anims.currentAnim) {
        //     if (this.charSprite.anims.currentAnim.key.charAt(0) === 'r') {
        //         this.charSprite.setY(360 + 10*Math.sin(time/500));
        //     } else {
        //         this.charSprite.setY(360);
        //     }
        // }

        // this.charSprite.update(time, delta);
        // this.editor.update(time, delta);
        // this.dialogue.update(time, delta);
    }
}


// function createDialogueData(object): DialogueData {

//     let words: WordData[] = [];

//     for (let text of object.text.split(' ')) {
//         words.push({
//             text,
//             emphasis: 0,
//             fontSize: FONT_REG,
//             oy: 0
//         });
//     }

//     return {
//         words,
//         color: object.color || 0xffffff,
//         x: 650 - (object.text.length*12),
//         y: 50
//     };
// }