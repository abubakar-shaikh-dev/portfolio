import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Github, Instagram, ArrowUpRight, Mail } from 'lucide-react';
import { getAllSkills } from '@/data/queries/getSkills';
import { SOCIAL_LINKS } from '@/lib/constants';

const socialIcons = { LinkedIn: Linkedin, GitHub: Github, 'X / Twitter': Twitter, Instagram: Instagram };

const focusTech = ['React', 'Node.js', 'NestJS', 'TypeScript', 'AWS', 'Docker', 'Microservices', 'PostgreSQL'];

export async function HeroSection() {
  const skillsData = await getAllSkills();
  const allSkillsList = Array.from(new Set([...(skillsData.row1 || []), ...(skillsData.row2 || [])]));

  return (
    <section id="hero" className="relative overflow-hidden border-b border-border-primary/60 bg-bg-primary pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20">
      {/* Subtle Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60" />

      <div className="section-container relative z-10">
        {/* Status Line — desktop/tablet only; the portrait leads on phones */}
        <div className="mb-6 hidden items-center justify-center gap-2 font-mono text-xs text-text-secondary animate-fade-in-up sm:mb-8 sm:flex sm:justify-start" style={{ animationDelay: '100ms' }}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>Available for full-stack &amp; cloud engineering roles</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Profile Photo — leads on phones/tablets, right column on desktop */}
          <div className="order-1 flex justify-center animate-fade-in-up lg:order-2 lg:col-span-4 lg:justify-end" style={{ animationDelay: '200ms' }}>
            <div className="relative group">
              <div className="overflow-hidden rounded-xl border border-border-primary bg-bg-secondary p-1 animate-fade-in-up">
                <Image
                  src="/images/abubakar-shaikh-profile.webp"
                  alt="Abubakar Shaikh — Full Stack Software Engineer profile photo"
                  width={256}
                  height={256}
                  priority
                  unoptimized
                  className="h-44 w-44 rounded-lg object-cover grayscale transition-[filter] duration-300 ease-out-premium group-hover:grayscale-0 sm:h-60 sm:w-60 lg:h-64 lg:w-64"
                />
              </div>

              <div className="mt-2 flex items-center justify-center gap-3 whitespace-nowrap px-1 font-mono text-[11px] text-text-muted sm:justify-between sm:text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Based in India
                </span>
                <span>3+ years</span>
              </div>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="order-2 lg:order-1 lg:col-span-8">
            <div className="text-center sm:text-left">
              <h1 className="font-display text-4xl font-medium tracking-tight text-white animate-fade-in-up sm:text-6xl lg:text-7xl" style={{ animationDelay: '260ms' }}>
                Abubakar Shaikh
              </h1>

              <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-base font-medium text-accent animate-fade-in-up sm:text-lg" style={{ animationDelay: '320ms' }}>
                <span>Full Stack Software Engineer</span>
              </p>
            </div>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary animate-fade-in-up sm:mt-6 sm:text-lg" style={{ animationDelay: '380ms' }}>
              3+ years of experience architecting and shipping web applications, microservices, and cloud systems. Currently engineering at NEXENSTIAL LLP.
            </p>

            {/* Key Focus Tech Tags — trimmed to the top four on phones */}
            <div className="mt-5 flex flex-wrap gap-2 animate-fade-in-up sm:mt-6" style={{ animationDelay: '360ms' }}>
              {focusTech.map((tech, index) => (
                <span
                  key={tech}
                  className={`rounded-md border border-border-primary/80 bg-bg-secondary/80 px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent/40 hover:text-white cursor-default ${index > 3 ? 'hidden sm:inline' : ''}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons & Socials */}
            <div className="mt-8 flex flex-col gap-4 animate-fade-in-up sm:mt-10 sm:flex-row sm:items-center sm:gap-4" style={{ animationDelay: '420ms' }}>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/projects"
                  className="group flex-1 sm:flex-initial inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-black transition-transform duration-150 ease-out-premium hover:bg-white/90 active:scale-97"
                >
                  <span>View Projects</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/contact"
                  className="flex-1 sm:flex-initial inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border-primary bg-bg-secondary px-5 text-sm font-medium text-white transition-colors duration-150 hover:border-accent hover:text-accent active:scale-97"
                >
                  <Mail className="h-4 w-4" />
                  <span>Get in Touch</span>
                </Link>
              </div>

              {/* Social Links Bar */}
              <div className="flex items-center justify-center gap-1 pt-2 sm:justify-start sm:pt-0 sm:border-l sm:border-border-primary/60 sm:pl-4">
                {SOCIAL_LINKS.map((social) => {
                  const SocialIcon = socialIcons[social.label as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-colors duration-150 hover:bg-bg-secondary hover:text-white active:scale-97"
                    >
                      <SocialIcon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack List */}
        <div className="mt-10 border-t border-border-primary/40 pt-6 animate-fade-in-up sm:mt-16 sm:pt-8" style={{ animationDelay: '480ms' }}>
          <p className="font-mono text-[11px] sm:text-xs text-text-muted">
            Core technologies &amp; capabilities
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-text-secondary">
            {allSkillsList.map((skill) => (
              <span key={skill} className="flex items-center gap-1.5 transition-colors duration-150 hover:text-white">
                <span className="h-1 w-1 rounded-full bg-accent/60" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
