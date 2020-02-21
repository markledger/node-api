
class LoginError extends Error {
    constructor(args){
        super(args);
        this.name = "LoginError"
    }
}


module.exports = LoginError;