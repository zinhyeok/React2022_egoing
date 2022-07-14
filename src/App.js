import logo from './logo.svg';
import './App.css';


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
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javaScript', body:'javaScript is ...'}
  ]
  return (
   <div>
      <Header title="REACT" onChangeMode={()=> alert('Header')}></Header>
      <Nav topics={topics} onChangeMode={(id)=> alert(id)}></Nav>
      <Article title="Welcome" body="Hello React"></Article>
   </div>
  );
}

export default App;
