// Core types for Nissan Note 2011 Service Manual

export interface Section {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  description: string;
  icon: string;
  order: number;
  modelUrl?: string; // path to .glb in Firebase Storage
}

export interface Procedure {
  id: string;
  sectionId: string;
  slug: string;
  title: string;
  titleRu: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: string; // e.g. "3.5–4.5 ч"
  description: string;
  tools: string[];
  torqueSpecs: TorqueSpec[];
  steps: ProcedureStep[];
  images: MediaItem[];
  videos: VideoItem[];
  relatedProcedures: string[]; // procedure ids
  checklist: ChecklistItem[];
  modelUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TorqueSpec {
  id: string;
  part: string;
  value: string; // e.g. "25 ± 2 Н·м"
  notes?: string;
}

export interface ProcedureStep {
  id: string;
  order: number;
  title: string;
  content: string;
  warning?: string;
  imageIds?: string[];
  torqueId?: string;
}

export interface MediaItem {
  id: string;
  url: string;          // imgbb direct link
  displayUrl?: string;
  caption: string;
  type: "photo" | "scheme" | "diagram";
  order: number;
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  order: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  order: number;
}

export interface UserBookmark {
  userId: string;
  procedureId: string;
  createdAt: string;
}

export interface ViewHistory {
  userId: string;
  procedureId: string;
  viewedAt: string;
}

// For 3D hotspots on the car model
export interface Hotspot {
  id: string;
  label: string;
  sectionSlug: string;
  position: [number, number, number];
  cameraPosition?: [number, number, number];
}
