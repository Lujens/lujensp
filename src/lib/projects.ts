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
  githubUrl?: string;
  liveUrl?: string;
  techStack?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "portfolio_projects";
const ADMIN_PASSWORD = "lujens2024";

export function getProjects(): Project[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return getDefaultProjects();
  try {
    return JSON.parse(raw);
  } catch {
    return getDefaultProjects();
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
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
    projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
    saveProjects(projects);
  }
  return projects[idx];
}

export function deleteProject(id: string) {
  const projects = getProjects().filter((p) => p.id !== id);
  saveProjects(projects);
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

function getDefaultProjects(): Project[] {
  return [
    {
      id: "1",
      title: "Luxe Studio — Brand Identity",
      category: "Graphic Design",
      tags: ["Branding", "Logo", "Guidelines"],
      description: "Complete brand system including logo, typography, color palette, and brand guidelines.",
      richContent: "<p>Complete brand system including logo, typography, color palette, and brand guidelines.</p>",
      imageUrl: "",
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "FitTrack — Fitness App",
      category: "Product Design",
      tags: ["Mobile", "UX/UI"],
      description: "End-to-end mobile app design for a personalized fitness tracking platform.",
      richContent: "<p>End-to-end mobile app design for a personalized fitness tracking platform with social features.</p>",
      imageUrl: "",
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Artisan Collective — E-Commerce",
      category: "Web Development",
      tags: ["Shopify", "E-Commerce"],
      description: "Custom Shopify store with unique product customizer and seamless checkout experience.",
      richContent: "<p>Custom Shopify store with unique product customizer and seamless checkout experience.</p>",
      imageUrl: "",
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Real-Time Chat Application",
      category: "Engineering",
      tags: ["React", "Node.js", "Socket.io"],
      description: "Full-stack messaging platform with WebSocket connections and user authentication.",
      richContent: "<p>Full-stack messaging platform with WebSocket connections, user authentication, and message persistence.</p>",
      imageUrl: "",
      githubUrl: "#",
      liveUrl: "#",
      techStack: ["React", "Node.js", "Socket.io", "MongoDB"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Flavor Co. — Social Campaign",
      category: "Graphic Design",
      tags: ["Social Media", "Campaign"],
      description: "Multi-platform social media campaign with cohesive visual language.",
      richContent: "<p>Multi-platform social media campaign across Instagram, TikTok, and LinkedIn.</p>",
      imageUrl: "",
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Task Management API",
      category: "Engineering",
      tags: ["Node.js", "Express", "PostgreSQL"],
      description: "RESTful API with JWT authentication and role-based access control.",
      richContent: "<p>RESTful API with JWT authentication, role-based access control, and comprehensive test coverage.</p>",
      imageUrl: "",
      githubUrl: "#",
      techStack: ["Node.js", "Express", "PostgreSQL", "Jest"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}
