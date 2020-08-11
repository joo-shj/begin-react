This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



## App.js
1) 배열 추가,제거,수정 
2) useEffect 사용 / 마운트언마운트 업데이트시 할 작업 설정
3) useMemo
4) useCallback
5) React.memo
6) useReducer

# practice

import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';


function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...'); //입력할때마다 나오기때문에 useMemo사용
  return users.filter( user =>  user.active).length;
}

function App() {
  const [ inputs, setInputs]  = useState ({
    username: '',
    emai: '',
  });

  const { username, email } = inputs;

  //useCallback 기존에 사용한 함수를 재사용
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  const [ users, setUsers ] = useState([
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
]);


//useRef: component가 reRendering되도 계속 쓸 수 있음
const nextId = useRef(4);


 //useCallback 기존에 사용한 함수를 재사용
const onCreate = useCallback(() => {   
  const user ={
    id: nextId.current,
    username,
    email,
  };
  //setUsers([...users, user]);
  setUsers(users.concat(user));

  setInputs({
    username:'',
    email: ''
  })
  console.log(nextId.current); //4
  nextId.current += 1;
  //nextId.current 값이 바뀐다고 component가 reRendering되지는 않음
}, [username, email, users]); //dependecy 함수 꼭 넣어줘야함!


const onRemove = useCallback(id => {
  setUsers(users.filter(user => user.id !== id));
  //false인 값이 삭제되고, true인 값들만 따로 새로운 배열이 만들어짐
}, [users]);

const onToggle = useCallback(id => {
  setUsers(users.map(
    user => user.id === id
       ? { ...user, active : !user.active }
       : user
  ));
}, [users]);

  const count = useMemo(() => countActiveUsers(users), [users]);
   //해당 함수는 users가 바뀔때마다


  return ( 
    <>
      <CreateUser 
      username={username} 
      email={email} 
      onChange={onChange} 
      onCreate={onCreate} 
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
