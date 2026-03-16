//rebuild
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "./RichTextEditor";
import type { Project, ProjectCategory } from "@/lib/projects";
import {
  Save,
  X,
  Plus,
  Image as ImageIcon,
  Globe,
  Github,
  User,
  Calendar,
  Briefcase,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const categories: ProjectCategory[] = [
  "Graphic Design",
  "Product Design",
  "Web Development",
  "Engineering",
];

const quickTags: Record<ProjectCategory, string[]> = {
  "Graphic Design": [
    "Branding",
    "Logo",
    "Social Media",
    "Flyer",
    "Label Design",
    "Campaign",
    "Guidelines",
    "Packaging",
  ],
  "Product Design": [
    "Mobile",
    "UX/UI",
    "Dashboard",
    "Wireframe",
    "Prototype",
    "Landing Page",
    "SaaS",
  ],
  "Web Development": [
    "E-Commerce",
    "WordPress",
    "WooCommerce",
    "Shopify",
    "Landing Page",
    "Business Site",
    "Custom Build",
    "Responsive",
  ],
  Engineering: [
    "Full-Stack",
    "Frontend",
    "Backend",
    "API",
    "Database",
    "Machine Learning",
    "Mobile App",
    "CLI Tool",
  ],
};

const quickTech: string[] = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Next.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "REST API",
  "GraphQL",
  "Express",
  "WordPress",
  "WooCommerce",
  "Shopify",
  "Figma",
  "Git",
  "Docker",
  "AWS",
  "Vite",
  "Socket.io",
  "Redux",
  "Prisma",
  "Supabase",
];

interface ProjectFormProps {
  project?: Project;
  onSave: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState<ProjectCategory>(
    project?.category ?? "Web Development"
  );
  const [description, setDescription] = useState(project?.description ?? "");
  const [richContent, setRichContent] = useState(
    project?.richContent ?? "<p></p>"
  );
  const [imageUrl, setImageUrl] = useState(project?.imageUrl ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    project?.thumbnailUrl ?? ""
  );
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [year, setYear] = useState(
    project?.year ?? new Date().getFullYear().toString()
  );
  const [role, setRole] = useState(project?.role ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [tags, setTags] = useState<string[]>(project?.tags ?? []);
  const [techStack, setTechStack] = useState<string[]>(
    project?.techStack ?? []
  );
  const [newTag, setNewTag] = useState("");
  const [newTech, setNewTech] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      category,
      description,
      richContent,
      imageUrl,
      thumbnailUrl: thumbnailUrl || undefined,
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      client: client || undefined,
      year: year || undefined,
      role: role || undefined,
      tags,
      techStack: techStack.length > 0 ? techStack : undefined,
      featured,
      sortOrder: project?.sortOrder ?? 0,
    });
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleTech = (tech: string) => {
    setTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech("");
    }
  };

  const showTechFields =
    category === "Engineering" || category === "Web Development";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground font-display">
            {project ? "Edit Project" : "New Project"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {project
              ? "Update the details below"
              : "Fill in the essentials — you can always edit later"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 glow-primary"
          >
            <Save size={16} /> Save Project
          </button>
        </div>
      </div>

      {/* ── SECTION 1: Core Info ── */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-primary tracking-wider uppercase">
          Basics
        </h3>
        <div className="h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-[1fr_200px] gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            Project Title <span className="text-destructive">*</span>
          </Label>
          <Input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. CleanPro — Business Website"
            required
            className="bg-card/40 text-base"
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as ProjectCategory)}
          >
            <SelectTrigger className="bg-card/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-1.5">
          Short Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="One or two sentences that sell this project — this shows on the card"
          rows={2}
          required
          className="bg-card/40"
        />
        <p className="text-xs text-muted-foreground">
          {description.length}/160 characters recommended
        </p>
      </div>

      {/* ── SECTION 2: Visuals ── */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-primary tracking-wider uppercase flex items-center gap-1.5">
          <ImageIcon size={12} /> Visuals
        </h3>
        <div className="h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cover Image URL</Label>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste an image URL (Imgur, Unsplash, etc.)"
            className="bg-card/40"
          />
          {imageUrl && (
            <div className="rounded-xl overflow-hidden border border-border mt-2">
              <img
                src={imageUrl}
                alt="Cover preview"
                className="w-full h-36 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>
            Thumbnail URL{" "}
            <span className="text-muted-foreground font-normal">
              (optional — uses cover if empty)
            </span>
          </Label>
          <Input
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="Smaller image for grid cards"
            className="bg-card/40"
          />
          {thumbnailUrl && (
            <div className="rounded-xl overflow-hidden border border-border mt-2 max-w-[200px]">
              <img
                src={thumbnailUrl}
                alt="Thumbnail preview"
                className="w-full h-28 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 3: Links ── */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-primary tracking-wider uppercase flex items-center gap-1.5">
          <Globe size={12} /> Links
        </h3>
        <div className="h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <Globe size={13} /> Live Site URL
          </Label>
          <Input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://clientsite.com"
            className="bg-card/40"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <Github size={13} /> GitHub URL
          </Label>
          <Input
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/Lujens/..."
            className="bg-card/40"
          />
        </div>
      </div>

      {/* ── SECTION 4: Tags ── */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-primary tracking-wider uppercase">
          Tags
        </h3>
        <div className="h-px bg-border" />
      </div>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Quick pick — click to toggle:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickTags[category].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                tags.includes(tag)
                  ? "bg-primary/15 border-primary/40 text-primary font-medium"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {tags.includes(tag) ? "✓ " : ""}
              {tag}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Custom tag..."
            className="bg-card/40 max-w-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        {tags.filter((t) => !quickTags[category].includes(t)).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags
              .filter((t) => !quickTags[category].includes(t))
              .map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground flex items-center gap-1.5"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="hover:text-destructive"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
          </div>
        )}
      </div>

      {/* ── SECTION 5: Tech Stack (conditional) ── */}
      {showTechFields && (
        <>
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-primary tracking-wider uppercase">
              Tech Stack
            </h3>
            <div className="h-px bg-border" />
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Quick pick — click to toggle:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickTech.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    techStack.includes(tech)
                      ? "bg-accent/15 border-accent/40 text-accent font-medium"
                      : "border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  {techStack.includes(tech) ? "✓ " : ""}
                  {tech}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Custom tech..."
                className="bg-card/40 max-w-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── SECTION 6: Detailed Write-up ── */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-primary tracking-wider uppercase">
          Project Write-up{" "}
          <span className="text-muted-foreground font-normal normal-case tracking-normal">
            — optional but recommended
          </span>
        </h3>
        <div className="h-px bg-border" />
      </div>

      <RichTextEditor content={richContent} onChange={setRichContent} />

      {/* ── SECTION 7: Advanced / Meta ── */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {showAdvanced ? "Hide" : "Show"} additional details
      </button>

      {showAdvanced && (
        <div className="space-y-4 p-5 rounded-xl bg-secondary/30 border border-border">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <User size={13} /> Client Name
              </Label>
              <Input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Bella's Cleaning Co."
                className="bg-card/40"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Briefcase size={13} /> Your Role
              </Label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Designer & Developer"
                className="bg-card/40"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Calendar size={13} /> Year
              </Label>
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="bg-card/40"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION 8: Settings ── */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-primary tracking-wider uppercase">
          Settings
        </h3>
        <div className="h-px bg-border" />
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={featured} onCheckedChange={setFeatured} />
        <div>
          <Label className="cursor-pointer">Featured on homepage</Label>
          <p className="text-xs text-muted-foreground">
            Shows in the "Selected Work" grid on the homepage
          </p>
        </div>
      </div>

      {/* Bottom Save */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 glow-primary"
        >
          <Save size={16} />{" "}
          {project ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
