import React from 'react'
import styled  from 'styled-components';
import Sidebar from '../../components/admin/sidebar'
import OwnerList from '../../components/admin/owner-list'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
`;



const OwnerListWrapper = styled.div`
  flex: 3;
  padding: 1rem;
`;
function Owner_List() {
  return (
    <div>
        <Container>
        <Sidebar/>
<OwnerListWrapper>
<OwnerList/>
</OwnerListWrapper>
     
        </Container>
      
    </div>
  )
}

export default Owner_List
