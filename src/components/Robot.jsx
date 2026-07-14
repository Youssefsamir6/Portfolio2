import { Suspense, Component } from 'react'
import Spline from '@splinetool/react-spline'

class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function RobotSVGFallback() {
  return (
    <div className="w-[340px] h-[420px] flex items-center justify-center opacity-60">
      <svg viewBox="0 0 160 290" overflow="visible" xmlns="http://www.w3.org/2000/svg" className="w-44 h-auto drop-shadow-2xl">
        <defs>
          <filter id="rb-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="rb-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="rb-glow-orb" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="7" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="rb-head-grad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#252525"/><stop offset="100%" stopColor="#080808"/>
          </radialGradient>
          <radialGradient id="rb-body-grad" cx="40%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#202020"/><stop offset="100%" stopColor="#060606"/>
          </radialGradient>
          <radialGradient id="rb-eye-grad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#1e1e1e"/><stop offset="100%" stopColor="#000"/>
          </radialGradient>
          <linearGradient id="rb-arm-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1c1c1c"/><stop offset="50%" stopColor="#111"/><stop offset="100%" stopColor="#080808"/>
          </linearGradient>
        </defs>
        <ellipse cx="80" cy="288" rx="54" ry="6" fill="rgba(200,200,200,0.04)" filter="url(#rb-glow-sm)"/>
        <rect x="2" y="128" width="20" height="78" rx="10" fill="url(#rb-arm-grad)" stroke="#1c1c1c" strokeWidth="1"/>
        <rect x="3" y="128" width="6" height="78" rx="10" fill="rgba(255,255,255,0.025)"/>
        <rect x="4" y="202" width="16" height="52" rx="8" fill="#0c0c0c" stroke="#181818" strokeWidth="1"/>
        <rect x="6" y="248" width="12" height="10" rx="5" fill="#0a0a0a" stroke="#141414" strokeWidth="1"/>
        <rect x="138" y="128" width="20" height="78" rx="10" fill="url(#rb-arm-grad)" stroke="#1c1c1c" strokeWidth="1"/>
        <rect x="152" y="128" width="5" height="78" rx="10" fill="rgba(255,255,255,0.025)"/>
        <rect x="140" y="202" width="16" height="52" rx="8" fill="#0c0c0c" stroke="#181818" strokeWidth="1"/>
        <rect x="142" y="248" width="12" height="10" rx="5" fill="#0a0a0a" stroke="#141414" strokeWidth="1"/>
        <rect x="20" y="118" width="120" height="118" rx="20" fill="url(#rb-body-grad)" stroke="#1e1e1e" strokeWidth="1.5"/>
        <rect x="20" y="118" width="120" height="18" rx="20" fill="rgba(255,255,255,0.045)"/>
        <rect x="30" y="134" width="46" height="64" rx="10" fill="rgba(0,0,0,0.5)" stroke="#181818" strokeWidth="1"/>
        <rect x="84" y="134" width="46" height="64" rx="10" fill="rgba(0,0,0,0.5)" stroke="#181818" strokeWidth="1"/>
        <rect x="38" y="148" width="30" height="5" rx="2.5" fill="#d0d0d0" opacity="0.22" filter="url(#rb-glow-sm)"/>
        <rect x="92" y="148" width="30" height="5" rx="2.5" fill="#d0d0d0" opacity="0.22" filter="url(#rb-glow-sm)"/>
        <circle cx="80" cy="166" r="9" fill="#fff" opacity="0.3" filter="url(#rb-glow-orb)"/>
        <circle cx="80" cy="166" r="5" fill="#eeeeee"/>
        <rect x="32" y="198" width="96" height="34" rx="14" fill="#0b0b0b" stroke="#181818" strokeWidth="1"/>
        <ellipse cx="20" cy="128" rx="12" ry="7" fill="#181818" stroke="#282828" strokeWidth="1"/>
        <ellipse cx="140" cy="128" rx="12" ry="7" fill="#181818" stroke="#282828" strokeWidth="1"/>
        <rect x="62" y="106" width="36" height="16" rx="8" fill="#131313" stroke="#1e1e1e" strokeWidth="1"/>
        <rect x="8" y="4" width="144" height="108" rx="40" fill="url(#rb-head-grad)" stroke="#333" strokeWidth="1.5"/>
        <ellipse cx="80" cy="22" rx="52" ry="16" fill="rgba(255,255,255,0.06)"/>
        <rect x="75" y="-4" width="10" height="10" rx="4" fill="#111" stroke="#252525" strokeWidth="1"/>
        <circle cx="80" cy="-4" r="4" fill="#3a3a3a"/>
        <circle cx="80" cy="-4" r="2" fill="#fff" opacity="0.5"/>
        <circle cx="50" cy="54" r="22" fill="url(#rb-eye-grad)" stroke="#3a3a3a" strokeWidth="1.2"/>
        <circle cx="50" cy="54" r="22" fill="none" stroke="rgba(220,220,220,0.14)" strokeWidth="2.5"/>
        <circle cx="50" cy="54" r="11" fill="#020202"/>
        <circle cx="50" cy="54" r="7" fill="#e8e8e8" filter="url(#rb-glow)"/>
        <circle cx="46" cy="50" r="3" fill="#ffffff" opacity="0.95"/>
        <circle cx="110" cy="54" r="22" fill="url(#rb-eye-grad)" stroke="#3a3a3a" strokeWidth="1.2"/>
        <circle cx="110" cy="54" r="22" fill="none" stroke="rgba(220,220,220,0.14)" strokeWidth="2.5"/>
        <circle cx="110" cy="54" r="11" fill="#020202"/>
        <circle cx="110" cy="54" r="7" fill="#e8e8e8" filter="url(#rb-glow)"/>
        <circle cx="106" cy="50" r="3" fill="#ffffff" opacity="0.95"/>
        <rect x="40" y="86" width="80" height="14" rx="7" fill="#0c0c0c" stroke="#1c1c1c" strokeWidth="1"/>
        <circle cx="54" cy="93" r="2" fill="#222"/>
        <circle cx="62" cy="93" r="2" fill="#222"/>
        <circle cx="80" cy="93" r="2.5" fill="#2a2a2a"/>
        <circle cx="98" cy="93" r="2" fill="#222"/>
        <circle cx="106" cy="93" r="2" fill="#222"/>
      </svg>
    </div>
  )
}

export default function Robot() {
  return (
    <SplineErrorBoundary fallback={<RobotSVGFallback />}>
      <div className="w-[380px] h-[420px] xl:w-[480px] xl:h-[520px]" style={{ display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        }>
          <div style={{ width: '100%', height: '100%', flex: 1 }}>
            <Spline scene="https://prod.spline.design/9xuF1oRA5poA131s/scene.splinecode" />
          </div>
        </Suspense>
      </div>
    </SplineErrorBoundary>
  )
}
