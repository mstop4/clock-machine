import Phaser from 'phaser';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnLoading');
  }

  preload = () => {
    this.load.image('sprBack', 'assets/sprites/back.png');
    this.load.image('sprLightOff', 'assets/sprites/lightOff.png');
    this.load.image('sprLightOn', 'assets/sprites/lightOn.png');
    this.load.image('sprHand', 'assets/sprites/hand1.png');
    this.load.image('sprCap', 'assets/sprites/cap.png');
    this.load.image('sprMeterBack', 'assets/sprites/meter.png');
    this.load.image('sprMeterFront', 'assets/sprites/meter2.png');
    this.load.image('sprCloud', 'assets/sprites/cloud.png');
    this.load.bitmapFont('fntMetroNums', 'assets/fonts/digits.png', 'assets/fonts/digits.xml');

    this.load.audio('musMain', ['assets/audio/music/bgm.mp3']);

    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    
  }

  create = () => {
    WebFont.load({      //eslint-disable-line no-undef
      google: {
        families: ['Amarante', 'Fondamento']
      },

      active: () => {
        this.scene.start('scnTitle');
      }
    });
  }
}