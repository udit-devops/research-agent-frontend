export interface ResearchRequest {
  topic: string;
}

export interface ResearchResponse {
  report: string;
  sources: string[];
}

export interface ReportSummary {
  id: number;
  topic: string;
  created_at: string;
}

export interface ReportDetail {
  id: number;
  topic: string;
  report: string;
  sources: string[];
  created_at: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
