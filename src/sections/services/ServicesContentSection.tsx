import { motion } from 'framer-motion';
import { Layout, Server, Terminal, Cpu } from 'lucide-react';
import { services, areasOfExpertise, previousClients } from '@/data/services';

export function ServicesContentSection() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="section-container">
        {/* Core Services Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            let techStack: string[] = [];
            if (service.id === '1') {
              techStack = ['React', 'Next.js', 'TypeScript', 'Zustand', 'TailwindCSS', 'Framer Motion'];
            } else if (service.id === '2') {
              techStack = ['NestJS', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'BullMQ'];
            } else if (service.id === '3') {
              techStack = ['Docker', 'AWS Infrastructure', 'Nginx', 'GitHub Actions', 'Linux Shell', 'CI/CD'];
            } else if (service.id === '4') {
              techStack = ['Twilio Voice API', 'Deepgram STT', 'WebSockets', 'OpenAI / LLMs', 'Socket.io'];
            }

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between border border-border-primary bg-bg-secondary p-6 md:p-8 transition-all duration-300 hover:border-accent-orange hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(255,102,0,0.1)]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-orange">
                      // SERVICE_0{index + 1}
                    </span>
                    <span className="font-mono text-2xl font-black text-white/5 group-hover:text-accent-orange/10 transition-colors select-none">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="mt-4 text-xl font-bold text-white transition-colors group-hover:text-accent-orange">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border-primary/50 pt-4">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-text-muted mb-2 select-none">
                    Featured Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-border-primary bg-bg-primary px-2 py-0.5 font-mono text-[10px] text-text-secondary transition-colors group-hover:border-accent-orange/20 group-hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expertise matrix */}
        <div className="mt-16 md:mt-24 mb-8 md:mb-10">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-orange">
            // expertise_matrix
          </span>
          <h2 className="text-display-md font-display font-bold text-white mt-2">
            Areas of Expertise
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areasOfExpertise.map((area, index) => {
            const tags = area.items.split(',').map(item => item.trim());
            
            // Map category specifics
            let terminalName = '';
            let IconComponent = Layout;
            
            if (index === 0) {
              terminalName = 'frontend.sh';
              IconComponent = Layout;
            } else if (index === 1) {
              terminalName = 'backend.env';
              IconComponent = Server;
            } else if (index === 2) {
              terminalName = 'devops.yml';
              IconComponent = Terminal;
            } else if (index === 3) {
              terminalName = 'ai_agent.py';
              IconComponent = Cpu;
            }

            return (
              <motion.div
                key={area.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col border border-border-primary bg-bg-secondary transition-all duration-300 hover:border-accent-orange hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(255,102,0,0.1)]"
              >
                {/* Console Bar */}
                <div className="flex items-center justify-between border-b border-border-primary/50 bg-[#0c0c0c] px-4 py-3 select-none">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/30 group-hover:bg-red-500/60 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/30 group-hover:bg-yellow-500/60 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/30 group-hover:bg-green-500/60 transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] text-text-muted">{terminalName}</span>
                </div>

                {/* Console Body */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <IconComponent className="h-4 w-4 text-accent-orange" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      {area.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border-primary bg-bg-primary px-2.5 py-1 font-mono text-[10px] text-text-secondary transition-all duration-200 hover:border-accent-orange hover:bg-accent-orange/5 hover:text-white cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Career Timeline */}
        <div className="mt-16 md:mt-24 mb-8 md:mb-10">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-orange">
            // career_history
          </span>
          <h2 className="text-display-md font-display font-bold text-white mt-2">
            Previous Clients &amp; Employers
          </h2>
        </div>

        <div className="relative border-l border-border-primary pl-4 md:pl-6 ml-2 md:ml-4 space-y-6 md:space-y-8">
          {previousClients.map((client, index) => (
            <motion.div
              key={client.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Marker node precisely centered on the border line */}
              <div className="absolute -left-[21px] md:-left-[31px] top-1.5 h-[9px] w-[9px] rounded-full border-2 border-[#0a0a0a] bg-accent-orange ring-4 ring-[#0a0a0a]" />

              <div className="border border-border-primary bg-bg-secondary p-6 md:p-8 hover:border-accent-orange/30 transition-colors">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-orange">
                      {client.role}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {client.company}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-text-muted uppercase tracking-widest bg-bg-primary border border-border-primary px-3 py-1 w-fit">
                    {client.company === 'NEXENSTIAL LLP' ? 'Sep 2023 - Present' : 'Prior to 2023'}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {client.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Let's Talk callout box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 border border-accent-orange bg-accent-orange/5 p-6 md:p-12 text-center relative overflow-hidden"
          style={{ borderWidth: '2px' }}
        >
          {/* Subtle background wordmark */}
          <div className="absolute -right-12 -bottom-12 font-mono text-9xl font-black text-accent-orange/[0.03] select-none pointer-events-none uppercase">
            talk
          </div>

          <span className="font-mono text-xs uppercase tracking-wider text-accent-orange font-bold">
            // HIRE_ME
          </span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-4">
            Ready to kick off a project?
          </h2>
          <p className="max-w-xl mx-auto text-sm text-text-secondary leading-relaxed mb-8">
            If you are looking for dedicated expertise to implement features, audit and optimize backend architectures, or automate deployments, let's align.
          </p>
          <a
            href="https://www.linkedin.com/in/abubakar-shaikh-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-light text-white px-8 py-4 font-bold text-sm uppercase tracking-wider transition-colors"
            style={{ boxShadow: '4px 4px 0 rgba(255, 255, 255, 0.1)' }}
          >
            Let's Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
