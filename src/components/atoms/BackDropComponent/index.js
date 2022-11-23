import React from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

function BackDropComponent(props) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={1}
      disappearsOnIndex={0}
    />
  );
}

export default BackDropComponent;
