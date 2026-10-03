import type { ReactNode } from "react"

type Telemetry = readonly [label: string, value: string]

type AuthShellProps = {
  /** Mono kicker above the headline, e.g. "FINTRAQ ACCESS // 01". */
  kicker: string
  /** Display headline. The trailing period is rendered in the accent color. */
  title: ReactNode
  lede: string
  telemetry: readonly Telemetry[]
  /** Page position shown in the footer rail, e.g. "001 // 003". */
  index: string
  children: ReactNode
}

export function AuthShell({
  kicker,
  title,
  lede,
  telemetry,
  index,
  children,
}: AuthShellProps) {
  return (
    <main className="auth-page cyber-site">
      <div className="auth-grid" aria-hidden="true" />
      <div className="section-wrap auth-layout">
        <section className="auth-intro">
          <p className="hero-status">
            <span className="pulse-dot auth-blink" aria-hidden="true" />
            <span>{kicker}</span>
          </p>
          <h1>
            {title}
            <span>.</span>
          </h1>
          <p className="auth-lede">{lede}</p>
          <dl className="auth-telemetry">
            {telemetry.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="auth-index" aria-hidden="true">
            {index}
          </p>
        </section>
        <div className="auth-console">{children}</div>
      </div>
    </main>
  )
}

type AuthPanelProps = {
  /** Mono label in the panel's top bar, e.g. "SIGN IN // 01". */
  label: string
  footer?: ReactNode
  children: ReactNode
}

export function AuthPanel({ label, footer, children }: AuthPanelProps) {
  return (
    <section className="auth-panel" aria-label={label}>
      <div className="auth-panel-inner">
        <div className="auth-panel-bar">
          <span>{label}</span>
          <span>
            <i className="pulse-dot" aria-hidden="true" /> SECURE CHANNEL
          </span>
        </div>
        <div className="auth-panel-body">{children}</div>
        {footer ? <div className="auth-panel-footer">{footer}</div> : null}
      </div>
    </section>
  )
}

export function AuthError({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <div className="auth-message auth-message-error" role="alert">
      <b>ERR // {title}</b>
      <p>{message}</p>
    </div>
  )
}

export function AuthNotice({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <div className="auth-message" role="status">
      <b>OK // {title}</b>
      <p>{message}</p>
    </div>
  )
}
