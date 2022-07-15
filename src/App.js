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

function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type='text' name='title' placeholder='title' /></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value="Create"></input></p>
      </form>
    </article>
  )
}

function Update(props){
  //props는 외부에서 사용하는 상태입으로 state로 내부에서 변경가능하게 바꿔준다
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type='text' name='title' placeholder='title' value={title} onChange={e=>{
          setTitle(e.target.value);
        }}/></p>
        <p><textarea name='body' placeholder='body' value={body} onChange={e=>{
          setBody(e.target.value);
        }}></textarea></p>
        <p><input type='submit' value="Update"></input></p>
      </form>
    </article>
  )
}

function App() {
//  const mode = useState('Welcome');
  //state는 배열 [0] 초기값, [1]은 값을 바꿀때 사용
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState('null')
  //useState() state는 기본적으로 primitive type
  // reference type이면? {...value}로 복제해야함 
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javaScript', body:'javaScript is ...'}
  ])

  let content = null;
  let contextControl = null;

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
    }}
    content = <Article title={title} body={body}></Article>
    contextControl = <li><a href={"/update/"+id} onClick={event =>
    { event.preventDefault();
      setMode('Update');
    }}
    >Update</a></li>
  }
  else if(mode === 'Create'){
    content= <Create onCreate={(title,body)=>{
      const newTopic = {id:topics.length +1, title: title, body:body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      //state의 primitive type 특성
      setTopics(newTopics);
      //작성한 글로 이동
      setMode('Read');
      setId(newTopics.length);
    }}></Create>
  }
  else if(mode==='Update'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
    if(topics[i].id === Number(id)){
      title = topics[i].title;
      body= topics[i].body; 
    }}
    content=<Update title={title} body={body} onUpdate={(title,body)=>{
        console.log(title,body);
        const newTopics = [...topics];
        const updatedTopic = {id:id, title: title, body: body};
        for(let i=0; i<topics.length; i++){
          if(newTopics[i].id === id){
            newTopics[i] = updatedTopic;
            break; 
          }}
          setTopics(newTopics);
          setMode('Read');
          
    }}></Update>
  }
  return (
   <div>
      <Header title="REACT" onChangeMode={()=> {setMode('Welcome');}}></Header>
      <Nav topics={topics} onChangeMode={(id)=> {setMode('Read'); setId(id);}}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event => {
            event.preventDefault();
            setMode('Create');
          }}>Create</a>
        </li>
          {contextControl}
      </ul>
   </div>
  );
}

export default App;
