import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  productTitle?: string
  tags?: HttpTypes.StoreProduct["tags"]
}

const ImageGallery = ({ images, productTitle, tags }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative w-full overflow-hidden bg-ui-bg-subtle p-0"
              id={image.id}
            >
              {index === 0 && tags?.some((tag) => tag.value === "second-hand") && (
                <div className="absolute top-0 right-0 z-10 w-0 h-0 border-t-[60px] border-t-orange-500 border-l-[60px] border-l-transparent">
                  <span className="absolute top-[-46px] right-[5px] text-white text-[10px] font-bold rotate-45">
                    USED
                  </span>
                </div>
              )}
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  alt={productTitle ? `${productTitle} - Image ${index + 1}` : `Product image ${index + 1}`}
                  width={1200}
                  height={1000}
                  className="w-full h-auto rounded-rounded"
                  sizes="100vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
