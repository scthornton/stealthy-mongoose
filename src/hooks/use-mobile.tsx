
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current viewport is mobile-sized
 * 
 * Uses a media query to detect viewport width and updates state accordingly.
 * The mobile breakpoint is defined as any screen width less than 768px.
 * 
 * @returns {boolean} True if viewport width is less than the mobile breakpoint (768px)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Set up media query listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Handler to update state based on viewport width
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener and set initial value
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Clean up event listener on component unmount
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
