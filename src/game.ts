import { MainScene } from './main';
import { LoadScene } from './load';

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
        MainScene
    ],
    scale: {
        mode: Phaser.Scale.FIT
    }
});

export default game;