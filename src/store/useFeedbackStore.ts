import { create } from 'zustand';

type FeedbackState = {
  isOpen: boolean;
  openFeedback: () => void;
  closeFeedback: () => void;
};

export const useFeedbackStore = create<FeedbackState>((set) => ({
  isOpen: false,
  openFeedback: () => set({ isOpen: true }),
  closeFeedback: () => set({ isOpen: false }),
}));
