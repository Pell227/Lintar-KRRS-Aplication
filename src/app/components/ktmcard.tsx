import defaultFoto from "../Assets/profile.jpg";

interface KtmCardProps {
  nama?: string;
  prodi?: string;
  fakultas?: string;
  nim?: string;
  foto?: string;
}

function Barcode({ value }: { value: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const ch of value.replace(/\D/g, "")) {
    const d = Number(ch);
    const pattern = [
      (d % 3) + 1,
      ((d * 7) % 3) + 1,
      ((d * 5) % 2) + 1,
      (d % 2) + 1,
    ];
    pattern.forEach((w, i) => {
      if (i % 2 === 0) bars.push({ x, w });
      x += w * 1.6;
    });
  }
  return (
    <svg
      viewBox={`0 0 ${x} 52`}
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w * 1.6} height={52} fill="#000" />
      ))}
    </svg>
  );
}

export default function KtmCard({
  nama = "Felisia",
  prodi = "Namaprodi",
  fakultas = "NamaFakultas",
  nim = "2025535250166",
  foto = defaultFoto.src,
}: KtmCardProps) {
  return (
    <div className="relative h-[428px] w-[819px] max-w-none overflow-hidden rounded-2xl bg-white font-serif text-black shadow-lg">
      <div className="absolute inset-x-0 top-[1px] h-[63px] bg-[#D62525]" />

      <div className="absolute inset-x-0 bottom-0 h-[26px] bg-[#D62525]" />
      <div className="absolute bottom-0 left-[402px] right-0 h-[38px] rounded-tl-[24px] bg-[#D62525]" />

      <img
        src={defaultFoto.src}
        alt={`Foto ${nama}`}
        className="absolute left-[28px] top-[49px] h-[344px] w-[269px] rounded-xl border border-black object-cover"
      />

      <div className="absolute left-[342px] top-[130px] flex w-[426px] items-center text-[20px]">
        <span className="w-[190px]">NAMA</span>
        <span className="font-semibold">{nama}</span>
      </div>
      <div className="absolute left-[342px] top-[178px] w-[426px] border-t border-black" />

      <div className="absolute left-[342px] top-[186px] w-[426px] text-[20px] leading-[35px]">
        <div className="flex">
          <span className="w-[190px]">PRODI</span>
          <span>{prodi}</span>
        </div>
        <div className="flex">
          <span className="w-[190px]">FAKULTAS</span>
          <span className="right-[5px]">{fakultas}</span>
        </div>
      </div>

      <div className="absolute left-[383px] top-[292px] h-[52px] w-[356px]">
        <Barcode value={nim} />
      </div>
      <div className="absolute left-[383px] top-[354px] w-[356px] text-center text-[18px]">
        {nim}
      </div>
    </div>
  );
}
