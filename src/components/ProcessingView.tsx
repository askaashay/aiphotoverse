import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const MESSAGES = [
  "AI is painting your universe...",
  "Capturing starlight pixels...",
  "Applying galactic brushstrokes...",
  "Mapping aesthetic dimensions...",
  "Synthesizing creative matter...",
  "Finalizing your multiverse collage..."
];

export function ProcessingView() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8 text-center font-mono">
      <div className="relative w-48 h-48 mb-12">
        {/* Animated Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-accent-blue/30 shadow-[0_0_20px_#00F0FF]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-6 rounded-full border border-white/10"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sparkles className="w-16 h-16 text-accent-blue" />
        </motion.div>
      </div>

      <motion.div
        key={msgIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-4"
      >
        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white max-w-lg">
          {MESSAGES[msgIdx]}
        </h3>
        <p className="text-accent-blue text-xs font-bold uppercase tracking-[0.4em]">
          Synthesizing Neural Dimensions
        </p>
      </motion.div>

      {/* Progress Line */}
      <div className="mt-16 w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/2 h-full bg-accent-blue shadow-[0_0_15px_#00F0FF]"
        />
      </div>
    </div>
  );
}
