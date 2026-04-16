"use client"

import { useState } from "react"

interface ProductImageProps {
    src: string
    alt: string
    className: string
}

const ProductImage = ({ src, alt, className }: ProductImageProps) => {
    const [imageSrc, setImageSrc] = useState(src)

    const handleError = () => {
        if (imageSrc !== "https://images.toastduck.fun/default-01KPA529T747DE7ZV6D72A56TX.png") {
            setImageSrc("https://images.toastduck.fun/default-01KPA529T747DE7ZV6D72A56TX.png")
        }
    }

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    )
}

export default ProductImage