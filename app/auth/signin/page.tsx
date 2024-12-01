"use client"
import { useEffect, useState } from "react";

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    // 获取csrfToken
    const fetchCsrfToken = async () => {
      const response = await fetch("http://localhost:3000/api/auth/csrf");
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    
    fetchCsrfToken();
  }, []);

  // 如果 csrfToken 还未加载完毕，返回 null 或者加载中状态
  if (!csrfToken) {
    return <div></div>;
  }

  return (
    <form method="post" action="/api/auth/callback/credentials" className="py-5 h-[80vh] flex flex-col justify-center items-center">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <label>
        <span>Username: </span>
        <input name="username" className="h-10 w-60 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1" type="text" />
      </label>
      <label className="my-5">
        <span>Password: </span>
        <input name="password" className="h-10 w-60 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-black block rounded-md sm:text-sm focus:ring-1" type="password" />
      </label>
      <button className="h-10 rounded-md text-white bg-black px-8 font-semibold dark:bg-white dark:text-black" type="submit">Sign in</button>
    </form>
  );
}
