import React, { useContext } from 'react';
import { UserDispatch } from './App';

//하나의 컴포넌트 파일에 2개의 컴포넌트를 선언
//function User({ user, onRemove, onToggle }) {
//    const { username, email, id, active } = user;

//const User = React.memo(function User({ user, onRemove, onToggle }) {
const User = React.memo(function User({ user }) {    
    const { username, email, id, active } = user;
    const dispatch = useContext(UserDispatch); //중요!!


     ///설명문
//   useEffect(() => {
//       console.log('컴포넌트가 화면에 나타남'); //component가 mount됨
                    // props => state
                    // REST API
                    // D3 Video.js
                    // setInterval, setTimout
                    // ui가 화면에 나타난 후라서 dom에 바로 접근해도 됨
//        return () => {
//            console.log('컴포넌트가 화면에서 사라짐') //component가 unmount됨
                    // 라이브러리 인스턴스 제거
                    // clearInterval, clearTimeout
//        }
//   }, []);


    //   useEffect(() => {
    //       console.log('user 값이 설정됨');
    //       console.log(user);
    //     return () => {
    //       console.log('user 값이 바뀌기 전');
    //       console.log(user); //user 함수가 바뀌기전 값이 먼저 나온 후 바뀜
    //   }
    // }, [user]); //1. 함수형배열 2. dependency배열 []


//ex
//useEffect(() => {
//     loadPost(username, urlSlug);    
//}, [username, urlSlug])


      return (
          <div>
{/* <b>{user.username}</b> <span>({user.email})</span> */}
             
              <b 
                 style={{
                 color: active ? 'deeppink' : 'gray',
                 cursor: 'pointer'
              }}
            //  onClick={() => onToggle(id) }
                onClick={() => dispatch ({
                    type: 'TOGGLE_USER',
                    id
                })}
              >   
                  {username}
                  </b> 
                  &nbsp;
                  <span>({email})</span>

{/* 상단에 선언을 안하고 바로쓸 경우 - <button onClick={() => onRemove(user.id)}>삭제</button> */}
              <button onClick={() => dispatch({
                    type: 'REMOVE_USER',
                    id
                })}> 삭제 </button>
             
{/* rendering 되자마자 전체삭제 - <button onClick={onRemove(id)}>삭제</button> */}
          </div>
      );
});

//function UserList({ users, onRemove, onToggle }) {
function UserList({ users}) {
    return (
        <div>        
            {
             users.map(
              (user) => (
              <User 
              user={user} 
              key={user.id}
//              onRemove={onRemove}
//              onToggle={onToggle}
              />)
             )
            }
        </div>
    );
}


export default UserList;