import React, { Component } from 'react';
//import React, { useReducer } from 'react';

class Counter extends Component {

    //첫번째 방법 : constructor
    // constructor(props) {
    //     super(props);
    //     this.onIncrese = this.onIncrese.bind(this);
    //     this.onDecrese = this.onDecrease.bind(this);
    // }
     

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //   //주의해야할 점 :  state는 무조건 객체여야 함
    //         counter: 0
    //     };
    // }

    //세번째 방법 - 바벨
    state = {
        counter: 0,
        fixed: 1,
        updateMe: {
           toggleMe: false,
           dontChange: 1,
        }
    }
 
    //두번째 방법 : 화살표 함수
    onIncrease = () => {
       console.log(this);
       //메소드에 있는 this가 컴포넌트와 연결되지 않고, undefined로 뜸
       this.setState({
           counter: this.state.counter + 1
       });
    }

    onDecrease = () => {
    //     this.setState({
    //         counter: this.state.counter - 1
    //    });
           this.setStste(state => ({
                counter: state.counter -1
           }));     
    }

    handleToggle = () => {
        this.setState({
           updateMe: {
               ...this.state.updateMe,
               toggleMe: !this.state.updateMe
           }
        });
    }

    render() {
        return (
            <div>
               <h1>{this.state.counter}</h1>
               <button onClick={this.onIncrease}> +1 </button>
               <button onClick={this.onDecrease}> -1 </button>
               <p>고정된 값: {this.state.fixed}</p>
            </div>  
        );
    }
}
// updqte로직이 함수 밖에 존재!
// function reducer(state, action){
//    switch (action.type) {
//        case 'INCREMENT':
//           return state + 1 ;
//        case 'DECREMENT':
//            return state - 1 ;
//        default:
//            throw new Error('Unhandled action');
//    }
// }


// function Counter() {
// useState
// const [ number, setNumber ] = useState(0);

// const [number, dispatch] = useReducer(reducer, 0);

// const onIncrease = () => {
//     //함수형 update - 성능 최적화
//     //setNumber((preNumber => preNumber +1));
//     dispatch({
//         type: 'INCREMENT'
//     })
// };
// const onDecrease = () => {
//     //setNumber((preNumber => preNumber -1));
//     dispatch({
//         type: 'DECREMENT'
//     })
// };


//     return(
//     <div>
//         <h1>{number}</h1>
//         <button onClick={ onIncrease }>+1</button>
//         <button onClick={ onDecrease }>-1</button>
//     </div>
//     )
// }

 export default Counter;