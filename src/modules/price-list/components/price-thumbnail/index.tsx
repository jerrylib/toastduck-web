"use client"

import Image from "next/image"
import { useState } from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

/**
 * 价格列表缩略图：与项目商品卡片保持一致的正方形容器 + 原图比例不裁剪。
 * 图片缺失或加载失败时回落到占位图标，避免露出破图 alt 文字。
 */
const PriceThumbnail = ({
  src,
  alt,
}: {
  src?: string | null
  alt: string
}) => {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <PlaceholderImage size={16} />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1200}
      className="w-full h-auto"
      sizes="80px"
      quality={50}
      style={{ objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  )
}

export default PriceThumbnail
