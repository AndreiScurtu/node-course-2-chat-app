const expect = require('expect'),
      
      { generateMessage, generateLocationMessage } = require('./message');


describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        
        const from = 'Jen',
              text = 'Some message',
              message = generateMessage(from, text);
              
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Deb',
              lat = 15,
              long = 19,
              url = 'https://www.google.com/maps?q=15,19';
              message = generateLocationMessage(from, lat, long);        
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, url });        
    });
});
