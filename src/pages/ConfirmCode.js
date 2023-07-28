import Header from "../components/Header";
import { motion } from "framer-motion";
import Confirmcode from "../components/ConfirmCode";

export default function ConfirmCode() {
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
        heading="Confirm the Code"
        paragraph="Didn't receive the code?"
        linkName="Resend the code"
        linkUrl="/forgotpw"
      />
      <Confirmcode />
    </motion.div>
  );
}
