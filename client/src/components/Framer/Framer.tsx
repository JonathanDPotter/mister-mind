import { motion } from "framer-motion";
import React, { FC } from "react";

interface Iprops {
  Component: React.ReactNode;
}

const Framer: FC<Iprops> = ({ Component }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeIn" }}
    >
      <>{Component}</>
    </motion.div>
  );
};

export default Framer;
