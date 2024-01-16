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
        <Col lg={6} className='relative'>
            <img src="../images/bgDeco-right-flipped.png" alt="" width={535} height={628} className='absolute'/>
            <img src="../images/bgDeco-left.png" alt="" width={487} height={628} className='absolute translate-x-90'/>
            <img src="../images/male.png" alt="" className='absolute top-minus-40 z-1'/>
            <img src="../images/female.png" alt="" className='absolute z-1 top-minus-40 translate-x-70'/>
            <img src="../images/bgDeco_2_square-flipped.png" alt="" width={900} className='absolute z-2 top-80 left-minus-5'/>
        </Col>
    </Row>
  )
}

export default Home