"use client"

import { useState } from "react"

export type DashboardView = "overview" | "invoices" | "budgets" | "accounts"

const moduleDetails: Record<DashboardView, { title: string; items: string[] }> = {
  overview: { title: "Cashflow overview", items: ["Liquidity", "Cashflow", "Live ledger"] },
  invoices: { title: "Invoice operations", items: ["Payment queue", "Due dates", "Follow-ups"] },
  budgets: { title: "Budget controls", items: ["Category limits", "Monthly plan", "Runway"] },
  accounts: { title: "Account network", items: ["Connected vaults", "Sync status", "Liquidity map"] },
}

function MetricCards({ items }: { items: [string, string, string][] }) {
  return <div className="interactive-dashboard-metrics">{items.map(([label, value, note], index) => <article className={index === 0 ? "featured" : ""} key={label}><small>{label}</small><strong>{value}</strong><span>{note}</span></article>)}</div>
}

function Overview({ activePanel }: { activePanel: string }) {
  const [period, setPeriod] = useState("Last 6 months")
  const [showAll, setShowAll] = useState(false)
  const rows = [
    ["Acme Studio", "Invoice payment · INV-0042", "+$3,850.00", "in"],
    ["Figma", "Software · Subscription", "−$24.00", "out"],
    ["Northline Co.", "Invoice payment · INV-0041", "+$2,400.00", "in"],
    ["Workspace", "Operations · Office", "−$320.00", "out"],
  ]
  const metrics: [string, string, string][] = [
    ["AVAILABLE LIQUIDITY", "$48,920.50", "↗ 12.8% vs last month"],
    ["INCOME", "$12,450.00", "↗ 18.2% vs last month"],
    ["EXPENSES", "$4,280.20", "↘ 4.1% vs last month"],
  ]

  return <>
    <div className="interactive-greeting"><small>THURSDAY, OCTOBER 1, 2026</small><h2>{activePanel === "Liquidity" ? "Available liquidity" : activePanel === "Cashflow" ? "Cashflow velocity" : "Live ledger"} <span>✳</span></h2><p>{activePanel === "Liquidity" ? "A clear view of every available dollar." : activePanel === "Cashflow" ? "Track income and expenses over time." : "Review your latest money movements."}</p></div>
    <MetricCards items={metrics} />
    {activePanel === "Liquidity" && <article className="interactive-module-screen"><div className="interactive-panel-heading"><div><b>Liquidity by account</b><small>$48,920.50 across 4 vaults</small></div><b>82% available</b></div>{[["Operating cash", "$24,680.50", 51], ["Treasury reserve", "$11,240.00", 23], ["Yield accounts", "$8,500.00", 18], ["Digital assets", "$4,500.00", 9]].map(([name, amount, percent]) => <div className="interactive-allocation-row" key={name}><div><b>{name}</b><span>{amount}</span></div><div className="interactive-budget-track"><i style={{ width: `${percent}%` }} /></div></div>)}</article>}
    {activePanel === "Cashflow" && <div className="interactive-dashboard-panels"><article className="interactive-chart"><div className="interactive-panel-heading"><div><b>Cashflow velocity</b><small>Income and expenses by month</small></div><button type="button" onClick={() => setPeriod(period === "Last 6 months" ? "This year" : "Last 6 months")}>{period}⌄</button></div><div className="interactive-bars">{(period === "Last 6 months" ? [54, 69, 59, 83, 70, 93] : [42, 58, 63, 71, 85, 93]).map((height, i) => <div key={i}><i style={{ height: `${height}%` }} /><i style={{ height: `${height * .48}%` }} /><small>{["May", "Jun", "Jul", "Aug", "Sep", "Oct"][i]}</small></div>)}</div></article><article className="interactive-reserve"><div className="interactive-panel-heading"><div><b>Tax reserve</b><small>Set aside, stay ahead</small></div></div><div className="interactive-gauge"><strong>$3,735</strong><small>of $4,500 goal</small></div><div className="interactive-reserve-footer"><span>On track for Q4</span><b>83%</b></div></article></div>}
    {activePanel === "Live ledger" && <article className="interactive-ledger"><div className="interactive-panel-heading"><div><b>Recent transactions</b><small>Income and spending activity</small></div><button type="button" onClick={() => setShowAll(!showAll)}>{showAll ? "Show recent" : "Show all"} →</button></div>{(showAll ? rows : rows.slice(0, 3)).map((row) => <div className="interactive-ledger-row" key={row[0]}><span className={`ledger-dot ${row[3]}`} /><b>{row[0]}</b><span>{row[1]}</span><strong className={row[3]}>{row[2]}</strong></div>)}</article>}
  </>
}

function Invoices({ activePanel }: { activePanel: string }) {
  const [added, setAdded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [followedUp, setFollowedUp] = useState<string[]>([])
  const [filter, setFilter] = useState("All")
  const [thisMonthOnly, setThisMonthOnly] = useState(true)
  const invoices = [
    ["INV-0042", "Acme Studio", "Oct 12, 2026", "$3,850.00", "Paid"],
    ["INV-0041", "Northline Co.", "Oct 08, 2026", "$2,400.00", "Paid"],
    ["INV-0040", "Orbit Digital", "Oct 18, 2026", "$1,750.00", "Pending"],
    ["INV-0039", "Form & Function", "Sep 30, 2026", "$4,200.00", "Overdue"],
    ...(added ? [["INV-0043", "New client", "Oct 24, 2026", "$0.00", "Draft"]] : []),
  ]
  const metrics: [string, string, string][] = [["PAID THIS MONTH", "$6,250.00", "2 invoices paid"], ["AWAITING PAYMENT", "$1,750.00", "1 invoice outstanding"], ["OVERDUE", "$4,200.00", "1 invoice needs attention"]]
  const openInvoice = (invoice: string[]) => setSelected(selected === invoice[0] ? null : invoice[0])

  return <>
    <div className="interactive-view-heading"><div><small>YOUR REVENUE, IN MOTION</small><h2>{activePanel}</h2><p>{activePanel === "Payment queue" ? "Every payment, accounted for." : activePanel === "Due dates" ? "Know what is due and when." : "Keep overdue invoices moving."}</p></div>{activePanel === "Payment queue" && <button className="interactive-action" type="button" onClick={() => setAdded(true)}>＋ New invoice</button>}</div>
    <MetricCards items={metrics} />
    {activePanel === "Payment queue" && <article className="interactive-table-panel"><div className="interactive-panel-heading"><div><b>All invoices</b><small>Filter by status or select a payment.</small></div><div className="interactive-filter-group">{["All", "Open", "Paid", "Overdue"].map((item) => <button className={filter === item ? "active" : ""} key={item} type="button" onClick={() => setFilter(item)}>{item}</button>)}</div></div><InvoiceTable invoices={invoices.filter((row) => filter === "All" || (filter === "Open" ? row[4] === "Pending" || row[4] === "Overdue" : row[4] === filter))} selected={selected} onSelect={openInvoice} />{selected && <p className="interactive-selection">{selected} selected · payment details are ready to review.</p>}</article>}
    {activePanel === "Due dates" && <article className="interactive-module-screen"><div className="interactive-panel-heading"><div><b>{thisMonthOnly ? "Due this month" : "All open due dates"}</b><small>{thisMonthOnly ? "October 2026 · upcoming payments" : "All unpaid invoices · sorted by due date"}</small></div><button type="button" onClick={() => setThisMonthOnly(!thisMonthOnly)}>{thisMonthOnly ? "Show all dates⌄" : "October only⌄"}</button></div><div className="interactive-due-list">{invoices.filter((row) => (row[4] === "Pending" || row[4] === "Overdue") && (!thisMonthOnly || row[2].startsWith("Oct"))).map((row) => <button type="button" className="interactive-due-row" key={row[0]} onClick={() => openInvoice(row)}><span className={row[4] === "Overdue" ? "overdue" : "pending"}>{row[2]}</span><b>{row[1]}</b><small>{row[0]}</small><strong>{row[3]}</strong><em>{row[4]}</em></button>)}</div>{selected && <p className="interactive-selection">Viewing schedule for {selected}.</p>}</article>}
    {activePanel === "Follow-ups" && <article className="interactive-module-screen"><div className="interactive-panel-heading"><div><b>Follow-up list</b><small>Overdue payments that need a nudge</small></div><span>{invoices.filter((row) => (row[4] === "Overdue" || row[4] === "Pending") && !followedUp.includes(row[0])).length} remaining</span></div>{invoices.filter((row) => row[4] === "Overdue" || row[4] === "Pending").map((row) => <div className={`interactive-followup-row ${followedUp.includes(row[0]) ? "done" : ""}`} key={row[0]}><div><b>{row[1]}</b><small>{row[0]} · {row[2]} · {row[4]}</small></div><strong>{row[3]}</strong><button type="button" onClick={() => setFollowedUp((current) => current.includes(row[0]) ? current : [...current, row[0]])}>{followedUp.includes(row[0]) ? "Sent ✓" : "Send reminder"}</button></div>)}</article>}
  </>
}

function InvoiceTable({ invoices, selected, onSelect }: { invoices: string[][]; selected: string | null; onSelect: (invoice: string[]) => void }) {
  return <div className="interactive-table-wrap"><table className="interactive-table"><thead><tr><th>Invoice</th><th>Client</th><th>Due date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{invoices.map((invoice) => <tr key={invoice[0]} className={selected === invoice[0] ? "selected" : ""} onClick={() => onSelect(invoice)}><td className="invoice-id">{invoice[0]}</td><td>{invoice[1]}</td><td>{invoice[2]}</td><td>{invoice[3]}</td><td><span className={`invoice-status ${invoice[4].toLowerCase()}`}>{invoice[4]}</span></td></tr>)}</tbody></table></div>
}

function Budgets({ activePanel }: { activePanel: string }) {
  const [showNew, setShowNew] = useState(false)
  const [added, setAdded] = useState(false)
  const [forecast, setForecast] = useState(4.8)
  const categories: [string, string, number, string][] = [
    ["Operations", "$1,280 / $2,000", 64, "lime"], ["Software & tools", "$542 / $800", 68, "coral"], ["Studio assets", "$940 / $1,500", 63, "muted"], ["Travel", "$720 / $1,700", 42, "green"],
    ...(added ? [["New category", "$0 / $500", 0, "lime"] as [string, string, number, string]] : []),
  ]
  const metrics: [string, string, string][] = [["MONTHLY LIMIT", "$6,000.00", "Across 4 categories"], ["SPENT SO FAR", "$3,482.00", "58% of total budget"], ["REMAINING", "$2,518.00", "Available this month"]]

  return <>
    <div className="interactive-view-heading"><div><small>CONTROL WHAT COMES NEXT</small><h2>{activePanel}</h2><p>{activePanel === "Runway" ? "See how long your cash can support current spending." : activePanel === "Monthly plan" ? "Plan allocations before the month begins." : "Set a clear limit for every category."}</p></div>{activePanel !== "Runway" && <button className="interactive-action" type="button" onClick={() => setShowNew(true)}>＋ New budget</button>}</div>
    <MetricCards items={metrics} />
    {activePanel === "Category limits" && <article className="interactive-budget-panel"><div className="interactive-panel-heading"><div><b>Spending by category</b><small>October 2026 · current vs. limit</small></div><span>58% used</span></div>{categories.map(([name, amount, width, color]) => <div className="interactive-budget-row" key={name}><div><b>{name}</b><strong>{amount}</strong></div><div className="interactive-budget-track"><i className={color} style={{ width: `${width}%` }} /></div></div>)}</article>}
    {activePanel === "Monthly plan" && <article className="interactive-module-screen"><div className="interactive-panel-heading"><div><b>October allocation plan</b><small>Planned amount compared with actual spending</small></div><button type="button" onClick={() => setAdded(!added)}>{added ? "Plan saved ✓" : "Save plan"}</button></div>{categories.map(([name, amount, width, color]) => <div className="interactive-plan-row" key={name}><div><b>{name}</b><span>{amount}</span></div><div className="interactive-plan-track"><i className={color} style={{ width: `${width}%` }} /><i className="planned" style={{ width: `${Math.min(width + 18, 100)}%` }} /></div><small>{width}% used · {Math.max(100 - width, 0)}% left</small></div>)}</article>}
    {activePanel === "Runway" && <article className="interactive-module-screen"><div className="interactive-panel-heading"><div><b>Runway forecast</b><small>Available reserve at current spend</small></div><span>Updated today</span></div><div className="interactive-runway"><strong>{forecast.toFixed(1)} months</strong><div className="interactive-budget-track"><i style={{ width: `${Math.min(forecast * 12, 100)}%` }} /></div><small>Forecast assumes average monthly spend of $3,482.</small></div><div className="interactive-runway-controls"><button type="button" onClick={() => setForecast(Math.max(1, forecast - .2))}>− Lower spend</button><button type="button" onClick={() => setForecast(Math.min(10, forecast + .2))}>＋ Add reserve</button></div></article>}
    {showNew && <div className="interactive-inline-dialog" role="dialog" aria-label="Create a budget"><span>New budget category</span><button type="button" onClick={() => { setAdded(true); setShowNew(false) }}>Add category</button><button type="button" aria-label="Close" onClick={() => setShowNew(false)}>×</button></div>}
  </>
}

function Accounts({ activePanel }: { activePanel: string }) {
  const [connected, setConnected] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [synced, setSynced] = useState(false)
  const accounts = [
    ["Mercury checking", "Operating · USD", "$24,680.50", "Synced", "lime"], ["Wise treasury", "EUR / GBP reserve", "$11,240.00", "Synced", "muted"], ["Brex cash", "Yield enabled · USD", "$8,500.00", "Synced", "coral"], ["Ethereum Safe", "Multisig · ETH", "$4,500.00", "Synced", "green"],
    ...(connected ? [["New vault", "Personal · USD", "$0.00", "Connecting", "lime"]] : []),
  ]
  const metrics: [string, string, string][] = [["CASH RESERVES", "$48,920.50", "4 connected vaults"], ["YIELD EARNING", "$2,480.00", "4.85% APY on Brex"], ["SYNC STATUS", synced ? "CURRENT" : "LIVE", synced ? "Synced just now" : "Last check: 14 seconds ago"]]

  return <>
    <div className="interactive-view-heading"><div><small>MULTI-VAULT DIRECTORY</small><h2>{activePanel}</h2><p>{activePanel === "Sync status" ? "Check when each account last refreshed." : activePanel === "Liquidity map" ? "See where your reserves are held." : "Manage every connected money vault."}</p></div>{activePanel === "Connected vaults" && <button className="interactive-action" type="button" onClick={() => setConnected(true)}>＋ Connect vault</button>}</div>
    <MetricCards items={metrics} />
    {activePanel === "Connected vaults" && <article className="interactive-accounts-panel"><div className="interactive-panel-heading"><div><b>Connected vaults</b><small>Illustrative accounts · no live connection</small></div></div>{accounts.map(([name, description, amount, status, color]) => <button type="button" className={`interactive-account-row ${selected === name ? "selected" : ""}`} key={name} onClick={() => setSelected(selected === name ? null : name)}><span className={`account-icon ${color}`}>✦</span><span className="account-name"><b>{name}</b><small>{description}</small></span><span className="account-sync"><i />{status}</span><strong>{amount}</strong><span className="account-more">···</span></button>)}{selected && <p className="interactive-selection">{selected} selected · account details are ready to review.</p>}</article>}
    {activePanel === "Sync status" && <article className="interactive-module-screen"><div className="interactive-panel-heading"><div><b>Connection health</b><small>Last checked {synced ? "just now" : "14 seconds ago"}</small></div><button type="button" onClick={() => setSynced(true)}>{synced ? "All up to date ✓" : "Refresh all ↻"}</button></div>{accounts.map(([name, description, amount, , color]) => <div className="interactive-sync-row" key={name}><span className={`account-icon ${color}`}>✦</span><div><b>{name}</b><small>{description}</small></div><span className="sync-indicator"><i />{synced ? "Synced just now" : "Healthy · 14 sec ago"}</span></div>)}</article>}
    {activePanel === "Liquidity map" && <article className="interactive-module-screen"><div className="interactive-panel-heading"><div><b>Reserve distribution</b><small>Balance allocation across your vaults</small></div><span>$48,920.50 total</span></div><div className="interactive-liquidity-map">{accounts.map(([name, description, amount, , color], index) => <button type="button" className={selected === name ? "selected" : ""} key={name} onClick={() => setSelected(selected === name ? null : name)}><span className={`account-icon ${color}`}>✦</span><b>{name}</b><strong>{amount}</strong><i style={{ width: `${[51, 23, 18, 9][index] ?? 4}%` }} /></button>)}</div>{selected && <p className="interactive-selection">{selected} represents one part of your total liquidity.</p>}</article>}
  </>
}

export function InteractiveDashboard({
  initialView = "overview",
  className = "",
  snapshot,
}: {
  initialView?: DashboardView
  className?: string
  snapshot: string
}) {
  const view = initialView
  const module = moduleDetails[view]
  const [activeModuleItem, setActiveModuleItem] = useState(module.items[0])

  return (
    <section className={`interactive-dashboard dashboard-dark ${className}`} aria-label={`${snapshot} ${module.title} interactive preview`}>
      <header className="interactive-dashboard-topbar">
        <div className="interactive-brand"><span>✳</span> fintraq<span>.</span></div>
        <div className="interactive-topbar-status"><i /> All systems operational <b>JD</b></div>
      </header>
      <div className="interactive-dashboard-layout">
        <aside className="interactive-dashboard-sidebar">
          <small>WORKSPACE</small>
          <div className="interactive-module-nav">
            <b>{module.title}</b>
            {module.items.map((item) => <button className={activeModuleItem === item ? "active" : ""} key={item} type="button" onClick={() => setActiveModuleItem(item)}>{item}</button>)}
          </div>
          <small className="interactive-manage-label">PREVIEW</small>
          <p className="interactive-sidebar-snapshot">{snapshot}</p>
          <div className="interactive-sidebar-user"><span>JD</span><div><b>Jordan Davis</b><small>Personal workspace</small></div></div>
        </aside>
        <div className="interactive-dashboard-content">
          <div className="interactive-breadcrumb">Workspace <span>/</span> <b>{snapshot}</b></div>
          <div className="interactive-module-focus" aria-live="polite">ACTIVE VIEW <b>{activeModuleItem}</b></div>
          <div className="interactive-screen-content">
            {view === "overview" ? <Overview activePanel={activeModuleItem} /> : view === "invoices" ? <Invoices activePanel={activeModuleItem} /> : view === "budgets" ? <Budgets activePanel={activeModuleItem} /> : <Accounts activePanel={activeModuleItem} />}
          </div>
        </div>
      </div>
    </section>
  )
}
