"use client"

import { InteractiveDashboard } from "@/components/landing/interactive-dashboard"

import Link from "next/link"
import {
  ArrowUpRight,
  FileText,
  Landmark,
  LayoutDashboard,
  PiggyBank,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"

const capabilitiesList = [
  {
    index: "01",
    title: "CASHFLOW HUD",
    copy: "Real-time streaming telemetry of income, burn rate, reserve pressure, and capital runway without stitching together disparate sheets.",
    Icon: LayoutDashboard,
  },
  {
    index: "02",
    title: "INVOICING FORGE",
    copy: "Create, dispatch, and cycle payment lifecycles from draft to paid with automated tracking and net-term alerts in one queue.",
    Icon: FileText,
  },
  {
    index: "03",
    title: "ACCOUNT MATRIX",
    copy: "Map checking, treasury, yield, and crypto vaults into a unified visual directory for total situational awareness.",
    Icon: Landmark,
  },
  {
    index: "04",
    title: "TAX SHIELD TERMINAL",
    copy: "Auto-calculate and partition income tax reserves on every inflow before you allocate discretionary capital.",
    Icon: ShieldCheck,
  },
  {
    index: "05",
    title: "BUDGET GUARDRAILS",
    copy: "Set category-based spend caps and monitor runway impact dynamically so overhead never catches you unprepared.",
    Icon: PiggyBank,
  },
  {
    index: "06",
    title: "REVENUE RECONCILIATION",
    copy: "Match multi-client invoices with incoming ledger settlements instantly with zero manual accounting overhead.",
    Icon: RefreshCw,
  },
]

export default function CapabilitiesPage() {
  return (
    <main className="cyber-site pt-24">
      {/* Header Section */}
      <section className="cyber-section pb-12">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">02 // CAPABILITIES MATRIX</p>
              <h2>
                Precision Instruments.
                <br />
                <em>Zero Admin Drag.</em>
              </h2>
            </div>
            <p className="section-copy">
              Engineered specifically for solo operators, independent
              consultants, and agile mercenary squads who require razor-sharp
              financial clarity.
            </p>
          </div>

          {/* Capability Cards Grid */}
          <div className="capability-grid mb-16">
            {capabilitiesList.map(({ index, title, copy, Icon }) => (
              <article className="capability-card" key={index}>
                <span className="capability-index">
                  {index} {"//"}
                </span>
                <span className="capability-icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ArrowUpRight className="capability-arrow" size={18} />
              </article>
            ))}
          </div>

          <div className="cyber-marquee mb-16">
            ACCOUNTS <span>✳</span> CASHFLOW <span>✳</span> INVOICES{" "}
            <span>✳</span> CLIENTS <span>✳</span> BUDGETS <span>✳</span> TAX
            RESERVES
          </div>
        </div>
      </section>

      {/* Showcase Screenshot 1: Invoicing Forge */}
      <section className="cyber-section capability-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                02.1 // RECEIVABLES & INVOICING ENGINE
              </p>
              <h2>
                Accelerate Inflow.
                <br />
                <em>Eliminate Overdue Lag.</em>
              </h2>
            </div>
            <p className="section-copy">
              Track multi-stage invoicing states with automatic client ledger
              reconciliation and real-time payment status monitors.
            </p>
          </div>

          <InteractiveDashboard initialView="invoices" snapshot="Capabilities · Billing" className="mb-12" />
          <div className="screenshot-caption">
            <span>FIG. 01 — INVOICING FORGE & PAYMENT STATE PIPELINE</span>
            <span>
              Filter payment states, inspect a row, or add a sample invoice.
            </span>
          </div>

          {/* Showcase Screenshot 2: Accounts Matrix */}
          <div className="mt-20">
            <div className="section-heading">
              <div>
                <p className="section-kicker">02.2 // MULTI-VAULT MATRIX</p>
                <h2>
                  Every Money Vault.
                  <br />
                  <em>Indexed In One View.</em>
                </h2>
              </div>
              <p className="section-copy">
                Consolidate checking, business savings, tax reserves, and
                offshore or crypto holdings into an integrated financial
                dashboard.
              </p>
            </div>

            <InteractiveDashboard initialView="accounts" snapshot="Capabilities · Vaults" />
            <div className="screenshot-caption">
              <span>FIG. 02 — ACCOUNTS MATRIX & VAULT ALLOCATION</span>
              <span>
                Select a vault, check sync status, or connect a sample account.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cyber-cta">
        <div className="section-wrap">
          <p className="section-kicker">OPERATIONAL READINESS // 2026</p>
          <h2>
            Upgrade your financial
            <br />
            <em>command deck.</em>
          </h2>
          <Link href="/signup" className="cyber-button dark-button">
            INITIALIZE WORKSPACE <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  )
}
