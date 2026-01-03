import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"

export default function MonitoringLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-muted/30">{children}</main>
      </div>
    </AuthProvider>
  )
}
