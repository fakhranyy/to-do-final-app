import * as bcrypt from 'bcrypt';

export  function encodePassword(plainPassword: string){
    const SALT = bcrypt.genSaltSync(); //  generate salt code
    return bcrypt.hashSync(plainPassword,10); // use salt to hashing password
}

export function comparePasswords(plainPassword: string, hash: string){ 
    // compare the hashingPassword with plainPassword to make sure they're the same password
    return bcrypt.compareSync(plainPassword, hash)
}