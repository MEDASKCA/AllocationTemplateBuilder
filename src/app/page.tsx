import Link from "next/link";

export default function Home() {
  return (
    <main className="mapping-page">
      <div className="mapping-header">
        <div className="mapping-title">Hosp Mapping & Upload</div>
        <div className="mapping-subtitle">
          Use this page to upload HealthRoster exports and confirm mappings before opening the allocation template.
        </div>
      </div>

      <section className="mapping-card">
        <div className="mapping-card-title">Daily Staffing Report Uploads</div>
        <div className="mapping-grid">
          <div className="mapping-field">
            <label>Scrub Daily Staffing Report (Excel)</label>
            <input type="file" accept=".xlsx,.xls" />
          </div>
          <div className="mapping-field">
            <label>Anaesthetics Daily Staffing Report (Excel)</label>
            <input type="file" accept=".xlsx,.xls" />
          </div>
        </div>
      </section>

      <section className="mapping-card">
        <div className="mapping-card-title">Mapping Summary (Placeholder)</div>
        <div className="mapping-summary">
          <div>Unit detected: ?</div>
          <div>Report type: ?</div>
          <div>Shift date: ?</div>
          <div>Rows parsed: ?</div>
        </div>
      </section>

      <section className="mapping-card">
        <div className="mapping-card-title">Next Step</div>
        <div className="mapping-actions">
          <Link className="primary-link" href="/allocation">Open Allocation Template</Link>
        </div>
      </section>
    </main>
  );
}
