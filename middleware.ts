// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/shared/auth/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. On protège tout ce qui commence par /admin, sauf le login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await auth();

    // Redirection si non connecté
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Vérification du rôle (on suppose que tu as un rôle 'ADMIN')
    // Ajuste 'ADMIN' selon la valeur exacte en base de données
    if (session.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url)); // On renvoie les intrus à l'accueil
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};