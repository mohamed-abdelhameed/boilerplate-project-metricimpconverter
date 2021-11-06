const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input),3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '3/2L';
      assert.equal(convertHandler.getNum(input),3/2);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '5.6/2L';
      assert.equal(convertHandler.getNum(input),2.8);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '3/2/5L';
      try {
        convertHandler.getNum(input);
        assert.fail();
      } catch(err) {
        assert.equal(err.message,"invalid number");
      }
      // expect(()=>convertHandler.getNum(input)).to.throw('invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'L';
      assert.equal(convertHandler.getNum(input),1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        if (ele.toLowerCase()==='l')
          assert.equal(convertHandler.getUnit(ele),'L');
        else
          assert.equal(convertHandler.getUnit(ele),ele.toLowerCase());
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = 'g';
      try {
        convertHandler.getUnit(input);
        assert.fail();
      } catch(err) {
        assert.equal(err.message,"invalid unit");
      }
      // expect(()=>convertHandler.getUnit(input)).to.throw('invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = [5,'km',3.10686,'mi'];
      assert.equal(convertHandler.getString(...input),'5 kilometers converts to 3.10686 miles');
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(...input),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, 'l'];
      let expected = 1.3209;
      assert.approximately(convertHandler.convert(...input),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.0467;
      assert.approximately(convertHandler.convert(...input),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.1069;
      assert.approximately(convertHandler.convert(...input),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.2680;
      assert.approximately(convertHandler.convert(...input),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.0231;
      assert.approximately(convertHandler.convert(...input),expected,0.1); //0.1 tolerance
      done();
    });
    
  });
});