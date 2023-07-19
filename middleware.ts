import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getUserDetails } from './src/api/auth/signin';
 

export async function middleware(request: NextRequest) {
const cookieStore =  request.cookies;
const auth_token = cookieStore.get('auth_token')

  if(!auth_token){
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}
 
export const config = {
  matcher: ['/logged-in'],
}