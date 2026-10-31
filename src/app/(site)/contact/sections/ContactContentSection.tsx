'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, Twitter, Instagram, Loader2, Send } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/atoms/Reveal';
import { Section } from '@/components/atoms/Section';
import { SOCIAL_LINKS } from '@/lib/constants';
import { EASE_OUT_PREMIUM } from '@/lib/motion';

const socialIcons = { LinkedIn: Linkedin, GitHub: Github, 'X / Twitter': Twitter, Instagram: Instagram };

export function ContactContentSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

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
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  return (
    <Section>
    <div className="mx-auto grid w-full max-w-2xl gap-12 lg:max-w-none lg:grid-cols-5">
        <Reveal className="space-y-8 lg:col-span-2">
          <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-8 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
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
              className="inline-flex w-full items-center gap-3 rounded-md border border-border-primary/80 bg-bg-secondary/60 px-6 py-4 text-base font-semibold text-white transition-[border-color,transform] duration-150 ease-out-premium hover:border-accent active:scale-98"
            >
              <Mail className="h-5 w-5 text-accent" />
              shaikhabubakar2380@gmail.com
            </a>
          </div>

          <div className="space-y-3">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">
              Social Networks
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SOCIAL_LINKS.map((social) => {
                const SocialIcon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border-primary/80 bg-bg-secondary/60 px-4 py-3 text-xs font-semibold text-white transition-[border-color,transform] duration-150 ease-out-premium hover:border-accent active:scale-97"
                >
                  <SocialIcon className="h-4 w-4" />
                  {social.label}
                </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-3">
        <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-8 lg:col-span-3 min-h-[620px] flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
                transition={{ duration: 0.3, ease: EASE_OUT_PREMIUM }}
                className="w-full space-y-6"
              >
                <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-accent">
                  // SEND_A_MESSAGE
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-semibold text-white uppercase tracking-wider">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      disabled={isSubmitting}
                      className={`w-full rounded-md border bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent transition-[border-color,opacity,background-color] duration-150 ease-out-premium disabled:opacity-60 disabled:bg-bg-primary/50 disabled:border-border-primary/50 disabled:cursor-not-allowed ${
                        errors.name ? 'border-red-500' : 'border-border-primary'
                      }`}
                    />
                    {errors.name && <span className="block text-xs text-red-500 font-mono">{errors.name}</span>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-semibold text-white uppercase tracking-wider">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      disabled={isSubmitting}
                      className={`w-full rounded-md border bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent transition-[border-color,opacity,background-color] duration-150 ease-out-premium disabled:opacity-60 disabled:bg-bg-primary/50 disabled:border-border-primary/50 disabled:cursor-not-allowed ${
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
                      disabled={isSubmitting}
                      className="w-full rounded-md border border-border-primary bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent transition-[border-color,opacity,background-color] duration-150 ease-out-premium disabled:opacity-60 disabled:bg-bg-primary/50 disabled:border-border-primary/50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-semibold text-white uppercase tracking-wider">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or inquiry..."
                      disabled={isSubmitting}
                      className={`w-full rounded-md border bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent transition-[border-color,opacity,background-color] duration-150 ease-out-premium resize-none disabled:opacity-60 disabled:bg-bg-primary/50 disabled:border-border-primary/50 disabled:cursor-not-allowed ${
                        errors.message ? 'border-red-500' : 'border-border-primary'
                      }`}
                    />
                    {errors.message && <span className="block text-xs text-red-500 font-mono">{errors.message}</span>}
                  </div>

                  {submitError && (
                    <div className="border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-mono text-xs font-bold">
                        !
                      </div>
                      <div>
                        <p className="font-semibold font-mono text-xs uppercase tracking-wider">// SUBMISSION_FAILED</p>
                        <p className="text-xs text-red-400/80 mt-1">{submitError}</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending Message...</>
                    ) : (
                      <><Send className="h-4 w-4" /> Send Message</>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : -15 }}
                transition={{ duration: 0.4, ease: EASE_OUT_PREMIUM }}
                className="flex flex-col items-center justify-center text-center py-6 space-y-6 w-full"
              >
                {/* Dynamic SVG Path drawing Checkmark */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-8 ring-emerald-500/5">
                  <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.path
                      d="M20 6 9 17l-5-5"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: {
                            pathLength: { type: "spring", stiffness: 100, damping: 20, delay: 0.15 },
                            opacity: { duration: 0.01, delay: 0.15 }
                          }
                        }
                      }}
                    />
                  </motion.svg>
                </div>

                <div className="space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-accent">// RECORD_SAVED</h3>
                  <h4 className="text-3xl font-bold text-white tracking-tight">Message Received!</h4>
                  <p className="max-w-md text-text-secondary text-sm leading-relaxed text-balance mx-auto">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your message has been saved and I will get back to you at <span className="text-white font-semibold">{formData.email}</span> within 24 hours.
                  </p>
                </div>

                {/* Terminal style Submitted Record Receipt */}
                <div className="w-full max-w-md rounded-md border border-border-primary bg-bg-primary p-5 text-left font-mono text-xs text-text-secondary space-y-3 select-none">
                  <p className="text-text-muted">// SUBMITTED_RECORD</p>
                  <div className="grid grid-cols-[60px_1fr] gap-x-2 gap-y-1">
                    <span className="text-accent">NAME:</span>
                    <span className="text-white truncate">{formData.name}</span>
                    <span className="text-accent">EMAIL:</span>
                    <span className="text-white truncate">{formData.email}</span>
                    {formData.subject && (
                      <>
                        <span className="text-accent">SUBJECT:</span>
                        <span className="text-white truncate">{formData.subject}</span>
                      </>
                    )}
                  </div>
                  <div className="border-t border-border-primary pt-3 mt-2">
                    <p className="text-accent mb-1">MESSAGE:</p>
                    <p className="text-text-muted whitespace-pre-wrap break-words max-h-[120px] overflow-y-auto pr-1">
                      {formData.message}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-2 rounded-md border border-border-primary bg-bg-primary hover:border-accent hover:bg-[#111111] px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-white transition-[border-color,background-color,color] duration-200 active:scale-97"
                >
                  <span>// SEND_ANOTHER_MESSAGE</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </Reveal>
      </div>
    </Section>
  );
}
