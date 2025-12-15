"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Contact = {
  id: string
  company: string
  parent: string
  tier: "Tier 1" | "Tier 2" | "Tier 3"
  targetRole: string
  strategicRationale: string
  headOfCorpDev?: string
  headOfAIStrategy?: string
  linkedinProfileSearch?: string
  companyContext?: string
  recommendedOutreachAngle?: string
  coldEmailInitial?: string
  linkedinDMShort?: string
  followUpEmail?: string
  contactName?: string
  email?: string
  linkedin?: string
  channel?: string
  status: "Not Yet Contacted" | "Reached Out" | "Follow-up Sent" | "Replied" | "Passed"
  firstTouchDate?: string
  followUpSent: boolean
  responseType?: "Curious" | "Neutral" | "Pass"
  interestLevel?: "Low" | "Medium" | "High"
  notes?: string
  whatTheyReactedTo?: string
  objections?: string
  suggestedNextStep?: "Demo" | "Check-in" | "None"
  contactCount: number
}

type ContactDialogProps = {
  onClose: () => void
  onSave: (contact: Contact) => void
}

export function ContactDialog({ onClose, onSave }: ContactDialogProps) {
  const [formData, setFormData] = useState<Partial<Contact>>({
    company: "",
    parent: "",
    tier: "Tier 2",
    targetRole: "",
    strategicRationale: "",
    status: "Not Yet Contacted",
    followUpSent: false,
    contactCount: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.company || !formData.parent || !formData.targetRole || !formData.strategicRationale) {
      return
    }

    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      company: formData.company,
      parent: formData.parent,
      tier: formData.tier || "Tier 2",
      targetRole: formData.targetRole,
      strategicRationale: formData.strategicRationale,
      status: "Not Yet Contacted",
      followUpSent: false,
      contactCount: 0,
    }

    onSave(newContact)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent">Parent *</Label>
                <Input
                  id="parent"
                  value={formData.parent}
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tier">Tier *</Label>
                <Select
                  value={formData.tier}
                  onValueChange={(value) => setFormData({ ...formData, tier: value as Contact["tier"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tier 1">Tier 1 - High Priority</SelectItem>
                    <SelectItem value="Tier 2">Tier 2 - Strong Fit</SelectItem>
                    <SelectItem value="Tier 3">Tier 3 - Exploratory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role *</Label>
                <Input
                  id="targetRole"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategicRationale">Strategic Rationale *</Label>
              <Textarea
                id="strategicRationale"
                value={formData.strategicRationale}
                onChange={(e) => setFormData({ ...formData, strategicRationale: e.target.value })}
                rows={3}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Contact</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
