import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import type { Moment } from 'moment';
import type { Dispatch, SetStateAction } from 'react';

function MeetingDateField({
  selected,
  setStartDate,
}: {
  selected: Moment;
  setStartDate: Dispatch<SetStateAction<Moment>>;
}) {
  return (
    <EuiFormRow label="Set Meeting Date">
      <EuiDatePicker
        selected={selected}
        onChange={(date) => setStartDate(date as SetStateAction<Moment>)}
      />
    </EuiFormRow>
  );
}

export default MeetingDateField;
