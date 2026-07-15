import Link from 'next/link';

export function AboutContentSection() {
  return (
    <section className="pb-20">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <div className="border border-border-primary bg-bg-secondary p-8 md:p-12">
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-accent-orange underline underline-offset-4 decoration-1">
                Biography
              </h2>
              <p className="leading-relaxed text-text-secondary">
                I am Abubakar Shaikh, a Full Stack Software Engineer based in India. I specialize in building, deploying, and maintaining scalable web applications and high-performance backend APIs. Currently, I am a Full Stack Software Engineer at Nexenstial LLP, where I focus on shipping production-ready applications, maintaining CI/CD pipelines, and integrating services within modern containerized architectures.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-accent-orange underline underline-offset-4 decoration-1">
                Career Timeline
              </h2>
              <ul className="list-disc space-y-3 pl-5 text-text-secondary">
                <li>
                  <strong className="text-white">Full Stack Software Engineer at NEXENSTIAL LLP</strong> (Sep 2023 - Present):
                  <br />
                  Leading and implementing core frontend & backend features using the MERN stack. Developing high-performance REST APIs, real-time WebSocket communication, and orchestrating Docker-based deployment workflows.
                </li>
                <li>
                  <strong className="text-white">Freelance Full Stack Developer</strong> (Prior to 2023):
                  <br />
                  Designed custom automation setups, built responsive websites, and delivered browser-native web tools for individual clients and small teams.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-accent-orange underline underline-offset-4 decoration-1">
                Certifications & Core Focus
              </h2>
              <p className="leading-relaxed text-text-secondary">
                I am certified as an <strong>AWS Certified DevOps Engineer</strong>, which reflects my passion for pipeline automation, security, and cloud scalability. I regularly manage Linux/Ubuntu servers, configure Nginx reverse proxies, automate DNS hosting, and establish CI/CD workflows.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-accent-orange underline underline-offset-4 decoration-1">
                Open Source Tooling
              </h2>
              <p className="leading-relaxed text-text-secondary">
                I love building utilities that improve developer experience. I actively maintain multiple{' '}
                <Link href="/open-source" className="text-accent-orange hover:underline">
                  open source projects
                </Link>
                , including SKELR, FEATIFY, and XENC.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-accent-orange underline underline-offset-4 decoration-1">
                Get In Touch
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-text-secondary">
                <li><a href="https://www.linkedin.com/in/abubakar-shaikh-dev" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">LinkedIn</a></li>
                <li><a href="https://github.com/abubakar-shaikh-dev" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">GitHub</a></li>
                <li><a href="https://x.com/abubakarshaikh_dev" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">X / Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
