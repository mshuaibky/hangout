import React from 'react'
import styled from 'styled-components';
import User_list from '../../components/admin/user-list'
import Sidebar from '../../components/admin/sidebar'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
`;



const UserListWrapper = styled.div`
  flex: 3;
  padding: 1rem;
`;

function UserList() {
  return (
      <div>
         <Container>
   
        <Sidebar />
    
      <UserListWrapper>
        <User_list />
      </UserListWrapper>
    </Container>
      </div>
  )
}

export default UserList
