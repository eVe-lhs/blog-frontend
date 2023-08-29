import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10 font-header">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14"
          src="/favicon.ico"
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-primary hover:text-secondary"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
