import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/resume-document";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderToBuffer(<ResumeDocument />);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Catalinio-CV.pdf"; filename*=UTF-8\'\'Catalinio-CV.pdf',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
