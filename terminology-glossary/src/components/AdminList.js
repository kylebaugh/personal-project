import axios from 'axios'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'

const AdminList = (props) => {
    const {user} = useSelector((state) => state.authReducer)
    // const [userItems, setUserItems] = useState([])

    const [userItems, setUserItems] = useState([])

    useEffect(() => {

        axios.get(`/topics/userItems/${user.user_id}`)
            .then((res) => {
                setUserItems(res.data)
            })
            .catch(err => {
                console.log(err)
                console.log('Use effect failed')
            })
        }, [user.user_id])

    return (
        <div>
            {user.is_admin && <div className='myTerms'>
            <h3 className='termTop'>My Glossary Items</h3>
            {userItems.map((item)=> {
                return(
                    <div
                    key={item.user_item_id}
                    >
                        {item.name}
                    </div>
                )
            })}
            </div>}
        </div>
    )

}

export default AdminList