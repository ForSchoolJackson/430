const message = "hello other file";

const getMessage = () => {
    console.log(message);
    return message;
};


const duh = () => { };
module.exports = { duh, getMessage }

//or   module.exports.getMessage = getMessage;