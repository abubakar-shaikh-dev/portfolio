import { Section } from '@/components/atoms/Section';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Layout, Server, Terminal, Cpu } from 'lucide-react';
import { getAllServices, getExpertiseAreas, getPreviousClients } from '@/data/queries/getServices';

export async function ServicesContentSection() {
  const services = await getAllServices();
  const areas = await getExpertiseAreas();
  const clients = await getPreviousClients();

  const icons = [Layout, Server, Terminal, Cpu];
  const terminalNames = ['frontend.sh', 'backend.env', 'devops.yml', 'ai_agent.py'];

  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 md:p-8 transition-[border-color,background-color,transform] duration-150 ease-out-premium hover:border-accent/40 hover:bg-bg-secondary active:scale-98"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent">
                    // SERVICE_0{index + 1}
                  </span>
                  <span className="font-mono text-2xl font-black text-white/5 group-hover:text-accent/10 transition-colors select-none">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-white transition-colors group-hover:text-accent">
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
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border-primary/60 bg-bg-primary px-2.5 py-0.5 font-mono text-[10px] text-text-muted transition-colors group-hover:border-accent/20 group-hover:text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24">
          <SectionHeader label="EXPERTISE_MATRIX" title="Areas of Expertise" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => {
            const tags = area.items.split(',').map((item) => item.trim());
            const IconComponent = icons[index];

            return (
              <div
                key={area.category}
                className="group flex flex-col rounded-xl border border-border-primary/80 bg-bg-secondary/60 transition-[border-color,background-color,transform] duration-150 ease-out-premium hover:border-accent/40 hover:bg-bg-secondary overflow-hidden active:scale-98"
              >
                <div className="flex items-center justify-between border-b border-border-primary/50 bg-[#0c0c0c] px-4 py-3 select-none">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/30 group-hover:bg-red-500/60 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/30 group-hover:bg-yellow-500/60 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/30 group-hover:bg-green-500/60 transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] text-text-muted">{terminalNames[index]}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <IconComponent className="h-4 w-4 text-accent" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      {area.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border-primary/60 bg-bg-primary px-2.5 py-0.5 font-mono text-[10px] text-text-muted transition-colors duration-150 group-hover:border-accent/20 group-hover:text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 md:mt-24">
          <SectionHeader label="CAREER_HISTORY" title="Previous Clients & Employers" />
        </div>

        <div className="relative border-l border-border-primary/60 pl-4 md:pl-6 ml-2 md:ml-4 space-y-6 md:space-y-8">
          {clients.map((client) => (
            <div key={client.company} className="relative">
              <div className="absolute -left-[21px] md:-left-[31px] top-4 h-[9px] w-[9px] rounded-full border-2 border-bg-primary bg-accent ring-4 ring-bg-primary" />
              <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 md:p-8 hover:border-accent/30 transition-[border-color,background-color] duration-150">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent">
                      {client.role}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{client.company}</h3>
                  </div>
                  <span className="font-mono text-xs text-text-muted bg-bg-primary border border-border-primary/60 px-3 py-1 rounded-md w-fit">
                    {client.company === 'NEXENSTIAL LLP' ? 'Sep 2023 - Present' : 'Prior to 2023'}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
    </Section>
  );
}
