var simple = require('../simple.js');

describe('simple', () => {
    it('it doubles', () => {
        var x  = simple(5);
        expect(x).toEqual(10);
        //expect(element).toBeTruthy();
    });
});