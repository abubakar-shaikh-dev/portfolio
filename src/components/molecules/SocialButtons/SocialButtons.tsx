import { Linkedin, Twitter, Github, Instagram } from 'lucide-react';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abubakar-shaikh-dev', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/abubakar-shaikh-dev', icon: Github },
  { label: 'X / Twitter', href: 'https://x.com/abubakarshaikh_dev', icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/abubakarshaikh.dev', icon: Instagram },
];

export function SocialButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 border border-border-primary bg-bg-secondary px-5 py-3 text-sm font-medium text-white transition-[border-color,transform] duration-150 ease-out-premium active:scale-97 hover:border-accent-orange"
        >
          <social.icon className="h-4 w-4" />
          {social.label}
        </a>
      ))}
    </div>
  );
}
