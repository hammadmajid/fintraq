"use client"

import { InteractiveDashboard } from "@/components/landing/interactive-dashboard"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Check,
  Shield,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

function TaxShieldCalibrator() {
  const [gross, setGross] = useState(12000)
  const [expenses, setExpenses] = useState(2800)
  const [target, setTarget] = useState(28)

  const taxable = Math.max(gross - expenses, 0)
  const reserve = taxable * (target / 100)
  const takeHome = taxable - reserve

  const money = (value: number) => `$${Math.round(value).toLocaleString()}`

  const sliders: {
    label: string
    value: number
    min: number
    max: number
    setter: (next: number) => void
  }[] = [
    {
      label: "GROSS MONTHLY INFLOW",
      value: gross,
      min: 3000,
      max: 50000,
      setter: setGross,
    },
    {
      label: "BUSINESS EXPENSES",
      value: expenses,
      min: 500,
      max: 15000,
      setter: setExpenses,
    },
    {
      label: "TARGET RESERVE",
      value: target,
      min: 15,
      max: 45,
      setter: setTarget,
    },
  ]

  return (
    <div className="shield-console">
      <div className="console-top">
        <span>SHIELD_CALIBRATOR // LIVE COMPUTATION</span>
        <span className="text-green">● ALL COEFFICIENTS NOMINAL</span>
      </div>
      {sliders.map(({ label, value, min, max, setter }) => (
        <label className="range-row" key={label}>
          <span>
            <b>{label}</b>
            <strong>
              {label === "TARGET RESERVE" ? `${value}%` : money(value)}
            </strong>
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={label === "TARGET RESERVE" ? 1 : 100}
            value={value}
            onChange={(event) => setter(Number(event.target.value))}
          />
          <small>
            <span>{label === "TARGET RESERVE" ? `${min}%` : money(min)}</span>
            <span>{label === "TARGET RESERVE" ? `${max}%` : money(max)}</span>
          </small>
        </label>
      ))}
      <div className="shield-results">
        <div>
          <small>AUTO-SHIELDED RESERVE</small>
          <strong>{money(reserve)}</strong>
          <span>{target}% OF TAXABLE INFLOW</span>
        </div>
        <div>
          <small>TRUE SPENDABLE TAKE-HOME</small>
          <strong>{money(takeHome)}</strong>
          <span>AFTER EXPENSES + RESERVE</span>
        </div>
      </div>
    </div>
  )
}

const taxPillars = [
  {
    title: "AUTOMATED INFLOW PARTITIONING",
    desc: "Every paid invoice is analyzed instantly. FinTraq automatically projects the exact federal, state, and self-employment tax obligations before you transfer funds.",
    Icon: ShieldCheck,
  },
  {
    title: "QUARTERLY ESTIMATE SCHEDULE",
    desc: "Track deadlines and calibrated targets for Q1-Q4 payments so you never experience unexpected liquidity crunches or IRS underpayment penalties.",
    Icon: Shield,
  },
  {
    title: "SAFE SPENDABLE MARGIN",
    desc: "Know your true discretionary take-home with total confidence. Reinvest in tooling, team, or personal accounts without questioning what is owed.",
    Icon: TrendingUp,
  },
]

export default function TaxShieldPage() {
  return (
    <main className="cyber-site pt-24">
      {/* Hero & Interactive Calibrator */}
      <section className="cyber-section tax-shield pb-16">
        <div className="section-wrap split-layout">
          <div>
            <p className="section-kicker">03 // TAX VAULT TERMINAL</p>
            <h2>
              Protect the upside
              <br />
              <em>before it lands.</em>
            </h2>
            <p className="section-copy">
              Dial in an intentional reserve and see the exact amount you can
              actually spend without second-guessing the next tax quarter. Built
              specifically for irregular contractor and freelance income.
            </p>
            <p className="honest-note mt-6">
              <Check size={14} /> Illustrative planning tool — tailored for
              independent operators
            </p>
          </div>
          <TaxShieldCalibrator />
        </div>
      </section>

      {/* Screenshot Frame 1: Budgets & Tax Reserve */}
      <section className="cyber-section capability-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">
                03.1 // TAX RESERVE HUD & ALLOCATIONS
              </p>
              <h2>
                Real-Time Reserve Telemetry.
                <br />
                <em>Zero End-Of-Quarter Panic.</em>
              </h2>
            </div>
            <p className="section-copy">
              Visual allocation gauges monitor accumulated tax vaults against
              projected tax liability in real time.
            </p>
          </div>

          <InteractiveDashboard initialView="budgets" className="mb-12" />
          <div className="screenshot-caption">
            <span>FIG. 01 — DYNAMIC TAX RESERVE & BUDGET SHIELD</span>
            <span>
              Live visual gauges compute runway preservation and quarter-to-date
              tax accumulation.
            </span>
          </div>

          {/* Screenshot Frame 2: Financial Overview & Ledger Gauge */}
          <div className="mt-20">
            <div className="section-heading">
              <div>
                <p className="section-kicker">
                  03.2 // RECONCILIATION & LEDGER SHIELD
                </p>
                <h2>
                  Settlement Velocity.
                  <br />
                  <em>Automated Reserve Locks.</em>
                </h2>
              </div>
              <p className="section-copy">
                Track how incoming revenue streams from multiple clients
                automatically allocate towards required tax quotas.
              </p>
            </div>

            <InteractiveDashboard initialView="overview" />
            <div className="screenshot-caption">
              <span>FIG. 02 — OVERVIEW TELEMETRY & TAX GAUGE</span>
              <span>
                Central command deck displaying current tax reserve target
                status (92% Q4 target locked) alongside liquidity.
              </span>
            </div>
          </div>

          {/* 3 Pillars Grid */}
          <div className="capability-grid mt-20">
            {taxPillars.map(({ title, desc, Icon }, index) => (
              <article className="capability-card" key={index}>
                <span className="capability-index">
                  0{index + 1} {"//"}
                </span>
                <span className="capability-icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cyber-cta">
        <div className="section-wrap">
          <p className="section-kicker">TAX VAULT AUTOMATION // 2026</p>
          <h2>
            Shield your revenue
            <br />
            <em>starting today.</em>
          </h2>
          <Link href="/signup" className="cyber-button dark-button">
            INITIALIZE WORKSPACE <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  )
}
