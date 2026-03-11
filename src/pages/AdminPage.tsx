import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Lock,
  Eye,
  Star,
  Search,
  Download,
  Upload,
  Copy,
  CheckCircle2,
  AlertTriangle,
  GripVertical,
  Image as ImageIcon,
  Globe,
  Github,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectForm from "@/components/admin/ProjectForm";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  checkAdminPassword,
  exportProjectsJSON,
  importProjectsJSON,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const categoryColors: Record<ProjectCategory, string> = {
  "Graphic Design": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Product Design": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Web Development": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Engineering: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const categoryIcons: Record<ProjectCategory, string> = {
  "Graphic Design": "🎨",
  "Product Design": "📱",
  "Web Development": "🌐",
  Engineering: "⚙️",
};

const AdminPage = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<ProjectCategory | "all">("all");
  const [showImport, setShowImport] = useState(false);
  const [importJSON, setImportJSON] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        (p.client ?? "").toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "all" || p.category === filterCat;
      return matchSearch && matchCat;
    });
  }, [projects, search, filterCat]);

  const stats = useMemo(() => {
    const byCat = projects.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return {
      total: projects.length,
      featured: projects.filter((p) => p.featured).length,
      withImages: projects.filter((p) => p.imageUrl).length,
      byCat,
    };
  }, [projects]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPassword(password)) {
      setAuthed(true);
    } else {
      toast({ title: "Wrong password", variant: "destructive" });
    }
  };

  const handleSave = (
    data: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editing) {
      updateProject(editing.id, data);
      toast({ title: "Project updated" });
    } else {
      addProject(data);
      toast({ title: "Project created" });
    }
    setProjects(getProjects());
    setEditing(null);
    setCreating(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"? This can't be undone.`)) {
      deleteProject(id);
      setProjects(getProjects());
      toast({ title: "Project deleted" });
    }
  };

  const handleExport = () => {
    const json = exportProjectsJSON();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "JSON copied to clipboard" });
  };

  const handleExportFile = () => {
    const json = exportProjectsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-projects-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "JSON file downloaded" });
  };

  const handleImport = () => {
    if (importProjectsJSON(importJSON)) {
      setProjects(getProjects());
      setShowImport(false);
      setImportJSON("");
      toast({ title: "Projects imported successfully" });
    } else {
      toast({ title: "Invalid JSON format", variant: "destructive" });
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (importProjectsJSON(text)) {
        setProjects(getProjects());
        setShowImport(false);
        toast({ title: "Projects imported from file" });
      } else {
        toast({ title: "Invalid JSON file", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const toggleFeatured = (id: string, currentFeatured: boolean) => {
    updateProject(id, { featured: !currentFeatured });
    setProjects(getProjects());
  };

  // ─── LOGIN SCREEN ───
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock size={24} className="text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground font-display mb-2">
              Portfolio Admin
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Enter password to manage projects
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-card/40 text-center"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary"
              >
                Enter
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── EDITOR VIEW ───
  if (editing || creating) {
    return (
      <div className="min-h-screen bg-background pt-8 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-5 md:p-8"
          >
            <ProjectForm
              project={editing ?? undefined}
              onSave={handleSave}
              onCancel={() => {
                setEditing(null);
                setCreating(false);
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  return (
    <div className="min-h-screen bg-background pt-8 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display flex items-center gap-3">
              <LayoutDashboard size={24} className="text-primary" />
              Portfolio Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} project{projects.length !== 1 ? "s" : ""} ·{" "}
              {stats.featured} featured ·{" "}
              {stats.total - stats.withImages > 0 && (
                <span className="text-amber-400">
                  {stats.total - stats.withImages} missing images
                </span>
              )}
              {stats.total - stats.withImages === 0 && stats.total > 0 && (
                <span className="text-emerald-400">All images set</span>
              )}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <Eye size={15} /> View Site
            </Link>
            <button
              onClick={handleExport}
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
            >
              {copied ? (
                <CheckCircle2 size={15} className="text-emerald-400" />
              ) : (
                <Copy size={15} />
              )}
              {copied ? "Copied!" : "Copy JSON"}
            </button>
            <button
              onClick={handleExportFile}
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <Download size={15} /> Export
            </button>
            <button
              onClick={() => setShowImport(!showImport)}
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <Upload size={15} /> Import
            </button>
            <button
              onClick={() => setAuthed(false)}
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Import Panel */}
        <AnimatePresence>
          {showImport && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="glass rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Upload size={15} /> Import Projects
                </div>
                <textarea
                  value={importJSON}
                  onChange={(e) => setImportJSON(e.target.value)}
                  placeholder="Paste JSON here..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-card/40 border border-border text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleImport}
                    disabled={!importJSON.trim()}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
                  >
                    Import JSON
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    Upload File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => {
                      setShowImport(false);
                      setImportJSON("");
                    }}
                    className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-auto"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <AlertTriangle size={12} className="text-amber-400" />
                  Importing will replace all current projects
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {(
            [
              "Graphic Design",
              "Product Design",
              "Web Development",
              "Engineering",
            ] as ProjectCategory[]
          ).map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setFilterCat(filterCat === cat ? "all" : cat)
              }
              className={`glass rounded-xl p-4 text-left transition-all duration-200 ${
                filterCat === cat
                  ? "border-primary/40 bg-primary/5"
                  : "hover:border-border/80"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{categoryIcons[cat]}</span>
                <span className="text-xl font-bold text-foreground">
                  {stats.byCat[cat] || 0}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{cat}</p>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, tags, clients..."
              className="pl-9 bg-card/40"
            />
          </div>
          <button
            onClick={() => setCreating(true)}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 glow-primary ml-auto"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FolderOpen size={28} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
              No projects yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Start building your portfolio by adding your first project. Fill
              in the details and it'll show up on your site instantly.
            </p>
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary"
            >
              <Plus size={16} /> Add Your First Project
            </button>
          </motion.div>
        )}

        {/* Project List */}
        {projects.length > 0 && (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 group hover:border-primary/20 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 md:w-16 md:h-12 rounded-lg flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon
                          size={16}
                          className="text-muted-foreground/40"
                        />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-foreground text-sm truncate">
                        {project.title}
                      </h3>
                      {!project.imageUrl && (
                        <span
                          className="text-amber-400 flex-shrink-0"
                          title="Missing cover image"
                        >
                          <AlertTriangle size={12} />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[project.category]}`}
                      >
                        {project.category}
                      </span>
                      {project.client && (
                        <span className="text-xs text-muted-foreground">
                          {project.client}
                        </span>
                      )}
                      {project.year && (
                        <span className="text-xs text-muted-foreground">
                          · {project.year}
                        </span>
                      )}
                      <div className="hidden md:flex items-center gap-1.5 ml-1">
                        {project.liveUrl && (
                          <Globe
                            size={11}
                            className="text-muted-foreground/50"
                          />
                        )}
                        {project.githubUrl && (
                          <Github
                            size={11}
                            className="text-muted-foreground/50"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        toggleFeatured(project.id, project.featured)
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        project.featured
                          ? "text-amber-400 bg-amber-400/10"
                          : "text-muted-foreground/30 hover:text-amber-400 hover:bg-amber-400/10"
                      }`}
                      title={
                        project.featured
                          ? "Remove from featured"
                          : "Add to featured"
                      }
                    >
                      <Star
                        size={15}
                        fill={project.featured ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      onClick={() => setEditing(project)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(project.id, project.title)
                      }
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && projects.length > 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search size={24} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No projects match your search</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
