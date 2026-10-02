"use client"

import { useState } from "react"
import { useTheme } from "next-themes"

export type DashboardView = "overview" | "invoices" | "budgets" | "accounts"

const navItems: { id: DashboardView; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "invoices", label: "Invoices" },
  { id: "budgets", label: "Budgets" },
  { id: "accounts", label: "Accounts" },
]

function Overview() {
  const [period, setPeriod] = useState("Last 6 months")
  const [showAll, setShowAll] = useState(false)
  const rows = [
    ["Acme Studio", "Invoice payment · INV-0042", "+$3,850.00", "in"],
    ["Figma", "Software · Subscription", "−$24.00", "out"],
    ["Northline Co.", "Invoice payment · INV-0041", "+$2,400.00", "in"],
    ["Workspace", "Operations · Office", "−$320.00", "out"],
  ]

  return (
    <>
      <div className="interactive-greeting">
        <small>THURSDAY, OCTOBER 1, 2026</small>
        <h2>Good morning, Jordan <span>✳</span></h2>
        <p>Here’s what’s happening with your money.</p>
      </div>
      <div className="interactive-dashboard-metrics">
        <article className="featured"><small>AVAILABLE LIQUIDITY</small><strong>$48,920.50</strong><span>↗ 12.8% vs last month</span></article>
        <article><small>INCOME</small><strong>$12,450.00</strong><span>↗ 18.2% vs last month</span></article>
        <article><small>EXPENSES</small><strong>$4,280.20</strong><span>↘ 4.1% vs last month</span></article>
      </div>
      <div className="interactive-dashboard-panels">
        <article className="interactive-chart">
          <div className="interactive-panel-heading"><div><b>Cash flow velocity</b><small>Inflow and outflow over six months</small></div><button type="button" onClick={() => setPeriod(period === "Last 6 months" ? "This year" : "Last 6 months")}>{period}⌄</button></div>
          <div className="interactive-bars">{[54, 69, 59, 83, 70, 93].map((height, i) => <div key={i}><i style={{ height: `${height}%` }} /><i style={{ height: `${height * 0.48}%` }} /><small>{["May", "Jun", "Jul", "Aug", "Sep", "Oct"][i]}</small></div>)}</div>
        </article>
        <article className="interactive-reserve">
          <div className="interactive-panel-heading"><div><b>Tax reserve</b><small>Set aside, stay ahead</small></div></div>
          <div className="interactive-gauge"><strong>$3,735</strong><small>of $4,500 goal</small></div>
          <div className="interactive-reserve-footer"><span>On track for Q4</span><b>83%</b></div>
        </article>
      </div>
      <article className="interactive-ledger">
        <div className="interactive-panel-heading"><div><b>Live ledger</b><small>Your latest money movements</small></div><button type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Show less" : "View all"} →</button></div>
        {(showAll ? rows : rows.slice(0, 3)).map((row) => <div className="interactive-ledger-row" key={row[0]}><span className={`ledger-dot ${row[3]}`} /><b>{row[0]}</b><span>{row[1]}</span><strong className={row[3]}>{row[2]}</strong></div>)}
      </article>
    </>
  )
}

function Invoices() {
  const [added, setAdded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const invoices = [
    ["INV-0042", "Acme Studio", "Oct 12, 2026", "$3,850.00", "Paid"],
    ["INV-0041", "Northline Co.", "Oct 08, 2026", "$2,400.00", "Paid"],
    ["INV-0040", "Orbit Digital", "Oct 18, 2026", "$1,750.00", "Pending"],
    ["INV-0039", "Form & Function", "Sep 30, 2026", "$4,200.00", "Overdue"],
    ...(added ? [["INV-0043", "New client", "Oct 24, 2026", "$0.00", "Draft"]] : []),
  ]
  return (
    <>
      <div className="interactive-view-heading"><div><small>YOUR REVENUE, IN MOTION</small><h2>Invoices ↗</h2><p>Every payment, accounted for.</p></div><button className="interactive-action" type="button" onClick={() => setAdded(true)}>＋ New invoice</button></div>
      <div className="interactive-dashboard-metrics">
        <article className="featured"><small>PAID THIS MONTH</small><strong>$6,250.00</strong><span>2 invoices paid</span></article>
        <article><small>AWAITING PAYMENT</small><strong>$1,750.00</strong><span>1 invoice outstanding</span></article>
        <article><small>OVERDUE</small><strong>$4,200.00</strong><span>1 invoice needs attention</span></article>
      </div>
      <article className="interactive-table-panel">
        <div className="interactive-panel-heading"><div><b>All invoices</b><small>Click a row to inspect its payment status.</small></div><button type="button">October 2026⌄</button></div>
        <div className="interactive-table-wrap"><table className="interactive-table"><thead><tr><th>Invoice</th><th>Client</th><th>Due date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{invoices.map((invoice) => <tr key={invoice[0]} className={selected === invoice[0] ? "selected" : ""} onClick={() => setSelected(selected === invoice[0] ? null : invoice[0])}><td className="invoice-id">{invoice[0]}</td><td>{invoice[1]}</td><td>{invoice[2]}</td><td>{invoice[3]}</td><td><span className={`invoice-status ${invoice[4].toLowerCase()}`}>{invoice[4]}</span></td></tr>)}</tbody></table></div>
        {selected && <p className="interactive-selection">{selected} selected · payment details are ready to review.</p>}
      </article>
      <div className="interactive-note"><span>✳</span> Make getting paid the easy part.</div>
    </>
  )
}

function Budgets() {
  const [showNew, setShowNew] = useState(false)
  const [added, setAdded] = useState(false)
  const categories = [
    ["Operations", "$1,280 / $2,000", 64, "lime"],
    ["Software & tools", "$542 / $800", 68, "coral"],
    ["Studio assets", "$940 / $1,500", 63, "muted"],
    ["Travel", "$720 / $1,700", 42, "green"],
    ...(added ? [["New category", "$0 / $500", 0, "lime"]] : []),
  ] as [string, string, number, string][]
  return (
    <>
      <div className="interactive-view-heading"><div><small>CONTROL WHAT COMES NEXT</small><h2>Budgets ◈</h2><p>Give every dollar a direction.</p></div><button className="interactive-action" type="button" onClick={() => setShowNew(true)}>＋ New budget</button></div>
      <div className="interactive-dashboard-metrics">
        <article className="featured"><small>MONTHLY LIMIT</small><strong>$6,000.00</strong><span>Across 4 categories</span></article>
        <article><small>SPENT SO FAR</small><strong>$3,482.00</strong><span>58% of total budget</span></article>
        <article><small>REMAINING</small><strong>$2,518.00</strong><span>Available this month</span></article>
      </div>
      <article className="interactive-budget-panel">
        <div className="interactive-panel-heading"><div><b>Spending by category</b><small>October 2026</small></div><button type="button">Runway: 4.8 months⌄</button></div>
        {categories.map(([name, amount, width, color]) => <div className="interactive-budget-row" key={name}><div><b>{name}</b><strong>{amount}</strong></div><div className="interactive-budget-track"><i className={color} style={{ width: `${width}%` }} /></div></div>)}
      </article>
      {showNew && <div className="interactive-inline-dialog" role="dialog" aria-label="Create a budget"><span>New budget category</span><button type="button" onClick={() => { setAdded(true); setShowNew(false) }}>Add category</button><button type="button" aria-label="Close" onClick={() => setShowNew(false)}>×</button></div>}
    </>
  )
}

function Accounts() {
  const [connected, setConnected] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const accounts = [
    ["Mercury checking", "Operating · USD", "$24,680.50", "Synced", "lime"],
    ["Wise treasury", "EUR / GBP reserve", "$11,240.00", "Synced", "muted"],
    ["Brex cash", "Yield enabled · USD", "$8,500.00", "Synced", "coral"],
    ["Ethereum Safe", "Multisig · ETH", "$4,500.00", "Synced", "green"],
    ...(connected ? [["New vault", "Personal · USD", "$0.00", "Connecting", "lime"]] : []),
  ]
  return (
    <>
      <div className="interactive-view-heading"><div><small>MULTI-VAULT DIRECTORY</small><h2>Accounts Matrix ◈</h2><p>One view across every place your money lives.</p></div><button className="interactive-action" type="button" onClick={() => setConnected(true)}>＋ Connect vault</button></div>
      <div className="interactive-dashboard-metrics">
        <article className="featured"><small>CASH RESERVES</small><strong>$48,920.50</strong><span>4 connected vaults</span></article>
        <article><small>YIELD EARNING</small><strong>$2,480.00</strong><span>4.85% APY on Brex</span></article>
        <article><small>SYNC STATUS</small><strong>LIVE</strong><span>Last check: 14 seconds ago</span></article>
      </div>
      <article className="interactive-accounts-panel">
        <div className="interactive-panel-heading"><div><b>Connected vaults</b><small>Illustrative accounts · no live connection</small></div><button type="button">Sync all ↻</button></div>
        {accounts.map(([name, description, amount, status, color]) => <button type="button" className={`interactive-account-row ${selected === name ? "selected" : ""}`} key={name} onClick={() => setSelected(selected === name ? null : name)}><span className={`account-icon ${color}`}>✦</span><span className="account-name"><b>{name}</b><small>{description}</small></span><span className="account-sync"><i />{status}</span><strong>{amount}</strong><span className="account-more">···</span></button>)}
        {selected && <p className="interactive-selection">{selected} selected · account details are ready to review.</p>}
      </article>
    </>
  )
}

export function InteractiveDashboard({
  initialView = "overview",
  className = "",
}: {
  initialView?: DashboardView
  className?: string
}) {
  const [view, setView] = useState<DashboardView>(initialView)
  const { resolvedTheme } = useTheme()
  const dashboardTheme = resolvedTheme === "light" ? "dashboard-dark" : "dashboard-light"
  const label = navItems.find((item) => item.id === view)?.label ?? "Overview"

  return (
    <section className={`interactive-dashboard ${dashboardTheme} ${className}`} aria-label={`${label} interactive dashboard`}>
      <header className="interactive-dashboard-topbar">
        <div className="interactive-brand"><span>✳</span> fintraq<span>.</span></div>
        <div className="interactive-topbar-status"><i /> All systems operational <b>JD</b></div>
      </header>
      <div className="interactive-dashboard-layout">
        <aside className="interactive-dashboard-sidebar">
          <small>WORKSPACE</small>
          <nav aria-label="Dashboard views">{navItems.map((item) => <button key={item.id} type="button" className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}>{item.label}</button>)}</nav>
          <small className="interactive-manage-label">MANAGE</small>
          <button className="interactive-manage-link" type="button" onClick={() => setView("overview")}>Transactions</button>
          <button className="interactive-manage-link" type="button" onClick={() => setView("accounts")}>Settings</button>
          <div className="interactive-sidebar-user"><span>JD</span><div><b>Jordan Davis</b><small>Personal workspace</small></div></div>
        </aside>
        <div className="interactive-dashboard-content">
          <div className="interactive-breadcrumb">Workspace <span>/</span> <b>{label}</b></div>
          <div className="interactive-screen-content">
            {view === "overview" ? <Overview /> : view === "invoices" ? <Invoices /> : view === "budgets" ? <Budgets /> : <Accounts />}
          </div>
        </div>
      </div>
    </section>
  )
}
