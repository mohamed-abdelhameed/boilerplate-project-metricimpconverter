/*
*
*
*       Complete the handler logic below
*       
*       
*/

const UNITS = new Map([['gal','L']
                      ,['l','gal']
                      ,['mi','km']
                      ,['km','mi']
                      ,['lbs','kg']
                      ,['kg','lbs']]);

const CONVERSIONS = new Map([['gal',1/3.78541]
                      ,['l',3.78541]
                      ,['mi',1/1.60934]
                      ,['km',1.60934]
                      ,['lbs',1/0.453592]
                      ,['kg',0.453592]]);

const SPELLS = new Map([['gal','gallons']
                      ,['l','liters']
                      ,['mi','miles']
                      ,['km','kilometers']
                      ,['lbs','pounds']
                      ,['kg','kilograms']]);

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let firstLetter = input.match(/[a-z]/i).index;
    if(firstLetter===0) return 1;
    let fractions = input.match(/\//g);
    if(fractions && fractions.length>1) throw new Error('invalid number');
    result = eval(input.substr(0,firstLetter));
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-z]/ig).join('').toLowerCase();
    if (!UNITS.has(result)) throw new Error('invalid unit');
    if (result==='l') result='L';
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    return UNITS.get(initUnit.toLowerCase());
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    result = initNum*CONVERSIONS.get((this.getReturnUnit(initUnit)).toLowerCase());
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${SPELLS.get(initUnit.toLowerCase())} converts to ${returnNum.toFixed(5)} ${SPELLS.get(returnUnit.toLowerCase())}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
