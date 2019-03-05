import '@babel/polyfill';

import path from 'path';
import hjson from 'hjson';
import Config from 'merge-config';

import dotenv from 'dotenv';
dotenv.config();

describe('Config Tests', function() {

  // it('should merge the Config from a directory', function() {
  //   var dirPath = path.join(__dirname + '/../../src', process.env.DEFAULT_CONFIGS_PATH);
  //   var config = new Config();
  //   config.file(dirPath);
  //   expect(config.get()).to.be.deep.equal({
  //     defaults: {
  //       port: 8080,
  //       hotelbook_params: {
  //         area_mapping: {
  //           KRK: 'Krakow',
  //           MSK: 'Moscow',
  //           CHB: 'Челябинск'
  //         }
  //       },
  //       logging: 'debug'
  //     }
  //   });
  // });

});
