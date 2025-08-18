"use client";

import { useEffect, useState } from "react";

type Opp = { id: string; type: string; status: string };
type Detail = {
  requirementId: string;
  tier: string;
  entry: string;
  hwId: string | null;
  cpuCores: number | null;
  ramGb: number | null;
  storageGb: number | null;
  storageMedia: string | null;
  iopsRead: number | null;
  iopsWrite: number | null;
  upMbps: number | null;
  downMbps: number | null;
  staticIpPreferred: boolean | null;
  upsRequired: boolean | null;
  notes: string | null;
};

interface AdminDashboardExpandRowProps {
  projectId: string;
}

const AdminDashboardExpandRow: React.FC<AdminDashboardExpandRowProps> = ({
  projectId,
}) => {
  const [opps, setOpps] = useState<Opp[] | null>(null);
  const [selectedOppId, setSelectedOppId] = useState("");
  const [details, setDetails] = useState<Detail[] | null>(null);
  const [loadingOpps, setLoadingOpps] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoadingOpps(true);

      try {
        const res = await fetch(`/api/opportunities?projectId=${projectId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load opportunities");

        const data: Opp[] = await res.json();
        if (!cancelled) {
          setOpps(data);
          setSelectedOppId(data?.[0]?.id ?? "");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load opportunities");
      } finally {
        if (!cancelled) setLoadingOpps(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  useEffect(() => {
    if (!selectedOppId) {
      setDetails(null);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoadingDetails(true);

      try {
        const res = await fetch(
          `/api/opportunity-details?opportunityId=${selectedOppId}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to load details");
        const data: Detail[] = await res.json();

        if (!cancelled) setDetails(data);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load details");
      } finally {
        if (!cancelled) setLoadingDetails(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedOppId]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Opportunity</label>
        {loadingOpps ? (
          <span className="text-sm opacity-70">Loading…</span>
        ) : opps && opps.length ? (
          <select
            value={selectedOppId}
            onChange={(e) => setSelectedOppId(e.target.value)}
            className={[
              "text-sm rounded-xl border border-white/10 bg-white/5",
              "px-3 py-2 outline-none focus:ring-2 focus:ring-white/20",
            ].join(" ")}
          >
            {opps.map((o) => (
              <option key={o.id} value={o.id}>
                {o.type} · {o.status}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-sm opacity-70">No opportunities</span>
        )}
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}
      {loadingDetails && (
        <div className="text-sm opacity-70">Loading details…</div>
      )}

      {!loadingDetails && details && (
        <div className="space-y-3">
          {details.length === 0 ? (
            <div className="text-sm opacity-70">No requirements yet.</div>
          ) : (
            details.map((d) => (
              <div
                key={d.requirementId}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4"
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>Requirement:</span>
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs uppercase">
                    {d.tier}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs uppercase">
                    {d.entry}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <Field label="CPU Cores" value={d.cpuCores} />
                  <Field label="RAM (GB)" value={d.ramGb} />
                  <Field label="Storage (GB)" value={d.storageGb} />
                  <Field label="Storage Media" value={d.storageMedia} />
                  <Field label="IOPS Read" value={d.iopsRead} />
                  <Field label="IOPS Write" value={d.iopsWrite} />
                  <Field label="Up (Mbps)" value={d.upMbps} />
                  <Field label="Down (Mbps)" value={d.downMbps} />
                  <Field
                    label="Static IP Pref."
                    value={d.staticIpPreferred ? "Yes" : "No"}
                  />
                  <Field
                    label="UPS Required"
                    value={d.upsRequired ? "Yes" : "No"}
                  />
                  <Field label="Notes" value={d.notes} />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Field({ label, value }: { label: string; value: any }) {
  const show = value !== null && value !== undefined && value !== "";
  return (
    <div>
      <div className="text-[11px] uppercase opacity-60">{label}</div>
      <div className="text-sm">{show ? String(value) : "—"}</div>
    </div>
  );
}

export default AdminDashboardExpandRow;
