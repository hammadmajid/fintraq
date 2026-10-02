import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Landmark, ShieldCheck } from "lucide-react"

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="workspace-page">
      <div className="workspace-header">
        <div>
          <p className="workspace-eyebrow">ACCOUNT MATRIX // VAULT PROFILE</p>
          <h1>Mercury Operating</h1>
          <p>Illustrative account telemetry for vault {id}. Connect a provider to replace this demo state with live data.</p>
        </div>
        <span className="workspace-status"><i /> DEMO ACCOUNT</span>
      </div>

      <div className="workspace-metrics">
        <div className="workspace-metric metric-cyan"><span>CURRENT BALANCE</span><strong>$48,920.50</strong><small className="text-green">↗ 12.8% THIS MONTH</small></div>
        <div className="workspace-metric"><span>MONTHLY INFLOW</span><strong>$12,450</strong><small className="text-green">6 DEPOSITS</small></div>
        <div className="workspace-metric"><span>MONTHLY OUTFLOW</span><strong>$4,280</strong><small className="text-magenta">18 TRANSACTIONS</small></div>
        <div className="workspace-metric"><span>RESERVE STATUS</span><strong>92%</strong><small className="text-yellow">Q4 TARGET LOCKED</small></div>
      </div>

      <div className="workspace-two-col">
        <section className="workspace-panel chart-panel-large">
          <div className="workspace-panel-title"><span>BALANCE MOVEMENT // 6M WINDOW</span><span className="panel-cross">+</span></div>
          <div className="report-chart"><span style={{ height: "44%" }} /><span style={{ height: "57%" }} /><span style={{ height: "52%" }} /><span style={{ height: "71%" }} /><span style={{ height: "66%" }} /><span style={{ height: "91%" }} /></div>
          <div className="report-labels"><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span></div>
        </section>
        <section className="workspace-panel">
          <div className="workspace-panel-title"><span>ACCOUNT PROTOCOL</span><span className="panel-cross">+</span></div>
          <div className="signal-list">
            <div><span className="signal-positive"><ShieldCheck size={18} /></span><b>Reserve allocation active</b><small>Tax reserve is tracking against target.</small></div>
            <div><span className="signal-positive"><Landmark size={18} /></span><b>Primary operating vault</b><small>Used for incoming client payments.</small></div>
            <div><span className="signal-warning">!</span><b>Connection is simulated</b><small>No external financial account is connected.</small></div>
          </div>
        </section>
      </div>

      <div className="workspace-actions">
        <Link href="/accounts" className="cyber-outline-button"><ArrowLeft size={15} /> BACK TO ACCOUNTS</Link>
        <a href="/fintraq-overview-lime.png" download="fintraq-account-snapshot.png" className="cyber-button"><ArrowUpRight size={15} /> EXPORT SNAPSHOT</a>
      </div>
    </main>
  )
}
