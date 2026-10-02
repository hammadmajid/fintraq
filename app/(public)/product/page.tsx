"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Play, ShieldCheck } from "lucide-react"

type ProductView = "overview" | "invoices" | "budgets" | "accounts"

const screenshots: Record<
  ProductView,
  { label: string; caption: string; image: string }
> = {
  overview: {
    label: "Overview",
    caption: "Liquidity, velocity, tax reserve, and the live ledger.",
    image: "/fintraq-overview-lime.png",
  },
  invoices: {
    label: "Invoicing Forge",
    caption: "Payment states and overdue signals in one queue.",
    image: "/fintraq-invoices-lime.png",
  },
  budgets: {
    label: "Budgets",
    caption: "Spend caps, runway, and category pressure.",
    image: "/fintraq-budgets-lime.png",
  },
  accounts: {
    label: "Accounts Matrix",
    caption: "A visual directory for every money vault.",
    image: "/fintraq-accounts-lime.png",
  },
}

function TerminalPreview({
  view,
  onNavigate,
}: {
  view: ProductView
  onNavigate: (nextView: ProductView) => void
}) {
  return (
    <div className="terminal-preview">
      <aside className="terminal-sidebar">
        <div className="terminal-brand">
          <span>✳</span> FINTRAQ<span className="text-magenta">.</span>
        </div>
        <div className="terminal-label">COMMAND DECK</div>
        {Object.entries(screenshots).map(([key, item]) => (
          <button
            type="button"
            className={`terminal-nav ${view === key ? "is-active" : ""}`}
            key={key}
            onClick={() => onNavigate(key as ProductView)}
          >
            <span className="terminal-nav-index">
              0{Object.keys(screenshots).indexOf(key) + 1}
            </span>
            {item.label}
          </button>
        ))}
        <div className="terminal-label terminal-label-spaced">SYSTEM</div>
        <div className="terminal-nav">
          <span className="terminal-dot dot-green" /> LIVE TELEMETRY
        </div>
        <div className="terminal-user">
          <span>JD</span>
          <div>
            <b>Jordan Davis</b>
            <small>OPERATOR_001</small>
          </div>
        </div>
      </aside>
      <div className="terminal-main">
        <div className="terminal-topbar">
          <span>FINTRAQ // {view.toUpperCase()}_v2.4</span>
          <span className="text-green">● ALL SYSTEMS NOMINAL</span>
        </div>
        <div className="terminal-content">
          <div className="terminal-heading">
            <div>
              <p className="eyebrow">THURSDAY // 01 OCT 2026</p>
              <h3>{screenshots[view].label}</h3>
              <p className="text-muted">
                Illustrative workspace telemetry. No connected accounts.
              </p>
            </div>
            <span className="hud-chip">[ DEMO_MODE ]</span>
          </div>
          <div className="terminal-metrics">
            <div className="terminal-metric metric-primary">
              <span>AVAILABLE LIQUIDITY</span>
              <strong>$48,920.50</strong>
              <small>↗ 12.8% VS LAST MONTH</small>
            </div>
            <div className="terminal-metric">
              <span>INFLOW VELOCITY</span>
              <strong>$12,450</strong>
              <small className="text-green">↗ 18.2% POSITIVE</small>
            </div>
            <div className="terminal-metric">
              <span>TAX RESERVE</span>
              <strong>92%</strong>
              <small className="text-yellow">Q4 TARGET LOCKED</small>
            </div>
          </div>
          <div className="terminal-grid">
            <div className="terminal-panel terminal-chart">
              <div className="panel-title">
                <span>CASHFLOW VELOCITY</span>
                <span>6M WINDOW⌄</span>
              </div>
              <div className="bars">
                {[54, 69, 59, 83, 70, 93].map((height, index) => (
                  <div className="bar-col" key={index}>
                    <i style={{ height: `${height}%` }} />
                    <i
                      className="bar-out"
                      style={{ height: `${height * 0.48}%` }}
                    />
                    <small>
                      {["MAY", "JUN", "JUL", "AUG", "SEP", "OCT"][index]}
                    </small>
                  </div>
                ))}
              </div>
            </div>
            <div className="terminal-panel reserve-panel">
              <div className="panel-title">
                <span>TAX SHIELD</span>
                <ShieldCheck size={15} />
              </div>
              <div className="reserve-gauge">
                <b>92%</b>
                <small>RESERVED</small>
              </div>
              <div className="gauge-line">
                <i />
              </div>
              <p>On track for Q4</p>
            </div>
          </div>
          <div className="terminal-panel ledger-panel">
            <div className="panel-title">
              <span>LIVE LEDGER</span>
              <button
                type="button"
                className="terminal-link"
                onClick={() => onNavigate("overview")}
              >
                VIEW ALL →
              </button>
            </div>
            {[
              [
                "ACME STUDIO",
                "INVOICE_PAYMENT // INV-0042",
                "+$3,850.00",
                "text-green",
              ],
              ["FIGMA", "SOFTWARE // SUBSCRIPTION", "−$24.00", "text-magenta"],
              [
                "NORTHLINE CO.",
                "INVOICE_PAYMENT // INV-0041",
                "+$2,400.00",
                "text-green",
              ],
            ].map((row) => (
              <div className="ledger-line" key={row[0]}>
                <span className="ledger-signal">✳</span>
                <b>{row[0]}</b>
                <small>{row[1]}</small>
                <strong className={row[3]}>{row[2]}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductPage() {
  const [view, setView] = useState<ProductView>("overview")
  const [interactive, setInteractive] = useState(false)

  return (
    <main className="cyber-site pt-24">
      {/* Product Hero Header */}
      <section className="cyber-section pb-12">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 // PRODUCT ARCHITECTURE</p>
              <h2>
                The Autonomous
                <br />
                <em>Financial Terminal.</em>
              </h2>
            </div>
            <p className="section-copy">
              A high-density command center replacing fragmented accounting tabs
              with unified real-time telemetry, predictive cashflow curves, and
              tactical money vaults.
            </p>
          </div>

          {/* Primary Interactive Screenshot Frame */}
          <div className="showcase-toolbar">
            <div className="view-tabs">
              {Object.entries(screenshots).map(([key, item]) => (
                <button
                  type="button"
                  className={view === key ? "active" : ""}
                  onClick={() => setView(key as ProductView)}
                  key={key}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="cyber-outline-button"
              onClick={() => setInteractive(!interactive)}
            >
              <Play size={14} />{" "}
              {interactive ? "SHOW SCREENSHOT" : "TRY INTERACTIVE PREVIEW"}
            </button>
          </div>

          <div className="screenshot-frame">
            <div className="frame-bar">
              <span>● ● ●</span>
              <b>FINTRAQ // {view.toUpperCase()}_v2.4</b>
              <span>
                CONCEPT_MEDIA // 0{Object.keys(screenshots).indexOf(view) + 1}
                /04
              </span>
            </div>
            {interactive ? (
              <TerminalPreview view={view} onNavigate={setView} />
            ) : (
              <Image
                src={screenshots[view].image}
                alt={`${screenshots[view].label} FinTraq dashboard screenshot`}
                width={1600}
                height={980}
                className="dashboard-screenshot"
                priority
              />
            )}
          </div>
          <div className="screenshot-caption">
            <span>
              FIG. 0{Object.keys(screenshots).indexOf(view) + 1} —{" "}
              {screenshots[view].label.toUpperCase()} COMMAND DECK
            </span>
            <span>{screenshots[view].caption}</span>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive & Second Screenshot Frame */}
      <section className="cyber-section capability-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                02 // INVOICING FORGE & RECEIVABLES
              </p>
              <h2>
                Streamline Inflow.
                <br />
                <em>Lock Down Receivables.</em>
              </h2>
            </div>
            <p className="section-copy">
              Cycle payment states from draft to paid with automated tracking,
              net-term alerts, and friction-free followups.
            </p>
          </div>

          {/* Secondary Screenshot Frame */}
          <div className="screenshot-frame mb-12">
            <div className="frame-bar">
              <span>● ● ●</span>
              <b>FINTRAQ // INVOICING_FORGE_QUEUE</b>
              <span>RECEIVABLES_MATRIX // 02/04</span>
            </div>
            <Image
              src="/fintraq-invoices-lime.png"
              alt="FinTraq Invoicing Forge queue screenshot"
              width={1600}
              height={980}
              className="dashboard-screenshot"
            />
          </div>
          <div className="screenshot-caption">
            <span>FIG. 02 — INVOICING FORGE & STATUS DISPATCH</span>
            <span>
              Complete overview of pending settlements, overdue notices, and
              multi-currency billing.
            </span>
          </div>

          {/* Third Screenshot Frame: Budgets & Runway Pressure */}
          <div className="mt-20">
            <div className="section-heading">
              <div>
                <p className="section-kicker">
                  03 // BUDGET GUARDRAILS & RUNWAY
                </p>
                <h2>
                  Spend Limits That
                  <br />
                  <em>Enforce Discipline.</em>
                </h2>
              </div>
              <p className="section-copy">
                Realtime spend ceilings by category and project. Never let
                recurring burn compromise your quarterly tax reserves or capital
                runway.
              </p>
            </div>

            <div className="screenshot-frame">
              <div className="frame-bar">
                <span>● ● ●</span>
                <b>FINTRAQ // BUDGETS_AND_BURN_MONITOR</b>
                <span>SYSTEM_TELEMETRY // 03/04</span>
              </div>
              <Image
                src="/fintraq-budgets-lime.png"
                alt="FinTraq Budgets & Burn screenshot"
                width={1600}
                height={980}
                className="dashboard-screenshot"
              />
            </div>
            <div className="screenshot-caption">
              <span>FIG. 03 — BUDGET VELOCITY & CATEGORY PRESSURE</span>
              <span>
                Visual indicators calibrate burn rates and forecast runway
                stability before commitments occur.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cyber-cta">
        <div className="section-wrap">
          <p className="section-kicker">INITIALIZE TERMINAL // 2026</p>
          <h2>
            Ready to command
            <br />
            <em>your capital?</em>
          </h2>
          <Link href="/signup" className="cyber-button dark-button">
            INITIALIZE WORKSPACE <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  )
}
