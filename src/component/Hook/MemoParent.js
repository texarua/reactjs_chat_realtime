import { useCallback, useMemo, useState } from "react"
import MemoChildren from "./MemoChildren";

function MemoParent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState([]);


    // use callback sử dụng kết hợp với memo HOC ở component con giúp tránh việc render lại ở component con nhiều lần => giảm performance 
    // param thứ 2 của usecallback : dependency ( sử dụng như useeffect ([] : gọi khi load lần đầu , [var] : khi var thay đổi))
    // const handleIncrease =  useCallback(() => {
    //     setCount(prevState => prevState + 1);
    // },[count])

    const handleSubmit = () => {
        setProducts([...products, {
            name,
            price: +price
        }])
    }

    // const totalPrice = products.reduce((totalPrice, product) => {
    //     return totalPrice + product.price
    // }, 0)

    //có tham số thứ 2 tương tự useEffect + useCallback load lại logic tùy theo denpendency . 
    // => tối ưu performance , chỉ load code khi dependency thay đổi .
    const totalPrice = useMemo(() => {
        const result = products.reduce((totalPrice, product) => {
            return totalPrice + product.price
        }, 0)

        console.log('tinh toan lai ...')

        return result;
    }, [products])

    return (
        <>
            <div>
                name : <input onChange={e => setName(e.target.value)} value={name}/>
            </div>
            <div>
                value : <input onChange={e => setPrice(e.target.value)} value={price}/>
            </div>
            <div>
                <button onClick={handleSubmit}>SUBMIT</button>
            </div>
            <div>total price : {totalPrice}</div>
            <div>
                <ul>
                    {products.map((item, index) => {
                        return <li key={index}>{item.name} - {item.price}</li>
                    })}
                </ul>
            </div>
            {/* <div><button onClick={handleIncrease}>Increase</button></div>
            <MemoChildren onIncrease={handleIncrease}/> */}
        </>
    )
}

export default MemoParent