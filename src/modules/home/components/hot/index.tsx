import { listProducts } from "@lib/data/products"
import { getCollectionByHandle } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"
import ProductImage from "../product-image"

interface HotProps {
  countryCode?: string
}

const Hot = async ({ countryCode = "us" }: HotProps) => {
  // 获取区域信息
  const region = await getRegion(countryCode)

  if (!region) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-500">无法加载产品数据</p>
      </div>
    )
  }

  // 获取 ABB collection 的产品数据
  let products: HttpTypes.StoreProduct[] = []

  try {
    // 首先尝试获取 ABB collection
    const abbCollection = await getCollectionByHandle("abb")

    if (abbCollection) {
      // 获取该 collection 的产品
      const {
        response: { products: collectionProducts },
      } = await listProducts({
        regionId: region.id,
        queryParams: {
          collection_id: abbCollection.id,
          limit: 8,
          fields: "*variants.calculated_price",
        },
      })
      products = collectionProducts || []
    }
  } catch (error) {
    console.error("Failed to fetch ABB collection products:", error)
  }

  // 如果没有找到 ABB collection 的产品，则获取默认产品
  if (products.length === 0) {
    const {
      response: { products: fallbackProducts },
    } = await listProducts({
      regionId: region.id,
      queryParams: {
        limit: 8,
        fields: "*variants.calculated_price",
      },
    })
    products = fallbackProducts || []
  }

  // 辅助函数：格式化价格
  const formatPrice = (product: HttpTypes.StoreProduct) => {
    try {
      const { cheapestPrice } = getProductPrice({ product })

      if (!cheapestPrice) {
        return "No price available for now"
      }

      return `Price from ${cheapestPrice.calculated_price}`
    } catch (error) {
      return "No price available for now"
    }
  }

  // 辅助函数：获取产品图片
  const getProductImage = (product: HttpTypes.StoreProduct) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url
    }
    return "https://www.toastduck.com/static/default.png"
  }

  // 辅助函数：获取产品描述
  const getProductSubtitle = (product: HttpTypes.StoreProduct) => {
    return product.subtitle || (product.description ? product.description.substring(0, 50) + "..." : "优质产品")
  }

  // 辅助函数：生成颜色选项（基于产品变体或默认颜色）
  const getProductColors = (product: HttpTypes.StoreProduct) => {
    // 如果产品有多个变体，可以基于变体生成颜色
    if (product.variants && product.variants.length > 1) {
      return product.variants.slice(0, 4).map((_, index) => {
        const colors = ["#000", "#e5e7eb", "#06b6d4", "#c084fc"]
        return colors[index] || "#000"
      })
    }

    // 默认颜色组合
    const defaultColors = [
      ["#000", "#e5e7eb", "#06b6d4"],
      ["#6366f1", "#e5e7eb", "#06b6d4", "#000"],
      ["#000", "#e5e7eb", "#06b6d4"],
      ["#e5e7eb", "#c084fc", "#fbbf24", "#f59e0b"]
    ]

    return defaultColors[Math.floor(Math.random() * defaultColors.length)]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Hot Sales</h1>
          </div>
          <Link href={`/${countryCode}/store`} className="flex items-center text-gray-500 hover:text-gray-700 cursor-pointer">
            <span className="text-sm">View all</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Left sidebar - Xiaomi 15 series */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 h-full flex flex-col justify-center items-center text-center">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">ABB Series</h2>
                <div className="w-8 h-1 bg-orange-500 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Good quality and reasonable price</p>
              </div>
              <div className="mt-10">
                <ProductImage
                  src="https://www.toastduck.com/static/abb.png"
                  alt="Xiaomi 15 series"
                  className="w-48 h-60 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => {
                const colors = getProductColors(product)
                const productImage = getProductImage(product)
                const subtitle = getProductSubtitle(product)
                const price = formatPrice(product)

                return (
                  <Link
                    key={product.id}
                    href={`/${countryCode}/products/${product.handle}`}
                    className="block"
                  >
                    <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer h-96 flex flex-col">
                      {/* Product image */}
                      <div className="mb-4 flex justify-center flex-shrink-0">
                        <ProductImage
                          src={productImage}
                          alt={product.title}
                          className="w-40 h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product info */}
                      <div className="text-center flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2 text-sm">{product.title}</h3>
                          <p className="text-xs text-gray-600 mb-3 h-8 leading-tight overflow-hidden">{subtitle}</p>
                        </div>

                        <div>
                          {/* Color options */}
                          <div className="flex justify-center space-x-1 mb-3">
                            {colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                              ></div>
                            ))}
                          </div>

                          {/* Price */}
                          <div className="flex justify-center items-center space-x-1">
                            <span className="text-orange-500 font-semibold text-base">{price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hot