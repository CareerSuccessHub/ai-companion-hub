"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, ChevronLeft, SkipForward, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string; // data-tour-target selector
  position?: "top" | "bottom" | "left" | "right" | "center";
}

interface GuidedTourProps {
  steps: TourStep[];
  storageKey: string;
  autoShowOnFirstVisit?: boolean;
  buttonLabel?: string;
}

export default function GuidedTour({
  steps,
  storageKey,
  autoShowOnFirstVisit = true,
  buttonLabel = "How This Works",
}: GuidedTourProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState<"top" | "bottom" | "left" | "right" | "none">("none");
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check if user has seen tour
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tourStatus = localStorage.getItem(storageKey);
      if (!tourStatus && autoShowOnFirstVisit) {
        // Small delay to ensure DOM is ready
        setTimeout(() => setIsActive(true), 500);
      }
    }
  }, [storageKey, autoShowOnFirstVisit]);

  // Position modal near target element and highlight it
  useEffect(() => {
    if (!isActive || !currentStepData) return;

    const updatePosition = () => {
      const targetElement = document.querySelector(
        `[data-tour-target="${currentStepData.target}"]`
      ) as HTMLElement;
      
      if (!targetElement || !modalRef.current) return;

      const targetRect = targetElement.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();
      const preferredPosition = currentStepData.position || "bottom";
      
      let top = 0;
      let left = 0;
      let arrow: typeof arrowPosition = "none";

      const spacing = 20;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Highlight target element
      targetElement.style.position = "relative";
      targetElement.style.zIndex = "10000";
      targetElement.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)";
      targetElement.style.borderRadius = "8px";
      targetElement.style.transition = "all 0.3s ease";

      // On mobile, position modal above or below target (not centered)
      if (isMobile) {
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const isTargetInUpperHalf = targetCenterY < viewportHeight / 2;
        
        // Position modal opposite to where target is to avoid overlap
        if (isTargetInUpperHalf) {
          // Target in upper half, show modal below
          top = targetRect.bottom + spacing;
          arrow = "top";
        } else {
          // Target in lower half, show modal above
          top = targetRect.top - modalRect.height - spacing;
          arrow = "bottom";
        }
        
        // Center horizontally with padding
        left = Math.max(16, Math.min(
          viewportWidth / 2 - modalRect.width / 2,
          viewportWidth - modalRect.width - 16
        ));
        
        // Keep modal in viewport vertically
        if (top < 16) top = 16;
        if (top + modalRect.height > viewportHeight - 16) {
          top = viewportHeight - modalRect.height - 16;
        }
        
        // Scroll to keep target visible
        targetElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else if (preferredPosition === "center") {
        // Desktop center mode
        top = viewportHeight / 2 - modalRect.height / 2;
        left = viewportWidth / 2 - modalRect.width / 2;
        arrow = "none";
        
        // Scroll target into view
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Position based on preference
        switch (preferredPosition) {
          case "bottom":
            top = targetRect.bottom + spacing;
            left = targetRect.left + targetRect.width / 2 - modalRect.width / 2;
            arrow = "top";
            break;
          case "top":
            top = targetRect.top - modalRect.height - spacing;
            left = targetRect.left + targetRect.width / 2 - modalRect.width / 2;
            arrow = "bottom";
            break;
          case "right":
            top = targetRect.top + targetRect.height / 2 - modalRect.height / 2;
            left = targetRect.right + spacing;
            arrow = "left";
            break;
          case "left":
            top = targetRect.top + targetRect.height / 2 - modalRect.height / 2;
            left = targetRect.left - modalRect.width - spacing;
            arrow = "right";
            break;
        }

        // Keep modal in viewport
        if (left < 16) left = 16;
        if (left + modalRect.width > viewportWidth - 16) {
          left = viewportWidth - modalRect.width - 16;
        }
        if (top < 16) top = 16;
        if (top + modalRect.height > viewportHeight - 16) {
          top = viewportHeight - modalRect.height - 16;
        }

        // Scroll to keep both target and modal visible
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      setModalPosition({ top, left });
      setArrowPosition(arrow);
    };

    updatePosition();
    const resizeHandler = () => updatePosition();
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", resizeHandler, true);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", resizeHandler, true);
      
      // Remove highlight from target
      const targetElement = document.querySelector(
        `[data-tour-target="${currentStepData.target}"]`
      ) as HTMLElement;
      if (targetElement) {
        targetElement.style.position = "";
        targetElement.style.zIndex = "";
        targetElement.style.boxShadow = "";
        targetElement.style.borderRadius = "";
      }
    };
  }, [isActive, currentStep, currentStepData, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowRight":
        case "Enter":
          if (!isLastStep) handleNext();
          else handleComplete();
          break;
        case "ArrowLeft":
          if (!isFirstStep) handlePrevious();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, currentStep, isFirstStep, isLastStep]);

  const handleStart = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setIsActive(false);
    localStorage.setItem(storageKey, "skipped");
  };

  const handleComplete = () => {
    setIsActive(false);
    localStorage.setItem(storageKey, "completed");
  };

  const handleClose = () => {
    setIsActive(false);
  };

  // Get arrow styles
  const renderArrow = () => {
    if (arrowPosition === "none") return null;

    const arrowClasses = "absolute w-0 h-0 border-solid";
    const arrowSize = "border-[10px]";

    switch (arrowPosition) {
      case "top":
        return (
          <div
            className={`${arrowClasses} ${arrowSize} border-transparent border-b-slate-800 -top-5 left-1/2 -translate-x-1/2`}
          />
        );
      case "bottom":
        return (
          <div
            className={`${arrowClasses} ${arrowSize} border-transparent border-t-slate-800 -bottom-5 left-1/2 -translate-x-1/2`}
          />
        );
      case "left":
        return (
          <div
            className={`${arrowClasses} ${arrowSize} border-transparent border-r-slate-800 -left-5 top-1/2 -translate-y-1/2`}
          />
        );
      case "right":
        return (
          <div
            className={`${arrowClasses} ${arrowSize} border-transparent border-l-slate-800 -right-5 top-1/2 -translate-y-1/2`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {!isActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 hover:border-blue-500/50 rounded-lg transition-all text-sm font-medium"
          aria-label={buttonLabel}
        >
          <HelpCircle className="w-4 h-4" />
          {buttonLabel}
        </motion.button>
      )}

      {/* Tour Modal */}
      <AnimatePresence>
        {isActive && currentStepData && (
          <>
            {/* Dimmed Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={handleClose}
            />

            {/* Modal Tooltip */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.3 }}
              style={{
                position: "fixed",
                top: modalPosition.top,
                left: modalPosition.left,
                zIndex: 10001,
              }}
              className="w-96 max-w-[calc(100vw-2rem)] md:w-96"
            >
              {/* Arrow */}
              {renderArrow()}

              {/* Modal Content */}
              <div className="bg-slate-800 border-2 border-slate-700 rounded-xl shadow-2xl p-4 md:p-6 relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700"
                  aria-label="Close tour"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Progress Dots */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1.5">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? "w-8 bg-blue-500"
                            : index < currentStep
                            ? "w-6 bg-blue-400/50"
                            : "w-6 bg-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {currentStep + 1}/{steps.length}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-2 pr-6">
                  {currentStepData.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-5">
                  {currentStepData.description}
                </p>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  {/* Skip Button */}
                  {!isLastStep && (
                    <button
                      onClick={handleSkip}
                      className="px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  )}

                  <div className="flex-1" />

                  {/* Previous Button */}
                  {!isFirstStep && (
                    <button
                      onClick={handlePrevious}
                      className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}

                  {/* Next / Done Button */}
                  <button
                    onClick={isLastStep ? handleComplete : handleNext}
                    className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    {isLastStep ? "Got it!" : "Next"}
                    {!isLastStep && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Keyboard Hints - Desktop only */}
                <div className="hidden md:block mt-4 pt-3 border-t border-slate-700">
                  <p className="text-xs text-gray-500 text-center">
                    Use ← → or Enter to navigate • Press Esc to close
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
