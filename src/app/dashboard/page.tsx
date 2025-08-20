"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type StoredUser } from "@/hooks/useAuth";
import styles from "./dashboard.module.scss";
import Image from "next/image";
export default function DashboardPage() {
  const router = useRouter();
  const { getUser, clearUser } = useAuth();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.replace("/auth");
    } else {
      setUser(u);
    }
  }, [getUser, router]);

  const handleLogout = () => {
    clearUser();
    router.replace("/auth");
  };

  if (!user) return null;

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>خوش آمدید به داشبورد</h1>

        <div className={styles.userInfo}>
          <Image
            src={user.picture?.large || "/default-avatar.png"}
            alt={`${user.name.first} ${user.name.last}`}
            width={100}
            height={100}
            className={styles.avatar}
          />
          <p><strong>نام کامل:</strong> {user.name.title} {user.name.first} {user.name.last}</p>
          <p><strong>ایمیل:</strong> {user.email}</p>
          <p><strong>تلفن ثابت:</strong> {user.phone}</p>
          <p><strong>تلفن همراه:</strong> {user.cell}</p>
          <strong>شناسه کاربری (UUID):</strong> {user.login?.uuid || "ندارد"}
          {user.gender && <p><strong>جنسیت:</strong> {user.gender}</p>}
        </div>

        <button className={styles.logout} onClick={handleLogout}>
          خروج
        </button>
      </section>
    </main>
  );
}
