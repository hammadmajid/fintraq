"use client"

import { useState } from "react"
import { InteractiveDashboard } from "@/components/landing/interactive-dashboard"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Wallet,
} from "lucide-react"

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
              Explore the interactive financial dashboard. The preview is visual
              only — no financial account is connected.
            </p>
          </div>
          <InteractiveDashboard initialView="overview" snapshot="Home · Cashflow" />
          <div className="screenshot-caption">
            <span>FIG. 01 — FINANCIAL COMMAND DECK</span>
            <span>Explore cashflow trends and expand the live ledger.</span>
          </div>
          <div className="mt-20">
            <div className="section-heading">
              <div>
                <p className="section-kicker">01.2 // INVOICE OPERATIONS</p>
                <h2>
                  Keep every payment
                  <br />
                  <em>in clear view.</em>
                </h2>
              </div>
              <p className="section-copy">
                Review paid, pending, and overdue invoices in a dedicated
                workspace, with every payment status easy to scan.
              </p>
            </div>
            <InteractiveDashboard initialView="invoices" snapshot="Home · Invoices" />
            <div className="screenshot-caption">
              <span>FIG. 02 — INVOICE QUEUE & PAYMENT STATUS</span>
              <span>Filter the queue, select a row, or add an invoice.</span>
            </div>
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
