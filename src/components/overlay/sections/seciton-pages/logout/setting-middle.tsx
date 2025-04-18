import { FC } from 'react';
import { useAppStyle } from "@/styles/app.styles";
import LayoutStore from "@/stores/layout-store";

const SettingMiddle: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: LayoutStore.isMenuVisible() });
  const appViewWidth = 480;
  return (
    <div style={{ width: '100%', height: overlay.height, display: 'flex', alignItems:'center', justifyContent:'center' }}>
       <div style={{width: `${appViewWidth}px`, height: overlay.height ,background: 'black', overflow: 'auto'}}>

       </div>
    </div>
  );
};

export default SettingMiddle;