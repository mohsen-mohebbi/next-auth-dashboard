"use client";

import { useCallback } from "react";

export interface StoredUser {
  name: { title?: string; first: string; last: string };
  email?: string;
  phone?: string;
  cell?: string;
  picture?: { large?: string; medium?: string; thumbnail?: string };
  login?: { uuid?: string };
  gender?: string;
}

const STORAGE_KEY = "user";

export function useAuth() {
  const getUser = useCallback<() => StoredUser | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredUser;
    } catch {
      return null;
    }
  }, []);

  const setUser = useCallback((user: StoredUser) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, []);

  const clearUser = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { getUser, setUser, clearUser, STORAGE_KEY };
}
