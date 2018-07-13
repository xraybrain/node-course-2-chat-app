var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject none string values', () => {
        var str = 4;
        var res = isRealString(str);

        expect(res).toBe(false);
    })
    it('should reject string with only spaces', () => {
        var res = isRealString('    ');
        
        expect(res).toBe(false);
    })

    it('should allow strings with none space characters', () => {
        var str = 'L O T R';
        var res = isRealString(str);

        expect(res).toBe(true);
    });
})