import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setToasts } from '@/store/slices/MeetingSlice';

function useToast() {
  const toasts = useAppSelector((app) => app.meetings.toasts);
  const dispatch = useAppDispatch();
  const createToast = ({
    title,
    type,
  }: {
    title: string;
    type: 'success' | 'primary' | 'warning' | 'danger' | undefined;
  }) => {
    dispatch(
      setToasts(
        toasts.concat({
          id: new Date().toISOString(),
          title,
          color: type,
        }),
      ),
    );
  };
  return [createToast];
}

export default useToast;
