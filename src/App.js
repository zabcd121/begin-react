import React, {useRef, useState, useMemo, useCallback} from 'react';
import CreateUser from './CreatUser.js';
import UserList from './UserList.js';

// useMemo는 특정 값이 바뀔 때만 특정 연산을 처리하고
// 특정 값이 바뀌지 않았다면 리렌더링할때 이전에 만들어놨던 값을 재사용 할 수 있게 해줌
// 따라서 useMemo는 필요한 연산을 필요할 때만 하게 해줌
function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const {username, email} = inputs;
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }, [inputs]); //deps에 들어간 inputs가 바뀔때만 함수가 새로 만들어지고 그대로면 그대로 재사용함

  const [users, setUsers] = useState([
    {
        id:1,
        username: "velopert",
        email: "zas@naver.com",
        active: true,
    },
    {
        id:2,
        username:'kim',
        email:"zasasdsad@naver.com",
        active: false,
    },
    {
        id:3,
        username:'asd',
        email:"asdasdasq@naver.com",
        active: false,
    }
    
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users => users.concat(user));//1.spread연산자사용
    //setUsers(users.concat(user));와 같음 2. concat 함수사용, but push같은 함수는 사용X(업데이트가 되지않음)
    // setUsers 콜백함수의 파라미터로 user를 주면 deps에 넣지 않아도 되므로 이 함수의 props가 바뀌지 않으면 다른리스트에서 리렌더링 발생안함
    setInputs({
      username: '',
      email: '',
    });
    console.log(nextId.current);
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id != id));
  }, []);
  //users의 최신정보를 찾아줌
  //함수형 업데이트 사용

  const onToggle = useCallback(id => {
    setUsers(users => users.map(
      user => user.id === id
        ? {...user, active: !user.active}
        :user
    ));
  }, []);
  //특정함수를 재사용하기 위해서는 useCallback를 사용

  const count = useMemo(()=>countActiveUsers(users), [users]);
// 연산된 값을 재사용 할 때 useMemo를 사용
  return (
    <>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate} 
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;