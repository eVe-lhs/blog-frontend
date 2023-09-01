export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
}) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="font-body group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary_assent mt-10"
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
