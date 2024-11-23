import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export const SaveButton = ({
  formAction,
}: {
  formAction: (formData: FormData) => void;
}) => {
  const { pending } = useFormStatus();
  const t = useTranslations("Basic");
  return (
    <button
      type="submit"
      role="menuitem"
      disabled={pending}
      formAction={formAction}
      className="h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black"
    >
      {pending ? t("saving") : t("done")}
    </button>
  );
};
