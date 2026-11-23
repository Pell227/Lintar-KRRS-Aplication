import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI belum diset di .env");
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached = (globalWithMongoose.mongooseCache ??= {
  conn: null,
  promise: null,
});

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}
