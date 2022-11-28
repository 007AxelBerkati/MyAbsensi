import React, {memo} from 'react';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

function BackDropComponent(props: any) {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={0} />
  );
}

export default memo(BackDropComponent);
