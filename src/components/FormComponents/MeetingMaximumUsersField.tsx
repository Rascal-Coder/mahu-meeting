import { EuiFieldNumber, EuiFormRow } from '@elastic/eui';
import type React from 'react';

function MeetingMaximumUsersField({
  value,
  setSize,
}: {
  value: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <EuiFormRow label="Maximum People">
      <EuiFieldNumber
        min={1}
        max={50}
        placeholder="Maximum People"
        value={value}
        onChange={(e) => {
          if (!e.target.value.length || Number.parseInt(e.target.value) === 0)
            setSize(1);
          else if (Number.parseInt(e.target.value) > 50) setSize(50);
          else setSize(Number.parseInt(e.target.value));
        }}
      />
    </EuiFormRow>
  );
}

export default MeetingMaximumUsersField;
