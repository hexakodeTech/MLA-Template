// Reusable keyboard navigation & focus trapping utilities for WCAG 2.2 AA compliance

/**
 * Returns all currently visible and focusable interactive elements within a container.
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );

  return elements.filter((el) => {
    return (
      (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0) &&
      window.getComputedStyle(el).visibility !== "hidden" &&
      el.getAttribute("aria-hidden") !== "true"
    );
  });
};

/**
 * Traps Tab and Shift+Tab key navigation within the provided focusable elements or container.
 */
export const handleFocusTrapKey = (
  e: KeyboardEvent,
  containerOrElements: HTMLElement | HTMLElement[]
): void => {
  if (e.key !== "Tab") return;

  const focusables = Array.isArray(containerOrElements)
    ? containerOrElements
    : getFocusableElements(containerOrElements);

  if (focusables.length === 0) {
    e.preventDefault();
    return;
  }

  const firstElement = focusables[0];
  const lastElement = focusables[focusables.length - 1];
  const activeElement = document.activeElement as HTMLElement | null;

  if (e.shiftKey) {
    // Backward navigation (Shift + Tab)
    if (!activeElement || activeElement === firstElement || !focusables.includes(activeElement)) {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    // Forward navigation (Tab)
    if (!activeElement || activeElement === lastElement || !focusables.includes(activeElement)) {
      e.preventDefault();
      firstElement.focus();
    }
  }
};
