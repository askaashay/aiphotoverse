import { useState } from "react";
import { Check, ImageOff, X } from "lucide-react";
import { motion } from "motion/react";
import { STYLES, Style } from "../constants";
import { cn } from "../lib/utils";

interface StyleSelectionProps {
  photo: string;
  onGenerate: (selectedStyles: Style[]) => void;
  onCancel: () => void;
}

export function StyleSelection({ photo, onGenerate, onCancel }: StyleSelectionProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleStyle = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : prev.length < 4 
          ? [...prev, id] 
          : prev
    );
  };

  const categories = Array.from(new Set(STYLES.map(s => s.category || "General")));
  const currentSelectedStyles = STYLES.filter(s => selectedIds.includes(s.id));

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 shrink-0 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-accent-blue rounded-full shadow-[0_0_10px_#00F0FF]" />
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase">AI Photoverse</h1>
        </div>
        <div className="flex items-center gap-8 text-sm">
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Active session</p>
            <p className="text-xs font-mono text-accent-blue uppercase tracking-wider">
              {selectedIds.length} / 4 Selected
            </p>
          </div>
          <button 
            onClick={onCancel}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <section className="w-[340px] hidden lg:flex flex-col gap-6 p-10 border-r border-white/5 shrink-0 bg-white/[0.01]">
          <div>
            <p className="text-[12px] font-bold text-accent-blue mb-1 uppercase tracking-tighter italic">PHASE 03</p>
            <h2 className="text-5xl font-black leading-none mb-4 italic uppercase tracking-tighter">
              Select<br/><span className="text-accent-blue">4 Styles</span>
            </h2>
            <p className="text-white/60 text-[11px] leading-relaxed uppercase tracking-[0.2em] font-bold">
              PLEASE CHOOSE <span className="text-white underline decoration-accent-blue underline-offset-4">UP TO 4</span> UNIQUE ARTISTIC DIMENSIONS TO TRANSFORM YOUR PORTRAIT.
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Input Subject</p>
            <div className="w-full aspect-[4/5] bg-white/[0.02] border border-white/10 relative overflow-hidden rounded-2xl group">
              <img src={photo} alt="Original" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-md text-[10px] font-mono border border-white/10 italic text-accent-blue">
                RAW_00{Math.floor(Math.random() * 9 + 1)}.BUFF
              </div>
            </div>
          </div>
        </section>

        {/* Style Grid */}
        <section className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-16 pb-32">
            {/* Mobile/Tablet Heading */}
            <div className="lg:hidden mb-12">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
                Select <span className="text-accent-blue">4 Styles</span>
              </h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                Choose up to 4 artistic dimensions
              </p>
            </div>

            {categories.map(category => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 italic">{category}</h3>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {STYLES.filter(s => s.category === category).map((style) => {
                    const isSelected = selectedIds.includes(style.id);
                    const isDisabled = !isSelected && selectedIds.length >= 4;

                    return (
                      <motion.div
                        key={style.id}
                        whileHover={!isDisabled ? { scale: 1.02, y: -4 } : {}}
                        whileTap={!isDisabled ? { scale: 0.98 } : {}}
                        onClick={() => !isDisabled && toggleStyle(style.id)}
                        className={cn(
                          "group relative aspect-[4/3] bg-white/[0.02] border transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl",
                          isSelected 
                            ? "border-accent-blue ring-1 ring-accent-blue/50" 
                            : "border-white/5 hover:border-white/20",
                          isDisabled && "opacity-10 grayscale"
                        )}
                      >
                        <StyleThumbnail 
                          src={style.thumbnail} 
                          name={style.name} 
                          isSelected={isSelected} 
                        />
                        
                        {/* Overlay */}
                        <div className={cn(
                          "absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity",
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}>
                          <p className="text-[8px] font-mono text-accent-blue mb-1 uppercase tracking-widest">STYLE_{style.id.toUpperCase().slice(0, 8)}</p>
                          <h4 className="font-bold uppercase tracking-tighter italic text-sm">{style.name}</h4>
                        </div>

                        {/* Selection Mark */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-4 h-4 text-black stroke-[4]" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-24 bg-white text-black px-6 md:px-10 flex items-center justify-between shrink-0 z-20">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Current Selection</span>
          <span className="text-3xl font-black italic uppercase tracking-tighter leading-none">
            {selectedIds.length} <span className="opacity-20">/</span> 4 Selected
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={onCancel}
            className="hidden md:block text-xs uppercase font-black tracking-widest border-b-2 border-black/10 hover:border-black pb-1 transition-all"
          >
            Back to Capture
          </button>
          <button
            disabled={selectedIds.length === 0}
            onClick={() => onGenerate(currentSelectedStyles)}
            className="bg-black text-white px-8 md:px-12 py-4 font-black uppercase italic text-lg hover:bg-neutral-800 tracking-tighter transition-all disabled:opacity-10 disabled:cursor-not-allowed group flex items-center gap-3"
          >
            Generate Collage
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

function StyleThumbnail({ src, name, isSelected }: { src: string; name: string; isSelected: boolean }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-white/[0.05] flex flex-col items-center justify-center gap-2 p-4 text-center">
        <ImageOff className="w-8 h-8 text-white/20" />
        <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">{name}</p>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={name} 
      onError={() => setError(true)}
      className={cn(
        "w-full h-full object-cover transition-transform duration-700",
        isSelected ? "scale-110 blur-[1px]" : ""
      )}
    />
  );
}
