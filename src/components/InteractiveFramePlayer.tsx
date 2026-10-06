import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCw, Sparkles, Maximize2, Shield, Cpu, Activity, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  className?: string;
  isHero?: boolean;
  onFrameChange?: (index: number) => void;
}

const TOTAL_FRAMES = 192;

export const InteractiveFramePlayer: React.FC<Props> = ({
  className = '',
  isHero = false,
  onFrameChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [startFrame, setStartFrame] = useState<number>(1);
  const [isTouchHorizontal, setIsTouchHorizontal] = useState<boolean>(false);
  const [hudActive, setHudActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Helper to format frame path
  const getFramePath = (index: number) => {
    const padded = String(index).padStart(4, '0');
    return `/frames_webp/frame_${padded}.webp`;
  };

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    const priorityIndices = Array.from({ length: 30 }, (_, i) => i + 1);
    const remainingIndices = Array.from({ length: TOTAL_FRAMES - 30 }, (_, i) => i + 31);

    const loadIndex = (idx: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getFramePath(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[idx - 1] = img;
            count++;
            setLoadedCount(count);
          }
          resolve();
        };
        img.onerror = () => {
          const pngImg = new Image();
          const padded = String(idx).padStart(4, '0');
          pngImg.src = `/frames/frame_${padded}.png`;
          pngImg.onload = () => {
            if (!isCancelled) {
              imagesRef.current[idx - 1] = pngImg;
              count++;
              setLoadedCount(count);
            }
            resolve();
          };
          pngImg.onerror = () => resolve();
        };
      });
    };

    Promise.all(priorityIndices.map(loadIndex)).then(() => {
      let cur = 0;
      const batchSize = 8;
      const loadNextBatch = () => {
        if (isCancelled || cur >= remainingIndices.length) return;
        const batch = remainingIndices.slice(cur, cur + batchSize);
        cur += batchSize;
        Promise.all(batch.map(loadIndex)).then(() => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 25);
          }
        });
      };
      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame to canvas
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const normalizedIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIdx)));
    const img = imagesRef.current[normalizedIdx - 1];
    if (img && img.complete) {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);
    }
  }, []);

  // Resize canvas with mobile-optimized DPR cap
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      // Cap DPR to 1.5 on mobile to conserve memory and maintain smooth 60fps
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      renderFrame(currentFrame);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame, renderFrame]);

  // Smooth playback loop
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();
    const fps = 24 * playSpeed;
    const interval = 1000 / fps;

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        setCurrentFrame((prev) => {
          const next = prev >= TOTAL_FRAMES ? 1 : prev + 1;
          renderFrame(next);
          if (onFrameChange) onFrameChange(next);
          return next;
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playSpeed, renderFrame, onFrameChange]);

  // Direct Interactive Drag to Rotate on Canvas (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPlaying(false);
    setStartX(e.clientX);
    setStartFrame(currentFrame);
    sound.click();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const sensitivity = 0.5;
    const frameDelta = Math.floor(dx * sensitivity);
    let newFrame = ((startFrame + frameDelta - 1) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES + 1;
    if (newFrame !== currentFrame) {
      setCurrentFrame(newFrame);
      renderFrame(newFrame);
      if (onFrameChange) onFrameChange(newFrame);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile (Allows smooth vertical page scrolling while enabling horizontal 3D rotation)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
      setStartFrame(currentFrame);
      setIsDragging(false);
      setIsTouchHorizontal(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    // Detect if user is intentionally swiping horizontally to rotate
    if (!isDragging && !isTouchHorizontal) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        setIsDragging(true);
        setIsTouchHorizontal(true);
        setIsPlaying(false);
      } else if (Math.abs(dy) > 8) {
        // Vertical scroll gesture - let browser handle page scroll normally
        return;
      }
    }

    if (isDragging) {
      const sensitivity = 0.5;
      const frameDelta = Math.floor(dx * sensitivity);
      let newFrame = ((startFrame + frameDelta - 1) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES + 1;
      if (newFrame !== currentFrame) {
        setCurrentFrame(newFrame);
        renderFrame(newFrame);
        if (onFrameChange) onFrameChange(newFrame);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsTouchHorizontal(false);
  };

  // Slider Scrub
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setIsPlaying(false);
    setCurrentFrame(val);
    renderFrame(val);
    if (onFrameChange) onFrameChange(val);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    sound.click();
  };

  const toggleFullscreen = () => {
    sound.click();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const angleDeg = Math.round((currentFrame / TOTAL_FRAMES) * 360);
  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      className={`relative group select-none overflow-hidden rounded-2xl border border-cyan-500/30 bg-dark-900/90 shadow-2xl backdrop-blur-xl touch-pan-y ${className} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Cyber Vignette & Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark-950/90 via-transparent to-dark-950/40" />
      <div className="absolute inset-0 pointer-events-none scanline-overlay opacity-25" />

      {/* Futuristic Corner Accents */}
      <div className="absolute top-3 left-3 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

      {/* Loading Progress Bar */}
      {loadPercentage < 100 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-dark-800 z-30">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-200 shadow-[0_0_10px_#00f2fe]"
            style={{ width: `${loadPercentage}%` }}
          />
        </div>
      )}

      {/* Interactive HUD Header */}
      {hudActive && (
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center space-x-1.5 sm:space-x-2 bg-dark-900/80 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-cyan-500/30 text-[10px] sm:text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-300 font-semibold tracking-wider">
              {isPlaying ? '24 FPS' : 'PAUSED'}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">{angleDeg}°</span>
          </div>

          <div className="flex items-center space-x-2 bg-dark-900/80 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10 text-[10px] sm:text-xs font-mono text-slate-300">
            <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
            <span><strong className="text-cyan-400">{String(currentFrame).padStart(3, '0')}</strong>/{TOTAL_FRAMES}</span>
          </div>
        </div>
      )}

      {/* Floating Interactive HUD Tags on larger screens */}
      {hudActive && (
        <>
          <div className="absolute top-1/4 left-6 pointer-events-none hidden lg:flex items-center space-x-2 bg-dark-950/80 border border-cyan-500/30 px-3 py-1 rounded-md text-[11px] font-mono text-cyan-300 backdrop-blur-sm shadow-lg">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>AZURE CLOUD DEFENDER</span>
          </div>

          <div className="absolute bottom-1/3 right-6 pointer-events-none hidden lg:flex items-center space-x-2 bg-dark-950/80 border border-amber-500/30 px-3 py-1 rounded-md text-[11px] font-mono text-amber-300 backdrop-blur-sm shadow-lg">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>AWS LANDING ZONE IaC</span>
          </div>
        </>
      )}

      {/* Interactive Control Dock at Bottom */}
      <div 
        className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-dark-950/85 backdrop-blur-xl p-2 sm:p-2.5 rounded-xl border border-white/10 shadow-2xl transition-all duration-300 opacity-95 group-hover:opacity-100"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Play/Pause & Speed & Scrub row on mobile */}
        <div className="flex items-center justify-between w-full space-x-2">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause 3D orbit" : "Play 3D orbit"}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors shadow-sm"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 translate-x-0.5" />}
            </button>

            <button
              onClick={() => {
                sound.click();
                setPlaySpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1));
              }}
              className="px-2 py-1 text-[11px] sm:text-xs font-mono rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            >
              {playSpeed}x
            </button>

            <button
              onClick={() => {
                sound.click();
                setCurrentFrame(1);
                renderFrame(1);
              }}
              title="Reset to frame 1"
              className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Scrub Slider */}
          <div className="flex-1 flex items-center space-x-2 px-1">
            <input
              type="range"
              min="1"
              max={TOTAL_FRAMES}
              value={currentFrame}
              onChange={handleSliderChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
