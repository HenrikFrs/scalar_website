import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mt-[12px] mr-1 text-3xl md:text-4xl font-medium">
      <span className="absolute opacity-[0.15]">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText = ({ text }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.75", "end 0.5"],
  });

  const words = text.split(" ");

  return (
    <p ref={container} className="flex flex-wrap leading-[0.5] p-4">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
