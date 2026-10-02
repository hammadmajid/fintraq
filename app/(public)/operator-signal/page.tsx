"use client"

import { InteractiveDashboard } from "@/components/landing/interactive-dashboard"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const reviews = [
  {
    role: "DISTRIBUTED SYSTEMS",
    quote:
      "I want to know exactly what has been sent, paid, and needs a follow-up — without opening another spreadsheet.",
    person: "RHEA // CONSULTANT",
    metric: "$240k/yr Volume",
  },
  {
    role: "3D MOTION & VFX",
    quote:
      "A runway view that understands irregular income is the difference between reacting and planning.",
    person: "MAX // CREATIVE MERCENARY",
    metric: "4 Active Vaults",
  },
  {
    role: "WEB3 SECURITY",
    quote:
      "Seeing reserves, vaults, and liabilities in one visual language makes the financial side feel operational.",
    person: "NIA // SECURITY AUDITOR",
    metric: "99.9% Tax Precision",
  },
  {
    role: "AI SYSTEMS ARCHITECT",
    quote:
      "The cyber terminal layout gives me instant situational awareness over retainers and cloud overhead without the SaaS fluff.",
    person: "DEVON // SOLO FOUNDER",
    metric: "$45k Monthly Inflow",
  },
  {
    role: "FULL-STACK PRODUCT ENGINEER",
    quote:
      "Invoice cycles and milestone payments sync directly into my tax reserve with zero manual calculations.",
    person: "KAI // CONTRACT ENGINEER",
    metric: "12 Client Accounts",
  },
  {
    role: "FINANCIAL INFRASTRUCTURE SPECIALIST",
    quote:
      "FinTraq replaced three SaaS subscriptions and a fragile spreadsheet in our solo consulting setup within 48 hours.",
    person: "TARA // SYSTEMS AUDITOR",
    metric: "100% On-Time Filings",
  },
]

export default function OperatorSignalPage() {
  return (
    <main className="cyber-site pt-24">
      {/* Hero / Header Section */}
      <section className="cyber-section pb-12">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                04 // OPERATOR SIGNAL & TELEMETRY
              </p>
              <h2>
                Clarity that earns
                <br />
                <em>its keep.</em>
              </h2>
            </div>
            <p className="section-copy">
              Built for consultants, technical contractors, and digital
              mercenaries who demand zero friction, razor-sharp metrics, and
              uncompromising financial discipline.
            </p>
          </div>

          {/* Proof Grid */}
          <div className="proof-grid mb-16">
            <div>
              <strong>$48.9M+</strong>
              <span>SETTLED INVOICE VOLUME</span>
            </div>
            <div>
              <strong>14,200+</strong>
              <span>INDEPENDENT OPERATORS</span>
            </div>
            <div>
              <strong>99.94%</strong>
              <span>TAX ACCURACY TARGET</span>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Frame 1: Accounts Matrix */}
      <section className="cyber-section capability-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                04.1 // VAULT & CAPITAL ALLOCATION
              </p>
              <h2>
                Operational Telemetry.
                <br />
                <em>Total Capital Command.</em>
              </h2>
            </div>
            <p className="section-copy">
              Inspect how high-performing solo operators structure checking,
              yield reserves, and tax vaults across multiple institutions.
            </p>
          </div>

          <InteractiveDashboard initialView="accounts" className="mb-12" />
          <div className="screenshot-caption">
            <span>FIG. 01 — OPERATOR VAULT DIRECTORY & LIQUIDITY STREAM</span>
            <span>
              Real-time balance synchronization across business checking, tax
              savings, and investment accounts.
            </span>
          </div>

          {/* Screenshot Frame 2: Financial Overview & Live Ledger */}
          <div className="mt-20">
            <div className="section-heading">
              <div>
                <p className="section-kicker">
                  04.2 // CASHFLOW VELOCITY & REAL-TIME LEDGER
                </p>
                <h2>
                  Transaction Velocity.
                  <br />
                  <em>Zero Ambiguity.</em>
                </h2>
              </div>
              <p className="section-copy">
                From milestone invoices to software subscriptions, every
                transaction is indexed into a high-density, real-time cyber
                ledger.
              </p>
            </div>

            <InteractiveDashboard initialView="overview" />
            <div className="screenshot-caption">
              <span>FIG. 02 — LIVE LEDGER & INFLOW VELOCITY</span>
              <span>
                Visual 6-month cashflow velocity chart, tax shield status, and
                real-time transaction ledger.
              </span>
            </div>
          </div>

          {/* Operator Reviews / Testimonials Grid */}
          <div className="mt-20">
            <div className="section-heading">
              <div>
                <p className="section-kicker">
                  04.3 // VERIFIED OPERATOR SIGNALS
                </p>
                <h2>
                  From the field.
                  <br />
                  <em>Direct feedback.</em>
                </h2>
              </div>
              <p className="section-copy">
                Unfiltered dispatches from engineers, creatives, and technical
                specialists executing independent operations worldwide.
              </p>
            </div>

            <div className="review-grid">
              {reviews.map(({ role, quote, person, metric }) => (
                <article className="review-card" key={role}>
                  <div className="flex items-center justify-between">
                    <span>{role}</span>
                    <small className="text-green font-mono">{metric}</small>
                  </div>
                  <blockquote>“{quote}”</blockquote>
                  <small>VERIFIED OPERATOR PROFILE // {person}</small>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cyber-cta">
        <div className="section-wrap">
          <p className="section-kicker">JOIN THE INDEPENDENT FLEET // 2026</p>
          <h2>
            Lock in your command
            <br />
            <em>terminal today.</em>
          </h2>
          <Link href="/signup" className="cyber-button dark-button">
            INITIALIZE WORKSPACE <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  )
}
