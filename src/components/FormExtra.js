import { Link } from "react-router-dom";

export default function FormExtra() {
  return (
    <div className="flex items-center justify-between font-body">
      

      <div className="text-sm">
        <Link
          to="/auth/forgotpw"
          className="font-medium text-primary hover:text-secondary"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
