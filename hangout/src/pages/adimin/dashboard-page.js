import React from 'react'
import styled  from 'styled-components';
import DashBoard from '../../components/admin/dashboard'
import Sidebar from '../../components/admin/sidebar'
import Graph from '../../components/admin/graph';


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
function DashboardPage() {
  return (
    <div>
        <Container>
        <Sidebar/>
<OwnerListWrapper>
<DashBoard/>
<Graph/>
</OwnerListWrapper>
     
        </Container>
      
    </div>
  )
}

export default DashboardPage