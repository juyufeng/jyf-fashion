import '@/threes/sections/top/menu-css/top-section.css';
import TopSectionContent from '@/threes/sections/top/menu-content/top-section-content'; // 引入新的组件
import MenuBar from '@/threes/sections/top/menu-bar/menu-bar'; // 引入新的组件

const TopSection = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MenuBar /> 
      <TopSectionContent />
    </div>
  );
};

export default TopSection;