import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, themes, version } from '../gameConfig';
import { setupButton } from '../helpers/button';
import objSteam from '../objects/objSimpleSteam';

const startTransitionTime = 1000;
const subMenuTransitionTime = 500;
const musicTrack = 'musTitle';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnTitle');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#687D64');
    this.canClick = false;
    this.sceneOver = false;
    this.AM = this.game.audioManager;

    this.steam = new objSteam(this);
    this.steam.startSteam();
    this.steam.setIntensity(0.5, true);
    this.bgmVolume = 1;

    if (!this.AM.trackList[musicTrack].isPlaying) {
      this.AM.playMusic(musicTrack, true);
      this.AM.setVolume(musicTrack, this.bgmVolume);
    }

    this.add.text(appCenter.x, appHeight * 0.25, 'Worker #11812', {
      fontFamily: 'Fondamento',
      fontSize: '128px', 
      fill: themes.light.textColour
    }).setOrigin(0.5, 0.5);

    const _start = this.add.text(appCenter.x, appHeight * 0.6, 'Begin', {
      fontFamily: 'Fondamento',
      fontSize: '56px', 
      fill: themes.light.linkColour
    });

    const _howToPlay = this.add.text(appWidth * 0.325, appHeight * 0.75, 'How to Operate', {
      fontFamily: 'Fondamento',
      fontSize: '56px', 
      fill: themes.light.linkColour
    });

    const _credits = this.add.text(appWidth * 0.675, appHeight * 0.75, 'Credits', {
      fontFamily: 'Fondamento',
      fontSize: '56px', 
      fill: themes.light.linkColour
    });

    this.add.text(appWidth, appHeight, `v.${version}`, {
      fontFamily: 'Fondamento',
      fontSize: '24px', 
      fill: themes.light.textColour
    }).setOrigin(1,1);

    setupButton(_start, () => {
      if (this.canClick) {
        this.sceneOver = true;
        this.canClick = false;
        this.cameras.main.fadeOut(startTransitionTime, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnMain');
        }, startTransitionTime * 1.25);
      }
    }, themes.light.linkColour, themes.light.hoverColour);

    setupButton(_howToPlay, () => {
      if (this.canClick) {
        this.canClick = false;
        this.cameras.main.fadeOut(subMenuTransitionTime, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnHowToPlay');
        }, subMenuTransitionTime * 1.5);
      }
    }, themes.light.linkColour, themes.light.hoverColour);

    setupButton(_credits, () => {
      if (this.canClick) {
        this.canClick = false;
        this.cameras.main.fadeOut(subMenuTransitionTime, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnCredits');
        }, subMenuTransitionTime * 1.5);
      }
    }, themes.light.linkColour, themes.light.hoverColour);

    this.cameras.main.fadeIn(startTransitionTime, 0, 0, 0);
    setTimeout(() => {
      this.canClick = true;
    }, startTransitionTime * 1.25);
  }

  update = () => {
    this.steam.update();

    if (this.sceneOver) {
      if (this.bgmVolume > 0) {
        this.AM.setVolume(musicTrack, this.bgmVolume);
        this.bgmVolume = Math.max(0, this.bgmVolume - 1/60);
      }
    }
  }

  destroy = () => {
    if (this.sceneOver) {
      this.AM.stopMusic(musicTrack);
    }
    this.steam = null;
  }
}