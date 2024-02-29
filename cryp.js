const crypto = require('crypto');

// Generate a random string with a specified length
const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

// Example: Generate a random string with a length of 32 characters
const randomFlag = generateRandomString(32);

console.log(randomFlag);
