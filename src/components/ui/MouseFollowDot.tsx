"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useTheme } from "@/context/ThemeContext";

/**
 * Spring physics configuration matching reference specs:
 * Lower mass = snappier, responsive motion; controlled damping and stiffness.
 */
const SPRING_CONFIG = {
  mass: 0.1,
  damping: 10,
  stiffness: 131,
};

const DOT_SIZE = 10; // 10px circular dot
const DOT_HALF = DOT_SIZE / 2;

export function MouseFollowDot() {
  const [mounted, setMounted] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);

  const { settings } = useAccessibility();
  const { resolvedTheme } = useTheme();

  // Motion values for raw cursor targets
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring values for trailing animation
  const xSpring = useSpring(cursorX, SPRING_CONFIG);
  const ySpring = useSpring(cursorY, SPRING_CONFIG);

  // Opacity & scale motion values and springs for smooth enter/exit
  const opacity = useMotionValue(0);
  const opacitySpring = useSpring(opacity, SPRING_CONFIG);

  const scale = useMotionValue(0);
  const scaleSpring = useSpring(scale, SPRING_CONFIG);

  const hasMoved = useRef(false);

  // 1. Detect client mount, pointer capability (fine vs touch), and system reduced motion
  useEffect(() => {
    setMounted(true);

    const pointerMq = window.matchMedia("(pointer: fine)");
    setHasFinePointer(pointerMq.matches);

    const handlePointerMqChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };
    pointerMq.addEventListener("change", handlePointerMqChange);

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReducedMotion(motionMq.matches);

    const handleMotionMqChange = (e: MediaQueryListEvent) => {
      setSystemReducedMotion(e.matches);
    };
    motionMq.addEventListener("change", handleMotionMqChange);

    return () => {
      pointerMq.removeEventListener("change", handlePointerMqChange);
      motionMq.removeEventListener("change", handleMotionMqChange);
    };
  }, []);

  // 2. Track pointer movement across the viewport
  useEffect(() => {
    // If not mounted, not a fine pointer (touch devices), or reduced motion is active, do not attach listeners
    if (!mounted || !hasFinePointer || settings.reduceMotion || systemReducedMotion) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Discard touch events on hybrid laptops/tablets
      if (e.pointerType === "touch") return;

      const targetX = e.clientX - DOT_HALF;
      const targetY = e.clientY - DOT_HALF;

      if (!hasMoved.current) {
        hasMoved.current = true;
        // Snap immediately to cursor position on first movement to avoid flying from (0,0)
        cursorX.jump(targetX);
        cursorY.jump(targetY);
        xSpring.jump(targetX);
        ySpring.jump(targetY);
      } else {
        cursorX.set(targetX);
        cursorY.set(targetY);
      }

      opacity.set(1);
      scale.set(1);
    };

    const handlePointerLeave = () => {
      opacity.set(0);
      scale.set(0);
    };

    const handlePointerEnter = () => {
      if (hasMoved.current) {
        opacity.set(1);
        scale.set(1);
      }
    };

    const handleBlur = () => {
      opacity.set(0);
      scale.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("blur", handleBlur);
    };
  }, [
    mounted,
    hasFinePointer,
    settings.reduceMotion,
    systemReducedMotion,
    cursorX,
    cursorY,
    xSpring,
    ySpring,
    opacity,
    scale,
  ]);

  // Do not render anything on server, on touch-only devices, or when reduced motion is preferred
  if (!mounted || !hasFinePointer || settings.reduceMotion || systemReducedMotion) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      aria-hidden="true"
      role="presentation"
      style={{
        x: xSpring,
        y: ySpring,
        opacity: opacitySpring,
        scale: scaleSpring,
        backgroundColor: isDark ? "#FFFFFF" : "#000000",
      }}
      className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full pointer-events-none z-[9999] bg-[#000000] dark:bg-[#FFFFFF]"
    />
  );
}
