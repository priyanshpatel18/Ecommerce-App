import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader.jsx";
import AllProducts from "../components/AllProducts.jsx";

const ShowProduct = ({ setShowProductsList, showProductsList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useNavigate();
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        if (productId) {
          const response = await axios.get(
            `http://localhost:8080/products/${productId}`
          );
          setProduct(response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    const fetchOriginalProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8080/products");
        setOriginalProducts(res.data);
        setProducts(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    Promise.all([fetchProduct(), fetchOriginalProducts()]);
  }, [productId]);

  async function handleAddToCart(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `http://localhost:8080/user/addToCart/${productId}`,
        productId,
        {
          withCredentials: true,
        }
      );
      redirect(-1);
      enqueueSnackbar("Added to Cart", {
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.response.data, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : <> </>}
      <Navbar
        setShowProductsList={setShowProductsList}
        setProducts={setProducts}
      />
      {showProductsList ? (
        <AllProducts products={products} setProducts={setProducts} />
      ) : (
        <div className="productDisplayContainer">
          <div className="imageContainer">
            <img
              src={product.imageUrl}
              alt="thumbnail"
              className="productImage"
            />
          </div>
          <div className="detailsContainer">
            <h1 className="productName">{product.name}</h1>
            <p className="productDescription">{product.description}</p>
            <div className="priceContainer">
              <h2 className="productDiscount">-{product.discount}%</h2>
              <h2 className="productPrice">
                ₹
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </h2>
            </div>
            <h2 className="actualPrice">M.R.P. {product.price}</h2>
            <p className="productStock">
              {product.quantity > 0 && (
                <span className="inStock">In Stock</span>
              )}
            </p>
            <form className="btnContainer" onSubmit={handleAddToCart}>
              <button className="addToCart">Add To Cart</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowProduct;
