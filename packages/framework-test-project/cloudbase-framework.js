const path = require('path');
module.exports = {
  name: 'test',
  plugins: {
    website: {
      use: path.join(__dirname, '../framework-plugin-wx-landing'),
      inputs: {
        test: '1',
      },
    },
  },
};
