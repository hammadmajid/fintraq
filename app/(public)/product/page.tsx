"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { InteractiveDashboard } from "@/components/landing/interactive-dashboard"

export default function ProductPage() {

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

          {/* Interactive dashboard preview */}
          <InteractiveDashboard initialView="overview" snapshot="Product · Overview" />
          <div className="screenshot-caption">
            <span>FIG. 01 — FINANCIAL COMMAND DECK</span>
            <span>Adjust the period and expand the live ledger.</span>
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
          <InteractiveDashboard initialView="invoices" snapshot="Product · Invoices" className="mb-12" />
          <div className="screenshot-caption">
            <span>FIG. 02 — INVOICING FORGE & STATUS DISPATCH</span>
            <span>
              Filter by payment status, inspect a row, or add a sample invoice.
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

          <InteractiveDashboard initialView="budgets" snapshot="Product · Budgets" />
          <div className="screenshot-caption">
              <span>FIG. 03 — BUDGET VELOCITY & CATEGORY PRESSURE</span>
              <span>
                Open the runway view or add a category to change this budget demo.
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
