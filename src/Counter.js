import React, {useReducer} from 'react';

function reducer(state, action){
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    
    case 'DECREMENT':
      return state - 1;
    
    default:
      throw new Error('Unhandled action');
      //return state
  }
}
//상태업데이트 로직이 컴포넌트 밖에 있음

function Counter() {

  const [number, dispatch] = useReducer(reducer, 0);
  //dispatch는 보내다라는 뜻인데 여기서는 액션을 발생시킨다라는 뜻.
  const onIncrease = () => {
    dispatch({
      type: 'INCREMENT'
    })
  };
  const onDecrease = () => {
    dispatch({
      type: 'DECREMENT'
    })
  };
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