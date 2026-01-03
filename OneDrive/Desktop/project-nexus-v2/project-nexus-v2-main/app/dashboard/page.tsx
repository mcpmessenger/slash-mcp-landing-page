"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/stats-card"
import { WorkflowStatusBadge } from "@/components/workflow-status-badge"
import { Activity, CheckCircle2, Clock, Plus, TrendingUp, Upload, FileText } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

interface Workflow {
  id: string
  message_id: string
  type: string
  status: "pending" | "processing" | "completed" | "failed"
  created_at: string
  completed_at?: string
  payload: {
    file_url?: string
    instructions?: string
    tool_name?: string
    amount?: number
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [workflows, setWorkflows] = React.useState<Workflow[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/workflows")
      .then((res) => res.json())
      .then((data) => {
        setWorkflows(data.workflows)
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Failed to fetch workflows:", err)
        setLoading(false)
      })
  }, [])

  const stats = {
    totalWorkflows: workflows.length,
    completed: workflows.filter((w) => w.status === "completed").length,
    processing: workflows.filter((w) => w.status === "processing").length,
    pending: workflows.filter((w) => w.status === "pending").length,
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">{user?.name}</p>
        </div>
        <Button asChild size="sm">
          <Link href="/workflows/new">
            <Plus className="mr-1.5 h-4 w-4" />
            New
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total"
          value={stats.totalWorkflows}
          icon={Activity}
          trend={{ value: "+12.3%", positive: true }}
        />
        <StatsCard title="Done" value={stats.completed} icon={CheckCircle2} />
        <StatsCard title="Active" value={stats.processing} icon={Clock} />
        <StatsCard title="Avg" value="2.4s" icon={TrendingUp} trend={{ value: "-15%", positive: true }} />
      </div>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-lg">Recent</CardTitle>
          <CardDescription>Latest executions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-sm text-muted-foreground">Loading...</div>
            </div>
          ) : workflows.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <FileText className="h-10 w-10 text-muted-foreground/50" />
              <div className="text-center">
                <p className="text-sm font-medium">No workflows</p>
                <p className="text-xs text-muted-foreground">Create one to get started</p>
              </div>
              <Button asChild size="sm" className="mt-2">
                <Link href="/workflows/new">
                  <Plus className="mr-1.5 h-4 w-4" />
                  Create
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="flex items-center justify-between rounded-lg border border-border/40 p-3 transition-colors hover:bg-muted/30"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                      {workflow.type === "vision" ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : (
                        <Activity className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{workflow.type === "vision" ? "Vision" : "Tool"}</p>
                        <WorkflowStatusBadge status={workflow.status} size="sm" />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {workflow.payload.file_url || workflow.payload.tool_name || "Task"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{formatDate(workflow.created_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
          <CardHeader className="pb-3">
            <Upload className="h-5 w-5 text-primary mb-1" />
            <CardTitle className="text-sm">Upload</CardTitle>
            <CardDescription className="text-xs">Process documents with AI vision</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
          <CardHeader className="pb-3">
            <Activity className="h-5 w-5 text-accent mb-1" />
            <CardTitle className="text-sm">Execute</CardTitle>
            <CardDescription className="text-xs">Run MCP-enabled tools</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
          <CardHeader className="pb-3">
            <TrendingUp className="h-5 w-5 text-primary mb-1" />
            <CardTitle className="text-sm">Monitor</CardTitle>
            <CardDescription className="text-xs">Check system health</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
