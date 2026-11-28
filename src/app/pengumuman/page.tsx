'use client';

import { useEffect, useState } from "react";
import building from "../Assets/gedung.jpg";
import TextReveal from "../components/textReveal";

function getToday(): string {
    return new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

type pengumuman = {
    _id : string,
    Judul : string,
    Isi : string,
    Tanggal : string;
};

function formatDate(iso : string): string {
    return new Date(iso).toLocaleDateString("id-ID", {
        day : "numeric",
        month : "long",
        year : "numeric",
    })
}

export default function Announcement() {
    const [items, setItems] = useState<pengumuman[] | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/pengumuman")
            .then((res) => {
                if (!res.ok) throw new Error("Request failed");
                return res.json() as Promise<pengumuman[]>;
            })
            .then((data) => {
                if (!cancelled) setItems(data);
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            });

        return() => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="min-h-screen text-foreground font-serif">
            <div className="grid grid-cols-1 font-serif p-8">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-3 pt-3 pl-2">
                        {getToday()}
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <h1 className="font-medium text-4xl text-center px-16">
                            <TextReveal>The Tarumanagara Times</TextReveal>
                        </h1>
                    </div>

                    <div className="col-span-12 md:col-span-3"></div>
                </div>
                <div className="my-6 grid gap-2">
                    <hr className="border-t-2 border-foreground" />
                    <hr className="border-t-2 border-foreground" />
                </div>

                <section className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6 md:border-r-2 md:border-foreground md:pr-6">
                        <img
                            src={building.src}
                            alt=""
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        {failed && <p className="my-3">Gagal memuat pengumuman.</p>}
                        {!failed && !items && <p className="my-3">Memuat pengumuman...</p>}
                        {items && items.length === 0 && <p className="my-3">Belum ada berita</p>}
                        {items?.map((item) => (
                            <article key={item._id} className="my-3">
                                <h2 className="font-semibold">
                                    <TextReveal>{item.Judul}</TextReveal></h2>
                                <p className="text-sm opacity-70">{formatDate(item.Tanggal)}</p>
                                <p><TextReveal>{item.Isi}</TextReveal></p>
                            </article>
                        ))}
                    </div>
                </section>
        </div>
    </div>
    );
}