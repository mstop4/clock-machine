import Stats from 'stats.js';

const displayStats = () => {
  const stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  const animate = () => {
    stats.begin();
    stats.end();
    requestAnimationFrame( animate );
  };

  requestAnimationFrame( animate );
};

module.exports = {
  displayStats
};