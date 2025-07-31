import { ModalRoot } from '../modal/ModalRoot';
import TaskForm from '@/components/taskform/TaskForm';

const CardEditModal = ({
  modalOpenState,
  modalOpenSetState,
  initialValues,
  dashboardId,
  columnId,
}: {
  modalOpenState: boolean;
  modalOpenSetState: (state: boolean) => void;
  initialValues: {
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl?: string | null;
    assigneeUserId?: number | null;
    columnId?: number | null;
  };
  dashboardId: number;
  columnId: number;
}) => {
  return (
    <ModalRoot
      modalOpenState={modalOpenState}
      modalOpenSetState={modalOpenSetState}
      modalButtonType='none'
    >
      <span>수정 모달</span>
      <TaskForm
        initialValues={initialValues}
        modalOpenSetState={modalOpenSetState}
        dashboardId={dashboardId}
        columnId={columnId}
      />
    </ModalRoot>
  );
};

export default CardEditModal;
