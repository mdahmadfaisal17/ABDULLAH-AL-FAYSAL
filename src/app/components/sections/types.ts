import type { LucideIcon } from "lucide-react";

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

export type CertificationItem = {
  title: string;
  description: string;
  image: string;
};

export type ProcessStepItem = {
  num: string;
  title: string;
  desc: string;
};

export type ToolItem = {
  name: string;
  type: string;
  logo: string;
  glow: string;
};

export type ServiceItem = {
  icon: string;
  title: string;
  desc: string;
  tag: string | null;
};

export type WhyChooseItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type ReviewItem = {
  name: string;
  role: string;
  short: string;
  image: string;
  review: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
