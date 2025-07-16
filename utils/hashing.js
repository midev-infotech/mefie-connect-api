import { hash, compare } from "bcryptjs";

export const doHash = (value, salt) => {
    const result = hash(value, salt);
    return result;
}

export const hashValidation = (value, hashed) => {
    const result = compare(value, hashed);
    return result;
}