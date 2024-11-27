import {SignJWT, jwtVerify} from 'jose'

// secret
const secretKey = process.env.SECRETE_KEY 
const encodedKey = new TextEncoder().encode(secretKey);

// encrypt
export async function encrypt(payload: any){
    console.log(payload)
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10s")
      .sign(encodedKey);
}