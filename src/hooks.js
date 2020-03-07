import { useState, useCallback, useEffect, useRef } from 'react';
import { instruments } from './utilities/instruments';

/** Compose function to simply create Higher Order Functions.
 * The purpose of the compose function is to easily implement
 * function composition by aggregating functions to render the
 * desired component.
 * */
export const compose = (...functions) => initialValue =>
  functions.reduceRight((acc, currFunction) => currFunction(acc), initialValue);

export const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: e => {
      setValue(e.target.value || e.target.innerText);
    },
  };
};

export const useInstrument = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value: value.id,
    onChange: e => {
      setValue(instruments[parseInt(e.value)]);
    },
  };
};

export const usePlaying = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue: e => setValue(e),
  };
};

export const useDimensions = ref => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

export const useInstrumentEnvelope = initialValue => {
  const [envelope, setEnvelope] = useState(initialValue);
  return [envelope, setEnvelope];
};

export const useAudioEffects = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    add: useCallback(a => setValue(v => [...v, a]), []),
    clear: useCallback(() => setValue(() => []), []),
    removeById: useCallback(id => setValue(arr => arr.filter(v => v && v.id !== id)), []),
    removeIndex: useCallback(
      index =>
        setValue(v => {
          v.splice(index, 1);
          return v;
        }),
      [],
    ),
  };
};
