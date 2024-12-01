import { signIn, signOut, auth } from "auth";
import github from "next-auth/providers/github";
import { FC, ButtonHTMLAttributes } from "react";
import { Session } from "next-auth";
import Image from "next/image";

interface SignInProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: typeof github; // 指定 `provider` 类型
}

const SignIn: FC<SignInProps> = ({ provider, ...props }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(); // `signIn` expects `provider.id`
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
};

const SignOut: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  );
};

export const Header: FC = async () => {
  const session: Session | null = await auth(); // Specify the session type
  return (
    <div className="flex flex-row justify-end items-center h-[7vh] pr-2 bg-white w-full border-solid border-b-[1px] border-#f1f5f9 bg-#f8fafc">
      {session?.user ? <div className="flex flex-row items-center">
            {session?.user.image ? <Image alt={session?.user.name || "user"} src={session?.user.image} width={30} height={30} className="mr-4 rounded-full"></Image> : <div className="mr-2 text-#cbd5e1">{session?.user.name}</div>}
            <SignOut className="rounded-md text-white bg-black p-2  font-semibold dark:bg-white dark:text-black" />
        </div> : <SignIn className="rounded-md text-white bg-black p-2 font-semibold dark:bg-white dark:text-black" provider={github} />}
    </div>
  );
};
