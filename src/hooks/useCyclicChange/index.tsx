import React, {useState, useEffect} from "react";

function useCyclicChange (maxNumber: number = 0, startShow: boolean = false, frequency: number = 25) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        // 在maxnumber发生变化之后需要把值重新设置为0  恢复到初始化
        setValue(0)
        let step = Math.ceil(maxNumber / frequency)
        if (startShow) {
            var setValueInterval =  setInterval(() => {
                setValue(value => {
                    let realValue = value + step
                    if (realValue > maxNumber) {
                        clearInterval(setValueInterval)
                    }
                    return (realValue > maxNumber ? maxNumber : realValue)
                })
            }, 20)
        }
    }, [maxNumber, startShow]);
    return value
}

export default useCyclicChange