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
        if (imageSrc !== "https://www.toastduck.com/static/default.png") {
            setImageSrc("https://www.toastduck.com/static/default.png")
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