import React, {useEffect} from 'react';

//부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링됨
//User함수의 부모는 UserList이고 users값이 변하면 UserList함수도 변하므로 UserList가 리렌더링되고 User함수도 리렌더링됨
// 마운트는 화면에 나타는 것을 뜻하고 언마운트는 사라지는걸 뜻함
const User = React.memo(function User({user, onRemove, onToggle}){
    const {username, email, id, active} = user;

    useEffect(() => {
        console.log('user값이 설정됨');
        console.log(user);
        //props -> state
        //Rest API
        //D3 Video
        //setInterval, setTimeout
        return () => {
            console.log('user값이 바뀌기 전');
            console.log(user);
            //clearInteval, clearTimeout
            //라이브러리 인스턴스 제거
        }
        //return에 있는 함수는 업데이트되기 직전에 호출되는 함수
    }, [user]);
    //여기서 빈배열이 아니라 [user]를 넣었으므로 useEffect안의 함수는 user배열이 설정되거나 변경될때마다 호출됨
    return(
        <div>
            <b 
                style={{
                    color: active ? 'green' : 'black',
                    cursor: 'pointer'
                }}
                onClick = {() => onToggle(id)}
            >
                {username}
            </b>
            &nbsp;
            <span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button>
            {/* <button onClick={onRemove(id)}>삭제</button>  로 하면 렌더링 되자마자 바로 함수가 실행되서 목록이 없어짐*/}
            {/* *버튼을 클릭했을 때 저 함수를 호출할것이다라는 뜻* */}
        </div>
    );

});

function UserList({users, onRemove, onToggle}){
    
    return (
        <div>
            {
                users.map(
                    (user) => (
                        <User 
                            user={user} 
                            key={user.id} 
                            onRemove={onRemove}
                            onToggle={onToggle}
                        />
                    )
                )
            }
        </div>
    );
}
export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users);
//prevProps.users와 nextProps.users가 같다면 리렌더링 하지 않겠다는 뜻
//컴포넌트에서 렌더에있는 결과를 재사용하기 위해서는 React.memo를 사용