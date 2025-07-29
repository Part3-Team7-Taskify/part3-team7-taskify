import { ModalRoot } from '../modal/ModalRoot';
import TaskForm from '../taskform/TaskForm';
import { TaskFormValues } from '../taskform/formTypes';

interface Props {
  modalOpenSetState: (state: boolean) => void;
  modalOpenState: boolean;
  onCreated?: () => void;
  dashboardId: number;
  columnId: number;
  initialValues?: TaskFormValues | undefined;
}

const CardCreateModal = ({
  modalOpenSetState,
  modalOpenState,
  onCreated,
  dashboardId,
  columnId,
  initialValues,
}: Props) => {
  // TaskForm으로 옮겨진 상태 및 로직 제거

  return (
    <ModalRoot
      modalButtonType='two'
      modalOpenState={modalOpenState}
      modalOpenSetState={modalOpenSetState}
      title='할 일 생성'
    >
      <TaskForm
        dashboardId={dashboardId}
        columnId={columnId}
        initialValues={initialValues}
        modalOpenSetState={modalOpenSetState}
        onCreated={onCreated}
      />
    </ModalRoot>
  );
};

export default CardCreateModal;
