import * as bcrypt from 'bcrypt';

export  function encodePassword(plainPassword: string){
    const SALT = bcrypt.genSaltSync(); // step no 1 generate salt code
    return bcrypt.hashSync(plainPassword,SALT); // step no 2 use salt to hashing password
}

export function comparePasswords(plainPassword: string, hash: string){
    return bcrypt.compareSync(plainPassword, hash)
}