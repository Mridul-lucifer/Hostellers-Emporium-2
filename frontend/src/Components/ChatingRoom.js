import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Style/ChatingRoom.css'
export default function ChatingRoom() {
  const [samp, setsamp] = useState(null);
  const [array, setArray] = useState([]);
  const [chat, setChat] = useState("");  // Corrected state initialization

  useEffect(() => {
    const roomNumber = localStorage.getItem('ChatId');
    setsamp(roomNumber);

    const fetchChatData = async () => {
      if (roomNumber) {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.post('http://localhost:5000/getChat', {
            Authorization: token,
            ChatId: roomNumber,
          });
          setArray(response.data.chats);
        } catch (error) {
          console.error('Error fetching chat data:', error);
        }
      }
    };

    fetchChatData(); // Initial fetch
    const interval = setInterval(fetchChatData, 1000); // Refresh every 1 second

    // Cleanup the interval when the component is unmounted or on dependency change
    return () => clearInterval(interval);
  }, []);

  const addChat = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post('http://localhost:5000/sendChat', {
        Authorization: token,
        ChatId: localStorage.getItem('ChatId'),
        msg: chat,
      });
      alert(response.data.msg);
      setChat("");  // Clear the input after sending the message
    } catch (error) {
      console.error('Error sending chat:', error);
    }
  };

  return (
    <div className='ChatingRoom-outer'>
      <h2 className='ChatingRoom-header'>Group Number : {samp}</h2>
      {array.length > 0 ? (
        array.map((chat, index) => (
          <div key={index}>
            <div className='ChatingRoom-line'>
              <div className='ChatingRoom-name'>{chat.person} </div>
              <div>{chat.chat}</div>
            </div>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}
      <div className='ChatingRoom-input-outer'>
        <form onSubmit={addChat}>
          <input 
            type='text' 
            value={chat}  // Bind input value to chat state
            onChange={(event) => setChat(event.target.value)} 
          />
          <button type='submit'>Add</button> {/* Corrected typo */}
        </form>
      </div>
    </div>
  );
}
