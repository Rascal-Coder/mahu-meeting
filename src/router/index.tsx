import { lazy } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
const HomePage = lazy(() => import('@/pages/home'));
const LoginPage = lazy(() => import('@/pages/login'));
const CreateMeetingPage = lazy(() => import('@/pages/createMeeting'));
const MeetingsPage = lazy(() => import('@/pages/meetings'));
const MyMeetingsPage = lazy(() => import('@/pages/myMeetings'));
const OneOnOneMeetingPage = lazy(() => import('@/pages/oneOnOneMeeting'));
const VideoConferencePage = lazy(() => import('@/pages/videoConference'));
const routerItems = [
  <Route path="/login" element={<LoginPage />} key="LOGIN" />,
  <Route path="/create" element={<CreateMeetingPage />} key="CREATEMEETING" />,
  <Route
    path="/create1on1"
    element={<OneOnOneMeetingPage />}
    key="CREATE1ON1"
  />,
  <Route
    path="/videoconference"
    element={<VideoConferencePage />}
    key="VIDEOCONFERENCE"
  />,
  <Route path="/mymeetings" element={<MyMeetingsPage />} key="MYMEETINGS" />,
  <Route path="/meetings" element={<MeetingsPage />} key="MEETINGS" />,
  <Route path="/" element={<HomePage />} key="HOME" />,
  <Route path="*" element={<LoginPage />} key="LOGIN" />,
];

const router = createBrowserRouter(createRoutesFromElements(routerItems));

export const RouteContainer = () => {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};
