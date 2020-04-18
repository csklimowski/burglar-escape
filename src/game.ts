import { MainScene } from './main';
import { LoadScene } from './load';

const game = new Phaser.Game({
    width: 1280,
    height: 720,
    parent: 'game',
    scene: [
        LoadScene,
        MainScene
    ],
    scale: {
        mode: Phaser.Scale.FIT
    }
});

export default game;