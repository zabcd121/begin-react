import React, {useState} from 'react';

function Counter() {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
      setNumber(prevNumber => prevNumber+1);
    }
    const onDecrease = () => {
      setNumber(number-1)
    }
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        {/*함수를 ()써서 호출을 해버리면 그냥 실행되서 1만찍히고 끝이니까 안됨 */}
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }

export default Counter;