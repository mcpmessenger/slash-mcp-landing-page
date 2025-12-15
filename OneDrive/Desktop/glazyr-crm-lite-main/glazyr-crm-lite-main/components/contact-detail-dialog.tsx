"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

type ContactDetailDialogProps = {
  contact: Contact
  onClose: () => void
  onSave: (contact: Contact) => void
}

export function ContactDetailDialog({ contact, onClose, onSave }: ContactDetailDialogProps) {
  const [formData, setFormData] = useState<Contact>(contact)
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    // Validate email format if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError("Please enter a valid email address")
      return
    }

    // Training wheels: Prevent follow-up if already sent
    if (formData.status === "Follow-up Sent" && contact.followUpSent) {
      setValidationError("Follow-up already sent. Only one follow-up allowed per contact.")
      return
    }

    // Training wheels: Stop automation on positive response
    if (formData.status === "Replied" && formData.responseType !== "Pass") {
      formData.suggestedNextStep = "Demo"
    }

    // Auto-populate first touch date
    if (formData.status === "Reached Out" && !formData.firstTouchDate) {
      formData.firstTouchDate = new Date().toISOString().split("T")[0]
    }

    // Track follow-up sent
    if (formData.status === "Follow-up Sent") {
      formData.followUpSent = true
    }

    onSave(formData)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return "bg-blue-500 text-white"
      case "Tier 2":
        return "bg-cyan-500 text-white"
      case "Tier 3":
        return "bg-slate-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{formData.company}</DialogTitle>
            <Badge className={getTierColor(formData.tier)}>{formData.tier}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{formData.parent}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Validation Error */}
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Company Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Role</Label>
                  <p className="text-sm text-muted-foreground">{formData.targetRole}</p>
                </div>
                <div className="space-y-2">
                  <Label>Strategic Rationale</Label>
                  <p className="text-sm text-muted-foreground">{formData.strategicRationale}</p>
                </div>
                {formData.headOfCorpDev && (
                  <div className="space-y-2">
                    <Label>Head of Corp Dev / M&A</Label>
                    <p className="text-sm text-muted-foreground">{formData.headOfCorpDev}</p>
                  </div>
                )}
                {formData.headOfAIStrategy && (
                  <div className="space-y-2">
                    <Label>Head of AI Strategy / AI Platform</Label>
                    <p className="text-sm text-muted-foreground">{formData.headOfAIStrategy}</p>
                  </div>
                )}
                {formData.companyContext && (
                  <div className="space-y-2 col-span-2">
                    <Label>Company Context</Label>
                    <p className="text-sm text-muted-foreground">{formData.companyContext}</p>
                  </div>
                )}
                {formData.recommendedOutreachAngle && (
                  <div className="space-y-2 col-span-2">
                    <Label>Recommended Outreach Angle</Label>
                    <p className="text-sm text-muted-foreground">{formData.recommendedOutreachAngle}</p>
                  </div>
                )}
                {formData.linkedinProfileSearch && (
                  <div className="space-y-2 col-span-2">
                    <Label>LinkedIn Profile Search</Label>
                    <a
                      href={formData.linkedinProfileSearch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {formData.linkedinProfileSearch}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Email Templates */}
            {(formData.coldEmailInitial || formData.linkedinDMShort || formData.followUpEmail) && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Email Templates</h3>
                {formData.coldEmailInitial && (
                  <div className="space-y-2">
                    <Label>Cold Email (Initial)</Label>
                    <Textarea
                      value={formData.coldEmailInitial}
                      readOnly
                      rows={3}
                      className="bg-muted text-sm"
                    />
                  </div>
                )}
                {formData.linkedinDMShort && (
                  <div className="space-y-2">
                    <Label>LinkedIn DM (Short)</Label>
                    <Textarea
                      value={formData.linkedinDMShort}
                      readOnly
                      rows={2}
                      className="bg-muted text-sm"
                    />
                  </div>
                )}
                {formData.followUpEmail && (
                  <div className="space-y-2">
                    <Label>Follow-Up Email (Day 5–10)</Label>
                    <Textarea
                      value={formData.followUpEmail}
                      readOnly
                      rows={2}
                      className="bg-muted text-sm"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Contact Information</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Maximum 2 contacts per company</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-sm text-muted-foreground">({formData.contactCount} / 2)</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName || ""}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin || ""}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select
                    value={formData.channel}
                    onValueChange={(value) => setFormData({ ...formData, channel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Warm Intro">Warm Intro</SelectItem>
                      <SelectItem value="Phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Outreach Tracking */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Outreach Tracking</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Contact["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Yet Contacted">Not Yet Contacted</SelectItem>
                      <SelectItem value="Reached Out">Reached Out</SelectItem>
                      <SelectItem value="Follow-up Sent">Follow-up Sent</SelectItem>
                      <SelectItem value="Replied">Replied</SelectItem>
                      <SelectItem value="Passed">Passed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstTouchDate">First Touch Date</Label>
                  <Input
                    id="firstTouchDate"
                    type="date"
                    value={formData.firstTouchDate || ""}
                    onChange={(e) => setFormData({ ...formData, firstTouchDate: e.target.value })}
                  />
                </div>
              </div>

              {formData.followUpSent && (
                <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    Follow-up already sent. Training wheels prevent sending additional follow-ups.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Conversation Intelligence */}
            {formData.status === "Replied" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">Conversation Intelligence</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Stop automation once positive response received</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responseType">Response Type</Label>
                    <Select
                      value={formData.responseType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, responseType: value as Contact["responseType"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select response" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Curious">Curious</SelectItem>
                        <SelectItem value="Neutral">Neutral</SelectItem>
                        <SelectItem value="Pass">Pass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestLevel">Interest Level</Label>
                    <Select
                      value={formData.interestLevel}
                      onValueChange={(value) =>
                        setFormData({ ...formData, interestLevel: value as Contact["interestLevel"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="suggestedNextStep">Suggested Next Step</Label>
                    <Select
                      value={formData.suggestedNextStep}
                      onValueChange={(value) =>
                        setFormData({ ...formData, suggestedNextStep: value as Contact["suggestedNextStep"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select next step" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Demo">Demo</SelectItem>
                        <SelectItem value="Check-in">Check-in</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatTheyReactedTo">What They Reacted To</Label>
                  <Textarea
                    id="whatTheyReactedTo"
                    value={formData.whatTheyReactedTo || ""}
                    onChange={(e) => setFormData({ ...formData, whatTheyReactedTo: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objections">Objections / Gaps</Label>
                  <Textarea
                    id="objections"
                    value={formData.objections || ""}
                    onChange={(e) => setFormData({ ...formData, objections: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                placeholder="Observations, follow-up items, or other relevant details..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
