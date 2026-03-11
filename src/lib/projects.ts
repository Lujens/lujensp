export type ProjectCategory =
  | "Graphic Design"
  | "Product Design"
  | "Web Development"
  | "Engineering";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  richContent: string;
  imageUrl: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack?: string[];
  client?: string;
  year?: string;
  role?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "portfolio_projects_v2";

const ADMIN_PASSWORD = "LP@dmin2026!";

function getDefaultProjects(): Project[] {
  return [];
}

export function getProjects(): Project[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return getDefaultProjects();
  try {
    const projects = JSON.parse(raw) as Project[];
    return projects.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch {
    return getDefaultProjects();
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    sortOrder: project.sortOrder ?? projects.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, data: Partial<Project>) {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    projects[idx] = {
      ...projects[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    saveProjects(projects);
  }
  return projects[idx];
}

export function deleteProject(id: string) {
  const projects = getProjects().filter((p) => p.id !== id);
  saveProjects(projects);
}

export function reorderProjects(ids: string[]) {
  const projects = getProjects();
  const reordered = ids
    .map((id, i) => {
      const p = projects.find((proj) => proj.id === id);
      if (p) return { ...p, sortOrder: i };
      return null;
    })
    .filter(Boolean) as Project[];
  saveProjects(reordered);
}

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getProjects().filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function exportProjectsJSON(): string {
  return JSON.stringify(getProjects(), null, 2);
}

export function importProjectsJSON(json: string): boolean {
  try {
    const projects = JSON.parse(json) as Project[];
    if (!Array.isArray(projects)) return false;
    saveProjects(projects);
    return true;
  } catch {
    return false;
  }
}
