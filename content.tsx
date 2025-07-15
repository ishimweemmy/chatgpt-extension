import type { PlasmoCSConfig } from "plasmo"
import { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"

import ToggleButtons from "./components/ToggleButtons"
import SwordIcon from "./components/SwordIcon"

export const config: PlasmoCSConfig = {
  matches: ["https://chat.openai.com/*", "https://chatgpt.com/*"],
  all_frames: false
}

const ContentScript = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 30
    let observer: MutationObserver | null = null
    
    const checkForChatGPTElements = () => {
      const main = document.querySelector('main')
      const form = document.querySelector('form')
      const headerArea = document.querySelector('header') || document.querySelector('nav')
      
      const isFullyLoaded = main && form && headerArea && 
                           document.querySelector('[data-testid="chat-turn-loader"]') === null
      
      if (isFullyLoaded) {
        setIsLoaded(true)
        setTimeout(() => {
          injectComponents()
          setupMutationObserver()
        }, 500)
      } else if (retryCount < maxRetries) {
        retryCount++
        setTimeout(checkForChatGPTElements, 1000)
      }
    }

    const setupMutationObserver = () => {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            // Check if our components were removed
            if (!document.getElementById('sword-toggles') || !document.getElementById('sword-sidebar')) {
              // Re-inject components if they were removed
              setTimeout(() => {
                injectComponents()
              }, 100)
            }
          }
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkForChatGPTElements)
    } else {
      checkForChatGPTElements()
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', checkForChatGPTElements)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  const injectComponents = () => {
    try {
      // Inject Toggle Buttons in the header area next to lightning bolt
      const headerArea = document.querySelector('header') || document.querySelector('nav')
      if (headerArea && !document.getElementById('sword-toggles')) {
        // Remove any existing element first
        const existingToggle = document.getElementById('sword-toggles')
        if (existingToggle) {
          existingToggle.remove()
        }

        const toggleContainer = document.createElement('div')
        toggleContainer.id = 'sword-toggles'
        toggleContainer.style.cssText = `
          position: absolute;
          top: 360px;
          right: 550px;
          z-index: 10000;
        `
        headerArea.appendChild(toggleContainer)
        
        const toggleRoot = createRoot(toggleContainer)
        toggleRoot.render(<ToggleButtons />)
      }

      // Inject Sword Icon in left sidebar menu
      if (!document.getElementById('sword-sidebar')) {
        // Remove any existing element first
        const existingSword = document.getElementById('sword-sidebar')
        if (existingSword) {
          existingSword.remove()
        }

        const swordSidebar = document.createElement('div')
        swordSidebar.id = 'sword-sidebar'
        swordSidebar.style.cssText = `
          position: fixed;
          right: 170px;
          top: 65%;
          transform: translateY(-50%);
          z-index: 10000;
          background: #2d2d2d;
          border-radius: 8px;
          padding: 8px;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
        `
        document.body.appendChild(swordSidebar)
        
        const swordRoot = createRoot(swordSidebar)
        swordRoot.render(<SwordIcon />)
      }
    } catch (error) {
      console.error('Sword Extension: Error injecting components:', error)
      // Retry after a delay if there's an error
      setTimeout(() => {
        injectComponents()
      }, 2000)
    }
  }

  return null
}

export default ContentScript