import React, { useRef, useReducer, useMemo, useCallback, createContext } from 'react';
import produce from 'immer';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

//구글 개발자
window.produce = produce;

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...'); //입력할때마다 나오기때문에 useMemo사용
  return users.filter( user =>  user.active).length;
}


//useState를 useReducer 바꿈 - 바깥쪽에 선언
const initialState ={
 
//inputs: {
//    username: '',
//    emai: '',
//},


users: [
  {
    id: 1,
    username: 'kim',
    email: 'kim@gmail.com',
    active: true,
 },
 {
     id: 2,
     username: 'lee',
     email: 'lee@gmail.com',
     active: false,
  },
  {
     id: 3,
     username: 'park',
     email: 'park@gmail.com',
     active: false,
  }

]

}


function reducer(state, action){
  switch (action.type) { //action타입이 뭐냐에 따라서 작업이 진행됨
//   case 'CHANGE_INPUT':
//       return {
//          ...state,
//         inputs: {
//            ...state.inputs,
//            [action.name]: action.value
//          }
//       };

    case  'CREATE_USER':
      return {       
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
          return produce(state, draft => {
            const user = draft.users.find( user => user.id === action.id);
            user.active = !user.active;
          })
      //  return {
      //    ...state,
      //    users: state.users.map(user =>
      //        user.id === action.id
      //          ?  {...user, active: !user.active }
      //          : user
      //     )
      //  };
     case 'REMOVE_USER':
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.id)
        }

       default:
         throw new Error('Unhandled action');
  }
}

//UserDispatch - provider 컴포넌트
//UserList.js 파일에서 [ import { UserDispatch } from './App'; ] 로 불러올 수 있다
export const UserDispatch = createContext(null);


  function App() {
  //state: 지금 함수, dispatch : 엑션을 발생기키는 함수
  //useReducer 첫번째 파라미터 reducer함수, 두번째 파라미터 initialState
  const [ state, dispatch ] = useReducer(reducer, initialState);
  //  const { username, email } = state.inputs;
  /// userInputs 불러오기
  const[form, onChange, reset] = useInputs({  
     username: '',
     email: '',
  });
  const {username, email} = form;

  const nextId = useRef(4);
  const { users } = state;


//  const onChange = useCallback(e => {
//      const { name, value } = e.target;
//      dispatch({
//        type: 'CHANGE_INPUT',
//        name,
//        value
//      })
//  }, []);




//dependency배열 []
  const onCreate = useCallback(() => {
      dispatch({
        type: 'CREATE_USER',
        user: {
          //id: 1,
          id: nextId.current,
          username,
          email,
        }
      });
      nextId.current += 1;
      //useInputs 불러올때 규칙상으로 넣어줌
      reset();
   }, [username, email, reset])


//  const onToggle = useCallback(id => {
//     dispatch({
//       type: 'TOGGLE_USER',
//       id
//     });
//   },[]);


//  const onRemove = useCallback(id => {
//      dispatch({
//        type: 'REMOVE_USER',
//        id
//      });
//    }, []);


    const count = useMemo(() => countActiveUsers(users), [users]);

  return ( 
 // const [ state, dispatch ] = useReducer(reducer, initialState);
 /// dispatch를 파라미터로 담아서 쓴다.   
    <UserDispatch.Provider value={dispatch}>
      <CreateUser 
      username={username} 
      email={email} 
      onChange={onChange} 
      onCreate={onCreate}
      />
      <UserList 
      users={users} 
//      onToggle={onToggle}
//      onRemove={onRemove}      
      />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  )
}

export default App;
