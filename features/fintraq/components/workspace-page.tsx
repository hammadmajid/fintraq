"use client"

import { useState } from "react"
import { ArrowRight, Check, Download, Plus, ShieldCheck } from "lucide-react"

export type WorkspacePage =
  | "dashboard"
  | "budgets"
  | "clients"
  | "invoices"
  | "records"
  | "reports"
  | "settings"

const pageMeta: Record<
  WorkspacePage,
  { eyebrow: string; title: string; description: string }
> = {
  dashboard: {
    eyebrow: "SYSTEM // OVERVIEW",
    title: "Command center",
    description: "A live concept view of your independent operation.",
  },
  budgets: {
    eyebrow: "MODULE // BUDGETS",
    title: "Budget runway",
    description: "Give every dollar a direction before it leaves the vault.",
  },
  clients: {
    eyebrow: "MODULE // CLIENT INDEX",
    title: "Client registry",
    description: "The people and companies connected to your next invoice.",
  },
  invoices: {
    eyebrow: "MODULE // INVOICING FORGE",
    title: "Invoice queue",
    description: "Track every request for payment from draft to settled.",
  },
  records: {
    eyebrow: "MODULE // LIVE LEDGER",
    title: "Transaction records",
    description: "Every inflow, outflow, and transfer in one readable stream.",
  },
  reports: {
    eyebrow: "MODULE // REPORTS",
    title: "Operator reports",
    description: "Turn your history into signals you can use.",
  },
  settings: {
    eyebrow: "SYSTEM // CONFIGURATION",
    title: "Workspace settings",
    description: "Tune the terminal to the way you operate.",
  },
}

const ledger = [
  ["ACME STUDIO", "INVOICE PAYMENT // INV-0042", "+$3,850.00", "text-cyber-accent"],
  ["FIGMA", "SOFTWARE // SUBSCRIPTION", "−$24.00", "text-cyber-danger"],
  ["NORTHLINE CO.", "INVOICE PAYMENT // INV-0041", "+$2,400.00", "text-cyber-accent"],
  ["WORKSPACE", "OPERATIONS // OFFICE", "−$320.00", "text-cyber-danger"],
]

function downloadDemoFile(
  filename: string,
  contents: string,
  type = "text/plain"
) {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`workspace-panel ${className}`}>
      <div className="workspace-panel-title">
        <span>{title}</span>
        <span className="panel-cross">+</span>
      </div>
      {children}
    </section>
  )
}

function Dashboard() {
  return (
    <>
      <div className="workspace-metrics">
        <div className="workspace-metric metric-accent">
          <span>AVAILABLE LIQUIDITY</span>
          <strong>$48,920.50</strong>
          <small>↗ 12.8% VS LAST MONTH</small>
        </div>
        <div className="workspace-metric">
          <span>INCOME THIS MONTH</span>
          <strong>$12,450.00</strong>
          <small className="text-cyber-accent">↗ 18.2% POSITIVE</small>
        </div>
        <div className="workspace-metric">
          <span>OUTGOING</span>
          <strong>$4,280.20</strong>
          <small className="text-cyber-danger">↗ 4.3% PRESSURE</small>
        </div>
        <div className="workspace-metric">
          <span>TAX RESERVE</span>
          <strong>92%</strong>
          <small className="text-cyber-warn">Q4 TARGET LOCKED</small>
        </div>
      </div>
      <div className="workspace-two-col">
        <Panel
          title="CASHFLOW VELOCITY // 6M WINDOW"
          className="chart-panel-large"
        >
          <div className="workspace-bars">
            {[44, 62, 55, 78, 68, 91].map((height, index) => (
              <div className="workspace-bar-col" key={index}>
                <i style={{ height: `${height}%` }} />
                <i className="out" style={{ height: `${height * 0.47}%` }} />
                <small>
                  {["MAY", "JUN", "JUL", "AUG", "SEP", "OCT"][index]}
                </small>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-accent" /> INFLOW
            </span>
            <span>
              <i className="legend-danger" /> OUTFLOW
            </span>
          </div>
        </Panel>
        <Panel title="TAX SHIELD // Q4">
          <div className="workspace-gauge">
            <div>
              <strong>92%</strong>
              <small>RESERVED</small>
            </div>
          </div>
          <div className="progress-track">
            <i style={{ width: "92%" }} />
          </div>
          <div className="panel-footer-line">
            <span>ON TRACK</span>
            <b>$3,735 / $4,060</b>
          </div>
        </Panel>
      </div>
      <Panel title="LIVE LEDGER // STREAMING">
        <div className="ledger-table">
          {ledger.map((row) => (
            <div className="ledger-row" key={row[0]}>
              <span className="ledger-mark">✳</span>
              <b>{row[0]}</b>
              <small>{row[1]}</small>
              <strong className={row[3]}>{row[2]}</strong>
              <ArrowRight size={15} />
            </div>
          ))}
        </div>
      </Panel>
      <div className="workspace-callout">
        <ShieldCheck size={20} />
        <div>
          <b>RESERVE PROTOCOL ACTIVE</b>
          <p>
            Tax allocations and operational outflows are being kept in the same
            field of view.
          </p>
        </div>
        <span>DEMO DATA</span>
      </div>
    </>
  )
}

function Budgets() {
  const items = [
    ["OPERATIONS", "$1,280", "$2,000", 64, "accent"],
    ["SOFTWARE & TOOLS", "$542", "$800", 68, "danger"],
    ["STUDIO ASSETS", "$940", "$1,500", 63, "danger"],
    ["TRAVEL", "$720", "$1,700", 42, "accent"],
  ]
  const [reviewed, setReviewed] = useState(false)
  return (
    <>
      <div className="workspace-metrics">
        <div className="workspace-metric metric-accent">
          <span>MONTHLY PLAN</span>
          <strong>$6,000</strong>
          <small>4 CATEGORIES</small>
        </div>
        <div className="workspace-metric">
          <span>SPENT SO FAR</span>
          <strong>$3,482</strong>
          <small>58% OF TOTAL</small>
        </div>
        <div className="workspace-metric">
          <span>REMAINING</span>
          <strong>$2,518</strong>
          <small className="text-cyber-accent">RUNWAY 4.8 MONTHS</small>
        </div>
      </div>
      <Panel title="SPENDING BY CATEGORY // OCT 2026">
        <div className="budget-list">
          {items.map(([name, spent, total, percent, tone]) => (
            <div className="budget-line" key={String(name)}>
              <div>
                <b>{name}</b>
                <span>
                  {spent} <small>/ {total}</small>
                </span>
              </div>
              <div className="progress-track">
                <i
                  className={`tone-${tone}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <div className="workspace-callout warning-callout">
        <span className="callout-symbol">!</span>
        <div>
          <b>
            {reviewed
              ? "THRESHOLD REVIEW LOGGED"
              : "STUDIO ASSETS APPROACHING THRESHOLD"}
          </b>
          <p>
            {reviewed
              ? "This budget signal is marked for your next planning pass."
              : "There is still $560 of headroom in this category."}
          </p>
        </div>
        <button type="button" onClick={() => setReviewed(true)}>
          {reviewed ? "REVIEWED ✓" : "REVIEW →"}
        </button>
      </div>
    </>
  )
}

function Invoices() {
  const [statuses, setStatuses] = useState<Record<string, string>>({
    "INV-0042": "Paid",
    "INV-0041": "Paid",
    "INV-0040": "Pending",
    "INV-0039": "Overdue",
  })
  const [composerOpen, setComposerOpen] = useState(false)
  const [queued, setQueued] = useState(false)
  const cycle = (id: string) =>
    setStatuses((current) => ({
      ...current,
      [id]:
        current[id] === "Paid"
          ? "Sent"
          : current[id] === "Sent"
            ? "Pending"
            : "Paid",
    }))
  const rows = [
    ["INV-0042", "ACME STUDIO", "12 OCT 2026", "$3,850.00"],
    ["INV-0041", "NORTHLINE CO.", "08 OCT 2026", "$2,400.00"],
    ["INV-0040", "ORBIT DIGITAL", "18 OCT 2026", "$1,750.00"],
    ["INV-0039", "FORM & FUNCTION", "30 SEP 2026", "$4,200.00"],
  ]
  return (
    <>
      <div className="workspace-metrics">
        <div className="workspace-metric metric-accent">
          <span>PAID THIS MONTH</span>
          <strong>$6,250</strong>
          <small>2 INVOICES RECEIVED</small>
        </div>
        <div className="workspace-metric">
          <span>AWAITING PAYMENT</span>
          <strong>$1,750</strong>
          <small className="text-cyber-warn">1 PENDING</small>
        </div>
        <div className="workspace-metric">
          <span>OVERDUE</span>
          <strong>$4,200</strong>
          <small className="text-cyber-danger">ACTION REQUIRED</small>
        </div>
      </div>
      <Panel title="ALL INVOICES // CLICK STATUS TO CYCLE">
        <div className="data-table">
          <div className="data-row table-head">
            <span>INVOICE</span>
            <span>CLIENT</span>
            <span>DUE DATE</span>
            <span>AMOUNT</span>
            <span>STATUS</span>
          </div>
          {rows.map((row) => (
            <div className="data-row" key={row[0]}>
              <b>{row[0]}</b>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
              <strong>{row[3]}</strong>
              <button
                type="button"
                className={`status-pill status-${(statuses[row[0]] ?? "Pending").toLowerCase()}`}
                onClick={() => cycle(row[0])}
              >
                {statuses[row[0]]} ↺
              </button>
            </div>
          ))}
        </div>
      </Panel>
      {composerOpen && (
        <Panel title="NEW INVOICE // DEMO COMPOSER">
          <div className="settings-form">
            <label>
              CLIENT
              <input placeholder="Client or company" />
            </label>
            <label>
              AMOUNT
              <input type="number" placeholder="0.00" />
            </label>
            <div className="workspace-actions">
              <button
                type="button"
                className="cyber-button"
                onClick={() => {
                  setQueued(true)
                  setComposerOpen(false)
                }}
              >
                <Check size={15} /> QUEUE INVOICE
              </button>
              <button
                type="button"
                className="cyber-outline-button"
                onClick={() => setComposerOpen(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </Panel>
      )}
      {queued && (
        <div className="workspace-callout">
          <Check size={20} />
          <div>
            <b>DEMO INVOICE QUEUED</b>
            <p>Invoice creation is simulated in this preview workspace.</p>
          </div>
          <button type="button" onClick={() => setQueued(false)}>
            DISMISS
          </button>
        </div>
      )}
      <div className="workspace-actions">
        <button
          type="button"
          className="cyber-button"
          onClick={() => setComposerOpen(true)}
        >
          <Plus size={15} /> NEW INVOICE
        </button>
        <button
          type="button"
          className="cyber-outline-button"
          onClick={() =>
            downloadDemoFile(
              "fintraq-invoice-queue.csv",
              "invoice,client,due_date,amount,status\nINV-0042,ACME STUDIO,12 OCT 2026,3850.00," +
                statuses["INV-0042"] +
                "\nINV-0041,NORTHLINE CO.,08 OCT 2026,2400.00," +
                statuses["INV-0041"] +
                "\n",
              "text/csv"
            )
          }
        >
          <Download size={15} /> EXPORT QUEUE
        </button>
      </div>
    </>
  )
}

function Clients() {
  const clients = [
    ["ACME STUDIO", "hello@acme.studio", "$12,480 settled", "ACTIVE"],
    ["NORTHLINE CO.", "finance@northline.co", "$8,920 settled", "ACTIVE"],
    ["ORBIT DIGITAL", "ops@orbit.digital", "$1,750 pending", "AWAITING"],
    ["FORM & FUNCTION", "team@formfunction.io", "$4,200 overdue", "FOLLOW UP"],
  ]
  return (
    <>
      <div className="workspace-metrics">
        <div className="workspace-metric metric-accent">
          <span>ACTIVE CLIENTS</span>
          <strong>14</strong>
          <small>3 WITH OPEN WORK</small>
        </div>
        <div className="workspace-metric">
          <span>SETTLED THIS QUARTER</span>
          <strong>$48,920</strong>
          <small className="text-cyber-accent">+18.4% VS Q3</small>
        </div>
        <div className="workspace-metric">
          <span>OPEN FOLLOW-UPS</span>
          <strong>3</strong>
          <small className="text-cyber-warn">1 HIGH PRIORITY</small>
        </div>
      </div>
      <Panel title="CLIENT INDEX // 14 RECORDS">
        <div className="data-table">
          {clients.map((client) => (
            <div className="data-row client-row" key={client[0]}>
              <span className="client-avatar">{client[0].slice(0, 2)}</span>
              <div>
                <b>{client[0]}</b>
                <small>{client[1]}</small>
              </div>
              <span>{client[2]}</span>
              <strong
                className={
                  client[3] === "ACTIVE"
                    ? "text-cyber-accent"
                    : client[3] === "FOLLOW UP"
                      ? "text-cyber-danger"
                      : "text-cyber-warn"
                }
              >
                {client[3]}
              </strong>
              <ArrowRight size={15} />
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

function Records() {
  return (
    <>
      <div className="workspace-metrics">
        <div className="workspace-metric metric-accent">
          <span>INFLOWS</span>
          <strong>$12,450</strong>
          <small className="text-cyber-accent">THIS MONTH</small>
        </div>
        <div className="workspace-metric">
          <span>OUTFLOWS</span>
          <strong>$4,280</strong>
          <small className="text-cyber-danger">THIS MONTH</small>
        </div>
        <div className="workspace-metric">
          <span>NET MOVEMENT</span>
          <strong>+$8,169</strong>
          <small className="text-cyber-accent">POSITIVE VELOCITY</small>
        </div>
      </div>
      <Panel title="TRANSACTION STREAM // OCTOBER 2026">
        <div className="data-table">
          {ledger
            .concat([
              [
                "RENDER FARM",
                "STUDIO ASSETS // CLOUD",
                "−$180.00",
                "text-cyber-danger",
              ],
            ])
            .map((row, index) => (
              <div className="data-row" key={`${row[0]}-${index}`}>
                <span className="record-date">
                  0{index + 1}
                  <small>OCT</small>
                </span>
                <div>
                  <b>{row[0]}</b>
                  <small>{row[1]}</small>
                </div>
                <strong className={row[3]}>{row[2]}</strong>
                <span className="record-tag">SIMULATED</span>
              </div>
            ))}
        </div>
      </Panel>
    </>
  )
}

function Reports() {
  return (
    <>
      <div className="workspace-metrics">
        <div className="workspace-metric metric-accent">
          <span>NET INCOME</span>
          <strong>$8,169</strong>
          <small className="text-cyber-accent">+22.1% VS SEP</small>
        </div>
        <div className="workspace-metric">
          <span>RUNWAY</span>
          <strong>4.8 MO</strong>
          <small>BASED ON CURRENT BURN</small>
        </div>
        <div className="workspace-metric">
          <span>RESERVE COVERAGE</span>
          <strong>92%</strong>
          <small className="text-cyber-warn">Q4 TARGET</small>
        </div>
      </div>
      <div className="workspace-two-col">
        <Panel title="MONTHLY NET MOVEMENT" className="chart-panel-large">
          <div className="report-chart">
            <span style={{ height: "48%" }} />
            <span style={{ height: "60%" }} />
            <span style={{ height: "54%" }} />
            <span style={{ height: "72%" }} />
            <span style={{ height: "68%" }} />
            <span style={{ height: "90%" }} />
          </div>
          <div className="report-labels">
            <span>MAY</span>
            <span>JUN</span>
            <span>JUL</span>
            <span>AUG</span>
            <span>SEP</span>
            <span>OCT</span>
          </div>
        </Panel>
        <Panel title="SIGNAL SUMMARY">
          <div className="signal-list">
            <div>
              <span className="signal-positive">↗</span>
              <b>Income acceleration</b>
              <small>Invoices settled 18.2% faster.</small>
            </div>
            <div>
              <span className="signal-warning">!</span>
              <b>Asset spend pressure</b>
              <small>Studio assets up 11% this month.</small>
            </div>
            <div>
              <span className="signal-positive">✓</span>
              <b>Tax reserve on track</b>
              <small>92% of Q4 target allocated.</small>
            </div>
          </div>
        </Panel>
      </div>
      <div className="workspace-actions">
        <button
          type="button"
          className="cyber-button"
          onClick={() =>
            downloadDemoFile(
              "fintraq-operator-report.txt",
              "FINTRAQ OPERATOR REPORT\n\nNet income: $8,169\nRunway: 4.8 months\nReserve coverage: 92%\n",
              "text/plain"
            )
          }
        >
          <Download size={15} /> EXPORT REPORT
        </button>
      </div>
    </>
  )
}

function Settings() {
  const [saved, setSaved] = useState(false)
  return (
    <div className="settings-grid">
      <Panel title="OPERATOR PROFILE">
        <div className="settings-form">
          <label>
            DISPLAY NAME
            <input
              defaultValue="Jordan Davis"
              onChange={() => setSaved(false)}
            />
          </label>
          <label>
            WORKSPACE CODE
            <input
              defaultValue="OPERATOR_001"
              onChange={() => setSaved(false)}
            />
          </label>
          <label>
            DEFAULT CURRENCY
            <select defaultValue="USD" onChange={() => setSaved(false)}>
              <option>USD — US Dollar</option>
              <option>EUR — Euro</option>
              <option>GBP — Pound Sterling</option>
            </select>
          </label>
          <button
            type="button"
            className="cyber-button"
            onClick={() => setSaved(true)}
          >
            <Check size={15} /> {saved ? "CONFIG SAVED ✓" : "SAVE CONFIG"}
          </button>
        </div>
      </Panel>
      <Panel title="TELEMETRY PREFERENCES">
        <div className="settings-options">
          <label>
            <input type="checkbox" defaultChecked /> Daily liquidity pulse{" "}
            <small>Receive a concise daily signal.</small>
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Invoice follow-up alerts{" "}
            <small>Flag overdue payment states.</small>
          </label>
          <label>
            <input type="checkbox" /> Experimental terminal effects{" "}
            <small>Enable scanline and signal motion.</small>
          </label>
        </div>
      </Panel>
    </div>
  )
}

export function WorkspacePage({ page }: { page: WorkspacePage }) {
  const meta = pageMeta[page]
  return (
    <div className="workspace-page">
      <div className="workspace-header">
        <div>
          <p className="workspace-eyebrow">{meta.eyebrow}</p>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>
        <span className="workspace-status">
          <i /> LIVE // DEMO MODE
        </span>
      </div>
      {page === "dashboard" && <Dashboard />}
      {page === "budgets" && <Budgets />}
      {page === "clients" && <Clients />}
      {page === "invoices" && <Invoices />}
      {page === "records" && <Records />}
      {page === "reports" && <Reports />}
      {page === "settings" && <Settings />}
    </div>
  )
}
