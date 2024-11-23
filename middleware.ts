import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from './config'
import { NextRequest, NextResponse } from 'next/server';


const publicFile = /\.(.*)$/
const excludeFile = ['logo.svg']

function getLocale(request: NextRequest): string {
    const headers = { 'accept-language': request.headers.get('accept-language') || '' };
    console.log('accept-language', request.headers.get('accept-language')) // zh-CN,zh;q=0.9,en;q=0.8  指 zh-CN 权重为 1，zh 权重为 0.9，en 的权重为 0.8
    const languages = new Negotiator({ headers }).languages();
    console.log('languages', languages) // [ 'zh-CN', 'zh', 'en' ]
    // 结合 header 中的语言权重，匹配项目 config 中配置的语言，@formatjs/intl-localematcher 有一套匹配规则，最终返回命中的最符合的语言
    return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
    // 拿到即将跳转页面的 路径
    const { pathname } = request.nextUrl
    // 判断 路径 中是否有语言参数
    const pathHasLocals = locales.some(
        (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    // 如果有的话，直接跳转不做处理
    if (pathHasLocals) return

    // 如果是 public 文件，和 logo.svg 不重定向
    if (publicFile.test(pathname) && excludeFile.indexOf(pathname.substr(1)) == -1) return

    // 如果没有的话，手动拼接上 语言 路径参数
    const locale = getLocale(request)
    console.log('locale', locale)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // 默认语言不重定向
    if (locale == defaultLocale) {
        return NextResponse.rewrite(request.nextUrl)
    }
    // 重定向
    return NextResponse.redirect(request.nextUrl)
} 
// 中间件不作用的路径
// api: 排除所有以 /api 开头的路径，例如 /api/users。
// _next/static: 排除 Next.js 的静态资源路径。
// _next/image: 排除 Next.js 的图片优化路径。
// favicon.ico: 排除网站的 favicon 请求。
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}