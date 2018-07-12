var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        // assertions
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text});
        // store res in variable
        // assert from watch
        // assert text match
        // assert createdAt is number
    });
});