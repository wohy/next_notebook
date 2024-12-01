// import createMiddleware from 'next-intl/middleware';
// import { locales, defaultLocale } from '@/config';
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from 'auth';

// const localeMiddleware = createMiddleware({
//     locales,
//     defaultLocale,
//     // 默认语言不重定向
//     localePrefix: 'as-needed'
// });

// export async function middleware(req: NextRequest): Promise<NextResponse> {

//     // 执行认证中间件
//     const session = await auth();
//     // 获取请求的路径
//     const { pathname } = req.nextUrl;

//     // 如果是需要认证的路径（如 /note/edit），且没有会话，返回 401
//     if (pathname.startsWith('/note/eidt') && session === null) {
//         return new NextResponse('Unauthorized', { status: 401 });
//     }

//     // 执行语言中间件
//     const localeResponse = localeMiddleware(req);
//     if (localeResponse) return localeResponse;  // 如果语言中间件返回响应（如重定向）
//     // 如果都没返回响应，继续请求
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };

export { auth as middleware } from "auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}