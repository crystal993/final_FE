// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux/es/hooks/useSelector';
// import styled, { css } from 'styled-components';
// import { Link } from 'react-router-dom';
// import { connectRoom } from '../redux/modules/currentRoomSlice';
// import { useDispatch } from 'react-redux';

// function ChatRoomCard({
//   stompClient,
//   roomId,
//   title,
// }) {
//     const token = localStorage.getItem('access-token');
//     const dispatch = useDispatch();

//     useEffect(() => {
//     stompClient.subscribe(
//       `/sub/chat/room/${roomId}`,
//       {
//         token: token,
//       }
//     );

//   }
//   );

//   return (
//     <Link
//       to={`/chatRoom/${roomId}`}
//       onClick={() => {
//         dispatch(connectRoom({ title }));
//       }}
//     >
//       <StChatRoomCard>
//         <StTextWrapper>
//           <h3>
//             {title}
//           </h3>
//         </StTextWrapper>
//       </StChatRoomCard>
//     </Link>
//   );
// }

// const StChatRoomCard = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   padding-left: 20px;
//   width: calc(100vw - 66px);
//   height: 70px;
//   background-color: #ffffff;
//   :hover {
//     background-color: #f8f8f8;
//   }
// `;

// const StTextWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   h3 {
//     margin: 5px 0 3px 0;
//     font-size: 0.8rem;
//     margin-left: 10px;
//   }

//   p {
//     margin: 0 0 5px 0;
//     font-size: 0.8rem;
//     margin-left: 10px;
//   }`
// export default ChatRoomCard;
