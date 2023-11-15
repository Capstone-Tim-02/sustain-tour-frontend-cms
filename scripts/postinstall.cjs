/* eslint-disable no-undef */
const fse = require('fs-extra');
const path = require('path');
const topDir = path.join(__dirname, '..');

fse.emptyDirSync(path.join(topDir, 'public', '/plugins/tinymce'));
fse.copySync(
  path.join(topDir, 'node_modules', 'tinymce'),
  path.join(topDir, 'public', '/plugins/tinymce'),
  {
    overwrite: true,
  }
);
