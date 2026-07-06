import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from 'sonner';
import { FeedbackForm } from './components/organisms/FeedbackForm/FeedbackForm';
import { useThemeSync } from './store/useThemeStore';
import { useFeedbackStore } from './store/useFeedbackStore';

export const App = () => {
  useThemeSync();

  const isFeedbackOpen = useFeedbackStore((state) => state.isOpen);
  const closeFeedback = useFeedbackStore((state) => state.closeFeedback);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" toastOptions={{ unstyled: true }} />

      <FeedbackForm isOpen={isFeedbackOpen} onClose={closeFeedback} />
    </>
  );
};
