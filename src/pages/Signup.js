import Header from "../components/Header";
import Signup from "../components/Signup";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <motion.div animate={{scale:1.1}}>
      <Header
        heading="Create an Account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup />
    </motion.div>
  );
}
