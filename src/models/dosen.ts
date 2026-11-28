import mongoose, { Schema, models, model } from "mongoose";

const DosenSchema = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        idDosen: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            default: "",
        },
        ruangan: {
            type: String,
            default: "",
        },
        kodeTeams: {
            type: String,
            default: "",
        },
        foto: {
            type: String,
            default: "",
        },
        jadwalKonsultasi: {
            type: String,
            default: "Belum ditentukan",
        },
        aktif: {
            type: Boolean,
            default: true,
        },
    },
    {
        collection: "dosen",
    }
);

const Dosen = models.Dosen || model("Dosen", DosenSchema);

export default Dosen;
