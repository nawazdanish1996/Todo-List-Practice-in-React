import React, { useState } from 'react';
import "./TodoList.scss";

const TodoList = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [newEdit, setNewEdit] = useState("");

    const formSubmitHandler = (e) =>{
        e.preventDefault();

        if(!input){
            alert("Should not be blank.");
        }else if(input && !toggle){
            setData(
                data.map((ele)=>{
                    if(ele.id === newEdit){
                        return {...ele, name: input}
                    }
                    return ele;
                })
            )
            setToggle(true);
            setInput("");
            setNewEdit("");
        }else{
            const allInputData = {id: new Date().getTime().toString(), name: input};
            setData([...data, allInputData]);
            setInput("");
        }
    }

    // Delete all the users
    const deleteAllDataHandler = () =>{
        const confirm = window.confirm("Are you sure?");
        if(confirm === true){
            setData([]);
        }
    }
    
    // Delete items
    const deleteHandler = (index) =>{
        const confirm = window.confirm("Are you sure?");
        if(confirm === true){
            const updateItems = data.filter((ele)=>{
                return index !== ele.id
            });
            setData(updateItems);
        }
    }


    // Edit buton Handler
    const editButtonHandler = (id) =>{
        let newEditItems = data.find((ele)=>{
            return ele.id === id
        })
        setInput(newEditItems.name);
        setToggle(false);
        setNewEdit(id);
    }

  return (
    <div className='todoList'>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5 mb-5">
                    <h1>Todo App</h1>
                </div>

                <div className="col-md-12 mb-5">
                    <form>
                        <input className='w-50' onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Input text here...' />
                        {toggle ?
                            <button onClick={formSubmitHandler} type="submit">Add</button>
                            :
                            <div>
                                <button onClick={formSubmitHandler} type="submit">Update</button>
                                <button onClick={()=> setToggle(true)}>Cancel</button>
                            </div>
                        }
                    </form>
                </div>

                {data.map((val)=>{
                        return(
                            <div className="col-md-12 text-white" key={val.id}>
                                <p className='float-start'>{val.name}</p>
                                <div className="btn-group float-end">
                                    <button onClick={()=> editButtonHandler(val.id)} className='btn btn-primary'>Edit</button>
                                    <button onClick={()=> deleteHandler(val.id)} className='btn btn-warning'>Delete</button>
                                </div>
                            </div>
                        )
                })}

                {
                    data.length > 0 ? 
                    <div className="col-md-12 mt-4">
                        <button onClick={deleteAllDataHandler} className='btn btn-success float-end'>Delete All User</button>
                    </div>
                    : null
                }

            </div>
        </div>
    </div>
  )
}

export default TodoList