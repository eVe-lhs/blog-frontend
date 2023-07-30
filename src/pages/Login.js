import Header from "../components/Header";
import Login from "../components/Login";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/auth/signup"
      />
      <Login />
    </motion.div>
  );
}
