import bcrypt from "bcryptjs";

export const passwordHashing = async (password: string): Promise<string | undefined> => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(password, 'this is original password');
        console.log(passwordHash, "this is has password");
        return passwordHash;
    } catch (error: any) {
        console.log(error.message);
    }
}



export const passwordCompare = async (inputPassword: string, dbPassword: string): Promise<boolean | undefined> => {
    try {
        const matchPassword = await bcrypt.compare(inputPassword, dbPassword);
        console.log(matchPassword, 'this match password');
        return matchPassword;
    } catch (error: any) {
        console.log(error.message);
    }
}