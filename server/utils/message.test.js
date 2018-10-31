const expect = require('expect'),
      
      { generateMessage } = require('./message');


describe('generateMessage', () => {
    
    it('should generate the correct message object', () => {
        
        const from = 'Jen',
              text = 'Some message',
              message = generateMessage(from, text);
              
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    });

});
