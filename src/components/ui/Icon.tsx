import {
  Code2,
  BrainCircuit,
  Smartphone,
  Cloud,
  ShieldCheck,
  Rocket,
  Sparkles,
  Users,
  Target,
  GraduationCap,
  Handshake,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  code: Code2,
  brain: BrainCircuit,
  smartphone: Smartphone,
  cloud: Cloud,
  shield: ShieldCheck,
  rocket: Rocket,
  sparkles: Sparkles,
  users: Users,
  target: Target,
  graduationCap: GraduationCap,
  handshake: Handshake,
  bookOpen: BookOpen,
};

export default function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
