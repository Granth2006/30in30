import { 
  Code, Palette, FileCode, Atom, Triangle, Hexagon, Server, 
  Terminal, Database, Flame, Plug, Brain, Leaf, Wind, Grid, 
  Zap, Cloud, Layers, Box, Cpu, Globe, Shield, Lock, Settings,
  Image, FileText, MessageSquare, Sparkles, Eye, PenTool, Monitor
} from 'lucide-react';

const iconMap = {
  Code,
  Palette,
  FileCode,
  Atom,
  Triangle,
  Hexagon,
  Server,
  Terminal,
  Database,
  Flame,
  Plug,
  Brain,
  Leaf,
  Wind,
  Grid,
  Zap,
  Cloud,
  Layers,
  Box,
  Cpu,
  Globe,
  Shield,
  Lock,
  Settings,
  Image,
  FileText,
  MessageSquare,
  Sparkles,
  Eye,
  PenTool,
  Monitor
};

const techConfig = {
  "HTML": { color: "#E34F26", bgColor: "bg-orange-100", icon: "Code", label: "HTML" },
  "CSS": { color: "#1572B6", bgColor: "bg-blue-100", icon: "Palette", label: "CSS" },
  "JavaScript": { color: "#F7DF1E", bgColor: "bg-yellow-100", icon: "FileCode", label: "JS" },
  "React": { color: "#61DAFB", bgColor: "bg-cyan-100", icon: "Atom", label: "React" },
  "Vue": { color: "#4FC08D", bgColor: "bg-green-100", icon: "Triangle", label: "Vue" },
  "Angular": { color: "#DD0031", bgColor: "bg-red-100", icon: "Hexagon", label: "Angular" },
  "Node.js": { color: "#339933", bgColor: "bg-green-100", icon: "Server", label: "Node" },
  "Python": { color: "#3776AB", bgColor: "bg-blue-100", icon: "Terminal", label: "Python" },
  "Supabase": { color: "#3ECF8E", bgColor: "bg-emerald-100", icon: "Database", label: "Supabase" },
  "Firebase": { color: "#FFCA28", bgColor: "bg-amber-100", icon: "Flame", label: "Firebase" },
  "API": { color: "#FF6B6B", bgColor: "bg-red-100", icon: "Plug", label: "API" },
  "AI": { color: "#9C27B0", bgColor: "bg-purple-100", icon: "Brain", label: "AI" },
  "MongoDB": { color: "#47A248", bgColor: "bg-green-100", icon: "Leaf", label: "Mongo" },
  "PostgreSQL": { color: "#336791", bgColor: "bg-blue-100", icon: "Database", label: "Postgre" },
  "Tailwind": { color: "#06B6D4", bgColor: "bg-cyan-100", icon: "Wind", label: "Tailwind" },
  "Bootstrap": { color: "#7952B3", bgColor: "bg-purple-100", icon: "Grid", label: "Bootstrap" },
  "Vercel": { color: "#000000", bgColor: "bg-gray-200", icon: "Zap", label: "Vercel" },
  "Netlify": { color: "#00C7B7", bgColor: "bg-teal-100", icon: "Cloud", label: "Netlify" },
  "Docker": { color: "#2496ED", bgColor: "bg-blue-100", icon: "Box", label: "Docker" },
  "AWS": { color: "#FF9900", bgColor: "bg-orange-100", icon: "Cloud", label: "AWS" },
  "TypeScript": { color: "#3178C6", bgColor: "bg-blue-100", icon: "FileCode", label: "TS" },
  "GraphQL": { color: "#E10098", bgColor: "bg-pink-100", icon: "Layers", label: "GraphQL" },
  "Next.js": { color: "#000000", bgColor: "bg-gray-200", icon: "Globe", label: "Next.js" },
  "Vite": { color: "#646CFF", bgColor: "bg-indigo-100", icon: "Zap", label: "Vite" }
};

export default function TechStackIcon({ tech, showLabel = false, size = "sm" }) {
  const config = techConfig[tech] || { 
    color: "#666", 
    bgColor: "bg-gray-100", 
    icon: "Code", 
    label: tech 
  };
  
  const IconComponent = iconMap[config.icon] || Code;
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${config.bgColor} rounded-lg flex items-center justify-center transition-transform hover:scale-110`}
      title={tech}
    >
      <IconComponent 
        className={iconSizes[size]} 
        style={{ color: config.color }}
      />
      {showLabel && (
        <span className="ml-1 text-xs font-medium text-gray-700">{config.label}</span>
      )}
    </div>
  );
}

// Get all available tech options for forms
export function getTechOptions() {
  return Object.keys(techConfig);
}

// Multi-select component for tech stack
export function TechStackSelect({ selected, onChange }) {
  const techOptions = getTechOptions();
  
  const toggleTech = (tech) => {
    if (selected.includes(tech)) {
      onChange(selected.filter(t => t !== tech));
    } else {
      onChange([...selected, tech]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {techOptions.map(tech => (
        <button
          key={tech}
          type="button"
          onClick={() => toggleTech(tech)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            selected.includes(tech)
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <TechStackIcon tech={tech} size="sm" />
          <span>{tech}</span>
        </button>
      ))}
    </div>
  );
}
