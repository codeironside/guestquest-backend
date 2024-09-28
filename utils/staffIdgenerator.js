const crypto = require('crypto');

const generateStaffId = (name) => {
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex');
    return `${name.toUpperCase().substring(0, 3)}-${timestamp}-${random}`;
};
