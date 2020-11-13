import React from 'react';

function Wrapper({children}){
    const style = {
        border: '2px solid black',
        padding:16
    };

    return <div style={style}>{children}</div>
    //{/*childern 이란 props는 Wrapper태그 사이의 props를 의미*/}
}

export default Wrapper;