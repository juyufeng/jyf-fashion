import React from 'react';
import './left-section.css';
import { TOOL_GROUPS, ToolItem } from './tools-config';
import { Popover } from 'antd';

interface LeftSectionProps {
  iconSize?: number;
}

interface LeftSectionState {
  showPopover: boolean;
  currentTip: string;
  hoverTimer?: NodeJS.Timeout;
}

class LeftSection extends React.Component<LeftSectionProps, LeftSectionState> {
  static defaultProps = {
    iconSize: 22
  };

  state: LeftSectionState = {
    showPopover: false,
    currentTip: '',
    hoverTimer: undefined
  };

  componentWillUnmount() {
    clearTimeout(this.state.hoverTimer);
  }

  handleMouseEnter = (tip?: string) => {
    if (!tip) return;
    this.setState({
      hoverTimer: setTimeout(() => {
        this.setState({ showPopover: true, currentTip: tip });
      }, 1000)
    });
  };

  handleMouseLeave = () => {
    clearTimeout(this.state.hoverTimer);
    this.setState({ showPopover: false, currentTip: '' });
  };

  renderToolItem(tool: ToolItem, uniqueKey: string) {
    const content = (
      <div
        key={uniqueKey}
        className="left-section-icon"
        style={{ width: this.props.iconSize, height: this.props.iconSize }}
        onMouseEnter={() => this.handleMouseEnter(tool.tips)}
        onMouseLeave={this.handleMouseLeave}
      >
        <img draggable="false" src={tool.icon} alt={tool.name} />
      </div>
    );

    return tool.tips ? (
      <Popover
        key={uniqueKey}
        open={this.state.showPopover && this.state.currentTip === tool.tips}
        content={tool.tips}
        trigger="hover"
      >
        {content}
      </Popover>
    ) : content;
  }

  renderToolGroups() {
    return TOOL_GROUPS.map((group, groupIndex) => (
      <div key={groupIndex} className="left-section-group">
        {group.tools.map((tool, toolIndex) =>
          this.renderToolItem(tool, `${groupIndex}-${toolIndex}`)
        )}
      </div>
    ));
  }

  render() {
    return (
      <div className="left-section-container">
        {this.renderToolGroups()}
      </div>
    );
  }
}

export default LeftSection;