import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DataFetching() {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        axios.get('https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?api_key=x1xxm8onyi6s6vohqk5qk6qy&includes=MainImage')
            .then(res => {
                console.log(res)
                setProductList(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            {
                productList.map(product => {
                    return (
                    <div key={product.listing_id}>
                        <h3>{product.title}</h3>
                        <img alt='mainImage' src={product.MainImage.url_75x75} />
                    </div>
                    )
                })
            }
        </div>
    )
}

export default DataFetching;