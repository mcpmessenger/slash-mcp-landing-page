import { Github, Globe, Youtube, Twitter, Gem, Brain, Hand, Moon, Sun } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { GrokIcon } from "@/components/icons/GrokIcon";

const timelineData = [
  {
    id: 1,
    title: "GitHub",
    date: "Platform",
    content: "Code repository and collaboration platform. Track development progress and contributions across all projects.",
    category: "Social",
    icon: Github,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 95,
    link: "https://github.com/mcpmessenger/slashmcp",
  },
  {
    id: 2,
    title: "Website",
    date: "Platform",
    content: "Central hub for all information and resources. Main interface for user interaction and content delivery.",
    category: "Social",
    icon: Globe,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 3,
    title: "YouTube",
    date: "Platform",
    content: "Video content platform. Share tutorials, demos, and educational content with the community.",
    category: "Social",
    icon: Youtube,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 80,
    link: "https://youtube.com/@MCPMessenger",
  },
  {
    id: 4,
    title: "Twitter",
    date: "Platform",
    content: "Social media engagement and updates. Real-time communication and community building.",
    category: "Social",
    icon: Twitter,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 85,
    link: "https://x.com/MCPMessenger",
  },
  {
    id: 5,
    title: "Grok",
    date: "AI Model",
    content: "Advanced AI capabilities with cutting-edge reasoning. Upload intelligence reports for detailed analysis.",
    category: "AI",
    icon: GrokIcon,
    relatedIds: [1, 6],
    status: "completed" as const,
    energy: 90,
    link: "https://grok.com/share/bGVnYWN5_acccd31a-3468-4f45-8eb3-4e6874a49c66",
  },
  {
    id: 6,
    title: "Gemini",
    date: "AI Model",
    content: "Google's multimodal AI system. Exceptional at understanding and processing complex intelligence data.",
    category: "AI",
    icon: Gem,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 92,
    link: "https://gemini.google.com/share/106d731426da",
  },
  {
    id: 7,
    title: "OpenAI",
    date: "AI Model",
    content: "GPT-powered intelligence analysis. Process and analyze uploaded reports with advanced language understanding.",
    category: "AI",
    icon: Brain,
    relatedIds: [6, 8],
    status: "in-progress" as const,
    energy: 88,
    link: "https://chatgpt.com/share/691d1b6f-08c0-8010-b565-16747fe35a3e",
  },
  {
    id: 8,
    title: "Manus",
    date: "AI Model",
    content: "Specialized AI for precision tasks. Enhanced capabilities for detailed intelligence report processing.",
    category: "AI",
    icon: Hand,
    relatedIds: [7, 1],
    status: "pending" as const,
    energy: 70,
  },
];

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initialize theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme === "dark" || (!savedTheme && true);
    setIsDark(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="w-full h-screen bg-background relative">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-50 rounded-full border-white/20 bg-black/50 backdrop-blur-md hover:bg-white/10"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-blue-600" />
        )}
      </Button>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </div>
  );
};

export default Index;
