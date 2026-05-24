import React, { useEffect, useState } from "react";
import { AlertTriangle, Download, Mail, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface SuccessViewProps {
  collageUrl: string;
  onReset: () => void;
}

export function SuccessView({ collageUrl, onReset }: SuccessViewProps) {
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = collageUrl;
    link.download = `photoverse-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCopying(true);
    
    const subject = encodeURIComponent("My AI Photoverse Collage");
    const body = encodeURIComponent(
      `Check out my stylized AI Photoverse collage! ✨\n\nGenerated at the AI Photoverse Booth.\n\n`
    );

    try {
      const item = new ClipboardItem({ 
        "image/png": fetch(collageUrl).then(r => r.blob()) 
      });
      await navigator.clipboard.write([item]);
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6 overflow-y-auto bg-black">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full flex flex-col items-center gap-10 relative z-10"
      >
        {/* Tagline */}
        <div className="text-center space-y-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent-blue font-black italic tracking-[0.4em] uppercase text-xs"
          >
            Processing Complete
          </motion.p>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            Your AI Masterpiece <span className="text-accent-blue">is here</span>
          </h1>
        </div>

        {/* Large Result Collage */}
        <div className="w-full relative group">
          <div className="absolute -inset-4 bg-accent-blue/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="relative w-full max-w-[800px] mx-auto bg-white/5 border border-white/10 shadow-2xl">
            <img 
              src={collageUrl} 
              alt="Final AI Collage" 
              className="w-full h-auto object-contain" 
            />
          </div>
        </div>

        {/* Highlighted Actions */}
        <div className="w-full max-w-[800px] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDownload}
              className="group relative h-24 bg-white text-black rounded-[2rem] flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative z-10 flex flex-col items-center">
                <Download className="w-6 h-6 mb-1" />
                <span className="font-black italic text-xl uppercase tracking-tighter">Download</span>
              </div>
            </button>

            <button
              onClick={() => setShowEmailInput(!showEmailInput)}
              className={cn(
                "group relative h-24 rounded-[2rem] flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-95 overflow-hidden border-2",
                showEmailInput ? "bg-accent-blue border-accent-blue text-black" : "bg-transparent border-white/20 text-white hover:border-accent-blue"
              )}
            >
              <div className="relative z-10 flex flex-col items-center">
                <Mail className="w-6 h-6 mb-1" />
                <span className="font-black italic text-xl uppercase tracking-tighter">Send via Email</span>
              </div>
            </button>
          </div>

          <AnimatePresence>
            {showEmailInput && (
              <motion.form
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                onSubmit={handleEmailSend}
                className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
              >
                <div className="space-y-4">
                  <p className="text-accent-blue text-[10px] font-black italic uppercase tracking-[0.2em] text-center">
                    Enter recipient email address
                  </p>
                  <div className="flex gap-2 p-2 bg-black/40 border border-white/10 rounded-2xl">
                    <input
                      type="email"
                      required
                      placeholder="customer@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none px-4 text-white font-mono placeholder:text-white/20"
                    />
                    <button
                      type="submit"
                      disabled={isCopying}
                      className="bg-accent-blue text-black px-8 py-4 rounded-xl font-black italic text-sm uppercase tracking-wider hover:opacity-90 disabled:opacity-50"
                    >
                      {isCopying ? "Copying..." : "Send Now"}
                    </button>
                  </div>
                  <p className="text-[10px] text-white/30 text-center italic">
                    Note: Your image is copied to clipboard automatically. Simply <span className="text-accent-blue">PASTE</span> it into the Gmail window.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer / Reset Instruction */}
        <div className="w-full max-w-md pt-12 mt-12 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Ready for another dimension?
          </p>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="group w-full h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 font-black italic text-sm uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white hover:border-accent-blue transition-all"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
            Finish & New Session
          </button>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-md w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 text-center relative overflow-hidden"
            >
              {/* Warning Icon Overlay */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-blue/20 blur-3xl" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent-blue/20">
                  <AlertTriangle className="w-10 h-10 text-accent-blue" />
                </div>

                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">
                  Start New Session?
                </h3>
                
                <p className="text-white/40 font-bold text-sm leading-relaxed uppercase tracking-widest mb-10">
                  Your current AI masterpiece will be cleared. Please <span className="text-white underline">Download</span> or <span className="text-white underline">Email</span> your photo before proceeding.
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={onReset}
                    className="h-16 bg-accent-blue text-black rounded-2xl font-black italic text-lg uppercase tracking-tighter transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(0,240,255,0.3)]"
                  >
                    Yes, Reset Session
                  </button>
                  
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="h-16 border border-white/10 text-white/60 rounded-2xl font-black italic text-lg uppercase tracking-tighter transition-all hover:bg-white/5"
                  >
                    Go Back
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowConfirmReset(false)}
                className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
