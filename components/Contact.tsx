interface ContactProps {
  isVisible: boolean;
}

export default function Contact({ isVisible }: ContactProps) {
  return (
    <section id="contact" className="relative px-4 py-20 md:px-6 md:py-32" data-animate>
      <div
        className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="mb-6 text-5xl font-black md:mb-8 md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            LET&apos;S BUILD
          </span>
        </h2>

        <p className="mb-12 text-lg text-gray-400 md:mb-16 md:text-xl lg:text-2xl">
          Ready to create something extraordinary? Let&apos;s connect.
        </p>

        <a href="mailto:dev@example.com" className="group relative inline-block">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-100 animate-pulse" />
          <div className="relative rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-lg font-bold transition-all duration-300 group-hover:scale-110 md:px-12 md:py-6 md:text-xl">
            START A PROJECT
          </div>
        </a>
      </div>
    </section>
  );
}