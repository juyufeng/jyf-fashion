import React, { CSSProperties, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import LayoutStore from "@/stores/layout-store";
import { LayoutConfig } from "@/types/layout";

interface Layout01Props {
  aiStyle?: CSSProperties;
  threeStyle?: CSSProperties;
  header?: ReactNode;
  menu?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  overlay?: ReactNode;
  threeContent?: ReactNode;
}

const layoutModel: LayoutConfig = LayoutStore.fetchLayoutMode(LayoutStore.currentLayoutMode);

const Layout: React.FC<Layout01Props> = ({
  aiStyle,
  threeStyle,
  header,
  menu,
  content,
  footer,
  overlay,
  threeContent,
}) => {


  return (
    <div style={{ position: 'relative' }}>

      <ToastContainer role="alert" aria-live="polite" />

      <div style={{
        ...aiStyle,
        display: layoutModel.visibleChatView ? 'block' : 'none',
      }}>
        {header}
        {menu}
        {content}
        {footer}
        {overlay}
      </div>

      <div style={{
        ...threeStyle,
        display: layoutModel.visibleDomainView? 'block' : 'none',
      }}>
        {threeContent}
      </div>

    </div>
  );
};

export default Layout;