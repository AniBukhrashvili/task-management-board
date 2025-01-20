import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../services/outsideClick";
import styles from "./AppSelect.module.scss";

const AppSelectDropDown = ({ options = [], onSelect }) => {
  const _onClick = (_value) => {
    onSelect(_value);
  };

  return (
    <div className={styles.AppSelectDropdown}>
      {options.length > 0 &&
        options.map((option, index) => (
          <button
            key={index}
            className={styles.AppSelectDropdownOption}
            type="button"
            onClick={() => _onClick(option.value)}
          >
            {option.name}
          </button>
        ))}

      {options.length === 0 && (
        <div className={styles.AppSelectDropdown__Empty}>No Options</div>
      )}
    </div>
  );
};

export default function AppSelect({
  value = null,
  options = [],
  name = null,
  label,
  placeholder = "Select",
  onSelect,
  onClose,
  helperText,
  error,
}) {
  const appSelectEl = useRef(null);
  const [isOpened, setOpened] = useState(false);
  const [activeOption, setActiveOption] = useState(null);

  const _options = options.filter((option) => {
    return option.name;
  });

  const reset = () => {
    setOpened(false);
    onClose && onClose(name);
  };

  const toggleDropdown = () => {
    setOpened(!isOpened);
  };

  const _onSelect = (_value, _name) => {
    const selectedOption = options.find((option) => option.value === _value);

    setActiveOption(selectedOption ? selectedOption.name : placeholder);
    onSelect && onSelect(_value);
  };

  useOutsideClick(appSelectEl, () => {
    reset();
  });

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value);
    setActiveOption(selectedOption ? selectedOption.name : placeholder);
  }, [value, options, placeholder]);

  return (
    <div ref={appSelectEl} className={styles.AppSelect}>
      <label className={styles.AppSelect__Label}>{label}</label>
      <button
        className={classNames(styles.AppSelect__Trigger, {
          [styles["AppSelect__Trigger--Error"]]: error,
        })}
        type="button"
        onClick={toggleDropdown}
      >
        <div className={styles.AppSelect__Body}>
          <div className={styles.AppSelect__Placeholder}>
            {activeOption || placeholder}
          </div>
        </div>

        <div
          className={classNames(styles.AppSelect__Icon, {
            [styles["AppSelect__Icon--Active"]]: isOpened,
          })}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.91247 4.83785C3.68466 4.61004 3.31532 4.61004 3.08751 4.83785C2.85971 5.06565 2.85971 5.435 3.08751 5.6628L6.58751 9.1628C6.81532 9.39061 7.18466 9.39061 7.41247 9.1628L10.9125 5.6628C11.1403 5.435 11.1403 5.06565 10.9125 4.83785C10.6847 4.61004 10.3153 4.61004 10.0875 4.83785L6.99999 7.92537L3.91247 4.83785Z"
              fill="#021526"
            />
          </svg>
        </div>
      </button>
      {(helperText || error) && (
        <span
          className={classNames(styles.AppSelect__HelperText, {
            [styles["AppSelect__HelperText--Error"]]: error,
          })}
        >
          {helperText || error}
        </span>
      )}
      {isOpened && (
        <AppSelectDropDown
          name={name}
          options={_options}
          onSelect={_onSelect}
        />
      )}
    </div>
  );
}
