import Image from "next/image"
import Link from "next/link"

export default function About() {
  return (
    <main className="relative min-h-screen pt-24 pb-12">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Terminal Header */}
        <div className="mb-12">
          <p className="text-sm font-mono text-primary/70 mb-2">&lt; System.Rahul &gt; v1.0.0</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Dev_Access <span className="text-primary">// Granted</span>
          </h1>
        </div>

        {/* Main Content - Terminal Container */}
        <div className="border border-primary/20 rounded-lg bg-muted/50 backdrop-blur-sm p-6 md:p-8 box-glow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left - Profile */}
            <div className="md:col-span-1 flex flex-col items-center">
              {/* Profile Image */}
              <div className="relative w-48 h-48 mb-6 rounded-lg overflow-hidden border-2 border-primary/30 hover:border-primary transition-colors group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <Image
                  src="/developer-profile-photo-cyber-aesthetic.jpg"
                  alt="Rahul Profile"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="border border-primary/20 rounded p-3 text-center hover:bg-primary/5 transition-colors">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-gray-400 uppercase font-mono tracking-wider">Years Exp</div>
                </div>
                <div className="border border-primary/20 rounded p-3 text-center hover:bg-primary/5 transition-colors">
                  <div className="text-2xl font-bold text-primary">42</div>
                  <div className="text-xs text-gray-400 uppercase font-mono tracking-wider">Projects</div>
                </div>
              </div>
            </div>

            {/* Right - Bio */}
            <div className="md:col-span-2">
              <div className="mb-6 font-mono text-sm text-gray-400">
                <p>root@system:~$ cat intro.md</p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">Full Stack Developer & Product Builder</h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                Full Stack Developer focused on user-centered, impactful products. Blending tech and design to solve
                real problems. Born in 2000 in India with a mission-driven approach to using code and tech for positive
                change and innovation.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                Currently building scalable web apps, automating digital workflows, and exploring AI-driven tooling.
                Passionate about product design, automation, and continuous learning. My favorite quote: "There is
                nothing so useless as doing efficiently that which should not be done at all." — Peter Drucker.
              </p>

              {/* Skills Grid */}
              <div className="mb-8">
                <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
                  Known_Vulnerabilities (SKILLS)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "Firebase",
                    "MongoDB",
                    "PostgreSQL",
                    "AWS",
                    "Docker",
                    "Tailwind CSS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 border border-primary/30 rounded text-sm text-primary hover:bg-primary/10 transition-colors font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded bg-primary text-background font-bold transition-all hover:scale-105 box-glow"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Download_CV.exe
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded border border-primary/50 text-white font-bold transition-all hover:bg-primary/10"
                >
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4m0 6V4m0 0L8 4m0 0l4 4"
                    />
                  </svg>
                  View_Source
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="mt-16">
          <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-6">// Social_Uplink</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚙️",
                title: "GitHub",
                desc: "github.com/rahulranjann",
                link: "https://github.com/rahulranjann",
              },
              {
                icon: "💼",
                title: "LinkedIn",
                desc: "in/rahulranjann",
                link: "https://www.linkedin.com/in/rahulranjann/",
              },
              {
                icon: "📸",
                title: "Instagram",
                desc: "@rahulranjann",
                link: "https://www.instagram.com/rahulranjann/",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary/20 rounded-lg p-6 hover:bg-primary/5 transition-all group box-glow"
              >
                <div className="text-4xl mb-4 group-hover:text-primary transition-colors">{social.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{social.title}</h4>
                <p className="text-sm text-gray-400">{social.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
