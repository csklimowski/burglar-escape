import { MainScene, EndScene } from './main';
import { LoadScene } from './load';
import { IntroScene } from './main';

// document.addEventListener("keydown", function (e) {
//     if (e.keyCode == 8) { // backspace
//         e.preventDefault()
//         // do whatever the backspace should do
//     }
// });


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