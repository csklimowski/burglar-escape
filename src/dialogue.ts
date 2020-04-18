
export interface DialogueData {
    words: WordData[];
    color: number;
    x: number;
    y: number;
}

export interface WordData {
    text: string;
    emphasis: number;
    oy: number;
    fontSize: number;
}


export class Dialogue {
    scene: Phaser.Scene;
    data: DialogueData;
    words: Phaser.GameObjects.BitmapText[] = [];
    wordIndex: number = 0;
    charIndex: number = 0;
    done: boolean = true;
    sfx: any;
    onFinish: () => void;

    constructor(scene: Phaser.Scene, onFinish: () => void, y?: number) {
        this.scene = scene;
        this.onFinish = onFinish;

        scene.time.addEvent({
            callback: this.updateText,
            callbackScope: this,
            loop: true,
            delay: 50
        });

        
        this.sfx = {
            tellen: scene.sound.add('tellen', {volume: 1.8}),
            rem: scene.sound.add('rem'),
            gloob: scene.sound.add('gloob'),
            clerk: scene.sound.add('clerk', {volume: 1.8}),
            cop: scene.sound.add('cop'),
            tellenQuiet: scene.sound.add('tellen-quiet', {volume: 1.8}),
            tellenLoud: scene.sound.add('tellen-loud', {volume: 1.8})
        };
    }

    destroy() {
        for (let word of this.words) {
            word.destroy();
        }
    }

    display(data: DialogueData) {
        for (let word of this.words) {
            word.destroy();
        }

        this.words = [];
        this.data = data;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.done = false;
    }

    update(time, delta) {
        
    }

    updateText() {
        if (this.done) return;

        let wi = this.wordIndex;
        let ci = this.charIndex;

        if (wi < this.data.words.length) {
            if (wi >= this.words.length) {
                let x;
                if (this.words.length) {
                    x = this.words[this.words.length - 1].x + this.words[this.words.length - 1].width + 20;
                } else {
                    x = this.data.x;
                }
                let bmWord = this.scene.add.bitmapText(x, this.data.y + this.data.words[wi].oy, 'outline', '', this.data.words[wi].fontSize);
                bmWord.setTint(this.data.color);
                this.words.push(bmWord);
            }
            if (ci < this.data.words[wi].text.length) {
                if (ci % 2 == 0 && this.data.words[wi].text[ci] !== '.') {
                    if (this.data.color === 0xff8888) this.sfx.clerk.play();
                    
                    if (this.data.color === 0x77ffff) this.sfx.rem.play();
                    if (this.data.color === 0x77ff77) this.sfx.gloob.play();
                    if (this.data.color === 0x7777ff) this.sfx.cop.play();
                    if (this.data.color === 0xffff66) {
                        if (this.data.words[wi].emphasis === 1)
                            this.sfx.tellenLoud.play();
                        else if (this.data.words[wi].emphasis === -1)
                            this.sfx.tellenQuiet.play();
                        else
                            this.sfx.tellen.play();
                    }
                }
                this.words[wi].setText(this.data.words[wi].text.substring(0, this.charIndex+1));
                this.charIndex += 1;
            } else {
                this.charIndex = 0;
                this.wordIndex += 1;
            }
        } else {
            this.done = true;
            this.scene.time.addEvent({
                delay: 800,
                callback: this.onFinish,
                callbackScope: this.scene
            });
        }
    }
}