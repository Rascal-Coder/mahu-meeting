import CreateMeetingButtons from '@/components/FormComponents/CreateMeetingButtons';
import MeetingDateField from '@/components/FormComponents/MeetingDateField';
import MeetingNameField from '@/components/FormComponents/MeetingNameFIeld';
import MeetingUserField from '@/components/FormComponents/MeetingUserField';
import { useAppSelector } from '@/store/hooks';
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui';
import { addDoc } from 'firebase/firestore';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import useAuth from '@/hooks/useAuth';
import useFetchUsers from '@/hooks/useFetchUsers';
import useToast from '@/hooks/useToast';
import type { FieldErrorType, UserType } from '@/typings';
import { UUID } from '@/utils/common';
import { meetingsRef } from '@/utils/firebaseConfig';

export default function OneOnOneMeeting() {
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((app) => app.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState('');
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ['Please Enter Meeting Name'];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ['Please Select a User'];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = UUID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: '1-on-1',
        invitedUsers: [selectedUser[0].uid],
        meetingDate: startDate.format('L'),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: 'One on One Meeting Created Successfully',
        type: 'success',
      });
      navigate('/');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          <MeetingUserField
            label="Invite User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUser}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
