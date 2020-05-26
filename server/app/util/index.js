var bcrypt = require("bcryptjs");
const encryptData = ( input, len) => {
    return bcrypt.hashSync(input, len)
}
module.exports = {
    encryptData
};