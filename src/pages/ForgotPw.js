import ForgotPW from "../components/Forgotpw";
import Header from "../components/Header";
import { motion } from "framer-motion";

export default function ForgotPw() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="max-w-xs mx-auto"
    >
      <Header
        heading="Forgot Password?"
        paragraph="Don't have an account yet?"
        linkName="Signup"
        linkUrl="/auth/signup"
      />
      <ForgotPW />
    </motion.div>
  );
}
