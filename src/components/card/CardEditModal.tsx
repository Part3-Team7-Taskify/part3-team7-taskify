import { ModalRoot } from '../modal/ModalRoot';

const CardEditModal = ({
  modalOpenState,
  modalOpenSetState,
}: {
  modalOpenState: boolean;
  modalOpenSetState: (state: boolean) => void;
}) => {
  return (
    <ModalRoot
      modalOpenState={modalOpenState}
      modalOpenSetState={modalOpenSetState}
      modalButtonType='none'
    >
      <span>수정 모달</span>
      {/* 수정 모달 넣기 */}
    </ModalRoot>
  );
};

export default CardEditModal;
