import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Github, Instagram, ArrowUpRight, Mail } from 'lucide-react';
import { getAllSkills } from '@/data/queries/getSkills';

const socials = [
  { label: 'GitHub', href: 'https://github.com/abubakar-shaikh-dev', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abubakar-shaikh-dev', icon: Linkedin },
  { label: 'X / Twitter', href: 'https://x.com/abubakarshaikh_dev', icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/abubakarshaikh.dev', icon: Instagram },
];

const focusTech = ['React', 'Node.js', 'NestJS', 'TypeScript', 'AWS', 'Docker', 'Microservices', 'PostgreSQL'];

export async function HeroSection() {
  const skillsData = await getAllSkills();
  const allSkillsList = Array.from(new Set([...(skillsData.row1 || []), ...(skillsData.row2 || [])]));

  return (
    <section id="hero" className="relative border-b border-border-primary/60 bg-bg-primary pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="section-container">
        {/* Availability Badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border-primary/80 bg-bg-secondary px-3.5 py-1.5 text-xs text-text-secondary animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono">Available for full-stack &amp; cloud engineering roles</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Main Content */}
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '180ms' }}>
              Abubakar Shaikh
            </h1>

            <p className="mt-3 font-mono text-base font-medium text-accent sm:text-lg animate-fade-in-up" style={{ animationDelay: '260ms' }}>
              Full Stack Software Engineer
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg animate-fade-in-up" style={{ animationDelay: '340ms' }}>
              3+ years of experience architecting and shipping production-grade web applications, microservices, and cloud systems. Currently engineering at NEXENSTIAL LLP.
            </p>

            {/* Key Focus Technologies */}
            <div className="mt-6 flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '420ms' }}>
              {focusTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border-primary/80 bg-bg-secondary/60 px-3 py-1 font-mono text-xs text-text-secondary transition-[border-color,color,transform] duration-150 ease-out-premium hover:border-accent/40 hover:text-white active:scale-97 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs & Social Links */}
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97"
              >
                <span>View Projects</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border-primary bg-bg-secondary px-5 py-3 text-sm font-medium text-white transition-[border-color,color,transform] duration-150 ease-out-premium hover:border-accent hover:text-accent active:scale-97"
              >
                <Mail className="h-4 w-4" />
                <span>Get in Touch</span>
              </Link>

              <div className="ml-2 flex items-center gap-1 border-l border-border-primary/60 pl-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-md text-text-muted transition-[background-color,color,transform] duration-150 ease-out-premium hover:bg-bg-secondary hover:text-white active:scale-95"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Clean Profile Image */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end animate-fade-in-up" style={{ animationDelay: '380ms' }}>
            <div className="relative group">
              <div className="overflow-hidden rounded-xl border border-border-primary bg-bg-secondary p-1.5 shadow-xl">
                <Image
                  src="/images/profile_2.webp"
                  alt="Abubakar Shaikh — Full Stack Software Engineer profile photo"
                  width={256}
                  height={256}
                  priority
                  unoptimized
                  className="h-56 w-56 sm:h-64 sm:w-64 rounded-lg object-cover grayscale transition-[filter,transform] duration-250 ease-out-premium group-hover:grayscale-0 group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-3 flex items-center justify-between px-1 font-mono text-xs text-text-muted">
                <span>Based in India</span>
                <span>3+ Yrs Exp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Quiet Tech Stack List */}
        <div className="mt-16 border-t border-border-primary/40 pt-8 animate-fade-in-up" style={{ animationDelay: '580ms' }}>
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Core Technologies &amp; Capabilities
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-xs text-text-secondary">
            {allSkillsList.map((skill) => (
              <span key={skill} className="flex items-center gap-2 transition-colors duration-150 hover:text-white">
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
