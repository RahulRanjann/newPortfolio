import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-muted/50 py-8 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-gray-400 text-sm font-mono">
          <span className="text-primary/70">//</span> © 2026 Rahul_Ranjan. <span className="text-primary/60">[STATUS: OPERATIONAL]</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.424-.103.249-.129.597-.129.946v5.435h-3.554s.05-8.814 0-9.737h3.554v1.377c.43-.664 1.199-1.608 2.925-1.608 2.135 0 3.735 1.39 3.735 4.374v5.594zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.708 0-.951.77-1.708 1.96-1.708 1.188 0 1.914.757 1.941 1.708 0 .95-.753 1.708-1.986 1.708zm1.581 11.019H3.757V9.715h3.161v10.737zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 002.856-9.57 10.002 10.002 0 00-14.201 3.172c-.15.266-.23.581-.23.906 0 1.1.9 2 2 2h.93a2 2 0 00.95-.225 4 4 0 01.558-.157.6.6 0 00-.565-.834 10.05 10.05 0 007.16 3.236.6.6 0 00.595-.788A2.001 2.001 0 0022 8v-2a2 2 0 00-2 2c0-1.1-.9-2-2-2h-1.09a2 2 0 00-1.936 1.355 4 4 0 01-.474.718 10.003 10.003 0 01-13.895 1.256 9.956 9.956 0 003.159 15.699c.093.074.182.147.268.22a2 2 0 002.172-.29.6.6 0 00-.06-.947A10.04 10.04 0 012.7 19.557a9.956 9.956 0 0118.656-7.29l.09-.15a2 2 0 003.3-2.54z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}
