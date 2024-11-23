import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config'

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) || ''
    if (!locales.includes(locale)) notFound();

    return {
        messages: (await import(`./messages/${locale}.json`)).default
    };
});