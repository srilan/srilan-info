export type CertificateGroup = "AWS" | "HSI";

export type Certificate = {
  title: string;
  issuer: string;
  group: CertificateGroup;
  date?: string;
  url?: string;
  imageUrl?: string;
};

export const certificates: Certificate[] = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    group: "AWS",
  },
  {
    title: "Fundamentals of Machine Learning and Artificial Intelligence",
    issuer: "Amazon Web Services",
    group: "AWS",
  },
  {
    title: "Building an app using modern AI Tools",
    issuer: "AWS Skill Builder",
    group: "AWS",
  },
  {
    title: "Basic Life Support (BLS)",
    issuer: "Health & Safety Institute",
    group: "HSI",
  },
  {
    title: "Emergency Medical Responder (EMR)",
    issuer: "Health & Safety Institute",
    group: "HSI",
  },
];

export type GroupMeta = {
  label: string;
  fullName: string;
  description: string;
  color: string; // CSS color (var or hex)
  tint: string; // CSS color-mix tint
};

export const GROUP_META: Record<CertificateGroup, GroupMeta> = {
  AWS: {
    label: "AWS",
    fullName: "Amazon Web Services",
    description: "Cloud, AI, and modern application development.",
    color: "var(--color-amber)",
    tint: "color-mix(in srgb, var(--color-amber) 14%, transparent)",
  },
  HSI: {
    label: "HSI",
    fullName: "Health & Safety Institute",
    description: "Emergency response and life-saving certifications.",
    color: "var(--color-rose)",
    tint: "color-mix(in srgb, var(--color-rose) 14%, transparent)",
  },
};
