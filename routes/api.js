'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.use((req,res,next)=>{
    console.log('req.query.input',req.query.input);
    next();
  });

  app.route('/api/convert')
    .get(function(req, res) {
      let input = req.query.input;
      let initNum;
      let invalidNum = false;
      try {
        initNum = convertHandler.getNum(input);
      } catch (err) {
        invalidNum = true;
      }
      let initUnit;
      let invalidUnit = false;
      try {
        initUnit = convertHandler.getUnit(input);
      } catch (err) {
        invalidUnit = true;
      }
      if (invalidNum && invalidUnit) res.end('invalid number and unit');
      else if (invalidNum) res.end('invalid number');
      else if (invalidUnit) res.end('invalid unit');
      else {
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        console.log(toString);
        res.json({ initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString });
      }
    });
};
