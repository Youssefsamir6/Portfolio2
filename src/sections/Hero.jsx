import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useInView } from 'react-intersection-observer'
import { personalInfo } from '../data/portfolio'
import Robot from '../components/Robot'

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [isLg, setIsLg] = useState(false)
  const { ref: heroRef, inView: heroInView } = useInView()
  const heroInViewRef = useRef(true)
  const canvasRef = useRef(null)
  const orbRef1 = useRef(null)
  const orbRef2 = useRef(null)
  const orbRef3 = useRef(null)

  // Orb float animation
  useEffect(() => {
    if (orbRef1.current) {
      gsap.to(orbRef1.current, { y: -30, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }
    if (orbRef2.current) {
      gsap.to(orbRef2.current, { y: 25, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 })
    }
    if (orbRef3.current) {
      gsap.to(orbRef3.current, { y: -20, x: 15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
    }
  }, [])

  // Window size check for Robot
  useEffect(() => {
    const checkSize = () => setIsLg(window.innerWidth >= 1024)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      heroInViewRef.current = heroInView
      if (heroInViewRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(p => {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          if (p.y > canvas.height) p.y = 0
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
          ctx.fill()
        })
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Typewriter
  useEffect(() => {
    const role = personalInfo.roles[roleIdx]
    let timeout
    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
      } else {
        setRoleIdx((roleIdx + 1) % personalInfo.roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIdx])

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={orbRef1} className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/[0.025] blur-3xl" />
        <div ref={orbRef2} className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-white/[0.02] blur-3xl" />
        <div ref={orbRef3} className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-white/[0.015] blur-2xl" />
      </div>

      {/* Scroll progress line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left: text content */}
          <div className="flex-1 text-left">
            {/* Badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium tracking-wide backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for Internship &amp; Junior Roles
            </motion.div>

            {/* Name */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
            >
              <span className="bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                Youssef<br />Samir Refky
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-xl sm:text-2xl font-mono text-white/50 mb-5 h-8"
            >
              {displayed}
              <span className="inline-block w-0.5 h-5 bg-white/60 ml-0.5 align-middle animate-pulse" />
            </motion.p>

            {/* Tagline */}
            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="max-w-xl text-white/40 text-base leading-relaxed mb-10"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap items-center gap-3 mb-14"
            >
              <motion.a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-white/90 transition-colors"
              >
                View Projects
              </motion.a>
              <motion.a
                href={personalInfo.cv}
                download={personalInfo.cvFilename}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/15 text-white font-medium rounded-full text-sm hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <DownloadIcon />
                Download CV
              </motion.a>
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 border border-white/10 text-white/60 font-medium rounded-full text-sm hover:text-white hover:border-white/30 transition-all"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-10"
            >
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  <div className="text-white/30 text-xs font-medium mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Robot */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 hidden lg:flex items-center justify-center"
          >
            {isLg && <Robot />}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 hover:text-white/50 transition-colors group"
      >
        <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-current"
          />
        </div>
        <span className="text-xs tracking-widest uppercase">scroll</span>
      </button>
    </section>
  )
}

function AnimatedStat({ value, suffix }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <div ref={ref} className="text-3xl font-black text-white">
      {count}{suffix}
    </div>
  )
}
