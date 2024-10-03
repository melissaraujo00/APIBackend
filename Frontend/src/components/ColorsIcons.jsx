import {
  Coffee,
  Droplet,
  Code,
  Globe,
  Server,
  Layers,
  Zap,
  Database,
  Cloud,
  Lock,
  Users,
  Cog,
  Briefcase,
  Book,
  Cpu,
  Smartphone,
  Wifi,
  Headphones,
  Camera,
  Pen,
  Compass,
  Anchor,
  Aperture,
  Archive,
  FileText,
} from "lucide-react";

export default function ColorsIcons() {
  const numRandom = Math.floor(Math.random() * 25);

  switch (numRandom) {
    case 0:
      return {
        icon: Code,
        color: "bg-slate-100",
        textColor: "text-slate-600",
      };
    case 1:
      return {
        icon: Globe,
        color: "bg-gray-100",
        textColor: "text-gray-600",
      };
    case 2:
      return {
        icon: Server,
        color: "bg-zinc-100",
        textColor: "text-zinc-600",
      };
    case 3:
      return {
        icon: Layers,
        color: "bg-neutral-100",
        textColor: "text-neutral-600",
      };
    case 4:
      return {
        icon: Zap,
        color: "bg-stone-100",
        textColor: "text-stone-600",
      };
    case 5:
      return {
        icon: Database,
        color: "bg-blue-50",
        textColor: "text-blue-500",
      };
    case 6:
      return {
        icon: Cloud,
        color: "bg-cyan-50",
        textColor: "text-cyan-500",
      };
    case 7:
      return {
        icon: Lock,
        color: "bg-teal-50",
        textColor: "text-teal-500",
      };
    case 8:
      return {
        icon: Users,
        color: "bg-emerald-50",
        textColor: "text-emerald-500",
      };
    case 9:
      return {
        icon: Cog,
        color: "bg-green-50",
        textColor: "text-green-500",
      };
    case 10:
      return {
        icon: Briefcase,
        color: "bg-indigo-50",
        textColor: "text-indigo-500",
      };
    case 11:
      return {
        icon: Book,
        color: "bg-violet-50",
        textColor: "text-violet-500",
      };
    case 12:
      return {
        icon: Cpu,
        color: "bg-purple-50",
        textColor: "text-purple-500",
      };
    case 13:
      return {
        icon: Smartphone,
        color: "bg-fuchsia-50",
        textColor: "text-fuchsia-500",
      };
    case 14:
      return {
        icon: Wifi,
        color: "bg-slate-200",
        textColor: "text-slate-700",
      };
    case 15:
      return {
        icon: Headphones,
        color: "bg-gray-200",
        textColor: "text-gray-700",
      };
    case 16:
      return {
        icon: Camera,
        color: "bg-zinc-200",
        textColor: "text-zinc-700",
      };
    case 17:
      return {
        icon: Pen,
        color: "bg-neutral-200",
        textColor: "text-neutral-700",
      };
    case 18:
      return {
        icon: Compass,
        color: "bg-stone-200",
        textColor: "text-stone-700",
      };
    case 19:
      return {
        icon: Anchor,
        color: "bg-blue-100",
        textColor: "text-blue-600",
      };
    case 20:
      return {
        icon: Aperture,
        color: "bg-cyan-100",
        textColor: "text-cyan-600",
      };
    case 21:
      return {
        icon: Archive,
        color: "bg-teal-100",
        textColor: "text-teal-600",
      };
    case 22:
      return {
        icon: FileText,
        color: "bg-emerald-100",
        textColor: "text-emerald-600",
      };
    case 23:
      return {
        icon: Coffee,
        color: "bg-indigo-100",
        textColor: "text-indigo-600",
      };
    case 24:
      return {
        icon: Droplet,
        color: "bg-violet-100",
        textColor: "text-violet-600",
      };
    default:
      return {
        icon: Code,
        color: "bg-slate-100",
        textColor: "text-slate-600",
      };
  }
}
