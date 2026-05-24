import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface CaptureViewProps {
  deviceId: string;
  onCapture: (base64: string) => void;
}

export function CaptureView({ deviceId, onCapture }: CaptureViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            deviceId: { exact: deviceId },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [deviceId]);

  const handleCapture = () => {
    if (!videoRef.current || countdown !== null) return;
    
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      // Small delay to let the UI clear before capture
      const timer = setTimeout(() => {
        executeCapture();
        setCountdown(null);
      }, 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const executeCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1); // Flip horizontally for "mirror" effect
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      onCapture(dataUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center font-mono">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="fixed inset-0 w-full h-full object-cover scale-x-[-1] opacity-70"
      />
      
      {/* HUD Overlays */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-20">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-accent-blue text-xs font-bold uppercase tracking-[0.2em]">Live Stream</span>
            </div>
            <p className="text-white/40 text-[10px]">DEVICE_ADDR: {deviceId.slice(0, 16).toUpperCase()}</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Aura Sync</p>
            <p className="text-xs font-bold text-accent-blue">CALIBRATED</p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-[10px] text-white/20 space-y-1">
            <p>ISO: 100 | S: 1/125 | F: 2.8</p>
            <p>© 2026 AI_PHOTOVERSE.OS</p>
          </div>
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-accent-blue"
            />
          </div>
        </div>
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
          <motion.div
            key={countdown}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-[200px] font-black italic text-accent-blue drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            {countdown === 0 ? "SMILE!" : countdown}
          </motion.div>
        </div>
      )}

      {/* Frame Brackets */}
      <div className="absolute inset-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-accent-blue/40" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-accent-blue/40" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-accent-blue/40" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent-blue/40" />
        
        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white" />
        </div>
      </div>

      {/* Shutter Button Container */}
      <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-6 z-30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCapture}
          disabled={!isReady || countdown !== null}
          className={cn(
            "relative w-24 h-24 rounded-full flex items-center justify-center group",
            countdown !== null && "opacity-50"
          )}
        >
          <div className="absolute inset-0 rounded-full border border-white/20 scale-150 group-hover:scale-175 transition-all duration-500 opacity-20" />
          <div className="absolute inset-0 rounded-full border-2 border-accent-blue animate-ping opacity-10" />
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            {countdown !== null ? (
              <span className="text-3xl font-black text-black italic">{countdown}</span>
            ) : (
              <Camera className="w-10 h-10 text-black" />
            )}
          </div>
        </motion.button>
        <span className="text-white font-black italic text-sm tracking-[0.4em] uppercase opacity-60">
          {countdown !== null ? `Wait ${countdown}s...` : "Capture Moment"}
        </span>
      </div>
    </div>
  );
}
