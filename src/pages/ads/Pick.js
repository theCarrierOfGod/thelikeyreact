import React from 'react'
import { useHook } from '../../contexts/Hook'

const Pick = () => {
    const hook = useHook();
    return (hook.pickAd())
}

export default Pick