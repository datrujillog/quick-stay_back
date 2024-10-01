import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


//para comparar la contraseña
export const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, receivedPassword);
};