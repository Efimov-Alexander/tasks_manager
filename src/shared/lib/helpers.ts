import type {IProject} from "src/entities/Project";

export const getStorageValue = (key: string): null | IProject[] | number => {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
}

export const setStorageValue = ({value, key}: {value: number | IProject[] | null, key: string}) => localStorage.setItem(key, JSON.stringify(value))

