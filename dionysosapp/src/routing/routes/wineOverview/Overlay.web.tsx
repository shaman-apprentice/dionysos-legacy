// @ts-nocheck
import React from 'react';

import Modal from 'modal-react-native-web';
import { Overlay as NativeOverlay, OverlayProps } from 'react-native-elements';

export function Overlay(props: OverlayProps) {
  return <NativeOverlay
    ModalComponent={MyModal}
    {...props}
  >
    {props.children}
  </NativeOverlay>
}

function MyModal(props: {}) {
  return <Modal
    ariaHideApp={false}
    {...props}
  >
    {props.children}
  </Modal>
}
