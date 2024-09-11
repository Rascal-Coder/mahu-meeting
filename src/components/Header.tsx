import { useAppSelector } from '@/store/hooks';
import type { BreadCrumbsType } from '@/typings';
import {
  getCreateMeetingBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from '@/utils/breadcrumbs';
import { firebaseAuth } from '@/utils/firebaseConfig';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeSwitch from './Switch';
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppSelector((app) => app.auth.userInfo?.name);
  const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumbsType>>([
    {
      text: 'Dashboard',
    },
  ]);
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/') {
      setBreadCrumbs(getDashboardBreadCrumbs());
    } else if (pathname === '/create') {
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    } else if (pathname === '/create1on1') {
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    } else if (pathname === '/videoconference') {
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    } else if (pathname === '/mymeetings') {
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    } else if (pathname === '/meetings') {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  // const logout = () => {
  //   signOut(firebaseAuth);
  // };
  const section = [
    {
      items: [
        <Link to="/" key={'link-to-home'}>
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">Mahu-meeting</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {userName ? (
            <EuiText key={'user-name'}>
              <h3>
                <EuiTextColor color="white">Hello, </EuiTextColor>
                <EuiTextColor color="#0b5cff">{userName}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: '2vw' }}
          key={'section'}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <ThemeSwitch />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to="/" key={'link-to-home'}>
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">Mahu-meeting</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: '2vw' }}
          key={'responsive-section'}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <ThemeSwitch />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsResponsive(true);
    }
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: '8vh' }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: '8vh' }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]}
      />
    </>
  );
}
