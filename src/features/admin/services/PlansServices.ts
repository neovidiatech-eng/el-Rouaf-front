import api from "../../../lib/axios";
import { PlanBody } from "../../../types/plan";

const LEGACY_COLORS = new Set([
  '#369589',
  '#27776b',
  '#84ada7',
  '#00a8a8',
  '#1e5850',
  '#2c7a70',
  '#3b82f6',
  '#2563eb',
  '#10b981',
  '#16a34a',
  '#000000',
  '#000',
  '#111827',
  '#0f172a',
]);

export const normalizePlanColor = (color?: string): string => {
  if (!color) return '#D9A76A';
  const clean = color.trim().toLowerCase();
  if (
    LEGACY_COLORS.has(clean) ||
    clean.startsWith('#369') ||
    clean.startsWith('#277') ||
    clean.startsWith('#00a8') ||
    clean.startsWith('#3b8') ||
    clean.startsWith('#256')
  ) {
    return '#D9A76A';
  }
  return color;
};

// get plans
export const getPlans = async (): Promise<any[]> => {
  try {
    const response = await api.get("/subscription/plans");
    const plans = response.data?.data;
    if (Array.isArray(plans)) {
      return plans.map((p) => ({
        ...p,
        color: normalizePlanColor(p.color),
      }));
    }
    return plans;
  } catch (error) {
    console.error("Get plans failed:", error);
    throw error;
  }
};

// create plan
export const createPlan = async (data: PlanBody) => {
  try {
    const response = await api.post("/subscription/plans", data);
    return response.data;
  } catch (error) {
    console.error("Create plan failed:", error);
    throw error;
  }
};

//delete plans
export const deletePlans = async (id: string) => {
  try {
    const res = await api.delete(`/subscription/plans/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// update plan
export const updatePlan = async (id: string, data: Partial<PlanBody>) => {
  try {
    const res = await api.patch(`/subscription/plans/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Update plan failed:", error);
    throw error;
  }
};


