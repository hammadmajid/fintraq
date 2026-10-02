"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  LayoutDashboard,
  Play,
  ShieldCheck,
  Wallet,
} from "lucide-react"

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
  const moduleContent = {
    overview: (
      <>
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
              onClick={() => onNavigate("invoices")}
            >
              VIEW INVOICES →
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
      </>
    ),
    invoices: (
      <>
        <div className="terminal-metrics">
          <div className="terminal-metric metric-primary">
            <span>PAID THIS MONTH</span>
            <strong>$6,250</strong>
            <small>2 INVOICES SETTLED</small>
          </div>
          <div className="terminal-metric">
            <span>AWAITING PAYMENT</span>
            <strong>$1,750</strong>
            <small className="text-yellow">1 PENDING</small>
          </div>
          <div className="terminal-metric">
            <span>OVERDUE</span>
            <strong>$4,200</strong>
            <small className="text-magenta">ACTION REQUIRED</small>
          </div>
        </div>
        <div className="terminal-panel terminal-module-panel">
          <div className="panel-title">
            <span>INVOICE QUEUE // OCTOBER</span>
            <span>4 RECORDS</span>
          </div>
          <div className="terminal-record-grid terminal-invoice-grid terminal-record-heading">
            <span>INVOICE</span>
            <span>CLIENT</span>
            <span>AMOUNT</span>
            <span>STATUS</span>
          </div>
          {[
            ["INV-0042", "ACME STUDIO", "$3,850", "PAID"],
            ["INV-0041", "NORTHLINE CO.", "$2,400", "PAID"],
            ["INV-0040", "ORBIT DIGITAL", "$1,750", "PENDING"],
            ["INV-0039", "FORM & FUNCTION", "$4,200", "OVERDUE"],
          ].map((row) => (
            <div
              className="terminal-record-grid terminal-invoice-grid"
              key={row[0]}
            >
              <b>{row[0]}</b>
              <span>{row[1]}</span>
              <strong>{row[2]}</strong>
              <em className={`terminal-status status-${row[3].toLowerCase()}`}>
                {row[3]}
              </em>
            </div>
          ))}
        </div>
        <div className="terminal-module-note">
          <span className="terminal-dot dot-green" /> 2 PAYMENTS CLEARED THIS
          MONTH <span>·</span> 1 FOLLOW-UP REQUIRED
        </div>
      </>
    ),
    budgets: (
      <>
        <div className="terminal-metrics">
          <div className="terminal-metric metric-primary">
            <span>MONTHLY PLAN</span>
            <strong>$6,000</strong>
            <small>4 ACTIVE CATEGORIES</small>
          </div>
          <div className="terminal-metric">
            <span>SPENT SO FAR</span>
            <strong>$3,482</strong>
            <small>58% OF PLAN</small>
          </div>
          <div className="terminal-metric">
            <span>REMAINING</span>
            <strong>$2,518</strong>
            <small className="text-green">4.8 MONTH RUNWAY</small>
          </div>
        </div>
        <div className="terminal-panel terminal-module-panel">
          <div className="panel-title">
            <span>SPENDING BY CATEGORY</span>
            <span>OCTOBER // USD</span>
          </div>
          {[
            ["OPERATIONS", "$1,280", "$2,000", 64],
            ["SOFTWARE & TOOLS", "$542", "$800", 68],
            ["STUDIO ASSETS", "$940", "$1,500", 63],
            ["TRAVEL", "$720", "$1,700", 42],
          ].map(([name, spent, total, percent]) => (
            <div className="terminal-budget-row" key={String(name)}>
              <div>
                <b>{name}</b>
                <span>
                  {spent} <small>/ {total}</small>
                </span>
              </div>
              <div className="terminal-budget-track">
                <i style={{ width: `${percent}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="terminal-module-note terminal-budget-note">
          <span className="terminal-warning">!</span>
          <div>
            <b>STUDIO ASSETS APPROACHING THRESHOLD</b>
            <small>$560 remaining in this category</small>
          </div>
          <span>REVIEW</span>
        </div>
      </>
    ),
    accounts: (
      <>
        <div className="terminal-metrics">
          <div className="terminal-metric metric-primary">
            <span>TOTAL BALANCE</span>
            <strong>$48,920</strong>
            <small>ACROSS 4 ACCOUNTS</small>
          </div>
          <div className="terminal-metric">
            <span>LIQUID FUNDS</span>
            <strong>$32,440</strong>
            <small className="text-green">66% AVAILABLE</small>
          </div>
          <div className="terminal-metric">
            <span>RESERVE VAULT</span>
            <strong>$12,480</strong>
            <small>Q4 TAX ALLOCATION</small>
          </div>
        </div>
        <div className="terminal-panel terminal-module-panel">
          <div className="panel-title">
            <span>ACCOUNT MATRIX</span>
            <span>4 VAULTS // USD</span>
          </div>
          <div className="terminal-record-grid terminal-account-grid terminal-record-heading">
            <span>ACCOUNT</span>
            <span>TYPE</span>
            <span>BALANCE</span>
            <span>STATUS</span>
          </div>
          {[
            ["OPERATING CHECKING", "CHECKING", "$18,460.50", "CONNECTED"],
            ["TAX RESERVE", "SAVINGS", "$12,480.00", "RESERVED"],
            ["STUDIO TREASURY", "BUSINESS", "$11,200.00", "CONNECTED"],
            ["PAYMENT CLEARING", "CLEARING", "$6,780.00", "ACTIVE"],
          ].map((row) => (
            <div
              className="terminal-record-grid terminal-account-grid"
              key={row[0]}
            >
              <b>{row[0]}</b>
              <span>{row[1]}</span>
              <strong>{row[2]}</strong>
              <em className="terminal-account-status">● {row[3]}</em>
            </div>
          ))}
        </div>
        <div className="terminal-module-note">
          <span className="terminal-dot dot-green" /> ALL ACCOUNTS RECONCILED{" "}
          <span>·</span> UPDATED JUST NOW
        </div>
      </>
    ),
  } satisfies Record<ProductView, React.ReactNode>

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
          {moduleContent[view]}
        </div>
      </div>
    </div>
  )
}

function TaxShield() {
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
    <section className="cyber-section tax-shield" id="tax-shield">
      <div className="section-wrap split-layout">
        <div>
          <p className="section-kicker">03 {"//"} TAX VAULT TERMINAL</p>
          <h2>
            Protect the upside
            <br />
            <em>before it lands.</em>
          </h2>
          <p className="section-copy">
            Dial in an intentional reserve and see the amount you can actually
            spend without second-guessing the next tax quarter.
          </p>
          <p className="honest-note">
            <Check size={14} /> Illustrative planning tool — not tax advice
          </p>
        </div>
        <div className="shield-console">
          <div className="console-top">
            <span>SHIELD_CALIBRATOR {"//"} LIVE</span>
            <span className="text-green">● COMPUTING</span>
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
                <span>
                  {label === "TARGET RESERVE" ? `${min}%` : money(min)}
                </span>
                <span>
                  {label === "TARGET RESERVE" ? `${max}%` : money(max)}
                </span>
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
      </div>
    </section>
  )
}

const capabilities: {
  index: string
  title: string
  copy: string
  Icon: typeof LayoutDashboard
}[] = [
  {
    index: "01",
    title: "CASHFLOW HUD",
    copy: "See inflow, outflow, reserve pressure, and runway without stitching together five tabs.",
    Icon: LayoutDashboard,
  },
  {
    index: "02",
    title: "INVOICING FORGE",
    copy: "Create, send, and cycle payment states from draft to paid with every follow-up in view.",
    Icon: FileText,
  },
  {
    index: "03",
    title: "ACCOUNT MATRIX",
    copy: "Map checking, treasury, yield, and crypto vaults into one clear operational picture.",
    Icon: Wallet,
  },
]

export function LandingPage() {
  const [view, setView] = useState<ProductView>("overview")
  const [interactive, setInteractive] = useState(false)
  return (
    <main className="cyber-site">
      <section className="cyber-hero">
        <div className="cyber-grid" />
        <div className="section-wrap hero-wrap">
          <div className="hero-status">
            <span className="pulse-dot" /> FINANCIAL OPERATIONS FOR INDEPENDENT
            OPERATORS <span>001 // 005</span>
          </div>
          <h1>
            FINTRAQ<span>✳</span>
          </h1>
          <div className="hero-rule" />
          <div className="hero-bottom">
            <div>
              <p className="section-kicker">A NEW WAY TO SEE YOUR MONEY</p>
              <h2>
                Your money has
                <br />a command center<span>.</span>
              </h2>
            </div>
            <div>
              <p className="hero-copy">
                Cashflow, invoices, clients, budgets, and tax reserves — indexed
                into one sharper workspace for people building their own thing.
              </p>
              <div className="hero-actions">
                <Link href="/signup" className="cyber-button">
                  INITIALIZE WORKSPACE <ArrowDownRight size={16} />
                </Link>
                <a href="#product" className="cyber-text-link">
                  VIEW THE TELEMETRY <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-footer">
          <span>BUILT FOR INDEPENDENCE</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <span>EST. 2026</span>
        </div>
      </section>
      <section className="cyber-section product-showcase" id="product">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 // PRODUCT COMMAND CENTER</p>
              <h2>
                Know your numbers.
                <br />
                <em>Own your next move.</em>
              </h2>
            </div>
            <p className="section-copy">
              Switch between durable dashboard screenshots and a functioning
              concept terminal. The preview is visual only — no financial
              account is connected.
            </p>
          </div>
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
              <b>FINTRAQ // {view.toUpperCase()}</b>
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
              />
            )}
          </div>
          <div className="screenshot-caption">
            <span>
              FIG. 0{Object.keys(screenshots).indexOf(view) + 1} —{" "}
              {screenshots[view].label.toUpperCase()}
            </span>
            <span>{screenshots[view].caption}</span>
          </div>
        </div>
      </section>
      <section className="cyber-section capability-section" id="features">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">02 {"//"} OPERATOR CAPABILITIES</p>
              <h2>
                Less admin.
                <br />
                <em>More momentum.</em>
              </h2>
            </div>
            <p className="section-copy">
              A focused command center for the irregular, independent, and very
              much self-directed.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ index, title, copy, Icon }) => (
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
          <div className="cyber-marquee">
            ACCOUNTS <span>✳</span> CASHFLOW <span>✳</span> INVOICES{" "}
            <span>✳</span> CLIENTS <span>✳</span> BUDGETS <span>✳</span> TAX
            RESERVES
          </div>
        </div>
      </section>
      <TaxShield />
      <section className="cyber-section operator-section" id="perspective">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="section-kicker">04 // OPERATOR SIGNAL</p>
              <h2>
                Clarity that earns
                <br />
                <em>its keep.</em>
              </h2>
            </div>
            <p className="section-copy">
              Built for consultants, mercenaries, and solo operators who would
              rather spend energy on the work than on the admin orbiting it.
            </p>
          </div>
          <div className="proof-grid">
            <div>
              <strong>$48.9M+</strong>
              <span>SETTLED VOLUME</span>
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
          <div className="review-grid">
            {[
              [
                "DISTRIBUTED SYSTEMS",
                "I want to know exactly what has been sent, paid, and needs a follow-up — without opening another spreadsheet.",
                "RHEA // CONSULTANT",
              ],
              [
                "3D MOTION & VFX",
                "A runway view that understands irregular income is the difference between reacting and planning.",
                "MAX // CREATIVE MERCENARY",
              ],
              [
                "WEB3 SECURITY",
                "Seeing reserves, vaults, and liabilities in one visual language makes the financial side feel operational.",
                "NIA // SECURITY AUDITOR",
              ],
            ].map(([role, quote, person]) => (
              <article className="review-card" key={role}>
                <span>{role}</span>
                <blockquote>“{quote}”</blockquote>
                <small>VERIFIED OPERATOR PROFILE // {person}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cyber-cta">
        <div className="section-wrap">
          <p className="section-kicker">READY WHEN YOU ARE {"//"} 2026</p>
          <h2>
            Take control of
            <br />
            <em>what&apos;s next.</em>
          </h2>
          <Link href="/signup" className="cyber-button dark-button">
            CREATE YOUR WORKSPACE <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  )
}
