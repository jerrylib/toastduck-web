import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

/**
 * 按需清理缓存，避免等满 24 小时。
 *
 *   GET /api/revalidate?secret=<REVALIDATE_SECRET>&tag=collections
 *
 * tag 可重复传入：collections / categories / products-list，
 * 不传 tag 时三者一起清。
 */
const ALLOWED_TAGS = ["collections", "categories", "products-list"]

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "invalid secret" }, { status: 401 })
  }

  const requested = request.nextUrl.searchParams.getAll("tag")
  const invalid = requested.filter((tag) => !ALLOWED_TAGS.includes(tag))

  if (invalid.length) {
    return NextResponse.json(
      { ok: false, error: `unknown tag: ${invalid.join(", ")}` },
      { status: 400 }
    )
  }

  const tags = requested.length ? requested : ALLOWED_TAGS

  for (const tag of tags) {
    revalidateTag(tag)
  }

  return NextResponse.json({ ok: true, revalidated: tags })
}
