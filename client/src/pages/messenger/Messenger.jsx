import { publicRequest } from '../../Request'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './Messenger.css'

import React, { useContext, useEffect, useRef, useState } from 'react'

const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState("");
    const [arrivalMessages, setArrivalMessages] = useState(null);
    const {user} = useContext(AuthContext);
    const ScrollRef = useRef()


    useEffect(()=>{
        arrivalMessages && currentChat?.members.includes(arrivalMessages.sender)
        setMessages((prev)=>[...prev, arrivalMessages])
    },[arrivalMessages, currentChat])

    useEffect(()=>{
        const getConversation = async ()=>{
            try{

                const res = await publicRequest.get("conversation/"+ user._id)
                setConversations(res.data);
                // console.log(res);
            }catch(err){
                console.log(err);
            }
        }
        getConversation()
    }, [user._id])

    useEffect(()=>{
        const getMessage = async() => {
            try{
                const res = await publicRequest.get('/message/'+ currentChat?._id)
                setMessages(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getMessage();
    },[currentChat])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessages,
            conversationId: currentChat._id
        };

        try{
            const res = await publicRequest.post("/message", message)
            setMessages([...messages, res.data])
            setNewMessages("")
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=> {
        ScrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    // console.log(messages);
  return (
    <>
    <Topbar/>
    <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput"/>
            { conversations.map((c)=>(
                <div onClick={()=>setCurrentChat(c)}>
                <Conversation key={c._id} conversation={c} currentUser={user}/>
                </div>
            ))}
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper"> 
            {
                currentChat? 
            <>
            <div className='chatBoxTop'>
                {messages.map((m)=>(
                    <Message message={m} own={m?.sender === user._id}/> 

                ))}
            </div>
            <div className='chatBoxBottom'>
                <textarea className='chatMessageInput' placeholder='Write your message..' onChange={(e)=>setNewMessages(e.target.value)} value={newMessages}></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
            </div>
            </> : 
            <span className='noConversationText'>Open a conversation to start a chat.</span>
}
        </div>  
        </div>
        {/* <div className='chatOnline'>
            <div className='chatOnlineWrapper'>
                <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
            </div>
        </div> */}
    </div>
    </>
  )
}

export default Messenger
