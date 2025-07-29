import { createContext, FC, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../../../public/icon/X.svg';
import MeatballIcon from '../../../public/icon/meatballIcon.svg';
import MeatballDropdown from '../dropdown/MeatballDropdown';
import { Button } from '../button/Button';

type ModalPropsType = {
  modalButtonType: 'none' | 'one' | 'two' | 'multi';
  title?: string;
  meatballMenu?: boolean;
  children: React.ReactNode | null;
  modalOpenState: boolean;
  modalOpenSetState: (state: boolean) => void;
  buttonCallback?: () => void;
  buttonCallbackVer2?: () => void;
};

export const ModalPropsContext = createContext<ModalPropsType>({
  title: undefined,
  meatballMenu: undefined,
  children: null,
  modalButtonType: 'one',
  modalOpenState: false,
  modalOpenSetState: () => {},
  buttonCallback: () => {},
  buttonCallbackVer2: () => {},
});

export const ModalRoot: FC<ModalPropsType> = ({
  modalOpenState,
  modalOpenSetState,
  children,
  title,
  meatballMenu,
  modalButtonType = 'one',
  buttonCallback,
  buttonCallbackVer2, //칼럼 수정용 콜백
}) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('portal'));
  }, [modalOpenState]);

  return (
    <>
      <ModalPropsContext.Provider
        value={{
          title,
          meatballMenu,
          children,
          modalOpenState,
          modalOpenSetState,
          modalButtonType,
          buttonCallback,
          buttonCallbackVer2,
        }}
      >
        {modalOpenState && portalElement ? createPortal(<ModalWrapper />, portalElement) : null}
      </ModalPropsContext.Provider>
    </>
  );
};

const ModalWrapper = () => {
  return (
    <div className='fixed'>
      <ModalBackdrop />
      <ModalWindow />
    </div>
  );
};

const ModalBackdrop = () => {
  const { modalOpenSetState } = useContext(ModalPropsContext);
  return (
    <div
      className='absolute top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur-xs z-[1]'
      onClick={() => modalOpenSetState(false)}
    />
  );
};

const ModalWindow = () => {
  const { title, meatballMenu, children, modalOpenSetState } = useContext(ModalPropsContext);

  return (
    <div className='w-screen h-screen grid place-content-center'>
      <div className={`w-fit h-fit p-6 bg-white rounded-lg z-[2]`}>
        <div className='flex items-center gap-6'>
          <h1 className='flex-1 text-xl font-bold'>{title}</h1>
          {meatballMenu && (
            <MeatballDropdown.Root>
              <MeatballDropdown.Trigger>
                <MeatballIcon />
              </MeatballDropdown.Trigger>
              <MeatballDropdown.Content>
                <MeatballDropdown.Item onClick={() => console.log('수정하기')}>
                  수정하기
                </MeatballDropdown.Item>
                <MeatballDropdown.Item onClick={() => console.log('삭제하기')}>
                  삭제하기
                </MeatballDropdown.Item>
              </MeatballDropdown.Content>
            </MeatballDropdown.Root>
          )}
          <button className='cursor-pointer' onClick={() => modalOpenSetState(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className='w-full pt-2 pb-4'>{children}</div>
        <ModalButtons />
      </div>
    </div>
  );
};

const ModalButtons = () => {
  const { modalButtonType, buttonCallback, modalOpenSetState, buttonCallbackVer2 } =
    useContext(ModalPropsContext);
  switch (modalButtonType) {
    case 'none':
      return null;
    case 'one':
      return (
        <Button type='primary' className='w-full' onClick={buttonCallback}>
          확인
        </Button>
      );
    case 'two':
      return (
        <>
          <Button type='outline' onClick={() => modalOpenSetState(false)}>
            취소
          </Button>
          <Button type='primary' className='ml-2' onClick={buttonCallback}>
            확인
          </Button>
        </>
      );
    /*컬럼 수정하기 관련 추가 - lje*/
    case 'multi':
      return (
        <div className='flex justify-center gap-[8px]'>
          <Button
            type='outline'
            className='px-4 py-2 w-1/2 bg-white border border-[#D9D9D9] rounded hover:bg-[#e4e4e4]'
            onClick={buttonCallbackVer2}
          >
            삭제
          </Button>
          <Button
            type='primary'
            className='px-4 py-2 w-1/2 bg-pri hover:bg-[#3a3063] text-white rounded'
            onClick={buttonCallback}
          >
            변경
          </Button>
        </div>
      );
  }
};
