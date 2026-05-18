import {
  Scissors,
  Palette,
  Sun,
  Sparkles,
  Heart,
  User,
  Brush,
  Eye,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scissors,
  Palette,
  Sun,
  Sparkles,
  Heart,
  User,
  Brush,
  Eye,
};

interface ServiceIconProps {
  name: string;
  className?: string;
}

export function ServiceIcon({ name, className = "h-6 w-6" }: ServiceIconProps) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.5} />;
}
