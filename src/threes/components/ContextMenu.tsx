import React from 'react';

interface ContextMenuProps {
    position: { x: number; y: number };
    onClose: () => void;
    onDelete: () => void;
    onCopy: () => void;
    onLock: () => void;
    onGroup: () => void;
    onUngroup: () => void;
    isLocked: boolean;
    isGroup: boolean;
    canGroup: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ 
    position, 
    onClose,
    onDelete,
    onCopy,
    onLock,
    onGroup,
    onUngroup
}) => {
    return (
        <div style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1001,
            minWidth: '150px'
        }}>
            <button onClick={onDelete}>删除</button>
            <button onClick={onCopy}>复制</button>
            <button onClick={onLock}>锁定/解锁</button>
            <button onClick={onGroup}>组合</button>
            <button onClick={onUngroup}>解组</button>
        </div>
    );
};

export default ContextMenu;