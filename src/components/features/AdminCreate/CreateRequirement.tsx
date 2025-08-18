"use client";

import { useEffect, useState } from "react";

type Project = { id: string; name: string };
type ActionFn = (formData: FormData) => void;

interface CreateRequirementProps {
  projects: Project[];
  tierValues: string[];
  entryValues: string[];
  storageMediaValues: string[];
  action: ActionFn;
}

const CreateRequirement: React.FC<CreateRequirementProps> = ({
  projects,
  tierValues,
  entryValues,
  storageMediaValues,
  action,
}) => {
  const [projectId, setProjectId] = useState<string>("");
  const [opps, setOpps] = useState<
    { id: string; type: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!projectId) {
        setOpps([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(`/api/opportunities?projectId=${projectId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!cancelled) setOpps(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field>
          <Label>Project *</Label>
          <Select
            name="__projectSelector"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select…</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
          <p className="text-xs opacity-70 mt-1">
            Select a project to load its opportunities.
          </p>
        </Field>

        <Field>
          <Label>Opportunity *</Label>
          <Select
            name="opportunityId"
            required
            disabled={!projectId || loading}
          >
            <option value="">{loading ? "Loading…" : "Select…"}</option>
            {opps.map((o) => (
              <option key={o.id} value={o.id}>
                {o.type} · {o.status}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Tier *</Label>
          <Select name="tier" required>
            {tierValues.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Entry *</Label>
          <Select name="entry" required>
            {entryValues.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <fieldset className="rounded-2xl border border-white/10 p-4">
        <legend className="px-2 text-sm font-medium">Hardware</legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field>
            <Label>CPU Cores</Label>
            <Input name="cpuCores" type="number" min="0" />
          </Field>

          <Field>
            <Label>RAM (GB)</Label>
            <Input name="ramGb" type="number" min="0" />
          </Field>

          <Field>
            <Label>Storage (GB)</Label>
            <Input name="storageGb" type="number" min="0" />
          </Field>

          <Field>
            <Label>Storage Media</Label>
            <Select name="storageMedia">
              <option value="">—</option>
              {storageMediaValues.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>IOPS Read</Label>
            <Input name="iopsRead" type="number" min="0" />
          </Field>

          <Field>
            <Label>IOPS Write</Label>
            <Input name="iopsWrite" type="number" min="0" />
          </Field>

          <Field>
            <Label>Up (Mbps)</Label>
            <Input name="upMbps" type="number" min="0" />
          </Field>

          <Field>
            <Label>Down (Mbps)</Label>
            <Input name="downMbps" type="number" min="0" />
          </Field>

          <Field>
            <Label>Monthly Data (TB)</Label>
            <Input name="monthlyDataTb" type="number" step="0.01" min="0" />
          </Field>

          <div className="md:col-span-3 flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <Checkbox name="staticIpPreferred" />
              <span className="text-sm">Static IP Preferred</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <Checkbox name="upsRequired" />
              <span className="text-sm">UPS Required</span>
            </label>
          </div>

          <Field>
            <Label>Notes</Label>
            <Textarea name="notes" />
          </Field>
        </div>
      </fieldset>

      <div className="pt-1">
        <Button>Save Requirement</Button>
      </div>
    </form>
  );
};

export function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium">{children}</label>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-white/10 bg-white/5",
        "px-3 py-2 outline-none focus:ring-2 focus:ring-white/20",
        props.className || "",
      ].join(" ")}
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-xl border border-white/10 bg-white/5",
        "px-3 py-2 outline-none focus:ring-2 focus:ring-white/20",
        props.className || "",
      ].join(" ")}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-white/10 bg-white/5",
        "px-3 py-2 outline-none focus:ring-2 focus:ring-white/20",
        props.className || "",
      ].join(" ")}
    />
  );
}

export function Checkbox(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      {...props}
      className={[
        "h-4 w-4 rounded border-white/20 bg-white/5",
        "focus:ring-2 focus:ring-white/20",
        props.className || "",
      ].join(" ")}
    />
  );
}

export function Button({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={[
        "rounded-xl border border-white/15 bg-white/10 px-3 py-2",
        "hover:bg-white/15 active:bg-white/20 transition",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        rest.className || "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default CreateRequirement;
