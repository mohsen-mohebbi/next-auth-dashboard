"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { loginSchema, type LoginSchema } from "@/lib/validation";
import { useAuth } from "@/hooks/useAuth";
import styles from "./auth.module.scss";

export default function AuthPage() {
    const router = useRouter();
    const { setUser, getUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });

    // ✅ ریدایرکت فقط بعد از mount
    useEffect(() => {
        if (getUser()) {
            router.replace("/dashboard");
        }
    }, [getUser, router]);

    const onSubmit = async (_values: LoginSchema) => {
        try {
            setLoading(true);
            const res = await fetch("/api.json"); // مسیر فایل لوکال
            const data = await res.json();
            const u = data?.results?.[0];

            // ذخیره کل اطلاعات کاربر
            setUser({
                name: u.name,
                email: u.email,
                phone: u.phone,
                cell: u.cell,
                picture: u.picture,
                login: u.login,
                gender: u.gender,
            });

            router.replace("/dashboard");
        } catch {
            alert("مشکلی پیش آمد.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className={styles.container}>
            <section className={styles.card}>
                <h1 className={styles.title}>ورود</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input
                        label="شماره موبایل (ایران)"
                        placeholder="09xxxxxxxxx"
                        inputMode="numeric"
                        maxLength={11}
                        {...register("phone")}
                        error={errors.phone?.message}
                    />
                    <Button type="submit" loading={loading}>ورود</Button>
                </form>
            </section>
        </main>
    );
}
