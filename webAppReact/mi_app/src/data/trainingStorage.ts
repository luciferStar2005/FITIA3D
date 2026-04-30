import type { TrainingRecord } from "../types";

const KEY = "training_records";

export const getTrainings = (): TrainingRecord[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTraining = (training: TrainingRecord): void => {
  const trainings = getTrainings();
  trainings.push(training);
  localStorage.setItem(KEY, JSON.stringify(trainings));
};

export const clearTrainings = (): void => {
  localStorage.removeItem(KEY);
};