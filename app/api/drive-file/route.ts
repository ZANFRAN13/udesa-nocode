import { NextRequest, NextResponse } from "next/server"

/**
 * Proxy para leer archivos de texto en Google Drive (p. ej. .md) sin bloqueos CORS del navegador.
 * Solo acepta fileId; el archivo debe estar compartido como "cualquiera con el enlace".
 */
export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("id")

  if (!fileId || !/^[a-zA-Z0-9_-]+$/.test(fileId)) {
    return NextResponse.json({ error: "ID de archivo inválido" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      { redirect: "follow" }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: "No se pudo obtener el archivo" },
        { status: response.status }
      )
    }

    const text = await response.text()
    return new NextResponse(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  } catch {
    return NextResponse.json(
      { error: "Error al conectar con Google Drive" },
      { status: 502 }
    )
  }
}
