import { useEffect, useRef, useState } from "react";
import { Camera, ChevronRight, RefreshCw, Settings, Key } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { saveApiKey, getApiKey } from "../lib/apiKeyStorage";

interface HardwareSetupProps {
  onStart: (deviceId: string) => void;
}

export function HardwareSetup({ onStart }: HardwareSetupProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>(getApiKey() || "");
  const [permissionError, setPermissionError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getDevices = async () => {
    try {
      setPermissionError(false);
      // We call getUserMedia once to ensure permissions are granted
      // which allows enumerateDevices to return the actual labels
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(device => device.kind === "videoinput");
      
      setDevices(videoDevices);
      
      // Only set default if none selected
      setSelectedDevice(prev => {
        if (prev && videoDevices.find(d => d.deviceId === prev)) return prev;
        return videoDevices.length > 0 ? videoDevices[0].deviceId : "";
      });

      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error("Error accessing camera list:", err);
      setPermissionError(true);
    }
  };

  useEffect(() => {
    getDevices();

    // Listen for hardware changes (like waking up an iPhone or plugging in a webcam)
    navigator.mediaDevices.addEventListener("devicechange", getDevices);
    return () => navigator.mediaDevices.removeEventListener("devicechange", getDevices);
  }, []);

  const refreshDevices = async () => {
    await getDevices();
  };

  useEffect(() => {
    if (!selectedDevice || !videoRef.current) return;

    let stream: MediaStream | null = null;

    async function startPreview() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDevice }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Preview error:", err);
      }
    }

    startPreview();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [selectedDevice]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-12 text-center"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-2">
            <Settings className="w-10 h-10 text-accent-blue" />
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">Booth Setup</h1>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Configure hardware modules</p>
          </div>
        </div>

        <div className="space-y-6 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/5">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full border border-accent-blue/20 flex items-center justify-center">
                 <Camera className="w-16 h-16 text-white/10" />
              </div>
            </div>
          </div>

          <div className="text-left space-y-3">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Input Source</label>
              <button 
                onClick={refreshDevices}
                className="text-[10px] font-bold uppercase tracking-widest text-accent-blue hover:text-white transition-colors flex items-center gap-1 group/scan"
              >
                <RefreshCw className="w-3 h-3 group-active/scan:rotate-180 transition-transform duration-500" />
                Scan for Hardware
              </button>
            </div>
            <div className="relative">
              {permissionError ? (
                <div className="flex flex-col gap-3">
                  <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-xs text-red-500 leading-relaxed">
                    Camera access was denied. Please allow camera permissions in your browser and click the button below.
                  </div>
                  <button
                    onClick={refreshDevices}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Request Access Again
                  </button>
                </div>
              ) : (
                <>
                  <select
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all text-sm font-mono appearance-none text-[#F0F0F0]"
                  >
                    {devices.length === 0 && (
                      <option value="">Searching for hardware...</option>
                    )}
                    {devices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `LENS_${device.deviceId.slice(0, 5).toUpperCase()}`}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-accent-blue">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </>
              )}
            </div>
            
            {/* API Key Input */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Gemini API Key</label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your API key here..."
                  className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all text-sm font-mono text-[#F0F0F0] placeholder:text-white/10"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-accent-blue/30">
                  <Key className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[9px] text-white/20 italic px-1 leading-relaxed">
                Your key is stored locally in your browser and expires after 24 hours.
              </p>
            </div>
            
            {/* Continuity Camera Helper */}
            <p className="text-[9px] text-white/20 italic px-1 mt-2 leading-relaxed">
              <span className="text-accent-blue/50 not-italic font-black">TIP:</span> Using iPhone? Ensure Bluetooth and Wi-Fi are ON, and the device is nearby and unlocked. Click "Scan" to wake it up.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (apiKey) saveApiKey(apiKey);
            onStart(selectedDevice);
          }}
          disabled={!selectedDevice || !apiKey}
          className="group w-full bg-accent-blue text-black font-black italic uppercase tracking-wider py-5 px-6 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:cursor-not-allowed text-lg"
        >
          Initialize Booth
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
