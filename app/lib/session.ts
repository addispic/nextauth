import {SignJWT, jwtVerify} from 'jose'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

// secret
const secretKey = process.env.SECRETE_KEY 
const encodedKey = new TextEncoder().encode(secretKey);

// encrypt
export async function encrypt(payload: any){
    console.log(payload)
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10s from now")
      .sign(encodedKey);
}

// decrypt
export async function decrypt(input: string): Promise<any> {
  const {payload} = await jwtVerify(input,encodedKey,{
    algorithms: ["HS256"],
  })
  return payload
}

// get session
export async function getSession(){
  const session = (await cookies()).get("session")?.value 
  if(!session){
    return
  }
  return await decrypt(session)
}

// update session
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value 
  if(!session) {
    return
  }

  // refresh token
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)

  const res = NextResponse.next()

  // update
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    expires: parsed.expires,
    httpOnly: true,
  })

  return res
}