import React from 'react'
import styled  from 'styled-components';
import Sidebar from '../../components/admin/sidebar'
import AdminSales from '../../components/admin/admin-sales';



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
function AdminSalesPage() {
  return (
    <div>
        <Container>
        <Sidebar/>
<OwnerListWrapper>
<AdminSales/>
</OwnerListWrapper>
     
        </Container>
      
    </div>
  )
}

export default AdminSalesPage