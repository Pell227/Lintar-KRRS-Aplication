
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

            <div className="bg-[#D72323] rounded-t-xl px-6 py-5">
                <p className="text-xs font-semibold text-red-100 tracking-wider">
                    INFORMASI AKADEMIK
                </p>

                <h2 className="text-xl font-bold text-white mt-1">
                    Dosen Pembimbing Akademik
                </h2>

                <p className="text-sm text-red-100 mt-1">
                    Informasi dosen pembimbing akademik mahasiswa.
                </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-b-xl p-6 shadow-sm">

                <div className="flex flex-col sm:flex-row gap-5">

                    <div className="w-20 h-20 rounded-full bg-[#F5EDED] flex items-center justify-center shrink-0">
                        <span className="text-3xl font-bold text-[#D72323]">
                            DP
                        </span>
                    </div>

                    <div className="flex-1">

                        <h3 className="text-lg font-bold text-gray-800">
                            {dosen.nama}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Dosen Pembimbing Akademik
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    NIDN
                                </p>
                                <p className="font-medium text-gray-800">
                                    {dosen.nidn}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    Program Studi
                                </p>
                                <p className="font-medium text-gray-800">
                                    {dosen.programStudi}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    Email
                                </p>
                                <p className="font-medium text-gray-800">
                                    {dosen.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    Jadwal Konsultasi
                                </p>
                                <p className="font-medium text-gray-800">
                                    {dosen.konsultasi}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Informasi dosen pembimbing akan diperbarui
                        setelah data resmi tersedia.
                    </p>
                </div>

            </div>
        </section>
    );
}
