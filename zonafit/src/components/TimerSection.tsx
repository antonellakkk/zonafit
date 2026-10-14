'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Timer as TimerIcon,
  Flame,
  Clock,
  Zap,
  Flag,
  Plus,
  Minus,
  Sparkles,
  Coffee
} from 'lucide-react';
import { sound } from '@/utils/audio';
import confetti from 'canvas-confetti';

type TimerMode = 'hiit' | 'countdown' | 'stopwatch' | 'quickrest';
type HiitPhase = 'idle' | 'prep' | 'work' | 'rest' | 'finished';

export const TimerSection: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('hiit');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync sound status
  useEffect(() => {
    setSoundEnabled(sound.isEnabled());
  }, []);

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  /* =========================================================================
     1. HIIT / TABATA TIMER LOGIC
     ========================================================================= */
  const [workTime, setWorkTime] = useState(20);
  const [restTime, setRestTime] = useState(10);
  const [totalRounds, setTotalRounds] = useState(8);
  const [prepTime] = useState(5);

  const [currentRound, setCurrentRound] = useState(1);
  const [hiitPhase, setHiitPhase] = useState<HiitPhase>('idle');
  const [hiitSecondsLeft, setHiitSecondsLeft] = useState(workTime);
  const [isHiitRunning, setIsHiitRunning] = useState(false);

  // HIIT Engine
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isHiitRunning) {
      timer = setInterval(() => {
        setHiitSecondsLeft((prev) => {
          // Play beeps for last 3 seconds
          if (prev <= 4 && prev > 1) {
            sound.playCountdownBeep();
          }

          if (prev <= 1) {
            // Transition phases
            if (hiitPhase === 'prep') {
              sound.playBoxingBell();
              setHiitPhase('work');
              return workTime;
            } else if (hiitPhase === 'work') {
              if (currentRound >= totalRounds) {
                // Completed workout!
                sound.playSuccessChime();
                try {
                  confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.5 },
                    colors: ['#e50914', '#ffffff', '#ffd700']
                  });
                } catch { }
                setIsHiitRunning(false);
                setHiitPhase('finished');
                return 0;
              } else {
                sound.playRestTone();
                setHiitPhase('rest');
                return restTime;
              }
            } else if (hiitPhase === 'rest') {
              sound.playBoxingBell();
              setCurrentRound((r) => r + 1);
              setHiitPhase('work');
              return workTime;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isHiitRunning, hiitPhase, currentRound, totalRounds, workTime, restTime]);

  const startHiit = () => {
    if (hiitPhase === 'idle' || hiitPhase === 'finished') {
      setCurrentRound(1);
      setHiitPhase('prep');
      setHiitSecondsLeft(prepTime);
      sound.playCountdownBeep();
    }
    setIsHiitRunning(true);
  };

  const pauseHiit = () => {
    setIsHiitRunning(false);
  };

  const resetHiit = () => {
    setIsHiitRunning(false);
    setHiitPhase('idle');
    setCurrentRound(1);
    setHiitSecondsLeft(workTime);
  };

  /* =========================================================================
     2. COUNTDOWN TIMER LOGIC
     ========================================================================= */
  const [cdTotalSeconds, setCdTotalSeconds] = useState(60);
  const [cdSecondsLeft, setCdSecondsLeft] = useState(60);
  const [isCdRunning, setIsCdRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isCdRunning && cdSecondsLeft > 0) {
      timer = setInterval(() => {
        setCdSecondsLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            sound.playCountdownBeep();
          }
          if (prev <= 1) {
            sound.playBoxingBell();
            try {
              confetti({ particleCount: 70, spread: 60 });
            } catch { }
            setIsCdRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCdRunning, cdSecondsLeft]);

  const setCountdownPreset = (secs: number) => {
    setIsCdRunning(false);
    setCdTotalSeconds(secs);
    setCdSecondsLeft(secs);
  };

  const adjustCountdown = (delta: number) => {
    if (isCdRunning) return;
    const next = Math.max(10, cdSecondsLeft + delta);
    setCdTotalSeconds(next);
    setCdSecondsLeft(next);
  };

  /* =========================================================================
     3. STOPWATCH LOGIC
     ========================================================================= */
  const [swTimeMs, setSwTimeMs] = useState(0);
  const [isSwRunning, setIsSwRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swStartTimeRef = useRef(0);
  const swAccumulatedRef = useRef(0);
  const swRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isSwRunning) {
      swStartTimeRef.current = performance.now();
      const updateSw = () => {
        const elapsed = performance.now() - swStartTimeRef.current;
        setSwTimeMs(swAccumulatedRef.current + elapsed);
        swRafRef.current = requestAnimationFrame(updateSw);
      };
      swRafRef.current = requestAnimationFrame(updateSw);
    } else {
      if (swRafRef.current) cancelAnimationFrame(swRafRef.current);
      swAccumulatedRef.current = swTimeMs;
    }
    return () => {
      if (swRafRef.current) cancelAnimationFrame(swRafRef.current);
    };
  }, [isSwRunning]);

  const startStopwatch = () => {
    sound.playClick();
    setIsSwRunning(true);
  };

  const pauseStopwatch = () => {
    sound.playClick();
    setIsSwRunning(false);
  };

  const resetStopwatch = () => {
    sound.playClick();
    setIsSwRunning(false);
    swAccumulatedRef.current = 0;
    setSwTimeMs(0);
    setLaps([]);
  };

  const addLap = () => {
    sound.playCountdownBeep();
    setLaps((prev) => [swTimeMs, ...prev]);
  };

  const formatStopwatch = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    const centis = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  /* =========================================================================
     4. QUICK REST LOGIC
     ========================================================================= */
  const [restDuration, setRestDuration] = useState(45);
  const [restSecondsLeft, setRestSecondsLeft] = useState(45);
  const [isRestRunning, setIsRestRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRestRunning && restSecondsLeft > 0) {
      timer = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            sound.playCountdownBeep();
          }
          if (prev <= 1) {
            sound.playBoxingBell();
            setIsRestRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRestRunning, restSecondsLeft]);

  const startQuickRest = (secs: number) => {
    setRestDuration(secs);
    setRestSecondsLeft(secs);
    setIsRestRunning(true);
    sound.playRestTone();
  };

  /* Helper format minutes:seconds */
  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={`py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 ${isFullscreen ? 'bg-[#0a0a0e] min-h-screen flex flex-col justify-center' : ''
        }`}
    >
      {/* Section Header */}
      {!isFullscreen && (
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1418] border border-[#e50914]/40 text-xs font-semibold text-[#ff505d]">
            <TimerIcon className="w-3.5 h-3.5 text-[#e50914]" />
            <span>Herramienta Interactiva con Sonido</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Temporizador Inteligente
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Controlá tus tiempos de trabajo y descansos con alertas sonoras en tiempo real.
          </p>
        </div>
      )}

      {/* Main Timer Wrapper */}
      <div className="bg-[#121218] border border-[#252536] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">

        {/* Glow behind timer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e50914]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Controls Bar: Modes + Sound + Fullscreen */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#20202e] relative z-10">

          {/* Mode Switchers */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#171722] p-1.5 rounded-2xl border border-[#262638]">
            <button
              onClick={() => { setMode('hiit'); sound.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${mode === 'hiit'
                ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>HIIT / Tabata</span>
            </button>

            <button
              onClick={() => { setMode('countdown'); sound.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${mode === 'countdown'
                ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Cuenta Regresiva</span>
            </button>

            <button
              onClick={() => { setMode('stopwatch'); sound.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${mode === 'stopwatch'
                ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Cronómetro</span>
            </button>

            <button
              onClick={() => { setMode('quickrest'); sound.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${mode === 'quickrest'
                ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/40'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Descanso</span>
            </button>
          </div>

          {/* Action icons: Sound & Fullscreen */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${soundEnabled
                ? 'bg-[#18261e] border-emerald-500/40 text-emerald-400'
                : 'bg-[#20181b] border-rose-500/30 text-rose-400'
                }`}
              title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Sonido On' : 'Silencio'}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl bg-[#1a1a26] border border-[#2e2e42] text-gray-300 hover:text-white hover:bg-[#252536] transition-all cursor-pointer"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* ================================================================= */}
        {/* VIEW 1: HIIT / TABATA                                             */}
        {/* ================================================================= */}
        {mode === 'hiit' && (
          <div className="pt-8 space-y-8 relative z-10">
            {/* Status Phase Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400">
                  Ronda actual:
                </span>
                <span className="text-lg font-black text-white bg-[#1b1b26] px-4 py-1.5 rounded-xl border border-[#2e2e40]">
                  {currentRound} / {totalRounds}
                </span>
              </div>

              {/* Phase Banner */}
              <div>
                {hiitPhase === 'idle' && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gray-800 text-gray-300 border border-gray-700">
                    Listo para comenzar
                  </span>
                )}
                {hiitPhase === 'prep' && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
                    ¡Prepárate!
                  </span>
                )}
                {hiitPhase === 'work' && (
                  <span className="px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-wider bg-[#e50914] text-white shadow-lg shadow-[#e50914]/50 animate-bounce">
                    🔥 ¡A DARLE CON TODO!
                  </span>
                )}
                {hiitPhase === 'rest' && (
                  <span className="px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-wider bg-emerald-600 text-white shadow-lg shadow-emerald-600/40">
                    🌿 Descanso activo
                  </span>
                )}
                {hiitPhase === 'finished' && (
                  <span className="px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-wider bg-yellow-500 text-black font-extrabold shadow-lg shadow-yellow-500/40 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    ¡Entrenamiento completado!
                  </span>
                )}
              </div>
            </div>

            {/* Giant Big Number Display */}
            <div className="flex flex-col items-center justify-center py-6">
              <div
                className={`text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter transition-all tabular-nums select-none ${hiitPhase === 'work'
                  ? 'text-[#ff2b38] drop-shadow-[0_0_35px_rgba(229,9,20,0.6)]'
                  : hiitPhase === 'rest'
                    ? 'text-emerald-400 drop-shadow-[0_0_35px_rgba(52,211,153,0.5)]'
                    : hiitPhase === 'prep'
                      ? 'text-amber-400'
                      : 'text-white'
                  }`}
              >
                {hiitSecondsLeft}
              </div>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold -mt-2">
                segundos restantes
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {!isHiitRunning ? (
                <button
                  onClick={startHiit}
                  className="px-8 py-4 rounded-2xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-black text-lg tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-[#e50914]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-white" />
                  <span>{hiitPhase === 'idle' ? 'Iniciar HIIT' : 'Continuar'}</span>
                </button>
              ) : (
                <button
                  onClick={pauseHiit}
                  className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-black text-lg tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Pause className="w-6 h-6 fill-black" />
                  <span>Pausar</span>
                </button>
              )}

              <button
                onClick={resetHiit}
                className="p-4 rounded-2xl bg-[#1c1c28] hover:bg-[#252536] text-gray-300 hover:text-white border border-[#2c2c3e] transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            {/* Configuration Sliders/Pickers (when not running) */}
            {hiitPhase === 'idle' && (
              <div className="pt-6 border-t border-[#20202e] grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#171722] p-4 rounded-2xl border border-[#262638] text-center space-y-2">
                  <span className="text-xs uppercase font-bold text-gray-400">Trabajo</span>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setWorkTime((t) => Math.max(10, t - 5))}
                      className="p-1.5 rounded-lg bg-[#222232] text-gray-300 hover:text-white cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-[#ff4b58]">{workTime}s</span>
                    <button
                      onClick={() => setWorkTime((t) => Math.min(120, t + 5))}
                      className="p-1.5 rounded-lg bg-[#222232] text-gray-300 hover:text-white cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-[#171722] p-4 rounded-2xl border border-[#262638] text-center space-y-2">
                  <span className="text-xs uppercase font-bold text-gray-400">Descanso</span>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setRestTime((t) => Math.max(5, t - 5))}
                      className="p-1.5 rounded-lg bg-[#222232] text-gray-300 hover:text-white cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-emerald-400">{restTime}s</span>
                    <button
                      onClick={() => setRestTime((t) => Math.min(60, t + 5))}
                      className="p-1.5 rounded-lg bg-[#222232] text-gray-300 hover:text-white cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-[#171722] p-4 rounded-2xl border border-[#262638] text-center space-y-2">
                  <span className="text-xs uppercase font-bold text-gray-400">Rondas</span>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setTotalRounds((r) => Math.max(1, r - 1))}
                      className="p-1.5 rounded-lg bg-[#222232] text-gray-300 hover:text-white cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-white">{totalRounds}</span>
                    <button
                      onClick={() => setTotalRounds((r) => Math.min(30, r + 1))}
                      className="p-1.5 rounded-lg bg-[#222232] text-gray-300 hover:text-white cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: COUNTDOWN TIMER                                           */}
        {/* ================================================================= */}
        {mode === 'countdown' && (
          <div className="pt-8 space-y-8 relative z-10 text-center">
            {/* Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[30, 45, 60, 90, 120, 180, 300].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setCountdownPreset(sec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${cdTotalSeconds === sec && !isCdRunning
                    ? 'bg-[#e50914] text-white shadow-md'
                    : 'bg-[#181824] text-gray-300 hover:bg-[#222232] border border-[#2b2b3d]'
                    }`}
                >
                  {sec >= 60 ? `${sec / 60} min` : `${sec} seg`}
                </button>
              ))}
            </div>

            {/* Giant display */}
            <div className="py-4">
              <div className="text-8xl sm:text-9xl md:text-[10rem] font-black tracking-tight text-white tabular-nums">
                {formatTime(cdSecondsLeft)}
              </div>
            </div>

            {/* Adjustment buttons (+15s, -15s) */}
            {!isCdRunning && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => adjustCountdown(-15)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1b1b28] hover:bg-[#252538] border border-[#2e2e42] text-xs font-bold text-gray-300 cursor-pointer"
                >
                  -15 seg
                </button>
                <button
                  onClick={() => adjustCountdown(15)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1b1b28] hover:bg-[#252538] border border-[#2e2e42] text-xs font-bold text-gray-300 cursor-pointer"
                >
                  +15 seg
                </button>
                <button
                  onClick={() => adjustCountdown(60)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1b1b28] hover:bg-[#252538] border border-[#2e2e42] text-xs font-bold text-gray-300 cursor-pointer"
                >
                  +1 min
                </button>
              </div>
            )}

            {/* Control buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {!isCdRunning ? (
                <button
                  onClick={() => {
                    setIsCdRunning(true);
                    sound.playBoxingBell();
                  }}
                  className="px-8 py-4 rounded-2xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-black text-lg tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-[#e50914]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-white" />
                  <span>Iniciar</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsCdRunning(false);
                    sound.playClick();
                  }}
                  className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-black text-lg tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Pause className="w-6 h-6 fill-black" />
                  <span>Pausar</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsCdRunning(false);
                  setCdSecondsLeft(cdTotalSeconds);
                  sound.playClick();
                }}
                className="p-4 rounded-2xl bg-[#1c1c28] hover:bg-[#252536] text-gray-300 hover:text-white border border-[#2c2c3e] transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 3: STOPWATCH                                                 */}
        {/* ================================================================= */}
        {mode === 'stopwatch' && (
          <div className="pt-8 space-y-8 relative z-10 text-center">
            {/* Giant display */}
            <div className="py-6">
              <div className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-white tabular-nums">
                {formatStopwatch(swTimeMs)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              {!isSwRunning ? (
                <button
                  onClick={startStopwatch}
                  className="px-8 py-4 rounded-2xl bg-[#e50914] hover:bg-[#ff2a39] text-white font-black text-lg tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-[#e50914]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-white" />
                  <span>Iniciar</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={pauseStopwatch}
                    className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-black text-lg tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Pause className="w-6 h-6 fill-black" />
                    <span>Pausar</span>
                  </button>

                  <button
                    onClick={addLap}
                    className="px-6 py-4 rounded-2xl bg-[#1e1e2c] hover:bg-[#262638] text-white font-bold text-base flex items-center gap-2 border border-[#303046] transition-all cursor-pointer"
                  >
                    <Flag className="w-5 h-5 text-[#e50914]" />
                    <span>Vuelta</span>
                  </button>
                </>
              )}

              <button
                onClick={resetStopwatch}
                className="p-4 rounded-2xl bg-[#1c1c28] hover:bg-[#252536] text-gray-300 hover:text-white border border-[#2c2c3e] transition-all cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            {/* Laps List */}
            {laps.length > 0 && (
              <div className="max-w-md mx-auto pt-6 border-t border-[#20202e] space-y-2 text-left">
                <span className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                  Vueltas registradas ({laps.length})
                </span>
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
                  {laps.map((lapMs, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#161622] border border-[#242436] text-sm"
                    >
                      <span className="text-gray-400 font-bold">Vuelta {laps.length - idx}</span>
                      <span className="font-mono font-bold text-white">{formatStopwatch(lapMs)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 4: QUICK REST                                                */}
        {/* ================================================================= */}
        {mode === 'quickrest' && (
          <div className="pt-8 space-y-8 relative z-10 text-center">
            <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
              Elegí los segundos para descansar entre series:
            </span>

            {/* Rest button presets */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-2xl mx-auto">
              {[30, 45, 60, 90, 120].map((sec) => (
                <button
                  key={sec}
                  onClick={() => startQuickRest(sec)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${restDuration === sec && isRestRunning
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-[#171724] border-[#29293e] text-white hover:bg-[#202030]'
                    }`}
                >
                  <span className="text-2xl font-black">{sec}s</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Descanso</span>
                </button>
              ))}
            </div>

            {/* Big Countdown */}
            <div className="py-4">
              <div className="text-8xl sm:text-9xl font-black text-emerald-400 tabular-nums">
                {restSecondsLeft}
              </div>
              <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                {isRestRunning ? '🌿 Respirá hondo y recuperá aire' : 'Presioná cualquier tiempo para iniciar'}
              </span>
            </div>

            {isRestRunning && (
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setIsRestRunning(false);
                    sound.playClick();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#20202e] hover:bg-[#2b2b3e] text-gray-300 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancelar descanso
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
