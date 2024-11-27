"use server"
import {cookies} from 'next/headers'
// session
import { encrypt } from "../lib/session"
export async function signup(formData: FormData){
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    console.log({username,email,password})
    const expires = new Date(Date.now() + 10 * 1000)
    const session = await encrypt({username})
    ;(await cookies()).set("session",session,{expires,httpOnly: true})
}