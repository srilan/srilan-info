export type Certificate = {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  imageUrl?: string;
};

export const certificates: Certificate[] = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
  },
  {
    title: "Fundamentals of Machine Learning and Artificial Intelligence",
    issuer: "Amazon Web Services",
  },
  {
    title: "Building an app using modern AI Tools",
    issuer: "Online Course",
  },
  {
    title: "Basic Life Support (BLS)",
    issuer: "American Heart Association",
  },
  {
    title: "Emergency Medical Responder (EMR)",
    issuer: "Certifying body",
  },
];
