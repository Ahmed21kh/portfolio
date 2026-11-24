'use client'

import { useRef } from 'react'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import RollText from '@/components/ui/RollText'
import { personalInfo, education, languages } from '@/lib/data'
import { FiMapPin, FiBook, FiGlobe, FiAward, FiCheck, FiDownload, FiArrowRight } from 'react-icons/fi'

const stats = [
  { value: 4, suffix: '+', label: 'Years Experience', sub: 'Angular & React Enterprise' },
  { value: 7, suffix: '+', label: 'Production Apps', sub: 'Dashboards & E-commerce' },
  { value: 3, suffix: '', label: 'Tech Companies', sub: 'ALASI, MAIDS.CC, MEGA DEV' },
  { value: 10, suffix: '+', label: 'Modern Frameworks', sub: 'TypeScript, NgRx, Redux' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)

  return (
    <section id="about" ref={ref} className="relative py-20 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-12">
          <span data-reveal="left" className="font-mono text-accent-blue text-sm tracking-widest font-semibold">01.</span>
          <h2 data-reveal-title className="font-display font-bold text-3xl sm:text-4xl text-text-primary">About Me</h2>
          <div data-reveal-line className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column — Biography & Core Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 data-reveal="left" className="font-display font-bold text-2xl text-text-primary mb-4 leading-snug">
                Passionate about building scalable, resilient frontend architectures and user-first digital products.
              </h3>
              <p data-reveal="left" className="text-text-secondary font-body text-base leading-relaxed mb-4">
                {personalInfo.summary}
              </p>
              <p data-reveal="left" className="text-text-secondary font-body text-sm leading-relaxed mb-8">
                Currently leading complex dashboard initiatives at <span className="text-text-primary font-semibold">ALASI Real Estate</span>. Previously engineered high-concurrency ERP systems for remote international operations at <span className="text-text-primary font-semibold">MAIDS.CC</span> and responsive full-stack modules at <span className="text-text-primary font-semibold">MEGA DEV</span>.
              </p>

              {/* Personal Info Quick Cards */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: FiMapPin, label: 'Location', value: personalInfo.location },
                  {
                    icon: FiBook,
                    label: 'Education',
                    value: `${education.degree} — ${education.university} (${education.graduation})`,
                  },
                  {
                    icon: FiGlobe,
                    label: 'Languages',
                    value: languages.map((l) => `${l.name} (${l.level})`).join(' • '),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    data-reveal="left"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-bg-card/70 border border-fg/10 hover:border-accent-blue/30 transition-all duration-200"
                  >
                    <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue mt-0.5">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-text-muted font-mono text-[11px] tracking-wider uppercase mb-0.5">{label}</p>
                      <p className="text-text-primary font-body text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume button link */}
            <div data-reveal className="flex items-center gap-4">
              <a
                href="/Ahmed_Khaled_CV.pdf"
                download="Ahmed_Khaled_CV.pdf"
                className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue text-white font-body text-xs font-semibold shadow-glow-sm hover:shadow-glow hover:scale-105 active:scale-[0.98] transition-[transform,box-shadow] duration-300"
              >
                <FiDownload size={14} className="nudge-y" />
                <RollText>Download Complete Resume</RollText>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent-blue transition-colors"
              >
                <RollText>Explore projects</RollText>
                <FiArrowRight size={12} className="nudge-x" />
              </a>
            </div>
          </div>

          {/* Right Column — High Impact Stats & Principles */}
          <div className="flex flex-col justify-between gap-5">
            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  data-reveal="scale"
                  className="p-6 rounded-2xl bg-bg-card border border-fg/10 shadow-card hover:-translate-y-1 hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-200 group"
                >
                  <p className="font-display font-extrabold text-4xl sm:text-5xl text-gradient mb-2 group-hover:scale-105 origin-left transition-transform">
                    <span data-count={stat.value}>{stat.value}{stat.suffix}</span>
                  </p>
                  <p className="text-text-primary font-display font-bold text-sm mb-1">{stat.label}</p>
                  <p className="text-text-muted font-mono text-[11px] leading-tight">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Core Engineering Principles Card */}
            <div data-reveal="right" className="p-6 rounded-2xl bg-gradient-to-br from-accent-blue/8 via-bg-card to-bg-card border border-accent-blue/20 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-accent-blue/15 text-accent-blue">
                  <FiAward size={16} />
                </div>
                <h4 className="font-mono text-accent-blue text-xs tracking-wider uppercase font-bold">
                  Core Engineering Strengths
                </h4>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  'Scalable Frontend Architecture',
                  'Reactive State (NgRx & Redux)',
                  'Modular & Reusable Components',
                  'CI/CD & Automated Delivery',
                  'Agile / Scrum Sprint Leadership',
                  'Cross-Platform & Hybrid (Ionic)',
                  'Web Performance & Core Web Vitals',
                  'Cross-Browser & Mobile-First UX',
                ].map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-card/80 border border-fg/5 text-text-secondary text-xs font-body font-medium"
                  >
                    <FiCheck className="text-accent-blue flex-shrink-0" size={13} />
                    <span className="truncate">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
