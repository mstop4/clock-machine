import { pointLineDist, angleDifference } from '../helpers/geometry'; 

const clickRadius = 32;
const lightRadius = 310;
const labelRadius = 345;
const numLights = 46;
const numHands = 3;
const handPointingThreshold = 3;

export class objClock {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.createLights();
    this.createHands();
    this.createInputHandlers();
  }

  createLights = () => {
    this.game.anims.create({
      key: 'flash',
      frames: [
        { key: 'lightOff' },
        { key: 'lightOn' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.lightStates = [];
    this.lightTimers = [];
    this.lightLabels = [];
    this.lightShutoffTime = 30;
    this.lights = this.game.add.group();

    for (let i=0; i<numLights; i++) {
      const _rad = (90-i*360/numLights) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * lightRadius;
      const _offset_y = -Math.sin(_rad) * lightRadius;

      const _light = this.lights.create(this.x + _offset_x, this.y + _offset_y, 'lightOff');
      _light.angle = i*360/numLights;
      this.lightStates[i] = 0;
      this.lightTimers[i] = -1;
    }

    setTimeout(() => {
      this.toggleLight(1, 1);
      this.lightTimers[0] = this.lightShutoffTime;
    }, 1000);
  }

  createHands = () => {
    this.handSelected = -1;
    this.handAngles = [0, 90, 180];
    this.hands = [];

    for (var i=0; i<numHands; i++) {
      this.hands[i] = this.game.add.image(this.x, this.y, 'hand');
      this.hands[i].setOrigin((40-25)/300, 0.5);
      this.hands[i].angle = this.handAngles[i];
    }

    this.game.add.image(this.x, this.y, 'cap');
    this.game.children.bringToTop(this.hands[numHands-1]);
  }

  createLabels = () => {
    for (let i=0; i<numLights; i++) {
      const _rad = (90-i*360/numLights) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * labelRadius;
      const _offset_y = -Math.sin(_rad) * labelRadius;
      let _text;

      switch (i) {
      case 0:
        _text = 'II';
        break;
      case 1:
        _text = 'III';
        break;
      case 45:
        _text = 'I';
        break;
      default:
        _text = i-1;
      }

      this.lightLabels[i] = this.game.add.text(this.x + _offset_x, this.y + _offset_y, _text, {
        fontFamily: 'Amarante',
        fontSize: '20px', 
        fill: '#000'
      });
      this.lightLabels[i].setOrigin(0.5, 0.5).setAngle(i*360/numLights);
    }
  }

  createInputHandlers = () => {
    this.game.input.on('pointerdown', (pointer) => {
      // Find and select closest hand
      const _handsDist = [];

      for (var i=0; i<numHands; i++) {
        const _endX = this.x + Math.cos(this.hands[i].angle * (Math.PI / 180)) * 360;
        const _endY = this.y + Math.sin(this.hands[i].angle * (Math.PI / 180)) * 360;
        _handsDist[i] = pointLineDist(this.x, this.y, _endX, _endY, pointer.x, pointer.y);
      }

      const _minDist = Math.min(..._handsDist);

      if (_minDist <= clickRadius) {
        this.handSelected = _handsDist.indexOf(_minDist);
      }
      else {
        this.handSelected = -1;
      }
    });

    this.game.input.on('pointerup', () => {
      this.handSelected = -1;
    });

    this.game.input.on('pointermove', (pointer) => {
      if (this.handSelected > -1) {
        this.handAngles[this.handSelected] = Math.atan2(pointer.y - this.y, pointer.x - this.x) * (180 / Math.PI);
        this.hands[this.handSelected].angle = this.handAngles[this.handSelected];
      }
    });
  }

  toggleLight = (index, state) => {
    console.log(`Toggle ${index} to state ${state}`);
    if (state === 0) {
      this.lights.getFirstNth(index, true).setTexture('lightOff');
    }
    else if (state === 1) {
      this.lights.getFirstNth(index, true).setTexture('lightOn');
    }
    else if (state === 2) {
      this.lights.getFirstNth(index, true).play('flash', true);
    }
  }

  checkHands = () => {
    for (let i=0; i<numLights; i++) {
      const _curAngle = (90-i*360/numLights);

      for (let j=0; j<numHands; j++) {
        if (Math.abs(angleDifference(-this.handAngles[j], _curAngle)) <= handPointingThreshold) {
          this.lightTimers[i]--;

          if (this.lightTimers[i] === 0) {
            this.lightTimers[i] = -1;
            this.toggleLight(i+1, 0);
          }
          break;
        }
      }
    }
  }
}