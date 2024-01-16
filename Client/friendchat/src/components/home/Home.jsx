import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <Row className='wrapper px-8 py-5'>
        <Col>
            <h2 className='text-white text-xl'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h2>
            <p className='text-grey-light text-md'>Hic repellendus deserunt a aspernatur cupiditate, voluptatibus dicta autem delectus iusto odit nisi quos accusantium earum, inventore magnam dignissimos eum repudiandae ipsa.</p>
        </Col>
        <Col lg={5} className='relative'>
            <img src="../images/bgDeco-right-flipped.png" alt="" width={535} height={628} className='absolute'/>
            <img src="../images/bgDeco-left.png" alt="" width={487} height={628} className='absolute translate-x-70'/>
            <img src="../images/male.png" alt="" />
            <img src="../images/female.png" alt="" />
            <img src="../images/bgDeco_2_square.png" alt="" />
        </Col>
    </Row>
  )
}

export default Home