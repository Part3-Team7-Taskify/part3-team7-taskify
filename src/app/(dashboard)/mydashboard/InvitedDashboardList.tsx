'use client';

import { postInviteAccepted } from '@/api/mydashboard/apis';
import { Button } from '@/components/button/Button';
import { InvitationType } from '@/types/Invite';

const InvitedDashboardList = ({ inviteList }: { inviteList: InvitationType[] }) => {
  const handleButtonClick = async (invitationId: number, accepted: boolean) => {
    const data = await postInviteAccepted(invitationId, accepted);

    return data;
  };

  return (
    <table className='w-full mt-6'>
      <thead className='hidden sm:table-header-group'>
        <tr>
          <th className='text-left text-gray-200 px-8 w-2/5'>이름</th>
          <th className='text-left text-gray-200 px-8 w-1/5'>초대자</th>
          <th className='text-left text-gray-200 px-8 w-2/5'>수락 여부</th>
        </tr>
      </thead>
      <tbody>
        {inviteList.map((el) => (
          <>
            <tr key={el.id} className='border-b border-b-gray-300 align-middle hidden sm:table-row'>
              <td className='px-8 py-2'>{el.dashboard.title}</td>
              <td className='px-8 py-2'>{el.inviter.nickname}</td>
              <td className='px-8 py-2'>
                <div className='space-x-2'>
                  <Button variant='primary' onClick={() => handleButtonClick(el.id, true)}>
                    수락
                  </Button>
                  <Button variant='outline' onClick={() => handleButtonClick(el.id, false)}>
                    거절
                  </Button>
                </div>
              </td>
            </tr>
            <tr className='table-row sm:hidden'>
              <td className='space-x-4 px-8 py-1' colSpan={3}>
                <span className='text-gray-200'>이름</span>
                <span>{el.dashboard.title}</span>
              </td>
            </tr>
            <tr className='table-row sm:hidden'>
              <td className='space-x-4 px-8 py-1' colSpan={3}>
                <span className='text-gray-200'>초대자</span>
                <span>{el.inviter.nickname}</span>
              </td>
            </tr>
            <tr className='table-row sm:hidden border-b border-b-gray-300'>
              <td className='space-x-4 px-8 py-1' colSpan={3}>
                <div className='space-x-2'>
                  <Button variant='primary' onClick={() => handleButtonClick(el.id, true)}>
                    수락
                  </Button>
                  <Button variant='outline' onClick={() => handleButtonClick(el.id, false)}>
                    거절
                  </Button>
                </div>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default InvitedDashboardList;
