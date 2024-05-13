import DiscardResumeConfirmDialog from '@/components/DiscardResumeConfirmDialog';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/lib/stores';
import { DEFAULT_RESUME } from '@/lib/types';
import { storeLocalResume } from '@/lib/utils';
import type { MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Resumay' },
    {
      name: 'description',
      content: 'Create simple and effective resumes with ease',
    },
  ];
};

function DefaultActionButtons() {
  const navigate = useNavigate();

  const { resume, setResume } = useResumeStore(({ resume, setResume }) => ({
    resume,
    setResume,
  }));

  const [confirmClearDialogOpen, setConfirmClearDialogOpen] = useState(false);

  const createResume = () => {
    setResume(DEFAULT_RESUME);
    storeLocalResume(DEFAULT_RESUME);
  };

  const handleClickCreateNewResume = () => {
    if (resume) {
      setConfirmClearDialogOpen(true);
      return;
    }

    navigate('editor');
    createResume();
  };

  const handleClickImportResume = () => {};

  const handleConfirmDialogClose = () => {
    setConfirmClearDialogOpen(false);
  };

  const handleConfirmDialogResponse = (response: boolean) => {
    setConfirmClearDialogOpen(false);

    if (response) {
      navigate('editor');
      createResume();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DiscardResumeConfirmDialog
        open={confirmClearDialogOpen}
        onClose={handleConfirmDialogClose}
        onResponse={handleConfirmDialogResponse}
      />

      <Button onClick={handleClickCreateNewResume}>Create new resume</Button>
      <Button onClick={handleClickImportResume}>Import resume</Button>
    </div>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const resume = useResumeStore((state) => state.resume);

  const handleClickResumeSessionButton = () => {
    navigate('editor');
  };

  return (
    <>
      <main className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-24">
          <h1 className="text-8xl font-bold">resumay</h1>

          <div className="flex flex-col gap-4">
            {resume ? (
              <>
                <Button onClick={handleClickResumeSessionButton}>
                  Resume session
                </Button>
                <hr className="w-full bg-secondary" />
                <DefaultActionButtons />
              </>
            ) : (
              <DefaultActionButtons />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
