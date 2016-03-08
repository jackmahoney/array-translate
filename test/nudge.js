var expect = require('chai').expect;
var nudge = require('../src/nudge.js');

[[1,5,3],[4,8,6],[7,2,9]]

describe('translate rows and cols', function(){

    //use function so that array is fresh each time
    function getArray(){
        return [
            [1,2,3],
            [4,5,6],
            [7,8,9]
        ];
    }

    //columns
    it('it should nudge a column up', function(){
        var expected = [
            [1,5,3],
            [4,8,6],
            [7,2,9]
        ];
        var result = nudge.translateColumns(getArray(),1,1,-1);
        expect(result).to.deep.equal(expected);
    });

    it('it should nudge multiple columns up', function(){
        var expected = [
            [4,5,3],
            [7,8,6],
            [1,2,9]
        ];
        var result = nudge.translateColumns(getArray(),0,2,-1);
        expect(result).to.deep.equal(expected);
    });

    it('it should nudge columns down', function(){
        var expected = [
            [7,8,9],
            [1,2,3],
            [4,5,6]
        ];
        var result = nudge.translateColumns(getArray(),0,3,1);
        expect(result).to.deep.equal(expected);
    });

    it('it should nudge columns down', function(){
        var expected = [
            [7,8,9],
            [1,2,3],
            [4,5,6]
        ];
        var result = nudge.translateColumns(getArray(),0,3,1);
        expect(result).to.deep.equal(expected);
    });

    it('it should quietly handle distance exceeding array length', function(){
        var expected = [
            [4,5,6],
            [7,8,9],
            [1,2,3]
        ];
        var result = nudge.translateColumns(getArray(),0,5,-1);
        expect(result).to.deep.equal(expected);
    });

    //rows
    it('it should nudge a row left', function(){
        var expected = [
            [2,3,1],
            [4,5,6],
            [7,8,9]
        ];
        var result = nudge.translateRows(getArray(),0,1,-1);
        expect(result).to.deep.equal(expected);
    });

    it('it should nudge a row right', function(){
        var expected = [
            [3,1,2],
            [4,5,6],
            [7,8,9]
        ];
        var result = nudge.translateRows(getArray(),0,1,1);
        expect(result).to.deep.equal(expected);
    });

    it('it should nudge multiple rows', function(){
        var expected = [
            [2,3,1],
            [5,6,4],
            [7,8,9]
        ];
        var result = nudge.translateRows(getArray(),0,2,-1);
        expect(result).to.deep.equal(expected);
    });

    it('it should quitely handle lengths exceeding row length', function(){
        var expected = [
            [2,3,1],
            [5,6,4],
            [8,9,7]
        ];
        var result = nudge.translateRows(getArray(),0,4,-4);
        expect(result).to.deep.equal(expected);
    });

});

describe('translate array', function(){

    var arr = [0,1,2,3];

    it('it should return same array for no translateArray value', function(){
        var result = nudge.translateArray(arr);
        expect(result).to.deep.equal(arr);
    });

    it('it should translateArray left 1 for distance -1', function(){
        var result = nudge.translateArray(arr, -1);
        var expected = [1,2,3,0];
        expect(result).to.deep.equal(expected);
    });

    it('it should translateArray right 1 for distance 1', function(){
        var result = nudge.translateArray(arr, 1);
        var expected = [3,0,1,2];
        expect(result).to.deep.equal(expected);
    });

    it('it should translateArray left 1 for distance -1 less than modular length', function(){
        var result = nudge.translateArray(arr, -1 * (arr.length + 1));
        var expected = [1,2,3,0];
        expect(result).to.deep.equal(expected);
    });

    it('it should translateArray right 1 for distance 1', function(){
        var result = nudge.translateArray(arr, arr.length + 1);
        var expected = [3,0,1,2];
        expect(result).to.deep.equal(expected);
    });

});