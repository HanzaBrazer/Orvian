import {
  LayoutGrid,
  KanbanSquare,
  Zap,
  BarChart3,
  Brain,
  FileText,
  Image as ImageIcon,
  Share2,
  BookOpen,
  PlayCircle,
  Sparkles,
  Users,
  MessageSquare,
  Layers,
  Network,
  Clock,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  layout: LayoutGrid,
  kanban: KanbanSquare,
  zap: Zap,
  chart: BarChart3,
  brain: Brain,
  file: FileText,
  image: ImageIcon,
  share: Share2,
  book: BookOpen,
  play: PlayCircle,
  sparkle: Sparkles,
  users: Users,
  message: MessageSquare,
  layers: Layers,
  network: Network,
  clock: Clock,
  clipboard: ClipboardCheck,
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
