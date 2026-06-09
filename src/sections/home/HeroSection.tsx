import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Instagram } from 'lucide-react';
import { skillsRow1, skillsRow2 } from '@/data/skills';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abubakar-shaikh-dev', icon: Linkedin },
  { label: 'X / Twitter', href: 'https://x.com/abubakarshaikh_dev', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com/abubakar-shaikh-dev', icon: Github },
  { label: 'Instagram', href: 'https://instagram.com/abubakarshaikh.dev', icon: Instagram },
];

export function HeroSection() {
  const renderItems = (items: string[]) => (
    <>
      {items.map((skill, index) => (
        <span key={`${skill}-${index}`} className="flex items-center whitespace-nowrap font-mono text-sm font-medium uppercase tracking-wider text-text-primary">
          <span className="mx-4 font-bold text-accent-orange">///</span>
          {skill}
        </span>
      ))}
    </>
  );

  return (
    <section id="hero" className="relative flex flex-col overflow-hidden bg-grid-pattern">
      <div className="section-container pt-28 lg:pt-36 hero-content-wrapper">
        <p className="hero-label mono-accent mb-6">// full_stack_software_engineer</p>
        <div className="relative">
          {/* Desktop Hero Image */}
          <div className="hero-image absolute -top-4 right-4 z-10 hidden xl:block xl:-top-8 xl:right-12">
            <div style={{ transform: 'rotate(-3deg)' }}>
              <div className="overflow-hidden border-text-primary" style={{ borderWidth: '4px', boxShadow: '6px 6px 0 var(--color-accent-orange)' }}>
                <picture>
                  <source type="image/webp" srcSet="/images/profile.webp" sizes="180px" />
                  <img src="/images/profile.webp" alt="Abubakar Shaikh" width="180" height="180" fetchPriority="high" />
                </picture>
              </div>
            </div>
          </div>

          {/* Name Heading */}
          <h1 className="font-display font-extrabold text-white">
            <span className="sr-only">Abubakar Shaikh — Full Stack Software Engineer specialising in React, Node.js, and AWS DevOps</span>
            <span className="hero-word block text-display-hero" aria-hidden="true">ABUBAKAR</span>
            <span className="hero-word block text-display-hero text-accent-orange" aria-hidden="true">SHAIKH</span>
          </h1>

          {/* Tagline Box */}
          <div className="hero-glass absolute -bottom-12 right-0 z-30 hidden px-6 py-3 md:block lg:-bottom-14 lg:right-8 backdrop-blur-xl" style={{ backgroundColor: 'rgba(255, 107, 0, 0.1)', border: '1px solid rgba(255, 107, 0, 0.3)' }}>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-orange">3+ YRS EXP</span>
            <span className="mx-3 text-text-muted">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">BUILDS IN PUBLIC</span>
            <span className="mx-3 text-text-muted">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">SHIPS TO PROD</span>
          </div>
        </div>

        {/* Mobile Hero Image */}
        <div className="hero-image mt-8 xl:hidden">
          <div className="inline-block overflow-hidden border-text-primary" style={{ borderWidth: '4px', boxShadow: '6px 6px 0 var(--color-accent-orange)' }}>
            <picture>
              <source type="image/webp" srcSet="/images/profile.webp" sizes="140px" />
              <img src="/images/profile.webp" alt="Abubakar Shaikh" width="140" height="140" fetchPriority="high" />
            </picture>
          </div>
        </div>

        {/* Divider Line */}
        <div className="hero-divider my-8 h-[4px] w-full origin-left bg-accent-orange" aria-hidden="true"></div>

        {/* Description */}
        <p className="hero-subtitle max-w-xl">
          <span className="text-display-sm font-display text-text-secondary">Specializing in </span>
          <Link className="font-mono text-lg font-medium text-accent-orange transition-colors hover:text-accent-orange-light" to="/thoughts">React</Link>
          <span className="text-display-sm font-display text-text-secondary">, </span>
          <Link className="font-mono text-lg font-medium text-accent-orange transition-colors hover:text-accent-orange-light" to="/thoughts">Node.js</Link>
          <span className="text-display-sm font-display text-text-secondary">, </span>
          <Link className="font-mono text-lg font-medium text-accent-orange transition-colors hover:text-accent-orange-light" to="/thoughts">NestJS</Link>
          <span className="text-display-sm font-display text-text-secondary">, </span>
          <Link className="font-mono text-lg font-medium text-accent-orange transition-colors hover:text-accent-orange-light" to="/thoughts">Docker</Link>
          <span className="text-display-sm font-display text-text-secondary">, </span>
          <Link className="font-mono text-lg font-medium text-accent-orange transition-colors hover:text-accent-orange-light" to="/thoughts">AWS</Link>
          <span className="text-display-sm font-display text-text-secondary"> &amp; </span>
          <Link className="font-mono text-lg font-medium text-accent-orange transition-colors hover:text-accent-orange-light" to="/thoughts">Microservices</Link>
        </p>

        {/* Social Links */}
        <nav className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Social links">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener"
              className="hero-link flex items-center gap-3 border-surface-border bg-surface-elevated px-5 py-4 text-sm font-semibold text-text-primary transition-all duration-150 hover:border-accent-orange hover:text-accent-orange"
              style={{ borderWidth: '3px', borderStyle: 'solid', boxShadow: '4px 4px 0 rgba(255, 107, 0, 0.15)' }}
            >
              <social.icon width="20" height="20" className="lucide" aria-hidden="true" />
              {social.label}
            </a>
          ))}
        </nav>

        {/* Bio */}
        <p className="hero-bio mt-8 max-w-lg text-sm leading-relaxed text-text-secondary">
          3+ years shipping production-grade applications at NEXENSTIAL LLP, previously Freelancing.
        </p>

        {/* Mobile Tagline / Info */}
        <div className="hero-glass glass-card mt-6 inline-flex w-fit px-4 py-2 md:hidden">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-orange">3+ years</span>
          <span className="mx-2 text-text-muted">|</span>
          <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">Full Stack / DevOps</span>
        </div>
      </div>

      {/* Marquees */}
      <div className="hero-bottom mt-16 lg:mt-20">
        <div className="section-container mb-4">
          <p className="mono-accent font-mono text-xs uppercase tracking-wider text-accent-orange">// things_i_work_with</p>
        </div>

        {/* Row 1 - Left */}
        <div className="overflow-hidden bg-surface-elevated py-2.5" style={{ borderTop: '3px solid var(--color-accent-orange)' }} aria-hidden="true">
          <div className="marquee-left marquee-track">
            <div className="flex">
              {renderItems(skillsRow1)}
            </div>
            <div className="flex">
              {renderItems(skillsRow1)}
            </div>
            <div className="flex">
              {renderItems(skillsRow1)}
            </div>
            <div className="flex">
              {renderItems(skillsRow1)}
            </div>
          </div>
        </div>

        {/* Row 2 - Right */}
        <div className="overflow-hidden bg-surface-elevated py-2.5" style={{ borderBottom: '3px solid var(--color-accent-orange)' }} aria-hidden="true">
          <div className="marquee-right marquee-track">
            <div className="flex">
              {renderItems(skillsRow2)}
            </div>
            <div className="flex">
              {renderItems(skillsRow2)}
            </div>
            <div className="flex">
              {renderItems(skillsRow2)}
            </div>
            <div className="flex">
              {renderItems(skillsRow2)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

