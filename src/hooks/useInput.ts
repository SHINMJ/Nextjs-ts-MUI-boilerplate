import React, { useCallback, useRef, useState } from 'react'

export interface IInputOptions {
  initValue?: string
  maxValue?: number
  minValue?: number
  maxLength?: number
  minLength?: number
  autoFix?: boolean
  type?: 'number' | 'string'
}

export type inputType = [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
]

const useInput = (options?: IInputOptions) => {
  const { initValue, maxValue, minValue, maxLength, minLength, autoFix, type } =
    options || {}
  const [value, setValue] = useState<string>(initValue || '')
  const isValid = useRef<boolean>(true)

  const handleNumber = useCallback(
    (receivedValue: string) => {
      let result: string = receivedValue

      if (maxLength) {
        result = result.substr(0, maxLength)
      }

      if (maxValue) {
        result = parseNumWithMaxValue(result, maxValue)
      }

      const returnValue: string = autoFix ? result : receivedValue
      isValid.current =
        result === receivedValue &&
        returnValue.length >= minLength &&
        (minValue ? minValue <= parseInt(returnValue, 10) : true)
      setValue(returnValue)
    },
    [maxLength, minLength, maxValue, minValue, autoFix],
  )

  const handleString = useCallback(
    (receivedValue: string) => {
      let result: string = receivedValue

      if (maxLength) {
        result = result.substr(0, maxLength)
      }

      const returnValue: string = autoFix ? result : receivedValue
      isValid.current =
        result === receivedValue && returnValue.length >= minLength
      setValue(returnValue)
    },
    [maxLength, minLength, autoFix],
  )

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue: string = e.target.value || ''
      if (type === 'number') {
        handleNumber(removeNonNumeric(targetValue))
      } else {
        handleString(targetValue)
      }
    },
    [type, handleNumber, handleString],
  )

  return [value, onChangeInput, isValid.current]
}

export default useInput
function removeNonNumeric(targetValue: string): string {
  throw new Error('Function not implemented.')
}

function parseNumWithMaxValue(result: string, maxValue: number): string {
  throw new Error('Function not implemented.')
}
