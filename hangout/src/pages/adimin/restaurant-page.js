import React from 'react'
import styled from 'styled-components';
import RestaurantList from '../../components/admin/restaurant-list'
import Sidebar from '../../components/admin/sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
`;



const ResListWrapper = styled.div`
  flex: 3;
  padding: 1rem;
`;
function RestaurantPage() {
  return (
    <div>
    <Container>

   <Sidebar />

 <ResListWrapper>
   <RestaurantList />
 </ResListWrapper>
</Container>
 </div>
  )
}

export default RestaurantPage
