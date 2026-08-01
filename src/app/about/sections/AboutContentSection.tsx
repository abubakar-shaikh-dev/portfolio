import Link from 'next/link';

export function AboutContentSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-8 md:p-12 shadow-xl space-y-10">
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                // BIOGRAPHY
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                I am Abubakar Shaikh, a Full Stack Software Engineer based in India. I specialize in building, deploying, and maintaining scalable web applications and high-performance backend APIs. Currently, I am a Full Stack Software Engineer at Nexenstial LLP, where I focus on shipping production-ready applications, maintaining CI/CD pipelines, and integrating services within modern containerized architectures.
              </p>
            </div>

            <div className="border-t border-border-primary/40 pt-8">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                // CAREER_TIMELINE
              </h2>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li className="rounded-lg border border-border-primary/60 bg-bg-primary/50 p-4">
                  <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                    <strong className="text-base text-white">Full Stack Software Engineer at NEXENSTIAL LLP</strong>
                    <span className="font-mono text-xs text-text-muted mt-1 sm:mt-0">Sep 2023 - Present</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-text-secondary">
                    Leading and implementing core frontend &amp; backend features using the MERN stack. Developing high-performance REST APIs, real-time WebSocket communication, and orchestrating Docker-based deployment workflows.
                  </p>
                </li>

                <li className="rounded-lg border border-border-primary/60 bg-bg-primary/50 p-4">
                  <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                    <strong className="text-base text-white">Freelance Full Stack Developer</strong>
                    <span className="font-mono text-xs text-text-muted mt-1 sm:mt-0">Prior to 2023</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-text-secondary">
                    Designed custom automation setups, built responsive websites, and delivered browser-native web tools for individual clients and small teams.
                  </p>
                </li>
              </ul>
            </div>

            <div className="border-t border-border-primary/40 pt-8">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                // CERTIFICATIONS_&amp;_CORE_FOCUS
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                I am certified as an <strong className="text-white font-medium">AWS Certified DevOps Engineer</strong>, which reflects my passion for pipeline automation, security, and cloud scalability. I regularly manage Linux/Ubuntu servers, configure Nginx reverse proxies, automate DNS hosting, and establish CI/CD workflows.
              </p>
            </div>

            <div className="border-t border-border-primary/40 pt-8">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                // OPEN_SOURCE_TOOLING
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                I love building utilities that improve developer experience. I actively maintain multiple{' '}
                <Link href="/open-source" className="text-accent font-medium transition-colors hover:text-white">
                  open source projects
                </Link>
                , including SKELR, FEATIFY, and XENC.
              </p>
            </div>

            <div className="border-t border-border-primary/40 pt-8">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                // GET_IN_TOUCH
              </h2>
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <a href="https://www.linkedin.com/in/abubakar-shaikh-dev" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border-primary bg-bg-primary px-3.5 py-2 text-text-secondary transition-[border-color,color] duration-150 hover:border-accent hover:text-white">LinkedIn</a>
                <a href="https://github.com/abubakar-shaikh-dev" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border-primary bg-bg-primary px-3.5 py-2 text-text-secondary transition-[border-color,color] duration-150 hover:border-accent hover:text-white">GitHub</a>
                <a href="https://x.com/abubakarshaikh_dev" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border-primary bg-bg-primary px-3.5 py-2 text-text-secondary transition-[border-color,color] duration-150 hover:border-accent hover:text-white">X / Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
