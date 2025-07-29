import { ModalRoot } from '../modal/ModalRoot';
import TaskForm from '../taskForm/TaskForm';
import { TaskFormValues } from '../taskForm/formTypes';

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
