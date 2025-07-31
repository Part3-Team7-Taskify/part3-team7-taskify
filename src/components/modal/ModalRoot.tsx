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

interface IModalVisiblity {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}

export const ModalPropsContext = createContext<ModalPropsType & IModalVisiblity>({
  title: undefined,
  meatballMenu: undefined,
  children: null,
  modalButtonType: 'one',
  modalOpenState: false,
  isVisible: false,
  setIsVisible: () => {},
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (modalOpenState) {
      setTimeout(() => {
        setIsVisible(true);
      }, 20);
    }
    setPortalElement(document.getElementById('portal'));
  }, [modalOpenState]);

  const closeModal = (state: boolean) => {
    setIsVisible(state);
    setTimeout(() => {
      modalOpenSetState(state);
    }, 300);
  };

  return (
    <>
      <ModalPropsContext.Provider
        value={{
          title,
          meatballMenu,
          children,
          modalOpenState,
          modalOpenSetState: (state) => closeModal(state),
          modalButtonType,
          buttonCallback,
          buttonCallbackVer2,
          isVisible,
          setIsVisible,
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
      <div className='z-[1]'>
        <ModalBackdrop />
      </div>
      <div className='z-[2] pointer-events-none'>
        <ModalWindow />
      </div>
    </div>
  );
};

const ModalBackdrop = () => {
  const { isVisible, modalOpenSetState } = useContext(ModalPropsContext);
  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen transition-all duration-200 ease-out ${isVisible ? 'backdrop-blur-xs bg-black/30' : 'backdrop-blur-none bg-transparent'}`}
      onClick={() => modalOpenSetState(false)}
    />
  );
};

const ModalWindow = () => {
  const { title, meatballMenu, children, isVisible, modalOpenSetState } =
    useContext(ModalPropsContext);

  return (
    <div className='w-screen h-screen grid place-content-center perspective-midrange'>
      <div
        className={`w-fit h-fit p-6 bg-white rounded-lg pointer-events-auto transition-all duration-200 ease-out ${isVisible ? 'mb-0 opacity-100 rotate-x-0' : 'mb-12 opacity-0 rotate-x-4'}`}
      >
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
        <Button variant='primary' className='w-full' onClick={buttonCallback}>
          확인
        </Button>
      );
    case 'two':
      return (
        <>
          <Button variant='outline' onClick={() => modalOpenSetState(false)}>
            취소
          </Button>
          <Button variant='primary' className='ml-2' onClick={buttonCallback}>
            확인
          </Button>
        </>
      );
    /*컬럼 수정하기 관련 추가 - lje*/
    case 'multi':
      return (
        <div className='flex justify-center gap-[8px]'>
          <Button
            variant='outline'
            className='px-4 py-2 w-1/2 bg-white border border-[#D9D9D9] rounded hover:bg-[#e4e4e4]'
            onClick={buttonCallbackVer2}
          >
            삭제
          </Button>
          <Button
            variant='primary'
            className='px-4 py-2 w-1/2 bg-pri hover:bg-[#3a3063] text-white rounded'
            onClick={buttonCallback}
          >
            변경
          </Button>
        </div>
      );
  }
};
