import { Children } from "react";

function Trainning() {
    const tmpArray = ['a','b', 'c'];

    function DynamicComponent({...props}) {
        let Component = 'button';

        if(props.href)
        {
            Component = 'a';
        }

        return <><Component {...props}>click me</Component></>
    }

    function List({data, children}) {
        return data.map((item) => {
            return children(item)
        })
    }

    return (
      <><DynamicComponent 
      title={'click me'}
      href={'https://google.com.vn'}
      />
        <List data={tmpArray}>
            {(item) => <li key={item}>{item}</li>}
        </List>
      </>
    );
  }
  
  export default Trainning;
  