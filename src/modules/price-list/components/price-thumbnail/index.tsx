"use client"

import { useState } from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

/**
 * 列表条目缩略图：比例与旧项目商品图一致（3:4），容器裁切、图片 cover 填满，
 * 与公司站 Our Products / Team 的处理方式相同。
 *
 * 用原生 img 而不是 next/image：next/image 需要显式 width/height，对宽高比
 * 不一的商品图会按给定比例布局；这里由容器决定比例，图片只负责填满。
 * 图片服务支持 `w` 参数，把请求尺寸压到 160px 宽，避免拉原图。
 */
const toThumbRequestSize = (src: string) => {
  if (!src.includes("w=")) {
    return src
  }

  return src.replace(/([?&])w=\d+/, "$1w=160")
}

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
      <div className="flex h-full w-full items-center justify-center">
        <PlaceholderImage size={16} />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={toThumbRequestSize(src)}
      alt={alt}
      className="block h-full w-full object-cover"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default PriceThumbnail
