export default function DosenPembimbing() {
    // Data dosen sementara
    const dosen = {
        nama: "Informasi Belum Tersedia",
        nidn: "-",
        programStudi: "Teknik Informatika",
        email: "-",
        konsultasi: "Belum ditentukan",
    };

    return (
        <section className="mb-8">

            <div className="rounded-t-xl bg-[#D72323] px-6 py-5 dark:bg-[#76ABAE]">
                <p className="text-xs font-semibold tracking-wider text-red-100 dark:text-[#222831]/70">
                    INFORMASI AKADEMIK
                </p>

                <h2 className="mt-1 text-xl font-bold text-white dark:text-[#222831]">
                    Dosen Pembimbing Akademik
                </h2>

                <p className="mt-1 text-sm text-red-100 dark:text-[#222831]/80">
                    Informasi dosen pembimbing akademik mahasiswa.
                </p>
            </div>

            <div className="rounded-b-xl border border-border-color bg-surface p-6 shadow-sm transition-colors duration-200">

                <div className="flex flex-col gap-5 sm:flex-row">

                    {/* Avatar */}
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-background">
                        <span className="text-3xl font-bold text-[#D72323] dark:text-[#76ABAE]">
                            DP
                        </span>
                    </div>

                    <div className="flex-1">

                        <h3 className="text-lg font-bold text-foreground">
                            {dosen.nama}
                        </h3>

                        <p className="mt-1 text-sm text-foreground/60">
                            Dosen Pembimbing Akademik
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <p className="mb-1 text-xs text-foreground/60">
                                    NIDN
                                </p>
                                <p className="font-medium text-foreground">
                                    {dosen.nidn}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-foreground/60">
                                    Program Studi
                                </p>
                                <p className="font-medium text-foreground">
                                    {dosen.programStudi}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-foreground/60">
                                    Email
                                </p>
                                <p className="font-medium text-foreground">
                                    {dosen.email}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs text-foreground/60">
                                    Jadwal Konsultasi
                                </p>
                                <p className="font-medium text-foreground">
                                    {dosen.konsultasi}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-border-color pt-4">
                    <p className="text-xs text-foreground/60">
                        Informasi dosen pembimbing akan diperbarui
                        setelah data resmi tersedia.
                    </p>
                </div>

            </div>
        </section>
    );
}