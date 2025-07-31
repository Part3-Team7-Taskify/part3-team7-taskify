'use client';

import { Button } from './Button';
import InviteIcon from '../../../public/icon/invitation.svg';
import { useState } from 'react';
import InviteModal from '../modal/InviteModal';

const GnbInviteButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button size='extraSmall' variant='gnb' onClick={() => setIsVisible(true)}>
        <div className='hidden sm:block'>
          <InviteIcon />
        </div>
        초대하기
      </Button>
      <InviteModal isVisible={isVisible} setIsVisible={(state) => setIsVisible(state)} />
    </>
  );
};

export default GnbInviteButton;
