"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WorkerStatusCard } from "@/components/worker-status-card"
import { MetricsChart } from "@/components/metrics-chart"
import { StatsCard } from "@/components/stats-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, CheckCircle2, Clock, RefreshCw, Server, TrendingUp } from "lucide-react"
import type { WorkerStatus } from "@/lib/pulsar-client"

export default function MonitoringPage() {
  const [workers, setWorkers] = React.useState<WorkerStatus[]>([])
  const [loading, setLoading] = React.useState(true)
  const [lastRefresh, setLastRefresh] = React.useState<Date>(new Date())

  const fetchWorkerStatus = React.useCallback(() => {
    setLoading(true)
    fetch("/api/workers/status")
      .then((res) => res.json())
      .then((data) => {
        setWorkers(data.workers)
        setLastRefresh(new Date())
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Failed to fetch worker status:", err)
        setLoading(false)
      })
  }, [])

  React.useEffect(() => {
    fetchWorkerStatus()
    // Poll every 5 seconds
    const interval = setInterval(fetchWorkerStatus, 5000)
    return () => clearInterval(interval)
  }, [fetchWorkerStatus])

  // Generate mock metrics data
  const generateMetrics = (baseValue: number, variance: number) => {
    return Array.from({ length: 12 }, (_, i) => ({
      time: `${i * 5}m`,
      value: Math.max(0, baseValue + Math.random() * variance - variance / 2),
    }))
  }

  const throughputData = generateMetrics(450, 100)
  const latencyData = generateMetrics(2.4, 1.2)
  const consumerLagData = generateMetrics(12, 8)

  const totalWorkers = workers.length
  const activeWorkers = workers.filter((w) => w.status === "processing").length
  const idleWorkers = workers.filter((w) => w.status === "idle").length
  const errorWorkers = workers.filter((w) => w.status === "error").length
  const totalProcessed = workers.reduce((sum, w) => sum + w.processed_count, 0)
  const totalErrors = workers.reduce((sum, w) => sum + w.error_count, 0)

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
          <p className="text-muted-foreground">Real-time worker status and Pulsar metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Last updated</p>
            <p className="text-sm font-mono">{lastRefresh.toLocaleTimeString()}</p>
          </div>
          <Button onClick={fetchWorkerStatus} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Status */}
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <CardTitle>System Healthy</CardTitle>
            </div>
            <Badge variant="outline" className="border-accent/50 text-accent">
              All Systems Operational
            </Badge>
          </div>
          <CardDescription>Pulsar cluster and workers are operating normally</CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Workers" value={totalWorkers} icon={Server} description="Active worker instances" />
        <StatsCard
          title="Processing"
          value={activeWorkers}
          icon={Activity}
          trend={{ value: "+5.2%", positive: true }}
        />
        <StatsCard
          title="Total Processed"
          value={totalProcessed.toLocaleString()}
          icon={CheckCircle2}
          description="All-time tasks"
        />
        <StatsCard
          title="Error Rate"
          value={`${((totalErrors / totalProcessed) * 100).toFixed(2)}%`}
          icon={AlertTriangle}
        />
      </div>

      {/* Worker Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Worker Pool</CardTitle>
          <CardDescription>Individual worker health and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workers.map((worker) => (
              <WorkerStatusCard key={worker.worker_id} worker={worker} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <MetricsChart
          title="Throughput"
          description="Messages processed per minute"
          data={throughputData}
          color="hsl(var(--chart-1))"
        />
        <MetricsChart
          title="Average Latency"
          description="Task processing time in seconds"
          data={latencyData}
          color="hsl(var(--chart-2))"
        />
      </div>

      {/* Pulsar Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Pulsar Metrics</CardTitle>
          <CardDescription>Apache Pulsar cluster performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Consumer Lag</span>
              </div>
              <p className="text-2xl font-bold">12ms</p>
              <p className="text-xs text-muted-foreground">Average across all topics</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Unacked Messages</span>
              </div>
              <p className="text-2xl font-bold">47</p>
              <p className="text-xs text-muted-foreground">Pending acknowledgment</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">DLQ Messages</span>
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Dead letter queue</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consumer Lag Chart */}
      <MetricsChart
        title="Consumer Lag"
        description="Topic subscription lag over time"
        data={consumerLagData}
        color="hsl(var(--chart-3))"
      />
    </div>
  )
}
