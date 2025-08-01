import { ModalRoot } from '../modal/ModalRoot';
import TaskForm from '@/components/taskform/TaskForm';

const CardEditModal = ({
  modalOpenState,
  modalOpenSetState,
  initialValues,
  dashboardId,
  columnId,
  onCreated,
  cardId,
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
    cardId?: number | null;
  };
  dashboardId: number;
  columnId: number;
  onCreated: () => void;
  cardId: number;
}) => {
  return (
    <ModalRoot
      modalOpenState={modalOpenState}
      modalOpenSetState={modalOpenSetState}
      modalButtonType='none'
      title='할일 수정'
    >
      <TaskForm
        initialValues={initialValues}
        modalOpenSetState={modalOpenSetState}
        dashboardId={dashboardId}
        columnId={columnId}
        cardId={cardId}
        onEditUpdate={onCreated}
      />
    </ModalRoot>
  );
};

export default CardEditModal;
