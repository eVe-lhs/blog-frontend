import Header from "../components/Header";
import Signup from "../components/Signup";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 20
  }}
>
      <Header
        heading="Create an Account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/auth/login"
      />
      <Signup />
    </motion.div>
  );
}
