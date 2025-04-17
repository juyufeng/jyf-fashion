import React, { CSSProperties, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

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

      <div style={aiStyle}>
        {header}
        {menu}
        {content}
        {footer}
        {overlay}
      </div>

      <div style={ threeStyle }>
        { threeContent }
      </div>

    </div>
  );
};

export default Layout;