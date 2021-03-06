import axios from 'axios'
// import {getUnit} from '../redux/glossaryReducer'
import {useState} from 'react'
import {useSelector} from 'react-redux'

const Item = (props) => {
    const {user} = useSelector((state) => state.authReducer)

    const [newItemName, setNewItemName] = useState('')
    const [newItemDefinition, setNewItemDefinition] = useState('')
    const [editBox, setEditBox] = useState(false)
    const [addedItem, setAddedItem] = useState(false)

    const item = props.item

    const toggleEdit = (glossary_id) => {
        setEditBox(!editBox)
    }

    const deleteItem = (glossary_id) => {
        axios.delete(`/unit/deleteItem/${glossary_id}`)
            .then((res) => {
                console.log(res.data)
                window.location.reload()
            })
            .catch(err => console.log('Delete Item Failed'))
    }

    const editItem = (glossary_id, name, definition) => {
        axios.put(`/unit/editItem/${glossary_id}`, 
            {glossary_id: glossary_id,
            name: newItemName, 
            definition: newItemDefinition, 
            unit_id: props.unitId})
        .then((res) => {
            console.log(res.data)
            window.location.reload()
        })
        .catch(err => console.log('Edit Item Failed'))
    }

    const addToList = (glossary_id) => {
        axios.post(`/topics/learnList/${glossary_id}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                console.log('Add To List Failed')
            })

            setAddedItem(true)
    }

    return(
        <div className='itemBox'>
            <div>
                <div className='itemName'>{item.name}</div>
                {/* <br></br> */}
                <div className='itemDivider'></div>
                <div className='unitDefinitionHead'>Definition:</div>
                {<br></br>}
                <div className='unitDefinition'>{item.definition}</div>
                <br></br>
                {user && !user.is_admin && 
                    <div className='addToListButton'>
                        {!addedItem && <button
                            onClick={() => {addToList(item.glossary_id)}}
                        >Add to My List</button>}
                        {addedItem && <button>Added!</button>}
                    </div>
                }
                <br></br>
            </div>
            
            <div className='toggleEditItem'>
                {user && user.is_admin && !editBox &&<button onClick={() => {toggleEdit(item.glossary_id)}}>Edit</button>}
                {user && user.is_admin && !editBox &&<button onClick={() => deleteItem(item.glossary_id)}>Delete</button>}
                {editBox && <div className='editItemBox'>
                    <input className='newName' placeholder="New Name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)}></input>
                    <input type='text' className='newDefinition' placeholder="New Definition" value={newItemDefinition} onChange={(e) => setNewItemDefinition(e.target.value)}></input>
                    {/* <section style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> */}
                    <section style={{display:'flex', flexDirection:'row'}}>
                        <button onClick={toggleEdit}>Cancel</button>
                        <button onClick={() => editItem(item.glossary_id)}>Submit</button>
                    </section>
                    </div>}
            </div>
        </div>
    )

}

export default Item