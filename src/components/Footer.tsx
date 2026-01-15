import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Slash MCP. Built for the future of AI agents.</p>
          </div>
          <a
            href="https://github.com/mcpmessenger/mcp-registry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View on GitHub"
          >
            <Github size={20} />
            <span className="text-sm font-medium">View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}