import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export const DeleteButton = ({
  formAction,
  isDraft,
}: {
  formAction: (formData: FormData) => void;
  isDraft: boolean;
}) => {
  const { pending } = useFormStatus();

  const t = useTranslations("Basic");
  return (
    !isDraft && (
        <button
          disabled={pending}
          formAction={formAction}
          role="menuitem"
          className="h-10 rounded-md text-white bg-[#ef4444] px-2 font-semibold ml-2"
        >
          {t("delete")}
        </button>
    )
  );
};
