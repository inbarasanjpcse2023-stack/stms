import React from 'react';
import { IHeaderProps } from "./IHeaderProps";
import "./Header.css";

interface HeaderFullProps extends IHeaderProps {
  taskCount: number;
  activeTab: 'board' | 'analytics';
  onTabChange: (tab: 'board' | 'analytics') => void;
}

const Header: React.FC<HeaderFullProps> = React.memo(({ title, taskCount, activeTab, onTabChange }) => {
  return (
    <div className="headerContainer">
      <span className="headerTitle">{title}</span>
      <div className="headerTabs">
        <button className={`tabBtn ${activeTab === 'board' ? 'active' : ''}`} onClick={() => onTabChange('board')}>Board</button>
        <button className={`tabBtn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => onTabChange('analytics')}>Analytics</button>
      </div>
      <span className="headerCounter">{taskCount} task{taskCount !== 1 ? 's' : ''}</span>
    </div>
  );
});

export default Header;
