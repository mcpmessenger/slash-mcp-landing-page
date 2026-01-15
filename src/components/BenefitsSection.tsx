import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Zap, Shield, Settings } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "One-Click Install",
    description: "Instantly connect to Cursor or Claude Desktop with STDIO server integration.",
    technical: "STDIO server integration",
  },
  {
    icon: Zap,
    title: "Intelligent Routing",
    description: "Automatically route high-signal queries in <50ms with Kafka-based Orchestrator.",
    technical: "Kafka-based Orchestrator",
  },
  {
    icon: Shield,
    title: "Quota Protection",
    description: "Bypass expensive LLM APIs for deterministic queries with smart Matcher logic.",
    technical: "Matcher logic",
  },
  {
    icon: Settings,
    title: "Zero-Config Context",
    description: "Eliminate 'spaghetti code' integrations with a universal adapter and standardized protocol.",
    technical: "Standardized Protocol",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Slash MCP?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for developers who want powerful AI agent orchestration without the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1">
                    {benefit.technical}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}