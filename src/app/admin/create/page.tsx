import {
  listProjects,
  createProject,
  listProjectTags,
  createOpportunity,
  upsertRequirementWithHardware,
} from "@/app/actions";
import CreateRequirement, {
  Button,
  Checkbox,
  Field,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/features/AdminCreate/CreateRequirement";
import { typeE, statusE, tierE, entryE, storageMediaE } from "@/db/schema";

export default async function CreateAllPage() {
  const [projects, tags] = await Promise.all([
    listProjects(),
    listProjectTags(),
  ]);

  return (
    <main className="mx-auto p-6 space-y-12">
      {/* Create Project */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <SectionTitle>Project</SectionTitle>

        <form action={createProject} className="space-y-5">
          <Field>
            <Label>Name *</Label>
            <Input name="name" required />
          </Field>

          <Field>
            <Label>Website</Label>
            <Input name="website" />
          </Field>

          <Field>
            <Label>Documentation</Label>
            <Input name="documentation" />
          </Field>

          <Field>
            <Label>Description</Label>
            <Textarea name="description" />
          </Field>

          <Field>
            <Label>Tags *</Label>
            {tags.length === 0 ? (
              <p className="text-xs text-red-500">
                No tags exist yet. Seed <code>project_tags</code> before
                creating a project.
              </p>
            ) : (
              <>
                <Select
                  name="tags"
                  multiple
                  required
                  size={Math.min(8, Math.max(3, tags.length))}
                >
                  {tags.map((t) => (
                    <option key={t.code} value={t.code}>
                      {t.label} ({t.code})
                    </option>
                  ))}
                </Select>
                <p className="text-xs opacity-70 mt-1">
                  Hold <kbd>Ctrl/Cmd</kbd> or <kbd>Shift</kbd> to select
                  multiple.
                </p>
              </>
            )}
          </Field>

          <label className="inline-flex items-center gap-2">
            <Checkbox name="isActive" defaultChecked />
            <span className="text-sm">Active</span>
          </label>

          <div className="pt-1">
            <Button
              disabled={tags.length === 0}
              title={
                tags.length === 0 ? "Add tags in project_tags first" : undefined
              }
            >
              Create Project
            </Button>
          </div>
        </form>
      </section>

      <Separator />

      {/* Create Opportunity */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <SectionTitle>Opportunity</SectionTitle>

        <form action={createOpportunity} className="space-y-5">
          <Field>
            <Label>Project *</Label>
            <Select name="projectId" required>
              <option value="">Select…</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Type *</Label>
            <Select name="type" required>
              {typeE.enumValues.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Status *</Label>
            <Select name="status" required>
              {statusE.enumValues.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>

          <div className="pt-1">
            <Button>Create Opportunity</Button>
          </div>
        </form>
      </section>

      <Separator />

      {/* Create/Update Requirement + Hardware */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <SectionTitle>Requirement + Hardware</SectionTitle>

        <CreateRequirement
          projects={projects}
          tierValues={tierE.enumValues}
          entryValues={entryE.enumValues}
          storageMediaValues={storageMediaE.enumValues}
          action={upsertRequirementWithHardware}
        />
      </section>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-medium">{children}</h2>
      <div className="mt-2 h-px bg-white/10" />
    </div>
  );
}

function Separator() {
  return <div className="h-px bg-white/10" />;
}
