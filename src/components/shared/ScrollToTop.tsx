import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 그냥 hook임
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
