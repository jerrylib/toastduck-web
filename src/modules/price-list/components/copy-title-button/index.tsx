"use client"

import { useState } from "react"

/**
 * 标题旁的复制按钮：点击把商品标题写入剪贴板，短暂显示 Copied 反馈。
 */
const CopyTitleButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // 非安全上下文/旧浏览器兜底
        const textarea = document.createElement("textarea")
        textarea.value = text
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }

      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy product name: ${text}`}
      title="Copy product name"
      className="inline-flex items-center shrink-0 text-ui-fg-muted hover:text-ui-fg-base transition-colors"
      data-testid="price-list-copy-title"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="12" height="12" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      {copied && (
        <span className="ml-1 text-small-regular text-ui-fg-subtle">
          Copied
        </span>
      )}
    </button>
  )
}

export default CopyTitleButton
