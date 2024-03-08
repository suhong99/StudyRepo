import { ChangeEvent, useState } from 'react';

type Option = Record<string, string>;
interface SelectProps {
  options: Option;
  selectedOption?: string;
  onChange?: (selected?: string) => void;
}

const Select = ({
  onChange,
  options,
  selectedOption,
}: SelectProps): JSX.Element => {
  const [state, setState] = useState<string | undefined>();
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selected = Object.entries(options).find(
      ([_, value]) => value === e.target.value
    )?.[0];
    onChange?.(selected);
  };

  return (
    <select
      onChange={handleChange}
      value={selectedOption && options[selectedOption]}
    >
      {Object.entries(options).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

type EventHandler<Event extends React.SyntheticEvent> = (
  e: Event
) => void | null;

type ChangeEventHandler = EventHandler<ChangeEvent<HTMLSelectElement>>;

const eventHandler1: GlobalEventHandlers['onchange'] = (e) => {
  console.log(e.target);
};

const eventHandler2: ChangeEventHandler = (e) => {
  console.log(e.target);
};
