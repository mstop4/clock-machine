import Phaser from 'phaser';
import GameScalePlugin from 'phaser-plugin-game-scale';
//import Stats from 'stats.js';

import scnLoading from './scenes/scnLoading';
import scnTitle from './scenes/scnTitle';
import scnHowToPlay from './scenes/scnHowToPlay';
import scnCredits from './scenes/scnCredits';
import scnMain from './scenes/scnMain';
import scnGameOver from './scenes/scnGameOver';
import * as gameConfig from './gameConfig.js';

const config = {
  type: Phaser.AUTO,
  scene: [
    scnLoading,
    scnTitle,
    scnHowToPlay,
    scnCredits,
    scnMain,
    scnGameOver
  ],
  height: gameConfig.appHeight,
  width: gameConfig.appWidth,
  plugins: {
    global: [{
      key: 'GameScalePlugin',
      plugin: GameScalePlugin,
      mapping: 'gameScale',
      data: {
        debounce: false,
        debounceDelay: 50,   // Debounce interval, in ms
        maxHeight: gameConfig.appHeight,
        maxWidth: gameConfig.appWidth,
        minHeight: 0,
        minWidth: 0,
        mode: 'fit',
        resizeCameras: true, // Resize each scene camera when resizing the game
        snap: null,          // Snap interval, in px
      }
    }]
  }
};

const game = new Phaser.Game(config);
game.global = {
  foo: 1
};

/*const stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const animate = () => {
  stats.begin();
  stats.end();
  requestAnimationFrame( animate );
};

requestAnimationFrame( animate );*/