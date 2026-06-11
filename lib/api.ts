import axios, { AxiosError } from "axios";
import type { ResearchRequest, ResearchResponse, ReportSummary, ReportDetail } from "./types";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000,
});

function extractMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response?.data?.detail) return error.response.data.detail;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.code === "ECONNABORTED") return "The request timed out. Research generation can take up to 2 minutes — please try again.";
    if (!error.response) return "Unable to reach the server. Check your connection and try again.";
    return `Server error (${error.response.status}). Please try again.`;
  }
  return "An unexpected error occurred.";
}

export const api = {
  async generateResearch(request: ResearchRequest): Promise<ResearchResponse> {
    try {
      const { data } = await client.post<ResearchResponse>("/research", request);
      return data;
    } catch (error) {
      throw new Error(extractMessage(error));
    }
  },

  async getReports(): Promise<ReportSummary[]> {
    try {
      const { data } = await client.get<ReportSummary[]>("/reports");
      return data;
    } catch (error) {
      throw new Error(extractMessage(error));
    }
  },

  async getReport(id: number): Promise<ReportDetail> {
    try {
      const { data } = await client.get<ReportDetail>(`/reports/${id}`);
      return data;
    } catch (error) {
      throw new Error(extractMessage(error));
    }
  },
};
