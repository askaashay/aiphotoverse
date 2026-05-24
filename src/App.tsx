/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { HardwareSetup } from "./components/HardwareSetup";
import { CaptureView } from "./components/CaptureView";
import { StyleSelection } from "./components/StyleSelection";
import { ProcessingView } from "./components/ProcessingView";
import { SuccessView } from "./components/SuccessView";
import { Style } from "./constants";
import { generateCollage } from "./services/geminiService";

enum BoothState {
  HARDWARE_SETUP = "HARDWARE_SETUP",
  CAPTURE = "CAPTURE",
  STYLE_SELECTION = "STYLE_SELECTION",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS"
}

export default function App() {
  const [state, setState] = useState<BoothState>(BoothState.HARDWARE_SETUP);
  const [deviceId, setDeviceId] = useState<string>("");
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [collageUrl, setCollageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startBooth = (id: string) => {
    setDeviceId(id);
    setState(BoothState.CAPTURE);
  };

  const handleCapture = (photo: string) => {
    setOriginalPhoto(photo);
    setState(BoothState.STYLE_SELECTION);
  };

  const handleGenerate = async (selectedStyles: Style[]) => {
    if (!originalPhoto) return;

    setState(BoothState.PROCESSING);
    setError(null);

    try {
      // Single call to generate a collage with all selected styles
      const collage = await generateCollage(originalPhoto, selectedStyles);
      setCollageUrl(collage);
      setState(BoothState.SUCCESS);
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError("Failed to generate your multiverse. Please try again.");
      setState(BoothState.STYLE_SELECTION);
    }
  };

  const handleReset = () => {
    setOriginalPhoto(null);
    setCollageUrl(null);
    setState(BoothState.CAPTURE);
  };

  return (
    <div className="bg-bg-dark min-h-screen text-[#F0F0F0] font-sans selection:bg-accent-blue selection:text-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-accent-blue opacity-5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-accent-purple opacity-5 blur-[150px] rounded-full -ml-48 -mb-48 pointer-events-none" />

      <div className="relative z-10">
        {state === BoothState.HARDWARE_SETUP && (
          <HardwareSetup onStart={startBooth} />
        )}

        {state === BoothState.CAPTURE && (
          <CaptureView deviceId={deviceId} onCapture={handleCapture} />
        )}

        {state === BoothState.STYLE_SELECTION && originalPhoto && (
          <>
            {error && (
              <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce">
                {error}
              </div>
            )}
            <StyleSelection 
              photo={originalPhoto} 
              onGenerate={handleGenerate} 
              onCancel={() => setState(BoothState.CAPTURE)}
            />
          </>
        )}

        {state === BoothState.PROCESSING && <ProcessingView />}

        {state === BoothState.SUCCESS && collageUrl && (
          <SuccessView collageUrl={collageUrl} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

