import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';

import Header from '@/components/Header';
import useAuth from '@/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';
import { getDocs, query } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { MeetingType } from '@/typings';
import { meetingsRef } from '@/utils/firebaseConfig';

export default function Meeting() {
  useAuth();
  const userInfo = useAppSelector((app) => app.auth.userInfo);
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        // biome-ignore lint/complexity/noForEach: <explanation>
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data() as MeetingType;
          if (data.createdBy === userInfo?.uid)
            myMeetings.push(meeting.data() as MeetingType);
          else if (data.meetingType === 'anyone-can-join')
            myMeetings.push(meeting.data() as MeetingType);
          else {
            const index = data.invitedUsers.findIndex(
              (user: string) => user === userInfo?.uid,
            );
            if (index !== -1) {
              myMeetings.push(meeting.data() as MeetingType);
            }
          }
        });

        setMeetings(myMeetings);
      }
    };
    if (userInfo) getMyMeetings();
  }, [userInfo]);

  const meetingColumns = [
    {
      field: 'meetingName',
      name: 'Meeting Name',
    },
    {
      field: 'meetingType',
      name: 'Meeting Type',
    },
    {
      field: 'meetingDate',
      name: 'Meeting Date',
    },
    {
      field: '',
      name: 'Status',

      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format('L')) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: 'black' }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          }
          if (moment(meeting.meetingDate).isBefore(moment().format('L'))) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          }
          if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
      },
    },
    {
      field: 'meetingId',
      name: 'Copy Link',
      width: '10%',
      render: (meetingId: string) => {
        return (
          <EuiCopy textToCopy={`${location.host}/join/${meetingId}`}>
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: '1rem' }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={meetingColumns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
