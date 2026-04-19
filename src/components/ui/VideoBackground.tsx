// Substitua pela URL do vídeo fornecida por Matheus
const VIDEO_URL = "REPLACE_WITH_VIDEO_URL";

export function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* Overlay para garantir legibilidade do texto */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/10 to-black/20" />
    </>
  );
}
