import { useState, useMemo } from "react";
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectForm from "@/components/admin/ProjectForm";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  checkAdminPassword,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const categoryColors: Record<ProjectCategory, string> = {
  "Graphic Design": "bg-pink-500/10 text-pink-400",
  "Product Design": "bg-amber-500/10 text-amber-400",
  "Web Development": "bg-emerald-500/10 text-emerald-400",
  Engineering: "bg-primary/10 text-primary",
};

const AdminPage = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = filterCat === "all" || p.category === filterCat;
      return matchSearch && matchCat;
    });
  }, [projects, search, filterCat]);

  const stats = useMemo(
    () => ({
      total: projects.length,
      featured: projects.filter((p) => p.featured).length,
      categories: [...new Set(projects.map((p) => p.category))].length,
    }),
    [projects]
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPassword(password)) {
      setAuthed(true);
    } else {
      toast({ title: "Wrong password", variant: "destructive" });
    }
  };

  const handleSave = (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
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

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      deleteProject(id);
      setProjects(getProjects());
      toast({ title: "Project deleted" });
    }
  };

  // --- LOGIN SCREEN ---
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
            <h1 className="text-xl font-bold text-foreground font-display mb-2">Admin Portal</h1>
            <p className="text-sm text-muted-foreground mb-6">Enter password to continue</p>
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

  // --- EDITOR VIEW ---
  if (editing || creating) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 md:p-8">
            <ProjectForm
              project={editing ?? undefined}
              onSave={handleSave}
              onCancel={() => { setEditing(null); setCreating(false); }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display flex items-center gap-3">
              <LayoutDashboard size={24} className="text-primary" />
              Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <Eye size={16} /> View Site
            </Link>
            <button
              onClick={() => setAuthed(false)}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Projects", value: stats.total, icon: FolderOpen },
            { label: "Featured", value: stats.featured, icon: Star },
            { label: "Categories", value: stats.categories, icon: LayoutDashboard },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon size={18} className="text-primary" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="pl-9 bg-card/40"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "Graphic Design", "Product Design", "Web Development", "Engineering"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterCat === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCreating(true)}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 glow-primary ml-auto"
          >
            <Plus size={16} /> New Project
          </button>
        </div>

        {/* Project List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-xl p-4 flex items-center gap-4 group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex-shrink-0 overflow-hidden">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <FolderOpen size={18} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm truncate">{project.title}</h3>
                    {project.featured && <Star size={12} className="text-amber-400 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[project.category]}`}>
                      {project.category}
                    </span>
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground hidden md:inline">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditing(project)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <FolderOpen size={32} className="mx-auto mb-3 opacity-50" />
              <p>No projects found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
