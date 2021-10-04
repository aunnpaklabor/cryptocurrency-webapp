import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd'; 

import { useGetCryptoQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrency = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptoQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)    
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filteredData)

    }, [cryptosList, searchTerm]);

    if(isFetching) return <Loader />

    return (
        <>  
            {!simplified && (
                <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            )}
            <Row gutter={[32, 32]} className="crypto-coins-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} alt="news" />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrency
