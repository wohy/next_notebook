import { useFormStatus } from "react-dom";

export const SaveButton = ({
  formAction,
}: {
  formAction: (formData: FormData) => void;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      role="menuitem"
      disabled={pending}
      formAction={formAction}
      className="h-10 rounded-md text-white bg-black px-2 font-semibold dark:bg-white dark:text-black"
    >
      {pending ? "Saving" : "Done"}
    </button>
  );
};
