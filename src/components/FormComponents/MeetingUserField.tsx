import { EuiComboBox, EuiFormRow } from '@elastic/eui';
import React from 'react';

function MeetingUserField({
  label,
  isInvalid,
  error,
  options,
  onChange,
  selectedOptions,
  singleSelection = false,
  isClearable,
  placeholder,
}: {
  label: string;
  isInvalid: boolean;
  error: Array<string>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  options: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onChange: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  selectedOptions: any;
  singleSelection?: { asPlainText: boolean } | boolean;
  isClearable: boolean;
  placeholder: string;
}) {
  return (
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
      <EuiComboBox
        options={options}
        onChange={onChange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        isClearable={isClearable}
        placeholder={placeholder}
        isInvalid={isInvalid}
      />
    </EuiFormRow>
  );
}

export default MeetingUserField;
