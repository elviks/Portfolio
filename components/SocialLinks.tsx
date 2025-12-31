import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/elviks' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/elvik-sharma-13b52b202/' },
  { icon: Mail, label: 'Email', href: 'mailto:elviksharma111@gmail.com' }
];

export default function SocialLinks() {
  return (
    <div className="mb-12 flex gap-4 animate-fadeIn md:gap-6">
      {socials.map((social) => (
        <a key={social.label} href={social.href} target="_blank" className="group relative h-14 w-14 md:h-16 md:w-16">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100" />
          <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-green-500/30 bg-black transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-green-400">
            <social.icon className="h-6 w-6 text-green-400 transition-transform group-hover:scale-110 md:h-7 md:w-7" />
          </div>
        </a>
      ))}
    </div>
  );
}