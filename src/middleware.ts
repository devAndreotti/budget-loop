import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Aplica o middleware a todas as rotas
};
