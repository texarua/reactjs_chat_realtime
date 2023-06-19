import { tab } from "@testing-library/user-event/dist/tab";
import axios from "axios";
import { Children, useEffect, useState } from "react";

function Trainning() {
    // const tmpArray = ['a','b', 'c'];

    // function DynamicComponent({...props}) {
    //     let Component = 'button';

    //     if(props.href)
    //     {
    //         Component = 'a';
    //     }

    //     return <><Component {...props}>click me</Component></>
    // }

    // function List({data, children}) {
    //     return data.map((item) => {
    //         return children(item)
    //     })
    // }

    // return (
    //   <><DynamicComponent 
    //   title={'click me'}
    //   href={'https://google.com.vn'}
    //   />
    //     <List data={tmpArray}>
    //         {(item) => <li key={item}>{item}</li>}
    //     </List>
    //   </>
    // );

    // const [tab, setTab] = useState('Posts');
    // const [data, setData] = useState([]);
    // const [showGoToTop, setShowGoToTop] = useState(false)

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/' + tab)
    //     .then(res => {
    //         setData(res.data)
    //     })
    // },[tab]);
    
    // useEffect(() => {
    //     const handleScroll = () => {
    //         console.log('123123123');
    //         setShowGoToTop(window.scrollY >=200);
    //     }

    //     document.addEventListener('scroll', handleScroll)

    // }, [])

    // function Data()
    // {
    //     return <ul>
    //         {data.map((item, index) => {
    //             return <li key={index}>{item.title}</li> 
    //         })}
    //     </ul> 
    // }

    // const changeTab = (e) => {
    //     setTab(e.target.innerText)
    // }

    // function Buttons()
    // {
    //     const tabs = ['Posts', 'Albums', 'Photos'];
    //     return (
    //         <ul className="nav nav-tabs">
    //             {tabs.map((item, index) => {
    //                 return <li key={index}>
    //                 <button 
    //                 key={index} 
    //                 onClick={changeTab} 
    //                 className={`nav-link ${item.toLowerCase() === tab.toLowerCase() && 'active'}`} >
    //                     {item}
    //                 </button></li>
    //             })}
    //         </ul>
    //     )
    // }

    // return (
    //     <>
    //     <Buttons></Buttons>
    //     <Data />
    //     {showGoToTop && (
    //         <button
    //             style={{
    //                 position: 'fixed',
    //                 right: 20,
    //                 bottom: 20,
    //             }}
    //         >Go To Top</button>
    //     )}
    //     </>
    // )


    //========== cleanup function

    // const [countdown, setCountdown] = useState(180)

    // useEffect(() => {
    //     const timerId = setInterval(() => {
    //         setCountdown(prevState => prevState - 1)
    //         console.log('countdown ...')
    //     }, 1000)

    //     return () => {
    //         clearInterval(timerId)
    //     }
    // }, [])

    // return <div>
    //     <h1>{countdown}</h1>
    // </div>

    //============ cleanup function fix bug
    const [avatar, setAvatar] = useState()
    
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        }
    }, [avatar])

    const handleAvatar = (e) => {
        const file =e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file.preview)
        setAvatar(file)

        e.target.value = null;
    }

    return <>
        <div>
            <input type="file" onChange={handleAvatar}  />
        </div>
        {avatar && (
            <img width={200} height={200} src={ avatar.preview} />
        )}
    </>
    
}
  
  export default Trainning;
  