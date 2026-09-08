import { useEffect } from "react";

export default function LegacyLandingRoute() {
  useEffect(() => {
    window.location.replace("/metabolismo-em-equilibriov1.html");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7] px-6 text-center text-[#3f342c]">
      <p className="text-sm font-semibold">
        Abrindo a página de apresentação...
      </p>
    </main>
  );
}
