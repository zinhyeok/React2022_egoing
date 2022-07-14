import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';

function Header(props){
  console.log(props, props.title);
  return (
    <header>
      <h1><a href="/" onClick={(e)=>{
        e.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props){
//props.topic, props중 어떤걸 가져올지 꼭 명시해줘야한다
const lis =  props.topics.map((prop) => <li key={prop.id}>
  <a id={prop.id} href={'/read/'+prop.id} onClick={(e)=>{
    e.preventDefault();
    props.onChangeMode(e.target.id);
    }
    }>{prop.title}</a>
  </li>);
  
  return(
  <nav>
      <ol>
        {lis}
      </ol>
  </nav>
  )
}

function Article(props){
  return(
  <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
  )
}

function App() {
//  const mode = useState('Welcome');
  //state는 배열 [0] 초기값, [1]은 값을 바꿀때 사용
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState('null')
  
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javaScript', body:'javaScript is ...'}
  ]

  let content = null;
  if(mode === 'Welcome'){
    content = <Article title="Welcome" body="Hello React"></Article>
  }
  else if(mode === 'Read'){
    //변수 선언 중요 
    let title, body = null;
    for(let i=0; i<topics.length; i++){
    if(topics[i].id === Number(id)){
      title = topics[i].title;
      body= topics[i].body; 
    }
  }
    content = <Article title={title} body={body}></Article>
  }
  return (
   <div>
      <Header title="REACT" onChangeMode={()=> {setMode('Welcome');}}></Header>
      <Nav topics={topics} onChangeMode={(id)=> {setMode('Read'); setId(id);}}></Nav>
      {content}
   </div>
  );
}

export default App;
