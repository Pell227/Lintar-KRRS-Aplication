export default function PengungumanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f4f1ea] text-[#2c2c2c] font-serif">
            {children}
        </div>
    );
}