// // TODO: Port this to Vue composition API hook

// import { useState, useEffect } from 'react'

// // Define available themes
// export const colorSchemes = {
//   DARK: '(prefers-color-scheme: dark)',
//   LIGHT: '(prefers-color-scheme: light)'
// }

// export default function useDetectColorScheme () {
//   const [scheme, setScheme] = useState(null)

//   useEffect(() => {
//     if (!window.matchMedia) {
//       return
//     }

//     // The listener
//     const listener = e => {
//       if (!e || !e.matches) {
//         return
//       }
//       const schemeNames = Object.keys(colorSchemes)
//       for (let i = 0; i < schemeNames.length; i++) {
//         const schemeName = schemeNames[i]
//         if (e.media === colorSchemes[schemeName]) {
//           setScheme(schemeName.toLowerCase())
//           break
//         }
//       }
//     }

//     // Add listener for all themes
//     let activeMatches = []
//     Object.keys(colorSchemes).forEach(schemeName => {
//       const mq = window.matchMedia(colorSchemes[schemeName])
//       mq.addListener(listener)
//       activeMatches.push(mq)
//       listener(mq)
//     })

//     // Remove listeners, no memory leaks
//     return () => {
//       activeMatches.forEach(mq => mq.removeListener(listener))
//       activeMatches = []
//     }
//   }, [])

//   return scheme
// }
