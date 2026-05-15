import React from "react";
import { motion } from "framer-motion";

export default function RollingText({
  words = ["INSIGHT"],
  duration = 0.9,
  stagger = 0.16,
}) {
  const text = words?.[0] || "INSIGHT";

  return (
    <div className="overflow-hidden inline-flex text-secondary font-black">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{
            y: "120%",
            rotateX: 90,
            filter: "blur(8px)",
            opacity: 0.3,
          }}
          animate={{
            y: "0%",
            rotateX: 0,
            filter: "blur(0px)",
            opacity: 1,
          }}
          transition={{
            duration,
            delay: index * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block whitespace-pre"
          style={{
            transformOrigin: "bottom",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}