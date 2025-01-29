"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function logout(){
    (await cookies()).delete('CASHTRACKR_TOKEN')
    redirect('/auth/login')
}