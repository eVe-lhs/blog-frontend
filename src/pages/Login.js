import Header from "../components/Header";
import Login from "../components/Login";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <motion.div animate = {{scale:1.1}}>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </motion.div>
  );
}
