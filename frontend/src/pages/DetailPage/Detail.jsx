import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MobileNav from '../../components/NavBars/NavBar';
import Nav from '../../components/NavBars/Nav';
import Footer from '../../components/footer/Footer';
import CardContainer from '../../components/Card/CardContainer';
import Rating from '@mui/material/Rating';
import './Datail.css';

function Detail() {
    const { id } = useParams();
    const [productData, setProductData] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState('');
    const [newRating, setNewRating] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 700);
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        // Resize listener for mobile check
        const handleResize = () => setIsMobile(window.innerWidth <= 700);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        axios.get(`http://localhost:8080/product/${id}`)

            .then(response => {
                setProductData(response.data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });

        axios.get(`http://localhost:8080/shop/comments/${id}`)
            .then(response => {
                setComments(response.data.comments || []);
                console.log(response.data.comments);
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
            });
    }, [id]);

    const handleIncrement = () => {
        if (quantity < productData.items.stock)
            setQuantity(quantity + 1);
        else {
            alert("Stock is not available");
            setQuantity(productData.items.stock);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        const cartData = {
            productId: productData.items._id,
            quantity: quantity,
        };

        axios.put(`http://localhost:8080/cart/${productData.items._id}?size=${quantity}`, cartData, { withCredentials: true })
            .then((response) => {
                alert("Product added to cart successfully!");
            })
            .catch((error) => {
                alert("Failed to add product to cart.");
                console.error(error);
            });
    };

    const handleBuyNow = () => {
        axios.post('http://localhost:8080/order', {
            quantity,
            productData,
            isCart: false
        }, { withCredentials: true })
            .then(() => {
                alert('Order placed successfully!');
            })
            .catch((error) => {
                alert('Failed to place the order.');
                console.error(error);
            });
    };

    const handleAddComment = () => {
        const commentData = { comment: newComment, rating: newRating };
        axios.post(`http://localhost:8080/shop/comments/${id}`, commentData, { withCredentials: true })
            .then(response => {
                setComments(response.data.comments);
                setNewComment('');
                setNewRating(0);
                alert('Comment added successfully!');
            })
            .catch(error => {
                alert('Failed to add comment.');
                console.error(error);
            });
    };

    const handleDeleteComment = (commentId) => {
        axios.delete(`http://localhost:8080/shop/comments/${id}/${commentId}`, { withCredentials: true })
            .then(() => {
                setComments(comments.filter(comment => comment._id !== commentId));
                alert('Comment deleted successfully!');
            })
            .catch(error => {
                alert('Failed to delete comment.');
                console.error(error);
            });
    };

    const buttonStyle = {
        backgroundColor: "#0B3D2E",
        color: "#F5F1E8",
        border: "none",
        outline: "none",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px"
    };

    return (
        <div className='detail-box'>
            <div className='detail-navbar'>
                {isMobile ? <MobileNav /> : <Nav />}
            </div>

            <div className='Detail-container'>
                {productData ? (
                    <>
                        <div
                            className='pro-image-div'
                            style={{ backgroundImage: `url(http://localhost:8080/${productData.items.img_url})` }}
                        ></div>

                        <div className='detail-info'>
                            <div className='detail-info-head'>
                                <span>{productData.items.name}</span>
                            </div>

                            <div className='detail-info-rateprice'>
                                <div className='deatil-info-rate'>
                                    <Rating
                                        name="half-rating-read"
                                        defaultValue={productData.items.rate}
                                        precision={0.5}
                                        readOnly
                                        style={{ fontSize: "20px" }}
                                    />
                                </div>
                                <div>
                                    <span style={{ fontSize: "1.9rem", color: "#C2A878" }}>
                                        ₹{productData.items.selling_price}
                                    </span>
                                </div>
                            </div>

                            <div className='detail-info-option'>
                                <div className="quantity-container">
                                    <button className="qty-btn" onClick={handleDecrement}>−</button>
                                    <span className="qty-value">{quantity}</span>
                                    <button className="qty-btn" onClick={handleIncrement}>+</button>
                                </div>

                                <div style={{ color: "#8B0000", fontSize: "20px", marginTop: "1rem" }}>
                                    <span>Hurry up! Only {productData.items.stock} item left </span>
                                </div>

                                <div className="detail-info-button">
                                    <button onClick={handleAddToCart}>Add To Cart</button>
                                    <button
                                        style={{
                                            backgroundColor: "#C2A878",
                                            color: "#0B3D2E",
                                            fontWeight: "bold",
                                            border: "2px solid #0B3D2E"
                                        }}
                                        onClick={handleBuyNow}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            <div className='detail-discription'>
                                <h3>Description</h3>
                                <p>{productData.items.discription}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>

            {/* Comment Section */}
            <div className='comment-section'>
                <h3>Comments</h3>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} className='comment-box'>
                            <p><strong>User:</strong> {comment.comment}</p>
                            <Rating name="read-only" value={comment.rating} readOnly style={{ fontSize: "16px" }} />
                            <button
                                style={{
                                    backgroundColor: "#8B0000",
                                    color: "white",
                                    border: "none",
                                    padding: "0.3rem 0.6rem",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    width: "fit-content"
                                }}
                                onClick={() => handleDeleteComment(comment._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
                <div className='comment-box'>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                    <Rating
                        name="new-rating"
                        value={newRating}
                        onChange={(e, newValue) => setNewRating(newValue)}
                    />
                    <button
                        style={{
                            backgroundColor: "#0B3D2E",
                            color: "white",
                            border: "none",
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                            borderRadius: "5px",
                            marginTop: "0.5rem",
                            width: "fit-content"
                        }}
                        onClick={handleAddComment}
                    >
                        Add Comment
                    </button>
                </div>
            </div>

            {/* Recommended Section */}
            {productData && productData.category && (
                <div className='recomended-item'>
                    <CardContainer
                        key={productData.category._id}
                        cateName={productData.category.name}
                        items={productData.category.items}
                    />
                </div>
            )}

            <Footer />
        </div>
    );

}

export default Detail;
