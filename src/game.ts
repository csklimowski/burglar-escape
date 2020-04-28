import { MainScene } from './main';
import { LoadScene } from './load';
import { IntroScene, EndScene } from './gn';

const game = new Phaser.Game({
    width: 1280,
    height: 720,
    parent: 'game',
    scene: [
        LoadScene,
        MainScene,
        IntroScene,
        EndScene
    ],
    scale: {
        mode: Phaser.Scale.FIT
    }
});

export default game;