'use client';

import { useState } from 'react';
import { Mail, Linkedin, Twitter, Github, Instagram, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abubakar-shaikh-dev', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/abubakar-shaikh-dev', icon: Github },
  { label: 'X / Twitter', href: 'https://x.com/abubakarshaikh_dev', icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/abubakarshaikh.dev', icon: Instagram },
];

export function ContactContentSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Sending your message...');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        toast.error(result.error || 'Something went wrong. Please try again.');
      } else {
        toast.success('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      toast.dismiss(toastId);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-20">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div className="border border-border-primary bg-bg-secondary p-8 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent-orange">
                // GET_IN_TOUCH
              </h3>
              <p className="text-lg text-white leading-relaxed">
                Have an interesting project, job opportunity, or tech query? Let&apos;s connect and build something solid together.
              </p>
              <p className="text-sm text-text-secondary">
                I am currently active and available for Full Stack, Backend, or DevOps engagements. Response time is typically under 24 hours.
              </p>
            </div>

            <div className="space-y-2">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Direct Email
              </span>
              <a
                href="mailto:shaikhabubakar2380@gmail.com"
                className="inline-flex w-full items-center gap-3 border border-border-primary bg-bg-secondary px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-accent-orange"
              >
                <Mail className="h-5 w-5 text-accent-orange" />
                shaikhabubakar2380@gmail.com
              </a>
            </div>

            <div className="space-y-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Social Networks
              </span>
              <div className="grid grid-cols-2 gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-border-primary bg-bg-secondary px-4 py-3 text-xs font-semibold text-white transition-all duration-200 hover:border-accent-orange"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-border-primary bg-bg-secondary p-8 lg:col-span-3">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-accent-orange">
              // SEND_A_MESSAGE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Full Name <span className="text-accent-orange">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className={`w-full border bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors ${
                    errors.name ? 'border-red-500' : 'border-border-primary'
                  }`}
                />
                {errors.name && <span className="block text-xs text-red-500 font-mono">{errors.name}</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Email Address <span className="text-accent-orange">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className={`w-full border bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors ${
                    errors.email ? 'border-red-500' : 'border-border-primary'
                  }`}
                />
                {errors.email && <span className="block text-xs text-red-500 font-mono">{errors.email}</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Project, Job Opportunity, Consultancy..."
                  className="w-full border border-border-primary bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Message <span className="text-accent-orange">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or inquiry..."
                  className={`w-full border bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-border-primary'
                  }`}
                />
                {errors.message && <span className="block text-xs text-red-500 font-mono">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 border border-accent-orange bg-accent-orange py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-orange-deep disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending Message...</>
                ) : (
                  <><Send className="h-4 w-4" /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
