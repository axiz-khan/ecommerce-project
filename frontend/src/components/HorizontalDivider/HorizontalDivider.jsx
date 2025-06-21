import React from 'react';

const HorizontalDivider = ({ darkMode = false }) => {
  const dividerStyle = {
    border: 'none',
    height: '2px',
    width: '100%',
    background: darkMode
      ? 'linear-gradient(to right, #555, #999, #555)'
      : 'linear-gradient(to right, #ccc, #888, #ccc)',
    margin: '20px 0',
    opacity: '1 ',
  };

  return <hr style={dividerStyle} />;
};

export default HorizontalDivider;
