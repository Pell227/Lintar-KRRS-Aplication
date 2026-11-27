"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

export default function AnimatedPrinter() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [openDialogAfterAnim, setOpenDialogAfterAnim] = useState(false);

  const handlePrint = () => {
    if (isPrinting) return;
    setOpenDialogAfterAnim(true);
    setIsPrinting(true);
  };

  const handleAnimationComplete = () => {
    setIsPrinting(false);
    if (openDialogAfterAnim) {
      setOpenDialogAfterAnim(false);
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      aria-label="Print document"
      className="relative flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-background shadow-sm transition-colors focus:outline-none hover:cursor-pointer"
    >
      <div className="relative flex flex-col items-center bg-background">
        <motion.div
          animate={isPrinting ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 0.2 }}
          className="relative z-10 dark:invert"
        >
          <Printer className="h-6 w-6" />
        </motion.div>

        <div className="absolute top-4 w-5 h-6 overflow-hidden pointer-events-none z-0">
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={
              isPrinting
                ? { y: ["-100%", "20%", "120%"], opacity: [0, 1, 0] }
                : { y: "-100%", opacity: 0 }
            }
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.6, 1],
            }}
            onAnimationComplete={handleAnimationComplete}
            className="w-4 h-5 mx-auto bg-slate-100 border border-slate-300 rounded-[1px] shadow-xs flex flex-col justify-evenly px-[2px] py-[3px]"
          >
            <div className="h-[1.5px] w-full bg-slate-400 rounded-full" />
            <div className="h-[1.5px] w-3/4 bg-slate-400 rounded-full" />
            <div className="h-[1.5px] w-1/2 bg-slate-400 rounded-full" />
          </motion.div>
        </div>
      </div>
    </button>
  );
}