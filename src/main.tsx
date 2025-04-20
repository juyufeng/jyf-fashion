import '@/i18n/index';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GenAi from '@/gen-ai'
import { WebInitTitle } from '@/configs/index'
import { initLoadingHandler } from '@/utils/loading'

// 设置网页标题
document.title = WebInitTitle();

// 创建根元素
const root = createRoot(document.getElementById('root')!)

// 检查 URL 中是否包含 Token
const hasToken = window.location.href.includes('Token');

// 渲染应用
root.render(
  <StrictMode>
    {hasToken && <GenAi />} {/* 仅在包含 Token 时加载 GenAi */}
  </StrictMode>
)

initLoadingHandler();
