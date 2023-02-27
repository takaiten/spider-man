import React, { memo } from 'react';

const Loading: React.FC = () => {
  return (
    <adtFullscreenUi name="ui">
      <rectangle name="rect" background="white" height="50px" width="150px"></rectangle>
    </adtFullscreenUi>
  );
};

export default memo(Loading);
