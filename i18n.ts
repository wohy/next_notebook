import { notFound, redirect } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config'

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = (await requestLocale) || ''
    if (!locales.includes(locale)) {
        locale = 'zh'
    }

    return {
        messages: (await import(`./messages/${locale}.json`)).default
    };
});