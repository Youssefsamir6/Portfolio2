import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { skills } from '../data/portfolio'

const colorMap = {
  purple: 'from-purple-500/60 to-purple-700/60',
  blue: 'from-blue-500/60 to-blue-700/60',
  pink: 'from-pink-500/60 to-pink-700/60',
  green: 'from-emerald-500/60 to-emerald-700/60',
}

const bgMap = {
  purple: 'bg-purple-500/10',
  blue: 'bg-blue-500/10',
  pink: 'bg-pink-500/10',
  green: 'bg-emerald-500/10',
}

function SkillBar({ name, icon, level, color, delay }) {
  const barRef = useRef(null)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (inView && barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: 0 },
        { width: `${level}%`, duration: 1.2, delay: delay * 0.08, ease: 'power3.out' }
      )
    }
  }, [inView, level, delay])

  return (
    <div ref={ref} className="flex items-center gap-3">
      <div className="flex items-center gap-2 w-36 flex-shrink-0">
        <span className="text-base">{icon}</span>
        <span className="text-white/50 text-xs font-medium">{name}</span>
      </div>
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]}`}
          style={{ width: 0 }}
        />
      </div>
      <span className="text-white/20 text-xs font-mono w-8 text-right">{level}%</span>
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="skills" className="py-32 bg-black" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-xs font-mono text-white/30 tracking-[0.3em] uppercase mb-4"
        >
          Skills
        </motion.div>
        <motion.h2
          variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-4xl sm:text-5xl font-black mb-14"
        >
          Tools & Technologies
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={fadeUp(gi * 0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/12 transition-colors"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${bgMap[group.color].replace('/10', '')}`} />
                <span className="text-white/60 text-xs font-mono tracking-widest uppercase">{group.category}</span>
              </div>
              <div className="space-y-4">
                {group.items.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={group.color}
                    delay={gi * group.items.length + si}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
