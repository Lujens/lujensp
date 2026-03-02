import { useState } from "react";
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
import { Save, X, Plus, Trash2 } from "lucide-react";

const categories: ProjectCategory[] = [
  "Graphic Design",
  "Product Design",
  "Web Development",
  "Engineering",
];

interface ProjectFormProps {
  project?: Project;
  onSave: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState<ProjectCategory>(project?.category ?? "Graphic Design");
  const [description, setDescription] = useState(project?.description ?? "");
  const [richContent, setRichContent] = useState(project?.richContent ?? "<p></p>");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [tags, setTags] = useState<string[]>(project?.tags ?? []);
  const [techStack, setTechStack] = useState<string[]>(project?.techStack ?? []);
  const [newTag, setNewTag] = useState("");
  const [newTech, setNewTech] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      category,
      description,
      richContent,
      imageUrl,
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      tags,
      techStack: techStack.length > 0 ? techStack : undefined,
      featured,
    });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground font-display">
          {project ? "Edit Project" : "New Project"}
        </h2>
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

      {/* Main fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" required className="bg-card/40" />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as ProjectCategory)}>
            <SelectTrigger className="bg-card/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Short Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief project summary..." rows={2} className="bg-card/40" />
      </div>

      <div className="space-y-2">
        <Label>Detailed Content</Label>
        <RichTextEditor content={richContent} onChange={setRichContent} />
      </div>

      {/* Image & Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Cover Image URL</Label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="bg-card/40" />
        </div>
        <div className="space-y-2">
          <Label>GitHub URL</Label>
          <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." className="bg-card/40" />
        </div>
        <div className="space-y-2">
          <Label>Live Demo URL</Label>
          <Input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." className="bg-card/40" />
        </div>
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div className="rounded-xl overflow-hidden border border-border max-w-sm">
          <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
      )}

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground flex items-center gap-1.5">
              {tag}
              <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:text-destructive">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add tag..." className="bg-card/40 max-w-xs" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} />
          <button type="button" onClick={addTag} className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Tech Stack */}
      {(category === "Engineering" || category === "Web Development") && (
        <div className="space-y-2">
          <Label>Tech Stack</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {techStack.map((tech) => (
              <span key={tech} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary flex items-center gap-1.5">
                {tech}
                <button type="button" onClick={() => setTechStack(techStack.filter((t) => t !== tech))} className="hover:text-destructive">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newTech} onChange={(e) => setNewTech(e.target.value)} placeholder="Add technology..." className="bg-card/40 max-w-xs" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }} />
            <button type="button" onClick={addTech} className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Featured Toggle */}
      <div className="flex items-center gap-3 pt-2">
        <Switch checked={featured} onCheckedChange={setFeatured} />
        <Label className="cursor-pointer">Featured on homepage</Label>
      </div>
    </form>
  );
};

export default ProjectForm;
